/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import MOCK_DATA from "./tableData/MOCK_DATA.json";
import { COLUMNS } from "./tableData/columns";
import { GlobalFilter } from "./tableData/GlobalFilter";
import "./videosInProduction.css";
import { Card, Col, Button, Row, Table } from "reactstrap";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { FaFilter, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { getAllcampaigns, getPersonDetailByID } from "../../../Api/api";
import Spinner from "../../../component/Spinner/spinner";
import PersonDetailModal from "./PersonDetailModal/personDetailModal";
import { Link } from "react-router-dom";
import OverlaySpinner from "../../../component/OverlaySpinner/overlaySpinner";

const VideosInProduction = () => {
  const [data, setCampaign] = useState([]);
  const [count, setCount] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [person, setPersonDetail] = useState(null);
  const [company, setCompanyDetail] = useState(null);
  const [modalSpinner, setModalSpinner] = useState(false);
  function openModal(id) {
    setModalSpinner(true);
    getPersonDetailByID(id).then((res) => {
      setPersonDetail(res.person);
      setCompanyDetail(res.companyData);
      setModalSpinner(false);
    });
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setSpinner(true);
    getAllcampaigns()
      .then((res) => {
        console.log(res);
        setSpinner(false);
        setCampaign(res.rows);
        setCount(res.count);
      })
      .catch((error) => {
        setSpinner(false);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "clientCampaignNumber",
      },
      {
        Header: "Title/Details",
        accessor: "title",
        Cell: (col) => {
          return (
            <>
              <Link to={`CampaignDetail/${col.cell.row.original.id}`}>
                <strong>{col.value}</strong>
              </Link>
              <p>{col.cell.row.original.description}</p>
            </>
          );
        },
      },
      {
        Header: "Advertiser",
        accessor: "clientCompany.companyName",
      },
      {
        Header: "Action Required By",
        accessor: "statusWithPerson",
        Cell: (col) => {
          return (
            <>
              <button
                onClick={(id) => openModal(col.value.id)}
                class="btn btn-link"
              >
                {col.value.firstName} {col.value.lastName}
              </button>
              <p style={{ marginLeft: "5%" }}>({col.value.roleCode})</p>
            </>
          );
        },
      },
      {
        Header: "Next Action Due By",
        accessor: "statusDueDate",
        Cell: (col) => {
          return (
            <p>
              <strong>Not Selected</strong>
            </p>
          );
        },
      },
      {
        Header: "Progress",
        accessor: "",
        Cell: (col) => {
          return (
            <p>
              <strong>Not Selected</strong>
            </p>
          );
        },
      },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: (col) => {
          return (
            <p>
              <strong>Not Selected</strong>
            </p>
          );
        },
      },
    ],
    []
  );
  //const data = useMemo(() => campaign, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // so now instead of rows now we destructured page
    nextPage,
    previousPage,
    canNextPage, //Boolean , use for disbale next page btn
    canPreviousPage, //Boolean , use for disbale previous page btn
    setPageSize,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex } = state;
  return (
    <>
      {person !== null && company !== null ? (
        <PersonDetailModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          openModal={openModal}
          person={person}
          companyData={company}
        />
      ) : (
        <Spinner />
      )}

      <Col>
        <Card style={{ padding: "30px" }}>
          <Row>
            <Col md={6}>
              <Button
                style={{
                  width: "25%",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <FaFilter />
                &nbsp;Search Filters
              </Button>
              <span style={{ padding: "5px" }}>{count} Results Returns</span>
            </Col>

            <Col md={6}>
              <h4>
                <strong>Videos In Production</strong>
              </h4>
            </Col>
          </Row>
          <br></br>
          {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
          <div style={{ overflow: "scroll" }}>
            <Table {...getTableProps()} striped borderless>
              <thead
                style={{
                  backgroundColor: "white",
                  boxShadow: "5px 5px 10px",
                }}
              >
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FaArrowDown />
                            ) : (
                              <FaArrowUp />
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {spinner ? (
                <Spinner />
              ) : (
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </Table>
          </div>
        </Card>
      </Col>
      {spinner ? null : (
        <Col>
          <Card style={{ boxShadow: "5px 5px 10px", padding: "10px" }}>
            <Row>
              <Col md={6}>
                Results Per Page :
                <Button
                  id="btn10"
                  className="btnPageSize"
                  onClick={() => {
                    setPageSize(10);
                  }}
                >
                  10
                </Button>
                <span> | </span>
                <Button className="btnPageSize" onClick={() => setPageSize(20)}>
                  20
                </Button>
                <span> | </span>
                <Button className="btnPageSize" onClick={() => setPageSize(30)}>
                  30
                </Button>
              </Col>
              <Col md={6}>
                <span style={{ float: "right" }}>
                  <Button
                    size="lg"
                    className="naviBtn"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    Prev
                  </Button>
                  <span style={{ padding: "7px" }}>
                    <Button
                      style={{
                        borderRadius: "80px",
                        backgroundColor: "#0275d8",
                        border: "none",
                        cursor: "none",
                      }}
                      size="lg"
                    >
                      <strong>{pageIndex + 1}</strong>
                    </Button>
                  </span>
                  <Button
                    size="lg"
                    className="naviBtn"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    Next
                  </Button>
                </span>
              </Col>
            </Row>
          </Card>
        </Col>
      )}
    </>
  );
};

export default VideosInProduction;
