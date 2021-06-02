import React, {useContext, useRef, MutableRefObject, useState} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  UseModalProps,
  Input,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import {Room} from "Types";
import {useHistory} from "react-router";

import AppContext from "../../../context";

const JoinModal: React.FC<UseModalProps & {room: Room}> = ({room, ...rest}) => {
  const {socket} = useContext(AppContext);
  const [errors, setErrors] = useState({name: "", password: ""});
  const history = useHistory();

  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;

  const handleJoin = () => {
    if (!name.current.value) {
      setErrors((errors) => ({...errors, name: "A nickname is required"}));

      return;
    } else {
      setErrors((errors) => ({...errors, name: ""}));
    }
    if (room.password && password.current.value !== room.password) {
      setErrors((errors) => ({...errors, password: "Password does not match"}));

      return;
    } else {
      setErrors((errors) => ({...errors, password: ""}));
    } // TODO Refactor

    socket && socket.emit("join-room", room.id);
    history.push(`/online/${room.id}`);
  };

  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent color="blackAlpha.800">
        <ModalHeader>{`Join ${room.name}'s Room`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={!!errors.name}>
            <Text>Your nickname:</Text>
            <Input ref={name} name="nickname" placeholder="Meep42" />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          {room.password && (
            <FormControl isInvalid={!!errors.password} mt={4}>
              <Text>Room password:</Text>
              <Input ref={password} isRequired isInvalid={!!errors.password} name="password" />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={6} variant="link" onClick={rest.onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleJoin}>
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinModal;
