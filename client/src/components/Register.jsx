import { Typography, useMediaQuery } from "@mui/material";
import React, { useCallback, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import SnackbarComponent from "./Snackbar";
import UserService from "../api/service/user.service";

const Register = React.memo(() => {
  const [name, setName] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState("success");

  const isMobile = useMediaQuery("(max-width:800px)");

  const onClick = useCallback(() => {
    if (name?.length < 3) {
      setOpenSnackBar(true);
      setSeverity("error");
      return;
    }
    UserService.regiser(name)
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.data));
        window.location.reload();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [name]);

  return (
    <React.Fragment>
      <Input name={name} setName={setName} onClick={onClick} />
      <Button color={"orange"} onClick={onClick}>
        <Typography variant={isMobile ? "h6" : "h4"} sx={{fontSize: isMobile && '16px'}}>Register</Typography>
      </Button>
      <SnackbarComponent
        openSnackBar={openSnackBar}
        setOpenSnackBar={setOpenSnackBar}
        severity={severity}
      >
        Please add your name to proceed.
      </SnackbarComponent>
    </React.Fragment>
  );
});

Register.displayName = "register";
export default Register;
