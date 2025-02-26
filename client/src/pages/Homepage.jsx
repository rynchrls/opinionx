import { Box } from "@mui/material";
import Header from "../components/Header";
import Poll from "../components/Poll";
import { useDispatch } from "../store/store";
import { useEffect, useState } from "react";
import { setInitial } from "../store/slices/opinion.slice";
import { useParams } from "react-router-dom";
import PollService from "../api/service/poll.service";
import VoteService from "../api/service/vote.service";

function Homepage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("one");

  const { pId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const initial = async () => {
    setLoading(true);
    let initialData = {};

    try {
      if (pId) {
        const pollRes = await PollService.get(pId);
        initialData["poll"] = pollRes.data;

        const voteRes = await VoteService.get(pId);
        initialData["vote"] = voteRes.data;
      }

      if (pId && user?._id) {
        const myVoteRes = await VoteService.get_mine(user._id, pId);
        initialData["my_vote"] = myVoteRes.data;
      }
      const myPollRess = await PollService.getMine(user?._id);
      initialData["my_poll"] = myPollRess.data || [];

      dispatch(setInitial(initialData));
    } catch (error) {
      initialData["poll"] = null;
      initialData["vote"] = [];
      initialData["my_vote"] = null;
      dispatch(setInitial(initialData));
      console.error(error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
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
