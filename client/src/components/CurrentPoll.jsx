import { Box, Checkbox, CircularProgress, Typography } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { useEffect, useState } from "react";
import ModalComponent from "./ModalComponent";
import Create, { Options, TextFieldComponent } from "./Create";
import propTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setVote as SetNewVote } from "../store/slices/opinion.slice";
import VoteService from "../api/service/vote.service";

const user = JSON.parse(localStorage.getItem("user"));

const CurrentPoll = ({ loading }) => {
  const poll = useSelector((state) => state.opinion.poll);
  const myVote = useSelector((state) => state.opinion.vote);
  const [vote, setVote] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    () => myVote?.index || null
  );
  const [create, setCreate] = useState(false);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const { pId } = useParams();

  useEffect(() => {
    setSelectedIndex(myVote?.index);
  }, [myVote]); // Runs whenever myVote changes

  const submitVote = () => {
    if (selectedIndex === myVote?.index) {
      setVote(false);
      return;
    }
    setSubmit(true);
    const initialVote = {
      vote: poll?.options[selectedIndex]?.title,
      name: user?.name,
      user_id: user?._id,
      poll_id: pId,
      index: selectedIndex,
    };
    if (!myVote) {
      const updatedOptions = poll?.options?.map((obj, idx) => {
        if (obj.title === initialVote.vote && idx === initialVote.index) {
          return {
            ...obj,
            votes: obj?.votes + 1,
          };
        } else {
          return obj;
        }
      });
      const updatedPoll = {
        ...poll,
        options: [...updatedOptions],
        total_votes: poll?.total_votes + 1,
      };
      dispatch(SetNewVote({ updatedPoll, initialVote, add: true }));
      VoteService.create({
        vote: initialVote?.vote,
        name: user?.name,
        user_id: user?._id,
        poll_id: pId,
        index: selectedIndex,
        options: updatedPoll?.options || [],
        total_votes: updatedPoll?.total_votes,
      });
    } else {
      const updatedOptions = poll?.options?.map((obj, idx) => {
        if (obj.title === myVote?.vote && idx === myVote?.index) {
          return {
            ...obj,
            votes: obj?.votes - 1,
          };
        }
        if (obj.title === initialVote.vote && idx === initialVote.index) {
          return {
            ...obj,
            votes: obj?.votes + 1,
          };
        }

        return obj;
      });
      const updatedPoll = {
        ...poll,
        options: [...updatedOptions],
      };
      dispatch(SetNewVote({ updatedPoll, initialVote }));
      VoteService.create({
        vote: initialVote?.vote,
        name: user?.name,
        user_id: user?._id,
        poll_id: pId,
        index: selectedIndex,
        options: updatedPoll?.options || [],
      });
    }
    setSubmit(false);
    setVote(false);
  };

  const handleCheckboxChange = (index) => {
    setSelectedIndex(index); // Update selected checkbox index
  };

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
      {poll?.options?.length > 0 && !loading && (
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
            fontSize={"18px"}
            fontWeight={600}
            letterSpacing={"1px"}
            sx={{
              wordWrap: "break-word", // Ensures long words wrap
              overflowWrap: "break-word", // Alternative for better wrapping
              whiteSpace: "normal", // Allows text to wrap
              maxWidth: "100%", // Prevents text from overflowing its container
            }}
          >
            {poll?.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {poll &&
              poll?.options?.map((obj, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: "100%",
                    height: "45px", // Adjust height as needed
                    backgroundColor: "rgba(82, 82, 82, 0.3)",
                    borderRadius: "6px",
                    position: "relative",
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "26%",
                      left: "3%",
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    {obj.title}
                  </Typography>
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "26%",
                      right: "3%",
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    {obj.votes}
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
                fontSize={"18px"}
                fontWeight={600}
                letterSpacing={"1px"}
                sx={{
                  wordWrap: "break-word", // Ensures long words wrap
                  overflowWrap: "break-word", // Alternative for better wrapping
                  whiteSpace: "normal", // Allows text to wrap
                  maxWidth: "100%", // Prevents text from overflowing its container
                }}
              >
                {poll?.title}
              </Typography>
              <Options>
                {poll &&
                  poll?.options?.map((obj, idx) => (
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
                      <TextFieldComponent name={obj?.title} isDisabled={true} />
                      <Checkbox
                        checked={selectedIndex === idx} // Only one checkbox can be checked
                        onChange={() => handleCheckboxChange(idx)}
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
      {!poll && !loading && (
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
        <Create setCreate={setCreate} />
      </ModalComponent>
    </Box>
  );
};

export default CurrentPoll;

CurrentPoll.propTypes = {
  loading: propTypes.bool,
  setLoading: propTypes.func,
};
