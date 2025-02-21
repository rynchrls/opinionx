import {
  Box,
  TextField,
  Button as GeneralButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import propTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { IoIosAdd } from "react-icons/io";
import SnackbarComponent from "./Snackbar";
import { MdCancel } from "react-icons/md";
import PollService from "../api/service/poll.service";
import { useDispatch } from "react-redux";
import { setPoll } from "../store/slices/opinion.slice";
import { useNavigate } from "react-router-dom";

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    gap: 0.5rem; /* Adjust spacing */
  }
  @media (max-width: 500px) {
    gap: 1px; /* Adjust spacing */
  }
`;

const user = JSON.parse(localStorage.getItem("user"));

const Create = ({ setCreate, setValue }) => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const [newPoll, setNewPoll] = useState({
    title: "",
    options: [
      {
        title: "",
        votes: 0,
      },
    ],
    total_votes: 0,
    user_id: user?._id,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let severity = "error";

  const generateOption = () => {
    if (newPoll.options.length > 5) {
      return;
    }
    setNewPoll((prev) => {
      return {
        ...prev,
        options: [...prev.options, { title: "", votes: 0 }],
      };
    });
  };

  const submitPoll = () => {
    if (
      newPoll.options.length < 2 ||
      newPoll.title === "" ||
      newPoll.options[0].title === "" ||
      newPoll.options[1].title === ""
    ) {
      setError(true);
      return;
    }
    setLoading(true);
    PollService.create(newPoll)
      .then((data) => {
        dispatch(setPoll(data.data));
        navigate(`/${data?.data?._id}`, { replace: true });
      })
      .catch((error) => {
        console.error(error.message);
      });
    setLoading(false);
    setCreate(false);
    setValue("one");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: isMobile ? "1rem" : "2rem",
      }}
    >
      <TextFieldComponent
        name={newPoll.title}
        setName={(value) =>
          setNewPoll((prev) => {
            return { ...prev, title: value };
          })
        }
        placeholder={"Title of your Poll"}
        maxCharacters={140}
      />
      <Options>
        {newPoll &&
          newPoll.options.map((obj, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: "2rem",
              }}
            >
              <TextFieldComponent
                name={obj?.title}
                setName={(value) =>
                  setNewPoll((prev) => {
                    const allOptions = newPoll.options;
                    const updated = allOptions.map((obj, index) => {
                      if (idx === index) {
                        return {
                          title: value,
                          votes: 0,
                        };
                      } else {
                        return obj;
                      }
                    });
                    return { ...prev, options: [...updated] };
                  })
                }
                maxCharacters={30}
                placeholder={`Option ${idx + 1}`}
              />
              <MdCancel
                color="white"
                size={40}
                cursor={"pointer"}
                onClick={() => {
                  setNewPoll((prev) => {
                    const filtered = prev.options.filter(
                      (_, index) => index !== idx
                    );
                    return {
                      ...prev,
                      options: [...filtered],
                    };
                  });
                }}
              />
            </div>
          ))}
        {newPoll.options.length < 5 && (
          <GeneralButton
            onClick={generateOption}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              padding: ".5rem",
              border: "1px solid #9C27B0", // Transparent border to enable gradient
              borderRadius: "4px", // Ensure circular shape
            }}
          >
            <IoIosAdd color="white" size={24} />
          </GeneralButton>
        )}
      </Options>
      <Button color={"green"} onClick={submitPoll} loading={loading}>
        Submit
      </Button>
      <SnackbarComponent
        openSnackBar={error}
        setOpenSnackBar={setError}
        severity={severity}
      >
        Please add atleast 2 options and a title.
      </SnackbarComponent>
    </Box>
  );
};

export default Create;

Create.propTypes = {
  setCreate: propTypes.func,
  setValue: propTypes.func,
};

export const TextFieldComponent = ({
  name,
  setName,
  placeholder,
  isDisabled,
  maxCharacters,
}) => {
  const isMobile = useMediaQuery("(max-width:800px)");
  const mb = useMediaQuery("(max-width:500px)");
  const handleChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setName(e.target.value);
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder={placeholder}
      fullWidth
      disabled={isDisabled}
      value={name}
      onChange={handleChange}
      inputProps={{
        maxLength: maxCharacters && maxCharacters, // Set max characters
      }}
      sx={{
        width: "100%",
        backgroundColor: "#121212", // Darker background
        borderRadius: "8px",
        input: {
          color: "white", // White text
          padding: !isMobile ? "12px" : mb ? "8px" : "10px",
          fontSize: isMobile && "12px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // White border (default)
          },
          "&:hover fieldset": {
            borderColor: "#f0f0f0", // Lighter white on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // Solid white on focus
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)", // White glow effect
          },
          "&.Mui-disabled": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)", // Lighter white border when disabled
            },
            "& input": {
              color: "white !important", // White text even when disabled
              WebkitTextFillColor: "white !important", // Ensures white color in WebKit browsers
            },
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <>
            {maxCharacters && (
              <InputAdornment
                position="end"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: isMobile ? "12px" : "14px",
                }}
              >
                {name.length}/{maxCharacters}
              </InputAdornment>
            )}
          </>
        ),
      }}
    />
  );
};

TextFieldComponent.propTypes = {
  name: propTypes.string,
  setName: propTypes.func,
  placeholder: propTypes.string,
  isDisabled: propTypes.bool,
  maxCharacters: propTypes.number,
};
