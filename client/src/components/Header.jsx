import { Box, Typography } from "@mui/material";
import { LuGitPullRequestCreateArrow } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";

import Button from "./Button";

function Header() {
  return (
    <Box
      sx={{
        width: "100%",
        heigth: "auto",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button color={"orange"}>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <LuGitPullRequestCreateArrow size={"20px"} />
          <Typography fontWeight={"bold"} letterSpacing={"0.5px"}>
            Create Poll
          </Typography>
        </Box>
      </Button>
      <Typography variant="h4" color="white">
        OpinionX
      </Typography>
      <Button color={"purple"}>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <FaListUl size={"20px"} />
          <Typography fontWeight={"bold"} letterSpacing={"0.5px"}>
            Poll List
          </Typography>
        </Box>
      </Button>
    </Box>
  );
}

export default Header;
