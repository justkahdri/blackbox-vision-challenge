import {Stack} from "@chakra-ui/react";
import React from "react";

import Host from "./Host";
import Join from "./Join";

const Lobby = () => {
  return (
    <Stack direction="row" spacing={{base: 5, "2xl": "100px"}} width={{md: "80%", lg: "60%"}}>
      <Join flex={{base: 1, lg: 1.2, xl: 2}} />
      <Host flex={1} />
    </Stack>
  );
};

export default Lobby;
