import React from "react";
import {FormLabel, FormControl, Input, InputProps} from "@chakra-ui/react";

const SearchRoom: React.FC<InputProps> = (props) => {
  return (
    <FormControl id="search-room">
      <FormLabel>Search a room: </FormLabel>
      <Input
        name="search-room"
        placeholder="Type an user or a room id"
        type="text"
        {...props}
        _focus={{borderColor: "white"}}
        _placeholder={{color: "whiteAlpha.700"}}
        borderColor="whiteAlpha.700"
      />
    </FormControl>
  );
};

export default SearchRoom;
