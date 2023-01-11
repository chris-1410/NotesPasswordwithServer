import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import validator from "validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    ></Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter valid Email!");
    }
  };
  const showToastMessage = () => {
    toast.success("Registration Successfull !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [errorMessage, setErrorMessage] = useState("");
  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Password Must be 8 characters Long !!!  1 Uppercase 1 Lowercase 1 Number and a special Character "
      );
    }
  };

  function onChange(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost:9000/signup";
    if (data.customername !== "" && data.email !== "" && data.password !== "") {
      axios
        .post(url, {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          showToastMessage();
          console.log(res.data);
        });
    } else {
      toast.error("Please enter all details !", {
        position: toast.POSITION.TOP_CENTER,
      });
      e.preventDefault();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => onChange(e)}
                  value={data.name}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    onChange(e);
                    validateEmail(e);
                  }}
                  required
                  fullWidth
                  value={data.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <span style={{ fontWeight: "bold", color: "red" }}>
                  {emailError}
                </span>{" "}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e) => {
                    onChange(e);
                    validate(e.target.value);
                  }}
                  required
                  fullWidth
                  value={data.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errorMessage === "" ? null : (
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    {errorMessage}
                  </span>
                )}{" "}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
