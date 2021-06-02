import {Stack} from "@chakra-ui/react";
import React from "react";

import Host from "./Host";
import Join from "./Join";

const Lobby = () => {
  return (
    <Stack
      direction={{base: "column-reverse", md: "row"}}
      spacing={{base: 10, md: 5, xl: "100px"}}
      width={{md: "80%", "2xl": "60%"}}
    >
      <Join flex={{base: 1, lg: 1.2, xl: 2}} />
      <Host flex={1} spacing={{base: 3, md: "3vh"}} />
    </Stack>
  );
};

export default Lobby;
