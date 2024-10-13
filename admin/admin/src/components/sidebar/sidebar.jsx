import "./sidebar.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
            <AddCircleOutlineIcon/>
            <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
            <ListAltIcon/>
            <p>List Items</p>
        </NavLink>
        <NavLink to="order" className="sidebar-option">
            <AirportShuttleIcon/>
            <p>Order</p>
        </NavLink>
        <NavLink to="users" className="sidebar-option">
            <SupervisedUserCircleIcon/>
            <p>All Users</p>
        </NavLink>
      </div>
    </div>
  );
}
