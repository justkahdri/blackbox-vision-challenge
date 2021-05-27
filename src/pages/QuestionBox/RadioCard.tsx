import React from "react";
import {Box, useRadio, UseRadioProps} from "@chakra-ui/react";

const RadioCard: React.FC<UseRadioProps> = (props) => {
  const {getInputProps, getCheckboxProps} = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        _checked={{
          bg: "primary.500",
          color: "white",
          fontWeight: 500,
          borderColor: "primary.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        borderRadius="md"
        borderWidth="1px"
        boxShadow="md"
        cursor="pointer"
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
