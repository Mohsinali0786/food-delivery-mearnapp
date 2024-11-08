import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { useEffect, useContext } from "react";
import { StoreContext } from "../context/storeContext";
import { Link } from "react-router-dom";
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const { loginData } = useContext(StoreContext);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  // let menuItems = [
  //   {
  //     iconName: "All-Users",
  //     iconImg: SupervisedUserCircleIcon,
  //     path: "all-users",
  //   },
  //   {
  //     iconName: "Manage Orders",
  //     iconImg: MenuBookIcon,
  //     path: "adminOrder",
  //   },
  //   {
  //     iconName: "Orders",
  //     iconImg: DeliveryDiningIcon,
  //     path: "myOrders",
  //   },
  //   {
  //     iconName: "Menus",
  //     iconImg: MenuBookIcon,
  //     path: "menu",

  //   },

  // ];
  const [menuItems, setMenuItems] = React.useState([
    {
      iconName: "All-Users",
      iconImg: SupervisedUserCircleIcon,
      path: "all-users",
      visibility:false
    },
    {
      iconName: "Manage Orders",
      iconImg: MenuBookIcon,
      path: "adminOrder",
      visibility:false
    },
    {
      iconName: "Orders",
      iconImg: DeliveryDiningIcon,
      path: "myOrders",
      visibility:false
    },
    {
      iconName: "Menus",
      iconImg: MenuBookIcon,
      path: "menu",
      visibility:false
    },
  ]);
  useEffect(() => {
    if (loginInfo.role == "SUPERADMIN_ROLE") {
      console.log("menu useEffect", menuItems);
      // let allUsersIndexNo = menuItems.findIndex((x) => x.iconName == "All-Users");
      // menuItems[allUsersIndexNo].visibility = false;
      menuItems.forEach((x) => (x.visibility = true));
    } else {
      let allUsersIndexNo = menuItems.findIndex(
        (x) => x.iconName == "Orders"
      );
      menuItems[allUsersIndexNo].visibility = true;
    }
  }, [open]);
  console.log("DrawerList", menuItems);
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((text, index) => {
          if (text.visibility == true)
            return (
              <Link to={text.path} className="sideBarLinks">
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <text.iconImg />
                    </ListItemIcon>
                    <ListItemText
                      className="fw-bold"
                      primary={text?.iconName}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
        })}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  console.log("menu", menuItems);
  return (
    <div>
      <Button onClick={toggleDrawer(true)} className="sideBarIcon">
        <ArrowForwardIosIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
