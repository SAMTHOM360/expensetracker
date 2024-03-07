import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingButton from "@mui/lab/LoadingButton";
// import { LoadingButton } from "@mui/lab";

import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import Tooltip from "@mui/material/Tooltip";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// import { ExpenseAction } from "../actions/ExpenseAction";

import expenseAction from "../../actions/expenseAction";

// const rows = [];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
    variant: "standard",
  },
};
// handling the time change function
const handleDateChange = (date) => {
  if (date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
};
const AddExpense = () => {
  const sessionData = JSON.parse(sessionStorage.getItem("loginData"));
  const userId = sessionData?.id;
  console.log("user id for payload", userId);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    // paidBy: [],
    userId: "",
    split: [],
    endDate: null,
  });
  const [rows, setRows] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [friends, setFriends] = React.useState([]);
  const [splitEnabled, setSplitEnabled] = useState(false);

  const handleChange = (event, field) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const toggleSplitField = () => {
    setSplitEnabled(!splitEnabled);
  };

  // calling the getallcategories api
  const getallCategories = async () => {
    try {
      const res = await expenseAction.getAllCategories();
      if (res.status === 200) {
        const categories = res?.data?.data;
        setCategory(categories);
        console.log("categories inside addexpenses", categories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getAllFriends = async () => {
    try {
      const res = await expenseAction.getAllFriends();
      if (res.status === 200) {
        const friendlist = res?.data?.data;
        setFriends(friendlist);
        console.log("friends list ", friendlist);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // get tabledata function
  const getTableData = async () => {
    try {
      const res = await expenseAction.getTableData();
      if (res.status === 200) {
        console.log("table data", res.data.data);
        setRows(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // handlesubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Extract the selected category ID
    const selectedCategoryId =
      category.find((item) => item.name === formData.category)?.id || null;

    // Create the payload
    const payload = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      categoryId: selectedCategoryId,
      isSplit: splitEnabled,
      // expenseDate: new Date().toISOString().split("T")[0],
      // userId: formData.userId,
      userId: userId,
      // splitUsers: formData.split,
      splitUsers: [userId, ...formData.split],
      expenseDate: formData.endDate,
    };
    console.log("inside handle submit ");
    try {
      const response = await expenseAction.addExpense(payload);
      console.log(response);
    } catch (err) {
      console.error(err, "this is error message");
    }
    console.log("payload ", payload);

    // setFormData({
    //   description: "",
    //   amount: "",
    //   paidBy: "",
    //   split: [],
    //   category: "",
    // });
  };
  React.useEffect(() => {
    getAllFriends();
  }, []);
  React.useEffect(() => {
    getallCategories();
  }, []);
  React.useEffect(() => {
    getTableData();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          padding: "1.4rem",
          borderRadius: "5px",
          background:
            "radial-gradient(465px at -15.1% -25%, rgb(17, 130, 193) 0%, rgb(67, 166, 238) 49%, rgb(126, 203, 244) 90.2%)",
          marginBottom: "2rem",
          marginTop: "1rem",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Add Expenses
          </Typography>
          <Tooltip
            title={splitEnabled ? "Disable Splitting" : "Enable Splitting"}
          >
            <IconButton onClick={toggleSplitField}>
              {splitEnabled ? (
                <ToggleOnIcon sx={{ color: "#fff", fontSize: "2rem" }} />
              ) : (
                <ToggleOffIcon sx={{ color: "#fff", fontSize: "2rem" }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "#D6F2FB",
                paddingX: "10px",
                paddingY: "2px",
                borderRadius: "10px",
              }}
            >
              <TextField
                id="filled-basic"
                label="Enter Amount"
                required
                variant="standard"
                size="small"
                name="amount"
                value={formData.amount}
                onChange={(e) => handleChange(e, "amount")}
                fullWidth
                type="number"
                sx={{
                  backgroundColor: "#D6F2FB",
                  borderRadius: "0.25em",
                  height: "3.4em",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Box>
          </Grid>

          {/* category field goes here */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "#D6F2FB",
                paddingX: "10px",
                paddingY: "2px",
                borderRadius: "10px",
              }}
            >
              <FormControl
                fullWidth
                variant="standard"
                sx={{
                  backgroundColor: "#D6F2FB",
                  borderRadius: "0.25em",
                  height: "3.4em",
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Select Category
                </InputLabel>
                <Select
                  variant="standard"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  disableUnderline={true}
                  label="Category"
                  onChange={(e) => handleChange(e, "category")}
                  name="category"
                  value={formData.category} // Set the value attribute here
                >
                  {category?.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "#D6F2FB",
                paddingX: "10px",
                paddingY: "2px",
                borderRadius: "10px",
              }}
            >
              <TextField
                id="filled-basic"
                label="Enter a Description"
                required
                variant="standard"
                size="small"
                name="description"
                value={formData.description}
                onChange={(e) => handleChange(e, "description")}
                fullWidth
                sx={{
                  backgroundColor: "#D6F2FB",
                  borderRadius: "0.25em",
                  height: "3.4em",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Box>
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "#D6F2FB",
                paddingX: "10px",
                paddingY: "2px",
                borderRadius: "10px",
              }}
            >
              <Autocomplete
                sx={{
                  backgroundColor: "#D6F2FB",
                  borderRadius: "0.25em",
                  height: "3.4em",
                }}
                options={friends?.map((item) => item?.username) || []}
                renderInput={(params) => (
                  <TextField {...params} label="Paid By" variant="standard" />
                )}
              />
            </Box>
          </Grid> */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "#D6F2FB",
                paddingX: "10px",
                paddingY: "2px",
                borderRadius: "10px",
              }}
            >
              <FormControl
                fullWidth
                variant="standard"
                sx={{
                  backgroundColor: "#D6F2FB",
                  borderRadius: "0.25em",
                  height: "3.4em",
                }}
              >
                <InputLabel id="demo-multiple-name-label" required>
                  Split
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={formData.split}
                  disabled={!splitEnabled}
                  disableUnderline={true}
                  onChange={(e) => handleChange(e, "split")}
                  MenuProps={MenuProps}
                  name="type"
                >
                  {friends?.map((name) => (
                    <MenuItem key={name.id} value={name.id}>
                      {name.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: "#D6F2FB",
                paddingX: "10px",
                paddingY: "2px",
                borderRadius: "10px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // name="endDate"
                  // value={formData.endDate}
                  // onChange={(date) =>
                  //   handleChange({ target: { name: "endDate", value: date } })
                  // }
                  value={formData.endDate ? dayjs(formData.endDate) : null}
                  label="expense date"
                  format="YYYY-MM-DD"
                  slots={{
                    openPickerIcon: () => (
                      <CalendarMonthIcon sx={{ color: "#281C61" }} />
                    ),
                  }}
                  required
                  slotProps={{
                    field: {
                      readOnly: true,
                    },
                    textField: {
                      variant: "standard",
                      InputProps: {
                        disableUnderline: true,
                      },
                      sx: { height: "3.5em", width: "100%" },
                      required: true,
                    },
                  }}
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      endDate: handleDateChange(date),
                    })
                  }
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              variant="contained"
              sx={{
                width: "12.125rem",
                height: "3.25rem",
                fontSize: "1.39rem",
                textTransform: "none",
                fontWeight: "550",
                backgroundColor: "#281c61",
                borderRadius: "0.75rem",
                marginRight: "2rem",
              }}
              onClick={handleSubmit}
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "90%", margin: "0 auto" }}>
        <TableContainer
          component={Paper}
          sx={{ overflow: "auto", maxHeight: "500px" }}
        >
          <Table sx={{ width: "100%" }} stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff", backgroundColor: "black" }}>
                  Amount
                </TableCell>
                <TableCell sx={{ color: "#fff", backgroundColor: "black" }}>
                  Category
                </TableCell>
                <TableCell sx={{ color: "#fff", backgroundColor: "black" }}>
                  Description
                </TableCell>
                {/* <TableCell sx={{ color: "#fff", backgroundColor: "black" }}>
                  Paid By
                </TableCell> */}
                <TableCell sx={{ color: "#fff", backgroundColor: "black" }}>
                  Split
                </TableCell>
                <TableCell sx={{ color: "#fff", backgroundColor: "black" }}>
                  Expense Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length > 0 ? (
                rows?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell scope="row">{row.amount}</TableCell>
                    <TableCell>{row.categoryId}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{row.expenseDate}</TableCell>
                    {/* <TableCell>{row.protein}</TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AddExpense;
