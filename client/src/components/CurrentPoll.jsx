import { Box, Checkbox, CircularProgress, Typography } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { useState } from "react";
import ModalComponent from "./ModalComponent";
import Create, { Options, TextFieldComponent } from "./Create";
import propTypes from "prop-types";

const CurrentPoll = ({ loading }) => {
  const [vote, setVote] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected checkbox
  const [create, setCreate] = useState(false);
  const [submit, setSubmit] = useState(false);

  const submitVote = async () => {
    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
    }, 2000);
  };

  const handleCheckboxChange = (index) => {
    setSelectedIndex(index); // Update selected checkbox index
  };

  const sampleData = [
    {
      vote: "Lorem ipsum Bla Bla Bla Bla dsadsa dsad sad",
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
      {sampleData?.length > 0 && !loading && (
        <Box
          sx={{
            width: "550px",
            height: "530px",
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
            what anime should. Everythings fine thos dsadsa dsad asdssadsadas
            dsa
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {sampleData &&
              sampleData.map((obj, idx) => (
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
            onClick={() => setVote(true)}
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
          <ModalComponent open={vote} handleClose={() => setVote(false)}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                color="white"
                fontSize={"16px"}
                fontWeight={600}
                letterSpacing={"1px"}
              >
                What is your favourite anime and why? do you have any
                preferrence on what anime should. Everythings fine thos dsadsa
                dsad asdssadsadas dsa
              </Typography>
              <Options>
                {sampleData &&
                  sampleData.map((obj, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "1rem",
                      }}
                    >
                      <TextFieldComponent name={obj?.vote} isDisabled={true} />
                      <Checkbox
                        checked={selectedIndex === idx} // Only one checkbox can be checked
                        onChange={() => handleCheckboxChange(idx, obj)}
                        sx={{
                          color: "white", // Default color
                          "&.Mui-checked": {
                            color: "#4CAF50", // Green when checked
                          },
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle white hover effect
                            borderRadius: "50%", // Ensures hover effect is rounded
                          },
                          "&.Mui-focusVisible": {
                            boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)", // Glow effect when focused
                          },
                        }}
                      />
                    </div>
                  ))}
              </Options>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <MuiButton
                  onClick={() => setVote(false)}
                  sx={{
                    width: "50%",
                    background: "linear-gradient(135deg, #FFFFFF, #E0E0E0)", // White gradient
                    color: "#333", // Dark text for contrast
                    fontSize: "18px",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "8px", // Rectangular shape
                    padding: "14px 28px",
                    boxShadow: "0px 8px 0px #B0B0B0", // Light gray 3D shadow
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      background: "linear-gradient(135deg, #E0E0E0, #CCCCCC)", // Slightly darker on hover
                      boxShadow: "0px 0px 0px #B0B0B0", // Removes shadow on hover
                      transform: "translateY(4px)", // Slight push-down effect
                    },
                  }}
                >
                  Cancel
                </MuiButton>
                <MuiButton
                  onClick={submitVote}
                  loadingIndicator="Submitting...."
                  loading={submit && submit}
                  disabled={submit && submit}
                  sx={{
                    width: "50%",
                    background: "linear-gradient(135deg, #00C853, #00E676)", // Green gradient
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "8px", // Rectangular shape
                    padding: "14px 28px",
                    boxShadow: "0px 8px 0px #00A152", // Darker green 3D shadow
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      background: "linear-gradient(135deg, #00E676, #00C853)", // Darker green on hover
                      boxShadow: "0px 0px 0px #00A152", // Removes shadow on hover
                      transform: "translateY(4px)", // Slight push-down effect
                    },
                  }}
                >
                  Submit
                </MuiButton>
              </Box>
            </Box>
          </ModalComponent>
        </Box>
      )}
      {sampleData?.length === 0 && !loading && (
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
      {loading && <CircularProgress size={56} sx={{ color: "white" }} />}
      <ModalComponent open={create} handleClose={() => setCreate(false)}>
        <Create />
      </ModalComponent>
    </Box>
  );
};

export default CurrentPoll;

CurrentPoll.propTypes = {
  loading: propTypes.bool,
  setLoading: propTypes.func,
};
