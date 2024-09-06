import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import BasicSelect from "./select";
import { Button } from "@mui/material";
import { deleteRequest, patchRequest } from "../utils/service";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from '@mui/material/Avatar';
import {AlertBox} from '../utils/alertBoxMethod' 
const columns = [
  // { id: "_", label: "Image", minWidth: 170 },
  { id: "_id", label: "Id", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 150 },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
    editable: false,
  },
  // {
  //   id: "size",
  //   label: "Size\u00a0(km\u00b2)",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: 'density',
  //   label: 'Density',
  //   minWidth: 170,
  //   align: 'right',
  //   format: (value) => value.toFixed(2),
  // },
];

function createData(_id, name, code, population, size) {
  const density = population / size;
  return { _id, name, code, population, size, density };
}

const rows = [
  createData("1234556", "India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function StickyHeadTable({ data }) {
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    setEditable(false);
  }, [editable]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(data);
  const deleteUser = async (row) => {
    const { _id } = row;
    console.log(_id, "iddddddd");
    const res = await deleteRequest(`/deleteUser/${_id}`);
    if (res.success) {
      AlertBox('Hello','asasdsd','success','Ok')
      console.log("res Ifff", row);
    }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <>
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                </>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          {console.log("edit", row, row.editable)}
                          
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ maxWidth: "100px" }}
                          >
                            {/* {column.format && typeof value === "number"
                              ? column.format(value)
                              : value} */}
                            {column.label == "Role" && row.editable == true ? (
                              <EditData
                                userSelected={row}
                                defaultVal={row.role}
                                setEditable={setEditable}
                                editable={editable}
                              />
                            ) : (
                              <div className="">
                                {column.label == "Id" ?
                                <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                /> : null}<span>{value}</span>
                                {column.label == "Role" ? (
                                  <EditIcon
                                    onClick={() => {
                                      console.log("runnn", editable);
                                      setEditable(!editable);
                                      row.editable = !editable;
                                    }}
                                  />
                                ) : null}
                              </div>
                            )}
                            {/* <input /> */}
                          </TableCell>
                        </>
                      );
                    })}
                    <TableCell>
                      <Button>
                        <DeleteIcon
                          onClick={() => deleteUser(row)}
                          sx={{ color: "red" }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {data && data.length > 5 ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </Paper>
  );
}
export const EditData = ({
  defaultVal,
  userSelected,
  setEditable,
  editable,
}) => {
  const roleEnum = [
    { name: "USER_ROLE", id: 1 },
    { name: "ADMIN_ROLE", id: 2 },
    { name: "SUPERADMIN_ROLE", id: 3 },
  ];
  const [role, setRole] = React.useState("");
  React.useEffect(() => {});
  const updateUser = async () => {
    const { email } = userSelected;
    const res = await patchRequest("/updateUser", { role: role, email: email });
    if (res.success) {
      console.log("res Ifff", userSelected);
      userSelected.role = role;
      userSelected.editable = false;
      setEditable(!editable);
    }
  };
  return (
    <div className="d-flex">
      <BasicSelect
        label="Role"
        options={roleEnum}
        setRole={setRole}
        defaultVal={defaultVal}
      />
      <Button onClick={() => updateUser()}>Update</Button>
    </div>
  );
};
