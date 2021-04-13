import { Link } from "react-router-dom";

export const COLUMNS = [
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
          <p>
            <Link>
              {col.value.firstName} {col.value.lastName}
            </Link>
          </p>
          <p>({col.value.roleCode})</p>
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
];
