import { Button, Center, Image, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import {Link} from 'react-router-dom';

import logo from "../../assets/logo.png";

const Home: React.FC = () => {
  return (
    <Center as="main" minH="100vh" bgColor="#0093E9" bgGradient="linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)">
      <Stack as="header" alignItems="center">
        <h1>
          <Image alt="BlackBox Vision" src={logo} width={{base: '80vw', lg: "40vw"}} />
        </h1>
        <Text as="h3" color="blackAlpha.700" fontSize={{base: 'lg', xl: "3xl"}} pb={10}>Let's get this party started</Text>
        <Button as={Link} to="/quiz" size="lg" variant="ghost">START</Button>
      </Stack>
    </Center>
  );
};

export default Home;
