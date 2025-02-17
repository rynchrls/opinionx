import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import CurrentPoll from "./CurrentPoll";

const Poll = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ padding: "0rem 1rem", flexGrow: 1 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="white tabs example"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "white", // Indicator color
          },
          "& .MuiTab-root": {
            color: "gray", // Default tab color
            transition: "0.3s",
            textTransform: "none",
            fontSize: "18px",
            letterSpacing: "0.5px",
            "&:hover": {
              color: "#ddd", // Slightly lighter on hover
            },
            "&.Mui-selected": {
              color: "white", // Selected tab color
              fontWeight: "bold",
            },
          },
        }}
      >
        <Tab value="one" label="Poll" />
        <Tab value="two" label="Analytics" />
      </Tabs>
      {value === "one" && <CurrentPoll />}
    </Box>
  );
};

export default Poll;
