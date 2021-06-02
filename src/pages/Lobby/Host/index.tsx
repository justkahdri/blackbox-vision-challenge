import React, {MutableRefObject, useRef, useState, useContext, useEffect} from "react";
import slugify from "@sindresorhus/slugify";
import {
  Stack,
  Heading,
  Input,
  Text,
  Select,
  Button,
  StackProps,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {useHistory} from "react-router";

import {Category} from "../../../Types";
import AppContext from "../../../context";

const Host: React.FC<StackProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>();
  const {socket} = useContext(AppContext);
  const [src, setSrc] = useState("");
  const history = useHistory();

  const category = useRef() as MutableRefObject<HTMLSelectElement>;
  const name = useRef() as MutableRefObject<HTMLInputElement>;
  const password = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      let response = await fetch("https://opentdb.com/api_category.php");
      let parsedResponse = await response.json();

      isMounted && setCategories(parsedResponse["trivia_categories"]);
    };

    isMounted && fetchCategories();

    return () => {
      isMounted = false;
    };
  });

  const handleNewRoom = () => {
    if (category !== null && name !== null && password !== null && socket) {
      if (category.current.value && name.current.value) {
        const data = {
          category: category.current.value,
          name: name.current.value,
          password: password.current.value || "",
          id: nanoid(8),
        };

        socket.emit("new-room", data);
        history.push(`/online/${data.id}`);
      } else {
        return; // TODO Add validation
      }
    }
  };

  return (
    <Stack {...props}>
      <Heading>Host room</Heading>
      <Stack bgColor="white" color="blackAlpha.700" p={5} rounded="md" shadow="sm">
        <Stack alignItems="flex-end" direction="row">
          <Stack flex={1} id="nickname">
            <Text>Your nickname:</Text>
            <Input
              ref={name}
              name="nickname"
              placeholder="Meep42"
              onChange={() =>
                setTimeout(() => name.current.value !== src && setSrc(name.current.value), 1500)
              }
            />
          </Stack>
          <Image
            fallback={<Skeleton height="50px" rounded="lg" width="50px" />}
            height="50px"
            src={`https://avatars.dicebear.com/api/bottts/${slugify(src) || "hans"}.svg`}
            width="50px"
          />
        </Stack>
        <Text>Trivia Category:</Text>
        <Select ref={category} name="category">
          <option value="all">All</option>
          {categories &&
            categories.map(({id, name}) => (
              <option key={name} value={id}>
                {name}
              </option>
            ))}
        </Select>
        <Text>
          Room password{" "}
          <Text as="span" color="blackAlpha.600" fontSize="sm">
            (optional)
          </Text>
          :
        </Text>
        <Input ref={password} name="password" />
      </Stack>

      <Button colorScheme="blue" onClick={handleNewRoom}>
        Create Room
      </Button>
    </Stack>
  );
};

export default Host;
