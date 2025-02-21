
import { Tabs, Tab, Box } from "@mui/material";
import CurrentPoll from "./CurrentPoll";
import Analytics from "./Analytics";
import propTypes from "prop-types";
import { useSelector } from "react-redux";

const Poll = ({ loading, value, setValue }) => {
  const vote_list = useSelector((state) => state.opinion.vote_list);

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
        <Tab
          value="two"
          label="Analytics"
          disabled={vote_list?.length === 0 || !vote_list ? true : false}
        />
      </Tabs>
      {value === "one" && <CurrentPoll loading={loading} />}
      {value === "two" && <Analytics />}
    </Box>
  );
};

export default Poll;

Poll.propTypes = {
  loading: propTypes.bool,
  setLoading: propTypes.func,
  value: propTypes.string,
  setValue: propTypes.func,
};
