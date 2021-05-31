import React, {MutableRefObject, useRef, useContext} from "react";
import {Stack, Heading, Input, Text, Select, Button, StackProps} from "@chakra-ui/react";

import AppContext from "../../../context";

const Host: React.FC<StackProps> = (props) => {
  const {socket} = useContext(AppContext);

  const category = useRef() as MutableRefObject<HTMLSelectElement>;
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;

  const handleNewRoom = () => {
    if (category !== null && name !== null && password !== null && socket) {
      if (category.current.value && name.current.value) {
        const data = {
          category: category.current.value,
          name: name.current.value,
          password: password.current.value || "",
        };

        socket.emit("new-room", data);
      } else {
        return; // TODO Add validation
      }
    }
  };

  return (
    <Stack {...props}>
      <Heading>Host room</Heading>
      <Stack bgColor="white" color="blackAlpha.700" p={5} rounded="md" shadow="sm">
        <Text>Your nickname:</Text>
        <Input ref={name} name="nickname" placeholder="Meep42" />
        <Text>Trivia Category:</Text>
        <Select ref={category} name="category">
          <option value="all">All</option>
          <option value="anime">Anime</option>
          <option value="history">History</option>
        </Select>
        <Text>
          Room password{" "}
          <Text as="span" color="blackAlpha.600" fontSize="sm">
            (optional)
          </Text>
          :
        </Text>
        <Input ref={password} name="password" />
      </Stack>

      <Button colorScheme="blue" onClick={handleNewRoom}>
        Create Room
      </Button>
    </Stack>
  );
};

export default Host;
