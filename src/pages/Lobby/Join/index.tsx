import React, {BaseSyntheticEvent, useState, useContext, useEffect, useMemo} from "react";
import {Stack, Heading, StackProps, SimpleGrid, useDisclosure, Skeleton} from "@chakra-ui/react";
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

  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [filter, setFilter] = useState("");
  const handleFilter = (event: BaseSyntheticEvent) => setFilter(event.target.value);
  const filteredRooms = useMemo(
    () =>
      allRooms.filter((room) => {
        let filtlow = filter.toLowerCase();

        return room.id.toLowerCase().includes(filtlow) || room.name.toLowerCase().includes(filtlow);
      }),
    [allRooms, filter],
  );

  useEffect(() => {
    let isMounted = true;

    if (socket && isMounted) {
      socket.emit("request-rooms");
      socket.on("listed_rooms", (current_rooms: Room[]) => {
        if (isMounted && allRooms !== current_rooms) {
          setAllRooms(current_rooms);
        }
      });

      socket.on("room-created", (new_room: Room) => {
        isMounted && setAllRooms((allRooms) => [...allRooms, new_room]);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [socket]);

  return (
    <Stack {...props} spacing={4}>
      <Heading>Join room</Heading>
      <SearchRoom value={filter} onChange={handleFilter} />
      <SimpleGrid
        columns={{base: 1, "2xl": 2}}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "var(--chakra-colors-gray-300)",
            borderRadius: 2,
          },
        }}
        maxH={["auto", "50vh"]}
        overflowY="auto"
        spacing={2}
      >
        {allRooms.length
          ? filteredRooms.map((room) => (
              <ListedRoom key={room.id} {...room} handleJoin={handleJoin} />
            ))
          : Array(5)
              .fill("")
              .map((_, i) => <Skeleton key={i} height="66px" rounded="md" width="100%" />)}
      </SimpleGrid>

      {modalContent && <JoinModal isOpen={isOpen} room={modalContent} onClose={onClose} />}
    </Stack>
  );
};

export default Join;
