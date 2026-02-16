 import React, { useEffect, useState } from "react";
import Navbar from "../controller/Navbar";
import heroImage from "../assets/4144421.jpg";

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  Container,
  Icon,
} from "@chakra-ui/react";

import {
  FaChalkboardTeacher,
  FaUsers,
  FaLaptopCode,
} from "react-icons/fa";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePublishedCourse from "../customHooks/getPublishedCourse";
import SearchAi from "../controller/SearchAi";

const HomePage = () => {
  usePublishedCourse();

  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);

  const [popularCourse, setPopularCourse] = useState([]);

  useEffect(() => {
    const publishedCourses = courseData?.filter(
      (c) => c?.isPublished === true
    );

    setPopularCourse(publishedCourses?.slice(0, 6));
  }, [courseData]);

  return (
    <Box w="100%" overflow="hidden" bg="gray.50">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
        justify="space-between"
        px={{ base: 5, md: 20 }}
        py={{ base: 12, md: 24 }}
        gap={{ base: 10, md: 0 }}
        bgGradient="linear(to-br, teal.500, teal.300, green.300, white)"
        borderBottomRadius="3xl"
      >
        {/* LEFT CONTENT */}
        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Heading
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            lineHeight="1.3"
            wordBreak="break-word"
            mb={5}
            color="white"
            fontWeight="extrabold"
          >
            Level Up Your Skills with{" "}
            <Text as="span" color="yellow.300">
              LearnX LMS
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "sm", md: "lg" }}
            color="whiteAlpha.900"
            mb={7}
            px={{ base: 2, md: 0 }}
          >
            Learn from top instructors, build real projects and grow
            faster with AI powered guidance.
          </Text>

          <Button
            onClick={() => navigate("/allCourse")}
            size={{ base: "md", md: "lg" }}
            rounded="full"
            colorScheme="whiteAlpha"
            bg="white"
            color="teal.600"
            fontWeight="bold"
            w={{ base: "100%", md: "fit-content" }}
            _hover={{ transform: "scale(1.05)" }}
          >
            Explore Courses
          </Button>
        </Box>

        {/* RIGHT IMAGE */}
        <Box flex="1" display="flex" justifyContent="center">
          <Image
            src={heroImage}
            alt="Learning"
            w={{ base: "75%", sm: "60%", md: "100%" }}
            maxW="420px"
            rounded="2xl"
            boxShadow="xl"
          />
        </Box>
      </Flex>

      {/* ================= AI SEARCH SECTION ================= */}
      <Box px={{ base: 4, md: 16 }} py={{ base: 8, md: 14 }}>
        <Box maxW="900px" mx="auto">
          <SearchAi />
        </Box>
      </Box>

      {/* ================= FEATURES ================= */}
      <Container maxW="6xl" py={{ base: 10, md: 20 }}>
        <Heading textAlign="center" mb={10}>
          Why Choose{" "}
          <Text as="span" color="teal.500">
            LearnX?
          </Text>
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {[
            {
              icon: FaChalkboardTeacher,
              title: "Expert Instructors",
              text: "Learn from industry professionals with years of experience.",
            },
            {
              icon: FaUsers,
              title: "Interactive Community",
              text: "Join a vibrant community of learners and mentors.",
            },
            {
              icon: FaLaptopCode,
              title: "Hands-on Learning",
              text: "Build real-world projects and gain practical experience.",
            },
          ].map((feature, i) => (
            <Box
              key={i}
              p={8}
              bg="white"
              borderRadius="2xl"
              boxShadow="md"
              textAlign="center"
              _hover={{
                transform: "translateY(-6px)",
                boxShadow: "xl",
              }}
            >
              <Icon as={feature.icon} w={12} h={12} color="teal.500" mb={4} />
              <Heading size="md" mb={2}>
                {feature.title}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {feature.text}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* ================= COURSES ================= */}
      <Box bg="white" py={{ base: 10, md: 20 }}>
        <Container maxW="6xl">
          <Heading textAlign="center" mb={10}>
            Explore Popular Courses
          </Heading>

          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
            {popularCourse?.map((course, i) => (
              <Box
                key={i}
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="lg"
                bg="gray.50"
                _hover={{ transform: "scale(1.03)" }}
              >
                <Image
                  src={course?.thumbnail || heroImage}
                  alt={course?.title}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />

                <Box p={6}>
                  <Heading size="md" mb={2} noOfLines={1}>
                    {course?.title}
                  </Heading>

                  <Text fontSize="sm" color="gray.600" mb={4} noOfLines={2}>
                    {course?.SubTitle}
                  </Text>

                  {/* ✅ FIXED BUG HERE */}
                  <Button
                    colorScheme="teal"
                    size="sm"
                    rounded="full"
                    w="100%"
                    onClick={() =>
                      navigate(`/course_Details/${course._id}`)
                    }
                  >
                    View Course
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box bg="gray.900" color="white" py={10} textAlign="center">
        <Text fontSize="lg">© 2025 LearnX. All rights reserved.</Text>
        <Text fontSize="sm" color="gray.400">
          Built with ❤️ using Chakra UI
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
