import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Autocomplete,
  InputLabel,
  Button,
  Stack,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Friends = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (inputValue) {
      // Make an API call to fetch options based on the inputValue
      axios
        .get(`your_backend_url?query=${inputValue}`)
        .then((response) => {
          setOptions(response.data); // Assuming response.data is an array of options
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
        });
    } else {
      setOptions([]); // Clear options when inputValue is empty
    }
  }, [inputValue]);

  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      <Box
        sx={{
          height: "100vh",

          display: "flex",
          flexGrow: 1,
          px: 3,
          pl: "6em",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={2} sx={{ backgroundColor: "", mt: 6 }}>
          <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "" }}>
            <Box
              sx={{
                display: "flex",

                // borderRadius: "5px",
                // justifyContent: "space-between",

                flexDirection: "row",

                flexGrow: 1,
                height: "7vh",
                backgroundColor: "",
              }}
            >
              <Typography sx={{ fontSize: "1.5em" }}>Friends</Typography>
              {/* <Typography sx={{ fontSize: "1.5em", marginLeft: "50%" }}>
                Pending Friend Requests
              </Typography> */}
            </Box>
            <Box
              // elevation={2}
              sx={{
                display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                borderRadius: "5px",
                // overflowX: "hidden",
                flexDirection: "column",

                flexGrow: 1,
                height: "77vh",
                backgroundColor: "",
                mt: 1,
                // border: "1px solid rgb(204, 204, 204)",
                // border: "2px solid black",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={5.5} sx={{}}>
                  <Box>
                    {/* <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        border: "",
                        backgroundColor: "",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Search Friends"
                        // value={searchQuery}
                        // onChange={handleSearchInputChange}
                        // InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              height: "50px",
                              width: "35vw",
                            },

                          "& fieldset": {
                            borderRadius: "10px",
                            transition: "border-color 0.3s",
                          },
                          "&:focus-within fieldset": {
                            border: "2px solid #32577e",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <IconButton aria-label="search" edge="end">
                                <SearchIcon />
                              </IconButton>
                            </>
                          ),
                        }}
                      />

                      <Button
                        variant="contained"
                        sx={{
                          height: "8vh",
                          width: "10vw",
                          backgroundColor: "#00308F",
                          //   px: 2,
                        }}
                      >
                        Send Invite
                      </Button>
                    </Box> */}
                    <Box>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          gap: 2,
                          //   border: "1px solid purple",
                          borderRadius: "10px",
                          width: "40vw",
                          p: 2,
                          backgroundColor: "#E6E6FA",
                        }}
                      >
                        <Avatar sx={{ height: "70px", width: "4vw" }} />
                        <Typography sx={{ fontSize: "23px", mt: 3 }}>
                          Harshita Mahapatra
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            height: "50px",
                            width: "5vw",
                            mt: 2,
                            backgroundColor: "#5D3FD3",
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          gap: 2,
                          //   border: "1px solid purple",
                          borderRadius: "10px",
                          width: "40vw",
                          p: 2,
                          backgroundColor: "#E6E6FA",
                        }}
                      >
                        <Avatar sx={{ height: "70px", width: "4vw" }} />
                        <Typography sx={{ fontSize: "23px", mt: 3 }}>
                          Harshita Mahapatra
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            height: "50px",
                            width: "5vw",
                            mt: 2,
                            backgroundColor: "#5D3FD3",
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          gap: 2,
                          //   border: "1px solid purple",
                          borderRadius: "10px",
                          width: "40vw",
                          p: 2,
                          backgroundColor: "#E6E6FA",
                        }}
                      >
                        <Avatar sx={{ height: "70px", width: "4vw" }} />
                        <Typography sx={{ fontSize: "23px", mt: 3 }}>
                          Harshita Mahapatra
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            height: "50px",
                            width: "5vw",
                            mt: 2,
                            backgroundColor: "#5D3FD3",
                          }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                {/* <hr
                  style={{
                    margin: "70px 0 70px 0",
                    color: "#D9D9D9",
                    height: "80vh",
                  }}
                /> */}
                <Grid item xs={1}>
                  <Divider
                    orientation="vertical"
                    sx={{ height: "70vh", marginRight: "50%" }}
                  />
                </Grid>

                <Grid item xs={5.5}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        border: "",
                        backgroundColor: "",
                      }}
                    >
                      <TextField
                        id="outlined-basic"
                        label="Search"
                        // value={searchQuery}
                        // onChange={handleSearchInputChange}
                        // InputLabelProps={{ shrink: true }}
                        sx={{
                          "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              height: "50px",
                              width: "35vw",
                            },

                          "& fieldset": {
                            borderRadius: "10px",
                            transition: "border-color 0.3s",
                          },
                          "&:focus-within fieldset": {
                            border: "2px solid #32577e",
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <>
                              <IconButton aria-label="search" edge="end">
                                <SearchIcon />
                              </IconButton>
                            </>
                          ),
                        }}
                      />

                      <Button
                        variant="contained"
                        sx={{
                          height: "8vh",
                          width: "10vw",
                          backgroundColor: "#00308F",
                          //   px: 2,
                        }}
                      >
                        Send Invite
                      </Button>
                    </Box>

                    <Autocomplete
                      value={inputValue}
                      onChange={(event, newValue) => {
                        setInputValue(newValue);
                      }}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      options={options}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search"
                          variant="outlined"
                        />
                      )}
                    />
                    {/* <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2,
                        border: "1px solid purple",
                        borderRadius: "10px",
                        width: "38vw",
                        mt: 2,
                        p: 2,
                      }}
                    >
                      <Avatar sx={{ height: "70px", width: "4vw" }} />
                      <Typography sx={{ fontSize: "23px", mt: 3 }}>
                        Harshita Mahapatra
                      </Typography>

                      <Box sx={{ gap: 2 }}>
                        <Button
                          variant="contained"
                          sx={{ height: "50px", width: "5vw", mt: 2 }}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ height: "50px", width: "5vw", mt: 2, ml: 2 }}
                        >
                          Approve
                        </Button>
                      </Box>
                    </Box> */}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Friends;
