import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import moment from "moment";
import styled from "styled-components";

const PieContainer = styled.div`
  width: 515px;
  height: 350px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VotersListContainer = styled.div`
  width: 50%;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 16px;

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* Thumb color (gray) */
    border-radius: 5px; /* Rounded thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Darker thumb color on hover */
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Track color */
    border-radius: 5px; /* Rounded corners */
  }

  ::-webkit-scrollbar-track:hover {
    background-color: #e1e1e1; /* Slightly darker track color on hover */
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: 82%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
`;

const desktopOS = [
  {
    label: "Windows",
    value: 72.72,
  },
  {
    label: "OS X",
    value: 16.38,
  },
  {
    label: "Linux",
    value: 3.83,
  },
  {
    label: "Chrome OS",
    value: 2.42,
  },
  {
    label: "Other",
    value: 4.65,
  },
];

const valueFormatter = (item) => `${item.value}%`;

const Analytics = () => {
  const pieColors = ["#FF5733", "#0066FF", "#28A745", "#FF9800", "#8E24AA"];

  const votes = [
    {
      name: "Ryan",
      vote: "Windows",
    },
    {
      name: "Ryan",
      vote: "OS X",
    },
    {
      name: "Ryan",
      vote: "Linux",
    },
    {
      name: "Ryan",
      vote: "Chrome OS",
    },
    {
      name: "Ryan",
      vote: "Other",
    },
    {
      name: "Ryan",
      vote: "Windows",
    },
    {
      name: "Ryan",
      vote: "OS X",
    },
    {
      name: "Ryan",
      vote: "Linux",
    },
    {
      name: "Ryan",
      vote: "Chrome OS",
    },
    {
      name: "Ryan",
      vote: "Other",
    },
  ];

  const whereItBelong = (vote) => {
    const index = desktopOS.findIndex((obj) => obj.label === vote);
    return pieColors[index];
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        padding: "1rem 0rem 0rem 0rem",
      }}
    >
      <PieContainer>
        <PieChart
          series={[
            {
              data: desktopOS,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              valueFormatter,
            },
          ]}
          colors={pieColors}
          height={300}
          width={500}
          slotProps={{
            legend: {
              direction: "column", // Legend at the bottom
              position: { vertical: "top", horizontal: "right" },
              itemGap: 10,
              labelStyle: {
                fontSize: 14, // Change legend font size
                fill: "white", // Change legend text color
                fontFamily: "Poppins, sans-serif",
              },
            },
          }}
        />
      </PieContainer>
      <VotersListContainer>
        <Typography
          variant="h5"
          color="white"
          letterSpacing={"1px"}
          padding={"1.5rem"}
        >
          Voters List
        </Typography>
        <ListContainer>
          {votes &&
            votes?.map((obj, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid green",
                  padding: "1rem",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    color="white"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                    }}
                  >
                    {obj.name}
                  </Typography>
                  <Typography color="white">{obj.vote}</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}
                  >
                    {moment(new Date()).format("dddd, MMMM Do YYYY, h:mm A")}
                  </Typography>
                  <Box
                    sx={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: whereItBelong(obj.vote),
                    }}
                  ></Box>
                </div>
              </Box>
            ))}
        </ListContainer>
      </VotersListContainer>
    </Box>
  );
};

export default Analytics;
