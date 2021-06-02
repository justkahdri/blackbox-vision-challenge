import React from "react";
import {Stack, Text, Button, Image, Spacer, Skeleton, Icon} from "@chakra-ui/react";
import {Room} from "Types";
import {HiLockClosed} from "react-icons/hi";
import slugify from "@sindresorhus/slugify";

type Props = {
  handleJoin: (room: Room) => void;
} & Room;

const ListedRoom: React.FC<Props> = ({handleJoin, ...rest}) => {
  const {name, id, password} = rest;

  return (
    <Stack
      alignItems="center"
      bgColor="white"
      color="blackAlpha.700"
      direction="row"
      px={4}
      py={2}
      rounded="md"
      shadow="sm"
      width="100%"
    >
      <Image
        fallback={<Skeleton height="50px" width="50px" />}
        height="50px"
        objectFit="contain"
        src={`https://avatars.dicebear.com/api/bottts/${slugify(name)}.svg`}
        width="50px"
      />
      <Stack lineHeight="100%">
        <Text>
          {`${name}'s Room`} {password && <Icon as={HiLockClosed} />}
        </Text>
        <Text as="small" color="blackAlpha.600">
          #{id}
        </Text>
      </Stack>
      <Spacer />

      <Button variant="link" onClick={() => handleJoin(rest)}>
        Join
      </Button>
    </Stack>
  );
};

export default ListedRoom;
