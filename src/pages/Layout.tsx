import { Center } from '@chakra-ui/react'
import React from 'react'

const Layout: React.FC = ({children}) => (
  <Center as="main" minH="100vh" bgColor="#0093E9" bgGradient="linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)">
    {children}
  </Center>
);

export default Layout;
