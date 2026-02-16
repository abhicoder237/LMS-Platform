 import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  SimpleGrid,
  Divider,
  Progress,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaPlus, FaEdit, FaChartLine } from "react-icons/fa";
import useCreatorCourse from "../../customHooks/getCreatorCourse";
import { useEffect, useState } from "react";
import axios from "axios";
import {serverUrl} from "../../App"

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);

  useCreatorCourse(); // Your custom hook
  useEffect(() => {
    // Fetch educator courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${serverUrl}/api/course/creatorCourses`, // Replace with your endpoint
          { withCredentials: true }
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Box w="100%" maxW="1200px" mx="auto" mt={10} p={{ base: 5, md: 8 }} bg="white" rounded="2xl" boxShadow="xl">
      {/* Profile Section */}
      <Flex direction={{ base: "column", md: "row" }} align="center" gap={6}>
        <Avatar
          size="2xl"
          name={userData?.user?.name}
          src={userData?.user?.photoUrl}
          border="4px solid"
          borderColor="gray.800"
        />
        <Box textAlign={{ base: "center", md: "left" }}>
          <Text fontSize="3xl" fontWeight="bold">
            Welcome, {userData?.user?.name} 👋
          </Text>
          <Text color="gray.600" mt={1}>
            {userData?.user?.description || "CSE Student"}
          </Text>
        </Box>
      </Flex>

      <Divider my={8} />

      {/* Action Buttons */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb={8}>
        <Button
          leftIcon={<FaPlus />}
          size="lg"
          bg="black"
          color="white"
          rounded="xl"
          _hover={{ bg: "gray.800", transform: "translateY(-2px)" }}
          onClick={() => navigate("/createcourse")}
        >
          All Course
        </Button>

         

        <Button
          leftIcon={<FaBook />}
          size="lg"
          variant="outline"
          border="2px solid black"
          rounded="xl"
          _hover={{ bg: "black", color: "white" }}
          onClick={() => navigate("/creatorcpurse")}
        >
           Create Course
        </Button>
      </SimpleGrid>

      {/* Courses Section */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Your Courses
      </Text>

      {courses.length === 0 ? (
        <Text color="gray.500">You haven't created any courses yet.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {courses.map((course) => (
            <Box key={course._id} p={5} borderWidth="1px" rounded="xl" shadow="md" bg="gray.50" _hover={{ shadow: "xl", transform: "scale(1.02)" }} transition="0.2s">
              <Text fontSize="xl" fontWeight="bold" mb={2}>
                {course.title}
              </Text>
              <Text color="gray.600" mb={2}>
                {course.description?.slice(0, 80)}...
              </Text>
              <Badge colorScheme="green" mb={2}>
                {course.students?.length || 0} Students
              </Badge>

              <Box mt={2}>
                <Text fontSize="sm" mb={1}>
                  Progress
                </Text>
                <Progress value={course.progress || 0} size="sm" colorScheme="blue" rounded="md" />
              </Box>

              <Stack direction="row" spacing={2} mt={4}>
                <Button size="sm" leftIcon={<FaEdit />} onClick={() => navigate(`/editcourse/${course._id}`)}>
                  Edit
                </Button>
                <Button size="sm" leftIcon={<FaChartLine />} onClick={() => navigate(`/course-analytics/${course._id}`)} colorScheme="blue">
                  Analytics
                </Button>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Dashboard;
