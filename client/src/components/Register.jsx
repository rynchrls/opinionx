import { Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import SnackbarComponent from "./Snackbar";

const Register = React.memo(() => {
  const [name, setName] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState("success");

  const onClick = useCallback(async () => {
    if (name?.length < 3) {
      setOpenSnackBar(true);
      setSeverity("error");
      return;
    }
    localStorage.setItem("user", JSON.stringify(name));
    window.location.reload();
  }, [name]);

  return (
    <React.Fragment>
      <Input name={name} setName={setName} onClick={onClick} />
      <Button color={"orange"} onClick={onClick}>
        <Typography variant="h4">Register</Typography>
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
