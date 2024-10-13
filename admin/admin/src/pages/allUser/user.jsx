import "./user.css";
import { toast } from "react-toastify";
// import { StickyHeadTable } from "../component";
import { useEffect, useState } from "react";
import { getRequest, patchRequest } from "../../utils/service";
export default function AllUser() {
  const roleEnum = [
    { name: "USER_ROLE", id: 1 },
    { name: "ADMIN_ROLE", id: 2 },
    { name: "SUPERADMIN_ROLE", id: 3 },
  ];
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const allDynamicUsers = [
      {
        name: "Mohsin",
        email: "mohsinali481997@gmail.com",
        password: "123456",
        role: "Admin",
      },
      {
        name: "Ahsan",
        email: "ahsan@gmail.com",
        password: "123456",
        role: "User",
      },
      {
        name: "Kamran",
        email: "Kamran@gmail.com",
        password: "123456",
        role: "User",
      },
      {
        name: "Farzan",
        email: "Farzan@gmail.com",
        password: "123456",
        role: "SUPERADMIN_ROLE",
      },
      {
        name: "Bilal",
        email: "Bilal@gmail.com",
        password: "123456",
        role: "Admin",
      },
      {
        name: "Zahid",
        email: "Zahid@gmail.com",
        password: "123456",
        role: "User",
      },
    ];
    const allUser = await getRequest("/getAllUsers");
    console.log("allUsers", allUser);
    if (allUser && allUser.user && allUser.user.length > 0) {
      console.log("allUsers");
      setAllUsers(allUser.user);
    }
  };
  const updateUser = async (e, userId) => {
    console.log(e.target.value);
    const res = await patchRequest("/updateUser", {
      role: e.target.value,
      userId,
    });
    if (res.success) {
      toast.success(res.message);
      await getAllUsers();
    } else {
      toast.error(res.message);
    }
  };
  console.log(allUsers, "Yahhhhhh");

  return (
    <div className="list add flex-col">
      <p>All Users List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Id</b>
          <b>Name</b>
          <b>Email</b>
          <b>Role</b>
          <b>Action</b>
        </div>
      </div>
      {allUsers &&
        allUsers.map((user, index) => {
          return (
            <div className="list-table-format">
              <div>
                {/* <img src={`http://localhost:5001/images/${item?.image}`} alt="" /> */}

                <p>{user._id}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <select
                  onChange={(e) => updateUser(e, user._id)}
                  value={user.role}
                >
                  {roleEnum.map((role, index) => (
                    <option key={index} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {/* <p>{user.role}</p> */}
              </div>
              <p className="cursor" onClick={() => {}}>
                X
              </p>
            </div>
          );
        })}
    </div>
  );
}
