import React from "react";
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
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaLaptopCode,
  FaSearch,
} from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import usePublishedCourse from "../customHooks/getPublishedCourse";
import { useNavigate, useParams } from "react-router-dom";
import SearchAi from "../controller/SearchAi";

 

const HomePage = () => {
  usePublishedCourse();
  const {courseId} = useParams()
  const navigate = useNavigate()
  const {courseData} = useSelector(state => state.course)
  console.log("Course Dsts " , courseData)
  const [popularCourse , setPopularCourse] = useState([])

  useEffect(()=>{
     const publishedCourses = courseData?.filter(
    (c) => c?.isPublished === true
  );

  setPopularCourse(publishedCourses?.slice(0, 6));
  },[courseData])

  return (
    <div className="w-[100%] overflow-hidden">
      <Navbar />

      <Box bg="gray.50" fontFamily="Poppins, sans-serif">
        {/* Hero Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          px={{ base: 6, md: 20 }}
          py={{ base: 14, md: 24 }}
          bgGradient="linear(to-br, teal.500, teal.300, green.300, white)"
          borderBottomRadius="3xl"
          boxShadow="lg"
          position="relative"
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "300px",
            height: "300px",
            bgGradient: "radial(teal.200, transparent)",
            filter: "blur(60px)",
            opacity: 0.7,
          }}
          _after={{
            content: '""',
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "300px",
            height: "300px",
            bgGradient: "radial(green.200, transparent)",
            filter: "blur(60px)",
            opacity: 0.7,
          }}
        >
          <Box flex="1" mb={{ base: 10, md: 0 }} zIndex={2}>
            <Heading
              size={{ base: "2xl", md: "4xl" }}
              mb={4}
              lineHeight="shorter"
              textAlign={{ base: "center", md: "left" }}
              bgGradient="linear(to-r, white, #eaffef)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Level Up Your Skills with{" "}
              <Text
                as="span"
                bgGradient="linear(to-r, yellow.300, white)"
                bgClip="text"
                fontWeight="bold"
              >
                LearnX LMS
              </Text>
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.900"
              mb={6}
              textAlign={{ base: "center", md: "left" }}
              fontWeight="500"
            >
              Learn from the best instructors with interactive lessons,
              real-world projects, and personalized AI guidance.
            </Text>

            <Flex justify={{ base: "center", md: "flex-start" }}>
              <Button
              onClick={()=>navigate("/allCourse")}
                colorScheme="whiteAlpha"
                bg="whiteAlpha.900"
                color="teal.600"
                size="lg"
                rounded="full"
                px={8}
                fontWeight="bold"
                _hover={{ transform: "scale(1.08)", boxShadow: "xl" }}
              >
                Explore Courses
              </Button>
            </Flex>
          </Box>

          {/* Hero Image */}
          <Box flex="1" display="flex" justifyContent="center" zIndex={2}>
            <Image
              src={heroImage}
              alt="Learning Illustration"
              boxSize={{ base: "85%", md: "100%" }}
              objectFit="cover"
              borderRadius="3xl"
              boxShadow="2xl"
              transition="0.3s ease"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>
        </Flex>

        {/* AI Search Section */}
          {<SearchAi/>}

        {/* Features Section */}
        <Container maxW="6xl" py={{ base: 10, md: 20 }}>
          <Heading
            textAlign="center"
            mb={10}
            fontSize={{ base: "2xl", md: "3xl" }}
          >
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
                  transform: "translateY(-5px)",
                  transition: "all 0.3s ease",
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

        {/* Courses Preview Section */}
        <Box bg="white" py={{ base: 10, md: 20 }}>
          <Container maxW="6xl">
            <Heading
              textAlign="center"
              mb={10}
              fontSize={{ base: "2xl", md: "3xl" }}
            >
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
                  transition="0.3s ease"
                  _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
                >
                  <Image
                    src={course?.thumbnail || heroImage}
                    alt={course.name}
                    objectFit="cover"
                    w="100%"
                    h="220px"
                    transition="0.3s ease"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                  <Box p={6}>
                    <Heading size="md" mb={2}>
                      {course?.title || "Title"}
                    </Heading>
                    <Text color="gray.600" mb={4} fontSize="sm">
                      Learn the latest {course?.SubTitle} skills from top
                      instructors.
                    </Text>
                    <Button colorScheme="teal" size="sm" rounded="full" onClick={()=>navigate(`/course_Details/${courseId}`)}>
                      View Course
                    </Button>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        {/* Footer */}
        <Box bg="gray.900" color="white" py={10} textAlign="center">
          <Text fontSize="lg" mb={2}>
            © 2025 LearnX. All rights reserved.
          </Text>
          <Text fontSize="sm" color="gray.400">
            Built with ❤️ using Chakra UI
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
