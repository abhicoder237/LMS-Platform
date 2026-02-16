 import {
  Box,
  Button,
  Heading,
  Text,
  Image,
  SimpleGrid,
  VStack,
  Flex,
  Badge
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import img from "../../assets/editImage.jpeg";
 
import axios from "axios";
import { setcreatorCourseData } from "../../redux/courseSlice";
import { useEffect } from "react";
import { serverUrl } from "../../App";

const CreateCourse = () => {
   
   const { creatorCourseData } = useSelector(state => state.course);
   const{userData} = useSelector(state => state?.user);
  console.log("creator course Data " , creatorCourseData)
  const dispatch = useDispatch()

 useEffect(()=>{
   const createCourse = async()=>{
    try {
      const response =await axios.get(`${serverUrl}/api/course/getCreator`, { withCredentials: true });
      console.log('get creator data',response.data)
      dispatch(setcreatorCourseData(response.data))
    } catch (error) {
      console.log(error , 'get creator course error')
    }
  }
  createCourse()
 },[userData])

 
  const navigate = useNavigate();


  return (
    <Box bg="gray.900" minH="100vh" color="white">
      {/* 🔵 NAVBAR */}
      <Flex
        bg="gray.800"
        px={[4, 8]}
        py={4}
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
      >
        <Heading size="md">LearnX</Heading>

        <Button
          onClick={() => navigate("/creatorcpurse")}
          colorScheme="blue"
          size="md"
        >
          Create Course
        </Button>

        
      </Flex>

      {/* 📚 COURSE SECTION */}
      <Box p={[4, 6, 10]}>
        <Heading size="lg" mb={6}>
          All Courses
        </Heading>

        <SimpleGrid columns={[1, 2, 3]} spacing={[4, 6]}>
          {creatorCourseData?.map((course, index) => (
            <Box
              key={index}
              p={4}
              borderRadius="lg"
              boxShadow="xl"
              bg="gray.800"
              transition="0.3s"
              _hover={{ transform: "scale(1.03)", boxShadow: "2xl" }}
            >
              {/* Thumbnail */}
              <Image
                src={course?.thumbnail || img}
                borderRadius="md"
                mb={4}
                height="200px"
                width="100%"
                objectFit="cover"
              />

              <VStack align="start" spacing={2}>
                {/* 🔵 PUBLISHED / DRAFT BADGE */}
                {course?.isPublished ? (
                  <Badge colorScheme="green" px={2} borderRadius="md">
                    Published
                  </Badge>
                ) : (
                  <Badge colorScheme="yellow" px={2} borderRadius="md">
                    Draft
                  </Badge>
                )}

                {/* Title */}
                <Heading size="md">{course?.title || "No Title"}</Heading>

                {/* Subtitle */}
                <Text fontSize="sm" color="gray.300">
                  {course?.SubTitle || "No Subtitle"}
                </Text>

                {/* Price */}
                <Text fontWeight="bold" fontSize="lg" color="blue.300">
                  ₹{course?.price || "0"}
                </Text>

                {/* Description */}
                <Text fontSize="sm" color="gray.400" noOfLines={3}>
                  {course?.description || "No Description Provided"}
                </Text>

                {/* EDIT BUTTON */}
                <Button onClick={()=>navigate(`/editcourse/${course?._id}`)} mt={3} size="sm" colorScheme="yellow" width="100%">
                  Edit Course
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default CreateCourse;
