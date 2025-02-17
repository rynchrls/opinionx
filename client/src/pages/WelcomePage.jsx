import { Box } from "@mui/material";
import Register from "../components/Register";

export default function WelcomePage() {
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
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <Register />
    </Box>
  );
}
