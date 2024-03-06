import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import signUpSignInAction from "../../actions/signUpSignInAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../routes/AuthContext";

// import EXPENSE_LOGO from "../img/expense.png";

const SignUpSignIn = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();
  const initialFormData = useMemo(
    () => ({
      name: "",
      phone: "",
      email: "",
      username: "",
      confirmPassword: "",
      password: "",
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = useCallback(
    (e) => {
      let { name, value } = e.target;

      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      toast.dismiss();

      const trimmedUsername = formData.username ? formData.username.trim() : "";

      const trimmedPassword = formData.password ? formData.password.trim() : "";

      if (!trimmedUsername) {
        toast.warn("Username is required !", {
          toastId: "login-warn01",
        });

        return;
      }

      if (!trimmedPassword) {
        toast.warn("Password is required !", {
          toastId: "login-warn02",
        });

        return;
      }

      let payload = {
        email: trimmedUsername,
        password: trimmedPassword,
      };
      // debugger

      try {
        setIsButtonLoading(true);
        const response = await signUpSignInAction.signIn(payload);

        if (response && (response.status === 200 || response.status === 201)) {
          // console.log('DATAA:  ', response.data.data)
          toast.success(response?.data?.message, {
            // toastId: "login-success01",
          });

          const credData = response.data.data;

          console.log("sign in data: ", credData);

          setAuthenticated(true);

          sessionStorage.setItem("loginData", JSON.stringify(credData));

          navigate("/dashboard");
        } else {
          toast.error(response?.data?.message || response?.message, {
            // toastId: "login-err01",
          });
        }
      } catch (error) {
        console.error("Something went wrong:  ", error);
      } finally {
        setIsButtonLoading(false);
      }
    },
    [formData?.password, formData?.username, navigate, setAuthenticated]
  );

  const handleSignUp = useCallback(
    async (e) => {
      e.preventDefault();
      const trimmedName = formData.name ? formData.name.trim() : "";
      const trimmedEmail = formData.email ? formData.email.trim() : "";
      const trimmedPhone = formData.phone ? formData.phone.trim() : "";
      const trimmedPassword = formData.password ? formData.password.trim() : "";
      const trimmedConfirmPassword = formData.confirmPassword
        ? formData.confirmPassword.trim()
        : "";

      if (!trimmedName) {
        toast.warn("Name is required !", {
          toastId: "login-warn11",
        });

        return;
      }

      if (!trimmedEmail) {
        toast.warn("Email is required !", {
          toastId: "login-warn12",
        });

        return;
      }

      if (!trimmedPhone) {
        toast.warn("Phone is required !", {
          toastId: "login-warn13",
        });

        return;
      }

      if (!trimmedPassword) {
        toast.warn("Password is required !", {
          toastId: "login-warn14",
        });

        return;
      }

      if (!trimmedConfirmPassword) {
        toast.warn("Confirm Password is required !", {
          toastId: "login-warn15",
        });

        return;
      }

      let payload = {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        password: trimmedPassword,
      };
      try {
        setIsButtonLoading(true);
        const response = await signUpSignInAction.signUp(payload);

        if (
          response &&
          (response?.status === 200 || response?.status === 201)
        ) {
          console.log("signup data: ", response.data);
          toast.success(response?.data?.message);
          setFormData(initialFormData);
          setIsSignUp(false);
        } else {
          toast.error(response?.data?.message || response?.message, {
            // toastId: "login-err01",
          });
        }
      } catch (error) {
        toast.error(error?.data?.message || error?.data);
      } finally {
        setIsButtonLoading(false);
      }
    },
    [
      formData.name,
      formData.email,
      formData.phone,
      formData.confirmPassword,
      formData.password,
      initialFormData,
    ]
  );

  const handleChangeSignType = useCallback(() => {
    setIsSignUp((prev) => !prev);
    setFormData(initialFormData);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [initialFormData]);

  // console.log("log form", formData);
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(to right top, #00b5ef, #00a1eb, #008de5, #0078dc, #0061cf, #1653c0, #2045b1, #2637a2, #2a3091, #2b2980, #2a2270, #281c61)",
        }}
      >
        <Paper
          elevation={7}
          sx={{
            width: "470px",
            // height: "475px",
            height: "auto",
            display: "flex",
            bgcolor: "#d6f2fb5e",
            borderRadius: "10px",
            paddingX: "1em",
            // background:'rgba(202, 248, 255, 0.95)'
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {/* <img
              src={EXPENSE_LOGO}
              alt="SBI LOGO"
              style={{
                minWidth: "130px",
                maxWidth: "130px",
                // minHeight: "80px",
                // maxHeight: "80px",
                marginTop: "1.2em",
                userSelect: "none",
                pointerEvents: "none",
              }}
            /> */}

            <Typography
              sx={{ marginTop: "10px", fontSize: "35px", fontWeight: 700 }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Typography>
            <form
              onSubmit={isSignUp ? handleSignUp : handleSignIn}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                marginTop: "3em",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2em",
                }}
              >
                {isSignUp ? (
                  <>
                    <Box
                      sx={{
                        bgcolor: "#D6F2FB",
                        paddingX: "10px",
                        paddingY: "2px",
                        borderRadius: "10px",
                      }}
                    >
                      <TextField
                        variant="standard"
                        size="small"
                        id="name"
                        name="name"
                        label="Name"
                        value={formData?.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoFocus
                        inputProps={{
                          maxLength: 100,
                        }}
                        InputProps={{
                          // endAdornment: <AccountCircle />,
                          disableUnderline: true,
                        }}
                        sx={{ height: "3.5em", maxHeight: "3.5em" }}
                      />
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "#D6F2FB",
                        paddingX: "10px",
                        paddingY: "2px",
                        borderRadius: "10px",
                      }}
                    >
                      <TextField
                        variant="standard"
                        size="small"
                        id="email"
                        name="email"
                        label="Email"
                        value={formData?.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoFocus
                        inputProps={{
                          maxLength: 100,
                        }}
                        InputProps={{
                          // endAdornment: <AccountCircle />,
                          disableUnderline: true,
                        }}
                        sx={{ height: "3.5em", maxHeight: "3.5em" }}
                      />
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "#D6F2FB",
                        paddingX: "10px",
                        paddingY: "2px",
                        borderRadius: "10px",
                      }}
                    >
                      <TextField
                        variant="standard"
                        size="small"
                        id="phone"
                        name="phone"
                        label="phone"
                        value={formData?.phone}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoFocus
                        inputProps={{
                          maxLength: 100,
                        }}
                        InputProps={{
                          // endAdornment: <AccountCircle />,
                          disableUnderline: true,
                        }}
                        sx={{ height: "3.5em", maxHeight: "3.5em" }}
                      />
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "#D6F2FB",
                        paddingX: "10px",
                        paddingY: "2px",
                        borderRadius: "10px",
                      }}
                    >
                      <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="standard"
                        size="small"
                        // size="small"
                        // sx={{ width: "80%", mt: "2em" }}
                        value={formData?.password}
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 100,
                        }}
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={togglePasswordVisibility}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ height: "3.5em", maxHeight: "3.5em" }}
                        // autoFocus
                        required
                        fullWidth
                      />
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "#D6F2FB",
                        paddingX: "10px",
                        paddingY: "2px",
                        borderRadius: "10px",
                        marginBottom: "1em",
                      }}
                    >
                      <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="standard"
                        size="small"
                        // size="small"
                        // sx={{ width: "80%", mt: "2em" }}
                        value={formData?.confirmPassword}
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 100,
                        }}
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleConfirmPasswordVisibility}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ height: "3.5em", maxHeight: "3.5em" }}
                        // autoFocus
                        required
                        fullWidth
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        bgcolor: "#D6F2FB",
                        paddingX: "10px",
                        paddingY: "2px",
                        borderRadius: "10px",
                      }}
                    >
                      <TextField
                        variant="standard"
                        size="small"
                        id="username"
                        name="username"
                        label="Username"
                        value={formData?.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        autoFocus
                        inputProps={{
                          maxLength: 100,
                        }}
                        InputProps={{
                          // endAdornment: <AccountCircle />,
                          disableUnderline: true,
                        }}
                        sx={{ height: "3.5em", maxHeight: "3.5em" }}
                      />
                    </Box>

                    <Box
                      sx={{
                        bgcolor: "#D6F2FB",
                        paddingX: "10px",
                        paddingY: "2px",
                        borderRadius: "10px",
                        marginBottom: "1em",
                      }}
                    >
                      <TextField
                        id="password"
                        name="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="standard"
                        size="small"
                        // size="small"
                        // sx={{ width: "80%", mt: "2em" }}
                        value={formData?.password}
                        onChange={handleChange}
                        inputProps={{
                          maxLength: 100,
                        }}
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={toggleConfirmPasswordVisibility}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOffIcon />
                                ) : (
                                  <VisibilityIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ height: "3.5em", maxHeight: "3.5em" }}
                        // autoFocus
                        required
                        fullWidth
                      />
                    </Box>
                  </>
                )}
              </Box>
              <Button
                variant="contained"
                disabled={isButtonLoading}
                onClick={isSignUp ? handleSignUp : handleSignIn}
                sx={{
                  overflow: "hidden",
                  marginBottom: "1em",
                  bgcolor: "#281C61",
                  borderRadius: "12px",
                  paddingX: "32px",
                  paddingY: "14.5px",
                  minWidth: "160px",
                  maxWidth: "160px",
                  minHeight: "48.75px",
                  maxHeight: "48.75px",
                  fontSize: "17px",
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#322475", overflow: "hidden" },

                  "&:disabled": {
                    background: "#E0E0E0",
                    // color: "#B5B5B5"
                  },
                }}
              >
                {isButtonLoading ? (
                  <CircularProgress size="2em" sx={{ color: "#818181" }} />
                ) : (
                  <>{isSignUp ? "Signup" : "Signin"}</>
                )}
              </Button>
            </form>
            <Typography
              sx={{
                color: "#111111",
                marginBottom: "10px",
                cursor: "pointer",
                userSelect: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={isSignUp ? handleChangeSignType : handleChangeSignType}
            >
              {isSignUp
                ? "Have an acount? Signin!"
                : "Dont have an acount? Singup first!"}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default SignUpSignIn;
