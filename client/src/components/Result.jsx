import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { ProContext } from "../context/ProContext";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";
import { FaPercentage } from "react-icons/fa";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function Result() {
  const { result } = useContext(ProContext);
  const [correct, setCorrect] = useState();
  const [incorrect, setIncorrect] = useState();

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i]) {
        count++;
      }
    }
    setCorrect(count);
    setIncorrect(result.length - count);
  }, []);

  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Your Result
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Correct Answers"}
          stat={correct}
          icon={<BsCheckLg size={"3em"} />}
        />
        <StatsCard
          title={"Incorrect Answers"}
          stat={incorrect}
          icon={<ImCross size={"3em"} />}
        />
        <StatsCard
          title={"Total Score"}
          stat={`${correct}/${result.length}`}
          icon={<GrScorecard size={"3em"} />}
        />
        <StatsCard
          title={"Percentage"}
          stat={`${(correct / result.length) * 100} %`}
          icon={<FaPercentage size={"3em"} />}
        />
      </SimpleGrid>
    </Box>
  );
}
