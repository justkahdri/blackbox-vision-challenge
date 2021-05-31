import * as React from "react";
import {Button, Image, Skeleton, Stack, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import logo from "../../assets/logo.png";

const Home: React.FC = () => {
  return (
    <Stack alignItems="center" as="header">
      <h1>
        <Image
          alt="BlackBox Vision"
          fallback={<Skeleton height={"10vh"} width={{base: "80vw", lg: "40vw"}} />}
          src={logo}
          width={{base: "80vw", lg: "40vw"}}
        />
      </h1>
      <Text as="h3" color="blackAlpha.700" fontSize={{base: "lg", xl: "3xl"}} pb={10}>
        Let&apos;s get this party started
      </Text>
      <Stack direction="row">
        <Button as={Link} colorScheme="blue" size="lg" to="/quiz" variant="ghost">
          Quick Play
        </Button>
        <Button as={Link} colorScheme="blue" size="lg" to="/online" variant="ghost">
          Play Online
        </Button>
      </Stack>
    </Stack>
  );
};

export default Home;
