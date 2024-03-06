import React, { useCallback } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentsIcon from "@mui/icons-material/Payments";
import GroupsIcon from "@mui/icons-material/Groups";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { useAuth } from "../../routes/AuthContext";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 15px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 15px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  zIndex: theme.zIndex.modal - 1,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const sideBarMenuOptions = [
  {
    pathname: "/dashboard",
    isLibraryIcon: true,
    menuIcon: <DashboardIcon />,
    menuIconAlt: "Dashboard Logo",
    menuTitle: "Dashboard",
  },
  {
    pathname: "/activity",
    isLibraryIcon: true,
    menuIcon: <PaymentsIcon />,
    menuIconAlt: "Activity Logo",
    menuTitle: "Activity",
  },
  {
    pathname: "/group",
    isLibraryIcon: true,
    menuIcon: <GroupsIcon />,
    menuIconAlt: "Group Logo",
    menuTitle: "Group",
  },
  {
    pathname: "/friends",
    isLibraryIcon: true,
    menuIcon: <HandshakeIcon />,
    menuIconAlt: "Friends Logo",
    menuTitle: "Friends",
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  //   const navigate = useNavigate();
  // const [open, setOpen] = useState(!propOpen);
  const [open, setOpen] = useState(false);

  const activeListBgColor = "#B6D5E5";
  const inactiveListBgColor = "#ffffff00";

  const handleSelectListItem = (route) => {
    navigate(route);
  };

  const toggleSidebarOpenOnHover = () => {
    setOpen(true);
  };

  const toggleSidebarCloseOnHover = () => {
    setOpen(false);
  };

  const handleLogout = useCallback(() => {
    toast.dismiss();
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      toast.success("Successfully logged out.", {
        toastId: "navbar-succ3",
      });

      logout();
      navigate("/");
    }
  }, [logout, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        onMouseEnter={toggleSidebarOpenOnHover}
        onMouseLeave={toggleSidebarCloseOnHover}
        onClose={toggleSidebarCloseOnHover}
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "#E2E6FF",
            border: 0,
            // color: "#ffffff",
            color: "#000000",
            fontSize: "20px",
            overflowY: "auto",
          },
        }}
      >
        <DrawerHeader>
          {/* <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
          <Box
            sx={{
              minWidth: 0,
              // mr: open ? 3 : "auto",
              //   ml: open ? null : "1em",
              gap: open ? 2 : null,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {open ? (
              <>
                <Avatar
                  alt="Travis Howard"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                  sx={{ width: 55, height: 55 }}
                />
                <Typography
                  sx={{
                    color: "#000",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Manish Kumar
                </Typography>

                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Avatar
                  alt="Travis Howard"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                  sx={{ width: 55, height: 55 }}
                />
              </>
            )}
          </Box>
        </DrawerHeader>

        <List sx={{ paddingX: open ? "15px" : "5px", mt: "3em" }}>
          {sideBarMenuOptions.length > 0 &&
            sideBarMenuOptions.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: "flex",
                  bgcolor:
                    window.location.pathname === item?.pathname
                      ? activeListBgColor
                      : inactiveListBgColor,
                  "&:hover": {
                    bgcolor: "#B6D5E5",
                  },
                  borderRadius: "8px",
                  minHeight: "3.2em",
                  mt: index === 0 ? 0 : "12px",
                }}
                onClick={() => handleSelectListItem(item?.pathname)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "#B6D5E5",
                    },
                    overflow: "hidden",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.isLibraryIcon ? (
                      item.menuIcon
                    ) : (
                      <img src={item.menuIcon} alt={item.menuIconAlt} />
                    )}{" "}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        variant="body2"
                        style={{ color: "#000000", fontSize: "20px" }}
                      >
                        {item.menuTitle}
                      </Typography>
                    }
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
