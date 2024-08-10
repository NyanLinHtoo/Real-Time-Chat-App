import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { Chip, Stack } from "@mui/material";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);

  return (
    <Stack direction="row" spacing={2} sx={{ paddingTop: "10px" }}>
      {potentialChats &&
        potentialChats.map((u, index) => {
          return (
            <div key={index} style={{ position: "relative" }}>
              <Chip
                label={u.name}
                color="primary"
                onClick={() => createChat(user._id, u._id)}
              />

              <span className="user-online"></span>
            </div>
          );
        })}
    </Stack>
  );
};

export default PotentialChats;
