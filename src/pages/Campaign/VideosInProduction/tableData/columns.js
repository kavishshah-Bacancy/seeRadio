import { ColumnFilter } from "./columnFilter";
export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true,
    Cell: (col) => {
      return (
        <button
          style={{
            textDecoration: "none",
            border: "none",
            backgroundColor: "none",
          }}
          onClick={() => {
            console.log(col.cell.row.original);
          }}
        >
          {col.value}
        </button>
      );
    },
  },
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Age",
    accessor: "age",
  },
];

// export const COLUMNS = [
//   {
//     Header: "Id",
//     accessor: "id",
//   },
//   {
//     Header: "Title/Details",
//     accessor: "title",
//   },
//   {
//     Header: "Advertiser",
//     accessor: "clientCompany.companyName",
//   },
//   {
//     Header: "Due Date",
//     accessor: "statusDueDate",
//   },
//   {
//     Header: "Start Date",
//     accessor: "startDate",
//   },
// ];
