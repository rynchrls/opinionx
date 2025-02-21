import {
  Box,
  Typography,
  Button as AccompanyButton,
  useMediaQuery,
} from "@mui/material";
import { LuGitPullRequestCreateArrow } from "react-icons/lu";
import { FaListUl } from "react-icons/fa";
import Button from "./Button";
import { useState } from "react";
import ModalComponent from "./ModalComponent";
import Create from "./Create";
import CopyButton from "./CopyButton";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";
import { useSelector } from "react-redux";
import propTypes from "prop-types";

function Header({ setValue }) {
  const [create, setCreate] = useState(false);
  const [openList, setOpenList] = useState(false);
  const list = useSelector((state) => state.opinion.my_poll);

  const isMobile = useMediaQuery("(max-width:800px)");

  const mb = useMediaQuery("(max-width:500px)");

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        heigth: "auto",
        padding: mb ? "0.5rem" : "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        color={"orange"}
        onClick={() => {
          setCreate(true);
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <LuGitPullRequestCreateArrow
            size={!isMobile ? "20px" : mb ? "13px" : "16px"}
          />
          <Typography
            fontWeight={"bold"}
            letterSpacing={"0.5px"}
            fontSize={!isMobile ? "16px" : mb ? "10px" : "12px"}
          >
            Create Poll
          </Typography>
        </Box>
      </Button>
      <Typography
        variant="h4"
        color="white"
        onClick={() => {
          navigate(`/`, { replace: true });
          setValue("one");
        }}
        sx={{ cursor: "pointer", fontSize: isMobile && "20px" }}
      >
        OpinionX
      </Typography>
      <Button color={"purple"} onClick={() => setOpenList(true)}>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <FaListUl size={!isMobile ? "20px" : mb ? "13px" : "16px"} />
          <Typography
            fontWeight={"bold"}
            letterSpacing={"0.5px"}
            fontSize={!isMobile ? "16px" : mb ? "10px" : "12px"}
          >
            Poll List
          </Typography>
        </Box>
      </Button>
      <ModalComponent open={create} handleClose={() => setCreate(false)}>
        <Create setCreate={setCreate} setValue={setValue} />
      </ModalComponent>
      <ModalComponent open={openList} handleClose={() => setOpenList(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "1rem" : "2rem",
            height: "100%",
          }}
        >
          <CopyButton text={`${window.location.href}`} />
          <Typography
            fontWeight={"bold"}
            letterSpacing={"0.5px"}
            color="white"
            variant="h6"
            fontSize={isMobile && "14px"}
          >
            List
          </Typography>
          {list && list?.length === 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: isMobile ? "0.5rem" : "1rem",
              }}
            >
              <Typography
                color="rgba(255,255,255,0.5)"
                variant={isMobile ? "h6" : "h5"}
              >
                Create new poll
              </Typography>
              <MuiButton
                onClick={() => setCreate(true)}
                sx={{
                  background: "linear-gradient(135deg, #FF3D00, #D50000)", // Red gradient
                  color: "white",
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "6px", // Rectangular shape
                  padding: isMobile ? "6px 12px" : "8px 16px",
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
          {list?.length > 0 && (
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  display: "none", // Chrome, Safari
                },
                gap: isMobile ? "0.5rem" : "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {list &&
                list.map((obj, idx) => (
                  <AccompanyButton
                    key={idx}
                    onClick={() => {
                      navigate(`/${obj._id}`, { replace: true });
                      setOpenList(false);
                      setValue("one");
                    }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      border: "1px solid green",
                      padding: "1rem",
                      borderRadius: "6px",
                      textAlign: "left",
                      justifyContent: "flex-start", // Align content to the left
                      alignItems: "flex-start", // Align text to the left
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography
                        color="white"
                        sx={{
                          fontSize: isMobile ? "16px" : "20px",
                          fontWeight: "bold",
                          letterSpacing: "1px",
                          wordWrap: "break-word", // Ensures long words wrap
                          overflowWrap: "break-word", // Alternative for better wrapping
                          whiteSpace: "normal", // Allows text to wrap
                          maxWidth: "100%", // Prevents text from overflowing its container
                        }}
                      >
                        {obj.title}
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
                        {moment(obj.createdAt || new Date()).format(
                          "dddd, MMMM Do YYYY, h:mm A"
                        )}
                      </Typography>
                    </div>
                  </AccompanyButton>
                ))}
            </Box>
          )}
        </Box>
      </ModalComponent>
    </Box>
  );
}

export default Header;

Header.propTypes = {
  value: propTypes.string,
  setValue: propTypes.func,
};
