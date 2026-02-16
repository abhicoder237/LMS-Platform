 import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Flex,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useCreatorCourse from "../../customHooks/getCreatorCourse";
import { useRef } from "react";
import axios from "axios";
import { distance } from "framer-motion";
import { setlectureData } from "../../redux/lectureSlice";
import { serverUrl } from "../../App";

const EditLecture = () => {
    useCreatorCourse()
    const {courseId , lectureId} = useParams()
    const {lectureData} = useSelector(state => state.lecture)
    const selectedLecturedata = lectureData.find(lecture => lecture._id === lectureId)
    console.log(selectedLecturedata)
    const navigate = useNavigate()
    const [lectureTitle , setLectureTitle] = useState(selectedLecturedata?.lectureTitle)
    const [video , setVideo] = useState("")
    const [preview , setPreview] = useState(false)
    const [loading ,setLoading] = useState(false)
    const dispatch = useDispatch()
  

   


    const handleEditLecture = async ()=>{
      setLoading(true)
      try {
         const formData = new FormData()
    formData.append('lectureTitle' , lectureTitle)
    formData.append('isPreviewFree' , preview)
      if (video) {
      formData.append('videoUrl' , video)
    }
        const response = await axios.post(`${serverUrl}/api/lecture/edit_lecture/${lectureId}`, formData, {withCredentials:true });
        console.log(response.data)
        dispatch(setlectureData([...lectureData , response.data]))
        navigate("/createcourse")
      } catch (error) {
        console.log(error , 'error in handleformData')
      }
    }

    const removeLecture = async ()=>{
      setLoading(true)
      try {
        const response = await axios.delete(`${serverUrl}/api/lecture/delete_lecture/${lectureId}`,   {withCredentials:true });
        console.log(response.data)
        navigate(`/create_lecture/${courseId}`)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <Box minH="100vh" bg="gray.50" px={{ base: 4, md: 8 }} py={10}>
      <Box
        maxW="700px"
        mx="auto"
        bg="white"
        p={{ base: 5, md: 8 }}
        rounded="xl"
        boxShadow="md"
      >
        {/* Header */}
        <Flex align="center" gap={3} mb={6}>
          <IconButton
            icon={<FaArrowLeft />}
            variant="ghost"
            aria-label="Back"
          />
          <Heading size="md">Update Your Lecture</Heading>
        </Flex>

        {/* Remove Button */}
        <Button
          colorScheme="red"
          size="sm"
          mb={6}
          onClick={removeLecture}
        >
          Remove Lecture
        </Button>

        {/* Form */}
        <Stack spacing={5}>
          {/* Title */}
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Introduction to Backend"
              size="lg"
              value={lectureTitle}
              onChange={(e)=>setLectureTitle(e.target.value)}
            />
          </FormControl>

          {/* Video Upload */}
          <FormControl isRequired>
  <FormLabel>Video</FormLabel>

  <Flex
    align="center"
    gap={3}
    border="1px solid"
    borderColor="gray.200"
    rounded="md"
    p={2}
  >
    <Button
      size="sm"
      variant="outline"
      onClick={() => document.getElementById("video-upload").click()}
    >
      Choose File
    </Button>

    <Input
      type="file"
      id="video-upload"
      accept="video/*"
      display="none"
      onChange={(e) => setVideo(e.target.files[0])}
    />

    <Box fontSize="sm" color="gray.500">
      {video ? video.name : "No file chosen"}
    </Box>
  </Flex>
</FormControl>

          {/* Free Checkbox */}
          <Checkbox  isChecked={preview}
              onChange={(e)=>setPreview(e.target.checked)}  >
            Is this video <b>FREE</b>
          </Checkbox>
        </Stack>

        {/* Update Button */}
        <Button
          mt={10}
          w="full"
          size="lg"
          bg="black"
          color="white"
          _hover={{ bg: "gray.800" }}
          onClick={handleEditLecture}
        >
          Update Lecture
        </Button>
      </Box>
    </Box>
  );
};

export default EditLecture;


 