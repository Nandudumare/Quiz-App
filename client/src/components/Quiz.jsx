import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProContext } from "../context/ProContext";

import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const Quiz = () => {
  const { id } = useParams();
  const {
    loading,
    setLoading,
    data,
    setData,
    index,
    setIndex,
    result,
    setResult,
  } = useContext(ProContext);
  const [single, setSingle] = useState({});
  const [option, setOption] = useState([]);
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const [sel, setSel] = useState({ 0: false, 1: false, 3: false, 4: false });

  const getSingle = (id) => {
    setSingle(data[index]);
    setOption(
      [data[index].correct_answer, ...data[index].incorrect_answers].sort()
    );
  };
  useEffect(() => {
    getSingle(id);
  }, [id]);

  return (
    <div>
      <Center py={6}>
        <Box
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Stack
            textAlign={"center"}
            p={6}
            color={useColorModeValue("gray.800", "white")}
            align={"center"}
          >
            <Text
              fontSize={"sm"}
              fontWeight={500}
              bg={useColorModeValue("green.50", "green.900")}
              p={2}
              px={3}
              color={"green.500"}
              rounded={"full"}
            >
              {index + 1}/{data.length}
            </Text>
            <Stack direction={"row"} align={"center"} justify={"center"}>
              <Text fontSize={"sm"} fontWeight={500}>
                {single.question}
              </Text>
            </Stack>
          </Stack>

          <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
            <List spacing={3}>
              {option &&
                option.map((el, i) => {
                  return (
                    <Button
                      w={"100%"}
                      key={i}
                      cursor="pointer"
                      onClick={() => {
                        setState(true);
                        setResult([...result, el === single.correct_answer]);
                        // localStorage.setItem("result", JSON.stringify(result));
                        setSel({ ...sel, [i]: true });
                      }}
                      disabled={state}
                      colorScheme={
                        state && sel[i]
                          ? "teal"
                          : state && !(el === single.correct_answer)
                          ? "red"
                          : "green"
                      }
                    >
                      {state ? (
                        <ListIcon
                          as={
                            el === single.correct_answer ? CheckIcon : CloseIcon
                          }
                          color={"white"}
                        />
                      ) : (
                        ""
                      )}
                      {el}
                    </Button>
                  );
                })}
            </List>

            <Button
              mt={10}
              w={"full"}
              bg={"green.400"}
              color={"white"}
              rounded={"xl"}
              boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
              _hover={{
                bg: "green.500",
              }}
              _focus={{
                bg: "green.500",
              }}
              onClick={() => {
                if (index < data.length - 1) {
                  setIndex((prev) => prev + 1);
                  navigate(`/quiz/${data[index + 1]._id}`);
                  setState(false);
                  setSel({ 0: false, 1: false, 2: false, 3: false });
                } else if (index === data.length - 1) {
                  navigate("/results");
                }
              }}
              disabled={!state}
            >
              {index === data.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Box>
      </Center>
    </div>
  );
};

export default Quiz;
