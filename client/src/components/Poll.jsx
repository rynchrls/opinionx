import { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import CurrentPoll from "./CurrentPoll";
import Analytics from "./Analytics";

const Poll = () => {
  const [value, setValue] = useState("one");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
        <Tab value="two" label="Analytics" disabled={loading} />
      </Tabs>
      {value === "one" && <CurrentPoll loading={loading} />}
      {value === "two" && <Analytics />}
    </Box>
  );
};

export default Poll;
