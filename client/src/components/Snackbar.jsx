import propTypes from "prop-types";
import { Alert, Snackbar, useMediaQuery } from "@mui/material";

const SnackbarComponent = ({
  openSnackBar,
  setOpenSnackBar,
  children,
  severity,
}) => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const handleCloseSnackbar = () => {
    setOpenSnackBar(false); // Close the snackbar
  };
  return (
    <Snackbar
      open={openSnackBar}
      autoHideDuration={2000} // Duration of the snackbar before it disappears (in ms)
      onClose={handleCloseSnackbar} // Close the snackbar when it times out or is manually closed
      anchorOrigin={{
        vertical: "top", // Positioning vertically at the top
        horizontal: "center", // Positioning horizontally at the right
      }}
    >
      <Alert
        severity={severity}
        sx={{ width: "100%", fontSize: isMobile ? "12px" : "16px" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;

SnackbarComponent.propTypes = {
  openSnackBar: propTypes.bool,
  children: propTypes.node,
  setOpenSnackBar: propTypes.func,
  severity: propTypes.string,
};
