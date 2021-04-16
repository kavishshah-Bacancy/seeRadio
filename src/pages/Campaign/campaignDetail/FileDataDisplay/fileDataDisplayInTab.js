import React from "react";
import { Button, Table } from "reactstrap";
import Moment from "react-moment";

import { BsDownload } from "react-icons/bs";

function FileDataDisplayInTab({ fileData }) {
  return (
    <>
      <div style={{ overflow: "scroll" }}>
        <Table striped>
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Uploaded By</th>
              <th>File Uploaded Date</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {fileData.map((item) => {
              return (
                <tr>
                  <td>{item.assetOrignalName}</td>
                  <td>
                    {item.uploadedByPerson.firstName}{" "}
                    {item.uploadedByPerson.lastName}
                  </td>
                  <td>
                    <Moment format="DD-MMM-YYYY">{item.createdAt}</Moment>
                  </td>
                  <td>
                    <Button
                      style={{
                        marginLeft: "3%",
                        border: "none",
                        backgroundColor: "whitesmoke",
                        color: "blue",
                      }}
                      onClick={() => window.open(item.assetUrl)}
                    >
                      <strong>
                        {" "}
                        <BsDownload />
                        &nbsp;Download
                      </strong>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default FileDataDisplayInTab;
