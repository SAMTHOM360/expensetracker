import React, { useState } from "react";
// import "./header.css";
import classes from "./Navbar.module.css";
import { Badge, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";

const Navbar = () => {
  const [notificationCount, setNotificationCount] = useState(4);
  const [mailCount, setMailCount] = useState(5);

  return (
    <div className={classes.mainNavDiv}>
      <div className={classes.navcontainer}>
        {/* <TextField
          label="Search"
          variant="outlined"
          sx={{
            width: "310px",
            height: "58px",
            flexShrink: 0,
            borderRadius: "8px",
            border: "1.5px solid #BED5E2",
            background: "#F4F7FA",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}

        <div className={classes.navSecond}>
          <div style={{ display: "flex", gap: "2em" }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              sx={{
                width: "310px",
                // flexShrink: 0,
                borderRadius: "8px",
                border: "1.5px solid #BED5E2",
                background: "#F4F7FA",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <IconButton>
              <Badge
                badgeContent={notificationCount}
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 10,
                    height: 15,
                    minWidth: 15,
                  },
                }}
              >
                <NotificationsIcon sx={{ fontSize: "26px" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge
                badgeContent={mailCount}
                color="warning"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: 10,
                    height: 15,
                    minWidth: 15,
                  },
                }}
              >
                <EmailIcon sx={{ fontSize: "26px" }} />
              </Badge>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
