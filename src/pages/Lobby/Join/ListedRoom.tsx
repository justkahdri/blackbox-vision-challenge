import React from "react";
import {Stack, Text, Button, Image, Spacer, Skeleton} from "@chakra-ui/react";
import {Room} from "Types";

const ListedRoom: React.FC<Room> = ({name, id}) => {
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
        src={`https://avatars.dicebear.com/api/bottts/${name}.svg`}
        width="50px"
      />
      <Stack lineHeight="100%">
        <Text>{`${name}'s Room`}</Text>
        <Text as="small" color="blackAlpha.600">
          #{id}
        </Text>
      </Stack>
      <Spacer />

      <Button variant="link">Join</Button>
    </Stack>
  );
};

export default ListedRoom;
