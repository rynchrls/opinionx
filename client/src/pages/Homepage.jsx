import { Box } from "@mui/material";
import Header from "../components/Header";
import Poll from "../components/Poll";
import { useDispatch } from "../store/store";
import { useEffect, useState } from "react";
import { fetchInitial } from "../store/slices/opinion.slice";
import { useParams } from "react-router-dom";

function Homepage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("one");

  const { pId } = useParams();

  const initial = () => {
    setLoading(true);
    dispatch(fetchInitial(pId, dispatch));
    setLoading(false);
  };
  useEffect(() => {
    initial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pId]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#0D1B2A", // Dark Blue Background
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px", // Tile effect
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Header setValue={setValue} />
      <Poll loading={loading} value={value} setValue={setValue} />
    </Box>
  );
}

export default Homepage;
