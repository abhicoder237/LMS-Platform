import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  Flex,
  Avatar,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaLaptopCode, FaUsers, FaChalkboardTeacher, FaRocket } from "react-icons/fa";

const About = () => {
  const glass = useColorModeValue("rgba(255,255,255,0.85)", "rgba(26,32,44,0.85)");
  const text = useColorModeValue("gray.600", "gray.300");
  const border = useColorModeValue("gray.200", "gray.700");

  return (
    <Box minH="100vh" bgGradient="linear(to-br, #0f2027, #203a43, #2c5364)" color="white">
      <Container maxW="7xl" py={20}>
        <Stack spacing={20}>
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={14}>
            <Stack spacing={6} flex={1}>
              <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                Learn Smarter. Grow Faster.
              </Heading>
              <Text fontSize="lg" color="gray.300">
                We help thousands of learners upgrade their skills with modern courses,
                real projects, and industry mentors. Everything you need to become job ready.
              </Text>
              <Flex gap={4}>
                <Button size="lg" colorScheme="purple" px={10} rounded="xl">
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" rounded="xl">
                  Contact Us
                </Button>
              </Flex>
            </Stack>

            <Box
              flex={1}
              bg={glass}
              p={10}
              rounded="3xl"
              backdropFilter="blur(18px)"
              shadow="2xl"
              border="1px solid"
              borderColor={border}
            >
              <Heading size="md" color="purple.400" mb={4}>
                Why Students Love Us
              </Heading>
              <Stack spacing={4}>
                <Text>✔ Industry focused curriculum</Text>
                <Text>✔ Real world projects</Text>
                <Text>✔ Lifetime access</Text>
                <Text>✔ Affordable pricing</Text>
              </Stack>
            </Box>
          </Flex>

          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
            <Stack align="center" bg={glass} p={8} rounded="2xl" backdropFilter="blur(16px)">
              <Heading>50K+</Heading>
              <Text color={text}>Students</Text>
            </Stack>
            <Stack align="center" bg={glass} p={8} rounded="2xl" backdropFilter="blur(16px)">
              <Heading>200+</Heading>
              <Text color={text}>Courses</Text>
            </Stack>
            <Stack align="center" bg={glass} p={8} rounded="2xl" backdropFilter="blur(16px)">
              <Heading>100+</Heading>
              <Text color={text}>Mentors</Text>
            </Stack>
            <Stack align="center" bg={glass} p={8} rounded="2xl" backdropFilter="blur(16px)">
              <Heading>95%</Heading>
              <Text color={text}>Placement</Text>
            </Stack>
          </SimpleGrid>

          <Stack spacing={10} textAlign="center">
            <Heading>What Makes Us Different</Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Stack bg={glass} p={10} rounded="2xl" backdropFilter="blur(16px)" spacing={5}>
                <Icon as={FaLaptopCode} boxSize={10} color="purple.400" />
                <Heading size="md">Project Based Learning</Heading>
                <Text color={text}>
                  Build real apps instead of just watching videos.
                </Text>
              </Stack>

              <Stack bg={glass} p={10} rounded="2xl" backdropFilter="blur(16px)" spacing={5}>
                <Icon as={FaChalkboardTeacher} boxSize={10} color="purple.400" />
                <Heading size="md">Expert Mentors</Heading>
                <Text color={text}>
                  Learn directly from industry professionals.
                </Text>
              </Stack>

              <Stack bg={glass} p={10} rounded="2xl" backdropFilter="blur(16px)" spacing={5}>
                <Icon as={FaRocket} boxSize={10} color="purple.400" />
                <Heading size="md">Career Growth</Heading>
                <Text color={text}>
                  Resume building, mock interviews and placement support.
                </Text>
              </Stack>
            </SimpleGrid>
          </Stack>

          <Stack spacing={10} textAlign="center">
            <Heading>Meet Our Team</Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
              <Stack align="center" bg={glass} p={8} rounded="2xl" backdropFilter="blur(16px)">
                <Avatar size="xl" />
                <Heading size="sm">Rahul Sharma</Heading>
                <Text color={text}>Full Stack Mentor</Text>
              </Stack>

              <Stack align="center" bg={glass} p={8} rounded="2xl" backdropFilter="blur(16px)">
                <Avatar size="xl" />
                <Heading size="sm">Aman Singh</Heading>
                <Text color={text}>Data Scientist</Text>
              </Stack>

              <Stack align="center" bg={glass} p={8} rounded="2xl" backdropFilter="blur(16px)">
                <Avatar size="xl" />
                <Heading size="sm">Priya Verma</Heading>
                <Text color={text}>UI/UX Expert</Text>
              </Stack>

              <Stack align="center" bg={glass} p={8} rounded="2xl" backdropFilter="blur(16px)">
                <Avatar size="xl" />
                <Heading size="sm">Karan Patel</Heading>
                <Text color={text}>AI Engineer</Text>
              </Stack>
            </SimpleGrid>
          </Stack>

          <Box
            bgGradient="linear(to-r, purple.500, pink.500)"
            p={16}
            rounded="3xl"
            textAlign="center"
            shadow="2xl"
          >
            <Heading mb={4}>Start Your Learning Journey Today</Heading>
            <Text mb={6}>Join thousands of students building their dream careers</Text>
            <Button size="lg" bg="white" color="purple.600" px={10} rounded="xl">
              Get Started
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
