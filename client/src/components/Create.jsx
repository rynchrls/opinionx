import {
  Box,
  TextField,
  Button as GeneralButton,
  InputAdornment,
} from "@mui/material";
import propTypes from "prop-types";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { IoIosAdd } from "react-icons/io";
import SnackbarComponent from "./Snackbar";
import { MdCancel } from "react-icons/md";

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const Create = () => {
  const [newPoll, setNewPoll] = useState({
    title: "",
    options: [
      {
        title: "",
        votes: 0,
      },
    ],
    limit: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  let severity = "error";

  const generateOption = () => {
    if (newPoll.options.length > 5) {
      setError(true);
      return;
    }
    setNewPoll((prev) => {
      return {
        ...prev,
        options: [...prev.options, { title: "", votes: 0 }],
      };
    });
  };

  const submitPoll = async () => {
    console.log(newPoll);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "2rem",
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
                maxCharacters={45}
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
        Only 5 options are available.
      </SnackbarComponent>
    </Box>
  );
};

export default Create;

export const TextFieldComponent = ({
  name,
  setName,
  placeholder,
  isDisabled,
  maxCharacters,
}) => {
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
          padding: "12px",
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
                sx={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}
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
