import { TextField } from "@mui/material";
import React from "react";
import propTypes from "prop-types";

const Input = React.memo(({ name, setName, onClick }) => {
  return (
    <TextField
      variant="outlined"
      placeholder="Type your name"
      fullWidth
      value={name}
      onChange={(e) => setName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Prevents unintended form submission (if inside a form)
          onClick(); // Replace with your function
        }
      }}
      sx={{
        width: "45%",
        backgroundColor: "#121212", // Darker background
        borderRadius: "8px",
        input: {
          color: "white", // White text
          padding: "12px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // White border (default)
          },
          "&:hover fieldset": {
            borderColor: "#f0f0f0", // Lighter white on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // Solid white on focus
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)", // White glow effect
          },
        },
        "&::placeholder": {
          color: "rgba(255, 255, 255, 0.6)", // Light white placeholder
        },
      }}
    />
  );
});

Input.displayName = "input";

export default Input;

Input.propTypes = {
  name: propTypes.string,
  setName: propTypes.func,
  onClick: propTypes.func,
};
