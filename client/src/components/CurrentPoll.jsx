import { Box, Typography } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

const CurrentPoll = () => {
  const samepleData = [
    {
      vote: "Lorem ipsum Bla Bla Bla Bla",
      count: 0,
    },
    {
      vote: "Lorem ipsum Bla Bla Bla Bla",
      count: 1,
    },
    {
      vote: "Lorem ipsum Bla Bla Bla Bla",
      count: 2,
    },
    {
      vote: "Lorem ipsum Bla Bla Bla Bla",
      count: 3,
    },
    {
      vote: "Lorem ipsum Bla Bla Bla Bla",
      count: 4,
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "550px",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "8px",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          color="white"
          fontSize={"16px"}
          fontWeight={600}
          letterSpacing={"1px"}
        >
          What is your favourite anime and why? do you have any preferrence on
          what anime should.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {samepleData &&
            samepleData.map((obj, idx) => (
              <Box
                key={idx}
                sx={{
                  width: "100%",
                  height: "50px", // Adjust height as needed
                  backgroundColor: "rgba(82, 82, 82, 0.3)",
                  borderRadius: "6px",
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: "22%",
                    left: "3%",
                    color: "white",
                  }}
                >
                  {obj.vote}
                </Typography>
                <Typography
                  sx={{
                    position: "absolute",
                    top: "23%",
                    right: "3%",
                    color: "white",
                  }}
                >
                  {obj.count}%
                </Typography>
                {/* Filled Range */}
                <Box
                  sx={{
                    width: `40%`, // Dynamic width based on value
                    height: "100%",
                    backgroundColor: "#007F70",
                    borderRadius: "5px",
                    transition: "width 0.3s ease-in-out",
                  }}
                />
              </Box>
            ))}
        </Box>
        <MuiButton
          sx={{
            background: "linear-gradient(135deg, #FF3D00, #D50000)", // Red gradient
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "6px", // Rectangular shape
            padding: "8px",
            boxShadow: "0px 8px 0px #A30000", // Darker red 3D shadow
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              background: "linear-gradient(135deg, #D50000, #A30000)", // Darker red on hover
              boxShadow: "0px 0px 0px #A30000", // Removes shadow on hover
              transform: "translateY(4px)", // Slight push-down effect
            },
          }}
        >
          Vote Now
        </MuiButton>
      </Box>
    </Box>
  );
};

export default CurrentPoll;
