

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  Stack,
  Card,
  CardBody,
  Divider,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { FaArrowLeft, FaPlus, FaEdit } from "react-icons/fa";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setlectureData } from "../../redux/lectureSlice";
import useCreatorCourse from "../../customHooks/getCreatorCourse";
import { serverUrl } from "../../App";


 

  const CreateLecture = () => {
  useCreatorCourse()
  const {lectureData} = useSelector(state => state.lecture)
  const dispatch = useDispatch()
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const[lectureTitle , setLectureTitle] = useState("")

  const fetchCreateCourse = async () => {
    try {
      setLoading(true);
     const response = await axios.post(`${serverUrl}/api/lecture/create_lecture/${courseId}`,{lectureTitle}, {withCredentials:true });
     console.log(response.data , "Lecture Data ")
      setLoading(false);
      dispatch(setlectureData([...lectureData ,response.data.lecture ]))
       
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(()=>{
    const getCourseById = async ()=>{
            try {
             const response = await axios.get(`${serverUrl}/api/lecture/get_lecture/${courseId}`, {withCredentials:true }) 
             console.log(response.data)
             dispatch(setlectureData( response.data.lectures ))

            } catch (error) {
              console.log(error , "error in get Course by id")
            }
    }
    getCourseById()
  } , [])
  return (
    <Box minH="100vh" bg="gray.50" py={10} px={{ base: 4, md: 8 }}>
      <Card maxW="800px" mx="auto" rounded="2xl" boxShadow="lg">
        <CardBody p={{ base: 5, md: 8 }}>
          {/* Header */}
          <Flex
            justify="space-between"
            align="center"
            mb={5}
            flexWrap="wrap"
            gap={3}
          >
            <Heading size="md">Create Lecture</Heading>

            <Button
              leftIcon={<FaArrowLeft />}
              size="sm"
              colorScheme="pink"
              onClick={()=>navigate(`/editcourse/${courseId}`)}
            >
              Back
            </Button>
          </Flex>

          <Divider mb={6} />

          {/* Lecture Title Input */}
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Lecture Title</FormLabel>
              <Input
                size="lg"
                placeholder="Enter lecture title"
                value={lectureTitle}
                onChange={(e)=>setLectureTitle(e.target.value)}
              />
            </FormControl>

            <Button
              leftIcon={<FaPlus />}
              bg="black"
              color="white"
              size="lg"
              _hover={{ bg: "gray.800" }}
              alignSelf="flex-end"
              onClick={fetchCreateCourse}
            >
              Add Lecture
            </Button>
          </Stack>

          {/* Lecture List */}
          <Box mt={10}>
            <Heading size="sm" mb={4}>
              Lectures
            </Heading>

            <Stack spacing={3}>
              {lectureData?.map((lecture , index)=>(
               <Flex
               key={index}
                p={4}
                bg="gray.100"
                rounded="lg"
                align="center"
                justify="space-between"
              >
                <Text fontWeight="medium">
                   {index + 1} : {lecture.lectureTitle}
                </Text>

                <IconButton
                  icon={<FaEdit />}
                  size="sm"
                  variant="ghost"
                  aria-label="Edit Lecture"
                  onClick={()=>navigate(`/edit_lecture/${courseId}/${lecture._id}`)}
                />
              </Flex>
              ))}
              

               
            </Stack>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CreateLecture;
