import React, { useContext, useState } from "react";
import { FormLabel } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { ProContext } from "../context/ProContext";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const toast = useToast();
  const { loading, setLoading, data, setData, index } = useContext(ProContext);
  const [formData, setFormData] = useState({
    difficulty: "easy",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.get(
        `https://quiz-app-done.herokuapp.com/problem?category=${
          formData.category
        }&difficulty=${formData.difficulty}&limit=${Number(formData.limit)}`
      );
      let data = res.data;
      setData(data);
      // localStorage.setItem("data", JSON.stringify(data));
      setLoading(false);
      navigate(`/quiz/${data[index]._id}`);
      toast({
        title: "Quiz Strated",
        status: "success",
        isClosable: true,
      });
    } catch (err) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <div className="form__">
        <form action="" onSubmit={handleSubmit}>
          <div>
            <Heading textAlign={"center"} margin="1rem" as="h3" size="lg">
              Set up Your Quiz
            </Heading>
          </div>
          <div>
            <FormLabel as="legend">Category</FormLabel>
            <Select
              required
              name="category"
              onChange={handleChange}
              placeholder="Select option"
            >
              <option value="General Knowledge">General Knowledge</option>
              <option value="Sports">Sports</option>
              <option value="Geography">Geography</option>
            </Select>
          </div>
          <div>
            <FormLabel as="legend">Difficulty level</FormLabel>
            <RadioGroup defaultValue="easy">
              <HStack spacing="24px">
                <Radio name="difficulty" onChange={handleChange} value="easy">
                  Easy
                </Radio>
                <Radio name="difficulty" onChange={handleChange} value="medium">
                  Medium
                </Radio>
                <Radio name="difficulty" onChange={handleChange} value="hard">
                  Hard
                </Radio>
              </HStack>
            </RadioGroup>
          </div>
          <div>
            <FormLabel as="legend">Number of questions</FormLabel>
            <Select
              required
              name="limit"
              onChange={handleChange}
              placeholder="Select option"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </Select>
          </div>
          <div>
            <Button
              style={{ marginTop: "2rem" }}
              type="submit"
              w={"100%"}
              colorScheme="teal"
              size="lg"
            >
              Button
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
