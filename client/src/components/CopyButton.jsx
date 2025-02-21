import { useState } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import propTypes from "prop-types";

export default function CopyButton({ text }) {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          fontWeight: "500",
          fontSize: isMobile ? "13px" : "16px",
          lineHeight: "20px",
          mb: "10px",
          opacity: ".8",
          color: "#fff",
        }}
      >
        Invite via link
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "1em",
          alignItems: "center",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "5px 5px 5px 0px",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <input
          type="text"
          style={{
            flexGrow: "1",
            padding: ".5em",
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: isMobile ? "13px" : "16px",
            color: "#fff",
          }}
          value={text}
          disabled
        />
        <Button
          variant="contained"
          sx={{
            borderRadius: "10px",
            padding: "5px 20px",
            textTransform: "none",
            fontFamily: "Satoshi",
            fontWeight: "500",
            backgroundColor: copied ? "#4caf50" : "#2196f3",
            color: "#fff",
            "&:hover": { backgroundColor: copied ? "#388e3c" : "#1976d2" },
          }}
          onClick={handleCopy}
        >
          <Typography sx={{ fontSize: isMobile && "13px" }}>
            {copied ? "Copied" : "Copy"}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

CopyButton.propTypes = {
  text: propTypes.string,
};
