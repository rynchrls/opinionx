import { Box, Typography, Button as AccompanyButton } from "@mui/material";
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

function Header() {
  const [create, setCreate] = useState(false);
  const [openList, setOpenList] = useState(false);

  const navigate = useNavigate();
  const list = [
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
    // {
    //   title: "Poll",
    //   date: new Date(),
    // },
  ];

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
      <Button color={"orange"} onClick={() => setCreate(true)}>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <LuGitPullRequestCreateArrow size={"20px"} />
          <Typography fontWeight={"bold"} letterSpacing={"0.5px"}>
            Create Poll
          </Typography>
        </Box>
      </Button>
      <Typography
        variant="h4"
        color="white"
        onClick={() => {
          navigate(`/`, { replace: true });
        }}
        sx={{ cursor: "pointer" }}
      >
        OpinionX
      </Typography>
      <Button color={"purple"} onClick={() => setOpenList(true)}>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <FaListUl size={"20px"} />
          <Typography fontWeight={"bold"} letterSpacing={"0.5px"}>
            Poll List
          </Typography>
        </Box>
      </Button>
      <ModalComponent open={create} handleClose={() => setCreate(false)}>
        <Create />
      </ModalComponent>
      <ModalComponent open={openList} handleClose={() => setOpenList(false)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            height: "100%",
          }}
        >
          <CopyButton text={`${window.location.href}`} />
          <Typography
            fontWeight={"bold"}
            letterSpacing={"0.5px"}
            color="white"
            variant="h6"
          >
            List
          </Typography>
          {list?.length === 0 && (
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
                gap: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {list &&
                list.map((obj, idx) => (
                  <AccompanyButton
                    key={idx}
                    onClick={() => {
                      navigate(`/${idx}`, { replace: true });
                      setOpenList(false);
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
                        {obj.title} {idx}
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
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {moment(obj.date).format("dddd, MMMM Do YYYY, h:mm A")}
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
