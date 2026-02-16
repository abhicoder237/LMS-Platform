 import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  SimpleGrid,
  VStack,
  Button,
  useColorModeValue,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import img from "../../assets/editImage.jpeg";
import usePublishedCourse from "../../customHooks/getPublishedCourse";
import Navbar from "../../controller/Navbar";
import { useNavigate } from "react-router-dom";

const AllCourse = () => {
  usePublishedCourse();

  const cardBg = useColorModeValue(
    "rgba(255,255,255,0.85)",
    "rgba(26,32,44,0.85)"
  );
  const cardText = useColorModeValue("gray.700", "gray.300");

  const { courseData } = useSelector((state) => state.course);
  const [category, setCategory] = useState([]);
  const [fiterCourse, setFilterCourse] = useState([]);
  const navigate = useNavigate();

  const categories = [
    "All",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Cyber Security",
    "AI & Agents",
    "Others",
  ];

  const toggleCategory = (value) => {
    if (value === "All") {
      setCategory([]);
      setFilterCourse(courseData);
      return;
    }

    if (category.includes(value)) {
      setCategory((prev) => prev.filter((c) => c !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  const applyFilter = () => {
    let copyCourse = courseData?.slice();
    if (category.length > 0) {
      copyCourse = copyCourse.filter((c) => category.includes(c.category));
    }
    setFilterCourse(copyCourse);
  };

  useEffect(() => {
    setFilterCourse(courseData);
  }, [courseData]);

  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <Box minH="100vh" bgGradient="linear(to-br, #0f2027, #203a43, #2c5364)">
      {/* Navbar */}
      <Box position="sticky" top="0" zIndex="2000">
        <Navbar />
      </Box>

      <Box px={{ base: 4, md: 10 }} py={10}>
        {/* Page Heading */}
        <Heading
          color="white"
          fontSize={{ base: "2xl", md: "4xl" }}
          mb={8}
          textAlign={{ base: "center", md: "left" }}
        >
          Explore Courses
        </Heading>

        <Flex gap={8} align="flex-start" direction={{ base: "column", md: "row" }}>
          {/* Categories */}
          <Box
            w={{ base: "100%", md: "260px" }}
            position={{ base: "static", md: "sticky" }}
            top="90px"
            bg="whiteAlpha.200"
            backdropFilter="blur(16px)"
            borderRadius="2xl"
            p={4}
            border="1px solid"
            borderColor="whiteAlpha.300"
          >
            <Text
              fontWeight="700"
              mb={4}
              color="white"
              fontSize="lg"
              textAlign={{ base: "center", md: "left" }}
            >
              Categories
            </Text>

            {/* Mobile: horizontal scroll */}
            <HStack
              spacing={3}
              overflowX={{ base: "auto", md: "hidden" }}
              flexWrap={{ base: "nowrap", md: "wrap" }}
            >
              {categories.map((cat, index) => (
                <Button
                  key={index}
                  onClick={() => toggleCategory(cat)}
                  rounded="full"
                  size="sm"
                  flexShrink={0}
                  fontWeight="600"
                  bg={category.includes(cat) ? "white" : "transparent"}
                  color={category.includes(cat) ? "purple.600" : "white"}
                  border="1px solid"
                  borderColor="whiteAlpha.400"
                  _hover={{
                    bg: "white",
                    color: "purple.600",
                  }}
                >
                  {cat}
                </Button>
              ))}
            </HStack>
          </Box>

          {/* Courses Grid */}
          <Box flex="1">
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 3 }}
              spacing={8}
            >
              {fiterCourse.map((course, index) => (
                <Card
                  key={index}
                  bg={cardBg}
                  backdropFilter="blur(14px)"
                  rounded="2xl"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-8px)",
                    boxShadow: "2xl",
                  }}
                >
                  <Image
                    src={course?.thumbnail || img}
                    alt={course.title}
                    h="180px"
                    w="100%"
                    objectFit="cover"
                  />

                  <CardBody>
                    <Heading size="md" mb={2} color={cardText}>
                      {course.title}
                    </Heading>

                    <Text fontSize="sm" color={cardText} noOfLines={2} mb={4}>
                      {course.description}
                    </Text>

                    <Flex justify="space-between" mb={3} wrap="wrap" gap={2}>
                      <Badge colorScheme="purple" px={3} py={1} rounded="full">
                        ₹{course.price || "999"}
                      </Badge>
                      <Badge colorScheme="teal" px={3} py={1} rounded="full">
                        {course.level || "Beginner"}
                      </Badge>
                      <Badge colorScheme="pink" px={3} py={1} rounded="full">
                        {course.category || "Course"}
                      </Badge>
                    </Flex>

                    <Flex align="center" gap={1}>
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          as={FaStar}
                          key={i}
                          color={
                            i < (course.rating || 4)
                              ? "yellow.400"
                              : "gray.300"
                          }
                          boxSize={4}
                        />
                      ))}
                      <Text ml={2} fontWeight="600" color={cardText}>
                        {course.rating || 4.5}
                      </Text>
                    </Flex>
                  </CardBody>

                  <CardFooter>
                    <Button
                      w="full"
                      colorScheme="purple"
                      rounded="xl"
                      onClick={() =>
                        navigate(`/course_Details/${course._id}`)
                      }
                    >
                      View Course
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default AllCourse;
