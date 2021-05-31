import React, {BaseSyntheticEvent, useState, useContext, useEffect} from "react";
import {Stack, Heading, StackProps, SimpleGrid, useDisclosure} from "@chakra-ui/react";
import {Room} from "Types";

import AppContext from "../../../context";

import SearchRoom from "./SearchRoom";
import ListedRoom from "./ListedRoom";
import JoinModal from "./JoinModal";

const Join: React.FC<StackProps> = (props) => {
  const {socket} = useContext(AppContext);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [modalContent, setModalContent] = useState<Room>();
  const handleJoin = (room_info: Room) => {
    setModalContent(room_info);
    onOpen();
  };

  const [allRooms, setAllRooms] = useState<Room[]>([
    {name: "example", id: "123"},
    {name: "kuadro", id: "43", password: "1hola5"},
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
            <ListedRoom key={room.id} {...room} handleJoin={handleJoin} />
          ))}
      </SimpleGrid>

      {modalContent && <JoinModal isOpen={isOpen} room={modalContent} onClose={onClose} />}
    </Stack>
  );
};

export default Join;
