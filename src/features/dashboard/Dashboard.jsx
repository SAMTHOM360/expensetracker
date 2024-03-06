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
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import ExpenseGraph from "./ExpenseGraph";
import DoughnutChart from "./DoughnutChart";

import axios from "axios";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Dashboard = () => {
  return (
    <>
      {/* <Navbar />
      <Sidebar /> */}
      <Box
        sx={{
          height: "92vh",

          display: "flex",
          flexGrow: 1,
          px: 3,
          pl: "6em",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={2} sx={{ backgroundColor: "", mt: 1.5 }}>
          <Grid item xs={12} md={12} lg={12} sx={{ backgroundColor: "" }}>
            <Box
              sx={{
                display: "flex",

                // borderRadius: "5px",
                justifyContent: "space-between",

                flexDirection: "row",

                flexGrow: 1,
                height: "7vh",
                backgroundColor: "",
              }}
            >
              <Typography sx={{ fontSize: "1.5em" }}>Dashboard</Typography>
              <TextField
                id="outlined-basic"
                label="Search"
                // value={searchQuery}
                // onChange={handleSearchInputChange}
                // InputLabelProps={{ shrink: true }}
                sx={{
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
                // mt: 1,
                // border: "1px solid rgb(204, 204, 204)",
                // border: "2px solid black",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          height: "20vh",
                          width: "45vw",
                          backgroundColor: "#CCCCFF",
                          borderRadius: "20px",
                        }}
                      >
                        <Box sx={{ px: 3, pl: "2em", pt: 3 }}>
                          <Typography
                            sx={{ fontSize: "21px", fontWeight: "bold" }}
                          >
                            Overview
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                          <Box sx={{ px: 3, pl: "2em", pt: 3 }}>
                            <Typography
                              sx={{ fontSize: "25px", color: "white" }}
                            >
                              $852.8
                            </Typography>
                            <Typography sx={{ fontSize: "18px" }}>
                              Total Spend
                            </Typography>
                          </Box>
                          <Box sx={{ px: 3, pl: "2em", pt: 3 }}>
                            <Typography
                              sx={{ fontSize: "25px", color: "white" }}
                            >
                              $852.8
                            </Typography>
                            <Typography sx={{ fontSize: "18px" }}>
                              Total Spend
                            </Typography>
                          </Box>
                          <Box sx={{ px: 3, pl: "2em", pt: 3 }}>
                            <Typography
                              sx={{ fontSize: "25px", color: "white" }}
                            >
                              $852.8
                            </Typography>
                            <Typography sx={{ fontSize: "18px" }}>
                              Total Spend
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          height: "35vh",
                          width: "45vw",
                          backgroundColor: "#CCCCFF",
                          borderRadius: "20px",
                        }}
                      >
                        <Box sx={{ px: 3, pl: "2em", pt: 3 }}>
                          <Typography
                            sx={{ fontSize: "21px", fontWeight: "bold" }}
                          >
                            Expense Statistics
                          </Typography>
                          <ExpenseGraph />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          height: "22vh",
                          width: "45vw",
                          backgroundColor: "#CCCCFF",
                          borderRadius: "20px",
                        }}
                      >
                        <Box sx={{ px: 3, pl: "2em", pt: 3 }}>
                          <Typography
                            sx={{ fontSize: "21px", fontWeight: "bold" }}
                          >
                            Friends
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            px: 3,
                            pl: "2em",
                            pt: 1,
                            display: "flex",
                            gap: 1,
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "18px", fontWeight: "" }}
                            >
                              ABC
                            </Typography>

                            <Typography
                              sx={{ fontSize: "18px", fontWeight: "bold" }}
                            >
                              You owe $923
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "18px", fontWeight: "" }}
                            >
                              DEF
                            </Typography>

                            <Typography
                              sx={{ fontSize: "18px", fontWeight: "bold" }}
                            >
                              You owe $923
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "18px", fontWeight: "" }}
                            >
                              XYZ
                            </Typography>

                            <Typography
                              sx={{ fontSize: "18px", fontWeight: "bold" }}
                            >
                              You owe $923
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              float: "right",
                              marginBottom: 2,
                              backgroundColor: "",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "15px",
                                fontWeight: "",
                                float: "right",
                                textDecoration: "underline",
                                cursor: "pointer",
                              }}
                            >
                              Show All
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          height: "38vh",
                          width: "46vw",
                          backgroundColor: "#CCCCFF",
                          borderRadius: "20px",
                          //   boxShadow: "0 0 0 8px rgba(128,128,128,0.5)", //
                        }}
                      >
                        <Box sx={{ px: 3, pl: "2em", pt: 3 }}>
                          <Typography
                            sx={{ fontSize: "21px", fontWeight: "bold" }}
                          >
                            Doughnut
                          </Typography>
                          <DoughnutChart />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper
                        elevation={2}
                        sx={{
                          height: "40vh",
                          width: "46vw",
                          backgroundColor: "#CCCCFF",
                          borderRadius: "20px",
                        }}
                      >
                        <Box sx={{ px: 3, pl: "2em", pt: 3 }}>
                          <Typography
                            sx={{ fontSize: "21px", fontWeight: "bold" }}
                          >
                            Activities
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            px: 3,
                            pl: "2em",
                            pt: 3,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                              backgroundColor: "rgba(89, 168, 217, 0.6)",
                              borderRadius: "50%",
                              height: "5vh",
                              width: "2.5vw",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "45%",
                                transform: "translate(-50%, -50%) ",
                              }}
                            >
                              <OtherHousesIcon sx={{ color: "white" }} />
                            </div>
                          </div>
                          <Box>
                            <Typography sx={{ fontSize: "20px" }}>
                              Rent
                            </Typography>
                            <Typography>Paid by you</Typography>
                          </Box>

                          <Typography>You Owe</Typography>
                          <Typography>$308.2</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
