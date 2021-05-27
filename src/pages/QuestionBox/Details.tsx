import React, {useState, useEffect} from "react";
import {Icon, Stack, Text} from "@chakra-ui/react";
import {MdLabel} from "react-icons/md";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";

type DetailsProps = {category: string; difficulty: "medium" | "easy" | "hard"};

const Details: React.FC<DetailsProps> = ({category, difficulty}) => {
  const [stars, setStars] = useState({color: "yellow.400", number: 2}); // DefaultState === 'medium'

  useEffect(() => {
    if (difficulty === "easy") {
      setStars({color: "green.400", number: 1});
    } else if (difficulty === "hard") {
      setStars({color: "red.500", number: 3});
    }

    return () => {
      setStars({color: "yellow.400", number: 2}); // Returns stars to default state
    };
  }, [difficulty]);

  return (
    <Stack alignItems="center" direction="row" spacing={3} width={{lg: "75%", xl: "40%"}}>
      <Icon as={MdLabel} color="primary.500" />
      <Text color="blackAlpha.800">{category}</Text>
      <Stack direction="row" flex={1} justifyContent="flex-end">
        {Array(3)
          .fill("")
          .map((_, i) => (
            <Icon
              key={i}
              as={i < stars.number ? AiFillStar : AiOutlineStar}
              color={stars.color}
              height={6}
              width={6}
            />
          ))}
      </Stack>
    </Stack>
  );
};

export default Details;
