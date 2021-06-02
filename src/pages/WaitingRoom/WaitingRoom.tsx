import React, {useEffect, useContext} from "react";

import AppContext from "../../context";

const WaitingRoom = () => {
  const {socket} = useContext(AppContext);

  useEffect(() => {
    if (socket) {
      socket.on("test", () => console.log("test"));
    }
  }, [socket]);

  return <div>Waiting Room</div>;
};

export default WaitingRoom;
