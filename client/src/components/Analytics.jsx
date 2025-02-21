import { Box, Typography, useMediaQuery } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
// import { PieChart } from "@mui/x-charts/PieChart";
import moment from "moment";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import Create from "./Create";
import { useState } from "react";
import { useSelector } from "react-redux";

// const PieContainer = styled.div`
//   width: 45%;
//   height: auto; /* Increased height to accommodate legend */
//   background-color: rgba(0, 0, 0, 0.4);
//   border-radius: 16px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   padding: 1rem;
// `;

// const ChartWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
// `;

// const LegendContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   flex-direction: column;
//   gap: 10px;
//   margin-top: 24px;
//   width: 100%;
// `;

// const LegendItem = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   font-size: 14px;
//   color: white;
//   font-family: "Poppins, sans-serif";
// `;

// const LegendColor = styled.div`
//   width: 12px;
//   height: 12px;
//   border-radius: 50%;
//   background-color: ${(props) => props.color};
//   margin-right: 6px;
// `;

const VotersListContainer = styled.div`
  width: 100%;
  height: 80%;
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
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
`;

// const valueFormatter = (item) => `${item.value}%`;

const user = JSON.parse(localStorage.getItem("user"));

// @media (max-width: 800px) {
//   gap: 0.5rem; /* Adjust spacing */
// }

const Analytics = () => {
  const [create, setCreate] = useState(false);
  const poll = useSelector((state) => state.opinion.poll);
  const vote_list = useSelector((state) => state.opinion.vote_list);

  const isMobile = useMediaQuery("(max-width:800px)");

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
      {poll?.options?.length > 0 && vote_list && (
        <>
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
              {vote_list &&
                vote_list?.map((obj, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      border:
                        obj.user_id === user?._id
                          ? "1px solid green"
                          : "1px solid white",
                      padding: isMobile ? "0.5rem" : "1rem",
                      borderRadius: "6px",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "3rem",
                        width: "100%",
                      }}
                    >
                      <Typography
                        color="white"
                        sx={{
                          fontSize: isMobile ? "16px" : "20px",
                          fontWeight: "bold",
                          letterSpacing: "1px",
                        }}
                      >
                        {obj.name}
                      </Typography>
                      <Typography
                        color="white"
                        fontSize={isMobile && "12px"}
                        sx={{
                          wordWrap: "break-word", // Ensures long words wrap
                          overflowWrap: "break-word", // Alternative for better wrapping
                          whiteSpace: "normal", // Allows text to wrap
                          maxWidth: "50%", // Prevents text from overflowing its container
                        }}
                      >
                        {obj.vote}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: isMobile ? "10px" : "12px",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {moment(obj.updatedAt).format(
                          "dddd, MMMM Do YYYY, h:mm A"
                        )}
                      </Typography>
                    </div>
                  </Box>
                ))}
            </ListContainer>
          </VotersListContainer>
        </>
      )}
      {!poll && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Typography color="rgba(255,255,255,0.5)" variant="h5">
            Create new poll
          </Typography>
          <MuiButton
            onClick={() => setCreate(true)}
            sx={{
              background: "linear-gradient(135deg, #FF3D00, #D50000)", // Red gradient
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "6px", // Rectangular shape
              padding: "8px 16px",
              boxShadow: "0px 8px 0px #A30000", // Darker red 3D shadow
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(135deg, #D50000, #A30000)", // Darker red on hover
                boxShadow: "0px 0px 0px #A30000", // Removes shadow on hover
                transform: "translateY(4px)", // Slight push-down effect
              },
            }}
          >
            Create
          </MuiButton>
        </Box>
      )}

      <ModalComponent open={create} handleClose={() => setCreate(false)}>
        <Create setCreate={setCreate} />
      </ModalComponent>
    </Box>
  );
};

export default Analytics;
{
  /* <PieContainer>
<ChartWrapper>
  <PieChart
    series={[
      {
        data: pollOptions,
        highlightScope: { fade: "global", highlight: "item" },
        faded: {
          innerRadius: 30,
          additionalRadius: -30,
          color: "gray",
        },
        valueFormatter,
      },
    ]}
    colors={pieColors}
    height={250}
    width={400}
    slotProps={{
      legend: { hidden: true }, // Hides default legend
    }}
  />
</ChartWrapper>

{/* Separate Legend Below */
}
{
  /* <LegendContainer>
  {pollOptions?.map((option, index) => (
    <LegendItem key={index}>
      <LegendColor color={pieColors[index]} />
      <Typography
        sx={{
          fontSize: isMobile && "12px",
          wordWrap: "break-word", // Ensures long words wrap
          overflowWrap: "break-word", // Alternative for better wrapping
          whiteSpace: "normal", // Allows text to wrap
          maxWidth: "80%", // Prevents text from overflowing its container
        }}
      >
        {option.label}
      </Typography>
    </LegendItem>
  ))}
</LegendContainer> */
}
// </PieContainer>
// */}
