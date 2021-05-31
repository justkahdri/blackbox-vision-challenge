import React, {BaseSyntheticEvent, useState, useContext, useEffect} from "react";
import {Stack, Heading, StackProps, SimpleGrid} from "@chakra-ui/react";
import {Room} from "Types";

import AppContext from "../../../context";

import SearchRoom from "./SearchRoom";
import ListedRoom from "./ListedRoom";

const Join: React.FC<StackProps> = (props) => {
  const {socket} = useContext(AppContext);

  const [allRooms, setAllRooms] = useState<Room[]>([
    {name: "example", id: "123"},
    {name: "not_ampi", id: "157"},
  ]);
  const [filter, setFilter] = useState("");
  const handleFilter = (event: BaseSyntheticEvent) => setFilter(event.target.value);

  useEffect(() => {
    if (socket) {
      socket.on("new-room", (new_room) => {
        setAllRooms((allRooms) => [...allRooms, new_room]);
      });
    }
  }, [socket]);

  return (
    <Stack {...props} spacing={4}>
      <Heading>Join room</Heading>
      <SearchRoom value={filter} onChange={handleFilter} />
      <SimpleGrid columns={{base: 1, "2xl": 2}} spacing={2}>
        {allRooms
          .filter((room) => room.id.includes(filter) || room.name.includes(filter))
          .map((room) => (
            <ListedRoom key={room.id} {...room} />
          ))}
      </SimpleGrid>
    </Stack>
  );
};

export default Join;
