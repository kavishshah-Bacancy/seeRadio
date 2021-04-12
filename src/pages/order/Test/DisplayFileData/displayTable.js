import React from "react";
import { Button, Card, Table } from "reactstrap";
import { BsDownload } from "react-icons/bs";

function DisplayTable({ asset }) {
  return (
    <Card>
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
          {asset.map((item) => {
            return (
              <tr>
                <td>{item.fileName}</td>
                <td>{item.uploadBy}</td>
                <td>{item.uploadDate}</td>
                <td>
                  <Button
                    style={{
                      border: "none",
                      backgroundColor: "whitesmoke",
                      color: "blue",
                    }}
                    onClick={() => window.open(item.assetURL)}
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
    </Card>
  );
}

export default DisplayTable;
