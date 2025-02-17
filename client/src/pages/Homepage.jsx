import { Box } from "@mui/material";
import Header from "../components/Header";
import Poll from "../components/Poll";

function Homepage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#0D1B2A", // Dark Blue Background
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px", // Tile effect
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Header />
      <Poll />
    </Box>
  );
}

export default Homepage;
