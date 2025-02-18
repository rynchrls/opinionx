import { Button as MuiButton } from "@mui/material";
import propTypes from "prop-types";

const Button = ({ children, onClick, color }) => {
  return (
    <>
      {color === "orange" && (
        <MuiButton
          onClick={onClick}
          sx={{
            background: "linear-gradient(135deg, #FF8C42, #FF6B00)",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px", // Rectangular shape
            padding: "14px 28px",
            boxShadow: "0px 8px 0px #C74A00", // 3D shadow only at the bottom
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(135deg, #FF6B00, #FF4500)",
              boxShadow: "0px 0px 0px #C74A00", // Removes shadow on hover
              transform: "translateY(4px)", // Slight push-down effect
            },
          }}
        >
          {children}
        </MuiButton>
      )}
      {color === "purple" && (
        <MuiButton
          onClick={onClick}
          sx={{
            background: "linear-gradient(135deg, #9C27B0, #6A1B9A)", // Purple gradient
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px", // Rectangular shape
            padding: "14px 28px",
            boxShadow: "0px 8px 0px #4A0072", // 3D shadow only at the bottom
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(135deg, #6A1B9A, #4A0072)", // Darker purple on hover
              boxShadow: "0px 0px 0px #4A0072", // Removes shadow on hover
              transform: "translateY(4px)", // Slight push-down effect
            },
          }}
        >
          {children}
        </MuiButton>
      )}

      {color === "white" && (
        <MuiButton
          onClick={onClick}
          sx={{
            background: "linear-gradient(135deg, #FFFFFF, #E0E0E0)", // White gradient
            color: "#333", // Dark text for contrast
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px", // Rectangular shape
            padding: "14px 28px",
            boxShadow: "0px 8px 0px #B0B0B0", // Light gray 3D shadow
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(135deg, #E0E0E0, #CCCCCC)", // Slightly darker on hover
              boxShadow: "0px 0px 0px #B0B0B0", // Removes shadow on hover
              transform: "translateY(4px)", // Slight push-down effect
            },
          }}
        >
          {children}
        </MuiButton>
      )}

      {color === "red" && (
        <MuiButton
          onClick={onClick}
          sx={{
            background: "linear-gradient(135deg, #FF3D00, #D50000)", // Red gradient
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px", // Rectangular shape
            padding: "14px 28px",
            boxShadow: "0px 8px 0px #A30000", // Darker red 3D shadow
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(135deg, #D50000, #A30000)", // Darker red on hover
              boxShadow: "0px 0px 0px #A30000", // Removes shadow on hover
              transform: "translateY(4px)", // Slight push-down effect
            },
          }}
        >
          {children}
        </MuiButton>
      )}
      {color === "green" && (
        <MuiButton
          onClick={onClick}
          sx={{
            background: "linear-gradient(135deg, #00C853, #00E676)", // Green gradient
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px", // Rectangular shape
            padding: "14px 28px",
            boxShadow: "0px 8px 0px #00A152", // Darker green 3D shadow
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(135deg, #00E676, #00C853)", // Darker green on hover
              boxShadow: "0px 0px 0px #00A152", // Removes shadow on hover
              transform: "translateY(4px)", // Slight push-down effect
            },
          }}
        >
          {children}
        </MuiButton>
      )}
    </>
  );
};

Button.displayName = "button";

export default Button;

Button.propTypes = {
  children: propTypes.node,
  onClick: propTypes.func,
  color: propTypes.string,
  width: propTypes.any,
};
