 import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Textarea,
  Image,
  IconButton,
  VStack,
  HStack,
  Card,
  CardBody,
  Divider,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import img from "../../assets/editImage.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setcourseData, setcreatorCourseData } from "../../redux/courseSlice";
import useCurrentUser from "../../customHooks/getCurrentUser";
import { serverUrl } from "../../App";

const EditCourse = () => {
  useCurrentUser()
   const dispatch = useDispatch();
   const {courseData} = useSelector(state => state.course)

  const navigate = useNavigate();
  const thumb = useRef();
  const [title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setdescription] = useState("");
  const [level, setLevel] = useState("");
  const [frontendImage, setFrontendImage] = useState(img);
  const [isPublished, setIsPublished] = useState(false);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
  const { courseId } = useParams();

  const [courseEdit, setCourseEdit] = useState(null);

  const handleThumbnail = (e) => {
    try {
      const file = e.target.files[0];
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    } catch (error) {
      console.log("Error in thumbnail", error);
    }
  };

  const getCourseById = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/course/get_courseBYId/${courseId}`,
        { withCredentials: true }
      );
      console.log("Get course by Id", response.data);
      setCourseEdit(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (courseEdit) {
        setTitle(courseEdit?.title || "");
        setSubTitle(courseEdit?.SubTitle || "");
        setCategory(courseEdit?.category || "");
        setPrice(courseEdit?.price || "");
        setLevel(courseEdit?.level || "");
        setdescription(courseEdit?.description || "");
        setIsPublished(courseEdit?.isPublished || "");
        setFrontendImage(courseEdit?.thumbnail || img);
      }
    } catch (error) {
      console.log("error in filed value", error);
    }
  }, [courseEdit]);

  useEffect(() => {
    getCourseById();
    
  }, []);

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", SubTitle);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("level", level);
    formData.append("isPublished", isPublished);
    if (backendImage) {
      formData.append("thumbnail", backendImage);
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/course/edit_course/${courseId}`,
        formData,
        { withCredentials: true }
      );
      console.log(response.data);

      // for published checking 
      const updateData = response.data
      if(updateData?.isPublished){
        const updateCourse = courseData?.map(c => c._id === courseId ? updateData : c)

        if(!courseData?.some(c => c._id === courseId)){
          updateCourse?.push(courseData)
        }
        dispatch(setcourseData(updateCourse))
      }else{
        const filterCourse = courseData?.filter(c => c._id !== courseId)
          dispatch(setcourseData(filterCourse))
      }

      dispatch(setcreatorCourseData(response.data.course|| response.data )); 
      toast.success("Course Updated ");
      navigate("/");
    } catch (error) {
      console.log("Error in Handle Edit", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }finally{
            setLoading(false);
    }
  };

 const handleRemoveCourse = async () => {
  setLoading1(true);
  try {
    const response = await axios.delete(
      `${serverUrl}/api/course/remove_course/${courseId}`,
      { withCredentials: true }
    );

    console.log(response.data);
    const filterCourse = courseData?.filter(c => c._id !== courseId)
    dispatch(setcourseData(filterCourse))

    toast.success("Course Removed");
    navigate("/createcourse")
  } catch (error) {
    console.log(error);
    toast.error("Failed to remove course");
  } finally {
    setLoading1(false);
  }
};


  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.800")}
      minH="100vh"
      justify="center"
      py={{ base: 6, md: 10 }}
      px={{ base: 3, md: 6 }}
    >
      <Box w={{ base: "100%", sm: "92%", md: "86%", lg: "72%" }}>
        <Heading mb={6} size="lg">
          Edit Course
        </Heading>

        <Card boxShadow="lg" borderRadius="xl" bg={cardBg} p={{ base: 4, md: 6 }}>
          <CardBody>
            <Stack direction={{ base: "column", md: "row" }} spacing={6}>
              {/* Left column - Form */}
              <VStack spacing={5} align="stretch" flex="1">
                <Heading size="md">Basic Course Information</Heading>

                <HStack spacing={3} flexWrap="wrap">
                  {!isPublished ? (
                    <Button onClick={() => setIsPublished((prev) => !prev)} colorScheme="green" size="sm">
                      Click to Publish
                    </Button>
                  ) : (
                    <Button onClick={() => setIsPublished((prev) => !prev)} colorScheme="red" size="sm">
                      Click to UnPublish
                    </Button>
                  )}

                  <Button onClick={handleRemoveCourse} colorScheme="red" size="sm">
                    Remove Course
                  </Button>

                  <Button  onClick={() => navigate(`/create_lecture/${courseEdit?._id}`)} colorScheme="pink" size="sm">
                    Go to Lecture Page
                  </Button>
                </HStack>

                

                <FormControl>
                  <FormLabel>Course Title</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Course Title"
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Subtitle</FormLabel>
                  <Input
                    value={SubTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                    placeholder="Short subtitle"
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    placeholder="Add a clear and concise description of the course. Mention outcomes, prerequisites and who this course is for."
                    rows={6}
                    borderRadius="md"
                  />
                  <Text fontSize="sm" color="gray.500">Tip: Keep description under 300 words for better readability.</Text>
                </FormControl>

                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <FormControl>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Select category"
                      borderRadius="md"
                    >
                      <option>Web Development</option>
                      <option>Data Science</option>
                      <option>Machine Learning</option>
                      <option>Cyber Security</option>
                      <option>AI & Agents</option>
                      <option>Others</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Level</FormLabel>
                    <Select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      placeholder="Select Level"
                      borderRadius="md"
                    >
                      <option>Begginer</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Price (INR)</FormLabel>
                    <Input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Price (INR)"
                      type="number"
                      borderRadius="md"
                    />
                  </FormControl>
                </Stack>
              </VStack>

              {/* Right column - Thumbnail preview */}
              <VStack spacing={4} align="stretch" flexBasis={{ base: "100%", md: "360px" }}>
                <Heading size="sm">Course Thumbnail</Heading>

                <input
                  type="file"
                  ref={thumb}
                  hidden
                  accept="image/*"
                  onChange={handleThumbnail}
                />

                <Box
                  position="relative"
                  borderRadius="md"
                  h={{ base: "200px", md: "260px" }}
                  overflow="hidden"
                  bg="gray.50"
                  borderWidth={1}
                  borderStyle="dashed"
                  borderColor="gray.200"
                  cursor="pointer"
                  onClick={() => thumb.current.click()}
                >
                  <Image src={frontendImage || img} alt="thumbnail" objectFit="cover" w="100%" h="100%" />

                  <IconButton
                    icon={<EditIcon />}
                    size="sm"
                    position="absolute"
                    top={3}
                    right={3}
                    aria-label="edit image"
                    bg="whiteAlpha.800"
                  />
                </Box>

                <Text fontSize="sm" color="gray.500">Accepted: JPG, PNG, GIF — Max 5MB</Text>

                <Divider />

                <HStack justify="flex-end" spacing={3}>
                  <Button onClick={() => navigate("/createcourse")} variant="outline" colorScheme="gray">
                    Cancel
                  </Button>

                  <Button onClick={handleEditCourse} colorScheme="blue" minW="110px">
                    {loading ? <Spinner size="sm" /> : "Save"}
                  </Button>
                </HStack>
              </VStack>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
};

export default EditCourse;
