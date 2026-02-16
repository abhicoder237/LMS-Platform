import {
  Box,
  Flex,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Select,
  VStack,
  HStack,
  Image,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@chakra-ui/react";
import ClipLoader from "react-spinners/ClipLoader";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCreatorCourse from "../../customHooks/getCreatorCourse";
import { serverUrl } from "../../App";

const CreatorCourse = () => {
    useCreatorCourse();
  const [title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // handle course create
  const handleCourseCreate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/course/create`,
        { title, description, price, category, SubTitle },
        { withCredentials: true }
      );
      console.log(response.data);
      setLoading(false);
      navigate("/createcourse");
      toast.success("Course Created");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Flex bg="gray.50" minH="100vh" p={8} justify="center">
      <Box
        w={{ base: "100%", md: "80%", lg: "60%" }}
        bg="white"
        p={8}
        rounded="2xl"
        shadow="xl"
      >
        <Heading size="xl" mb={6} textAlign="center" color="purple.600">
          Create a New Course
        </Heading>

        <VStack
          spacing={5}
          align="stretch"
          onChange={(e) => e.preventDefault()}
        >
          <Box>
            <Text fontWeight="semibold">Course Title</Text>
            <Input
              placeholder="Enter course title"
              size="lg"
              mt={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>

          <Box>
            <Text fontWeight="semibold">Course Subtitle</Text>
            <Input
              placeholder="Enter short subtitle"
              size="lg"
              mt={2}
              value={SubTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </Box>

          <Box>
            <Text fontWeight="semibold">Category</Text>
            <Select
              placeholder="Select category"
              size="lg"
              mt={2}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Web Development</option>
              <option>Data Science</option>
              <option>Machine Learning</option>
              <option>Cyber Security</option>
              <option>AI & Agents</option>
              <option>Others</option>
            </Select>
          </Box>

          <Box>
            <Text fontWeight="semibold">Price </Text>
            <Input
              placeholder="Enter the Price"
              size="lg"
              mt={2}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>

          {/* <Box>
<Text fontWeight="semibold">Course Thumbnail</Text>
<HStack mt={2}>
<Input type="file" p={1} />
</HStack>
</Box> */}

          <Box>
            <Text fontWeight="semibold">Short Description</Text>
            <Textarea
              placeholder="Enter course description"
              size="lg"
              mt={2}
              rows={4}
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </Box>

          {/* <Divider /> */}

          {/* <Heading size="md">Course Content</Heading> */}

          {/* <Card w="100%" border="1px solid" borderColor="gray.200" rounded="lg">
<CardHeader>
<Heading size="sm">Add Lecture</Heading>
</CardHeader>
<CardBody>
<VStack spacing={4}>
<Input placeholder="Lecture Title" size="md" />
<Textarea placeholder="Lecture Description" rows={3} />
<Input type="file" p={1} />
<Button colorScheme="purple" w="full">Add Lecture</Button>
</VStack>
</CardBody>
</Card> */}

          <Button
            onClick={handleCourseCreate}
            colorScheme="purple"
            size="lg"
            w="full"
            mt={4}
          >
            {loading ? <ClipLoader size={30} color="red" /> : "Create Course"}
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default CreatorCourse;
