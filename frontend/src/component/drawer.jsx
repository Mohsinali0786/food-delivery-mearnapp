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
import { useEffect ,useContext } from "react";
import { StoreContext } from "../context/storeContext";
import { Link } from "react-router-dom";
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const { loginData} = useContext(StoreContext);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  let menuItems = [
    {
      iconName: "All-Users",
      iconImg: SupervisedUserCircleIcon,
      path: "all-users",
      visibility: false,
    },
    {
      iconName: "All-Items",
      iconImg: MenuBookIcon,
      path: "all-foods",
    },
    {
      iconName: "Orders",
      iconImg: DeliveryDiningIcon,
      path: "myOrders",
    },
    {
      iconName: "Menus",
      iconImg: MenuBookIcon,
      path: "menu",


    },

  ];
  useEffect(() => {
    if (loginData.role == "SUPERADMIN_ROLE") {
      let allUsersIndexNo = menuItems.findIndex((x) => x.iconName == "All-Users");
      menuItems[allUsersIndexNo].visibility = true;
    }
  },[menuItems]);
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((text, index) => {
          // if (text.visibility == true)
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
