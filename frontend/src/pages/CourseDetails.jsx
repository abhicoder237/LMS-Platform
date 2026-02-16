 import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Flex,
  Image,
  Avatar,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Badge,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "../redux/courseSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import img from "../assets/editImage.jpeg";
import usePublishedCourse from "../customHooks/getPublishedCourse";
import useCurrentUser from "../customHooks/getCurrentUser";
import { serverUrl } from "../App";

const CourseDetails = () => {
  usePublishedCourse();
  useCurrentUser();

  const glassBg = useColorModeValue(
    "rgba(255,255,255,0.85)",
    "rgba(26,32,44,0.85)"
  );
  const pageBg = useColorModeValue(
    "linear(to-br, #0f2027, #203a43, #2c5364)",
    "gray.900"
  );
  const textColor = useColorModeValue("gray.600", "gray.300");
  const borderColor = useColorModeValue("whiteAlpha.300", "gray.700");

  const { courseData, selectedCourse } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creator, setCreator] = useState(null);
  const [creatorCourse, setCreatorCourse] = useState([]);
  const [isEnrollCourse, setEnrollCourse] = useState(false);

  useEffect(() => {
    if (courseData?.length) {
      const course = courseData.find((c) => c._id === courseId);
      if (course) dispatch(setSelectedCourse(course));
    }
  }, [courseData, courseId]);

  useEffect(() => {
    if (selectedCourse?.creator) {
      axios
        .post(
          `${serverUrl}/api/user/get_creator`,
          { userId: selectedCourse.creator },
          { withCredentials: true }
        )
        .then((res) => setCreator(res.data))
        .catch(() => {});
    }
  }, [selectedCourse]);

  const checkEnroll = () => {
    const verify = userData?.enrollCourse?.some(
      (c) =>
        (typeof c === "string" ? c : c._id).toString() ===
        courseId?.toString()
    );
    if (verify) setEnrollCourse(true);
  };

  useEffect(() => {
    checkEnroll();
  }, [userData]);

  useEffect(() => {
    if (creator?._id && courseData?.length) {
      const list = courseData.filter(
        (c) => c.creator === creator._id && c._id !== selectedCourse?._id
      );
      setCreatorCourse(list);
    }
  }, [creator, courseData, selectedCourse]);

  useEffect(() => {
    if (selectedCourse?.lectures?.length) {
      const free = selectedCourse.lectures.find((l) => l.isPreviewFree);
      setSelectedLecture(free || null);
    }
  }, [selectedCourse]);

  const handleCourseSwap = (course) => {
    dispatch(setSelectedCourse(course));
    setSelectedLecture(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEnroll = async (courseId, userId) => {
    try {
      const orderData = await axios.post(
        `${serverUrl}/api/razorpay/razor_pay_order`,
        { courseId, userId },
        { withCredentials: true }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: "INR",
        name: "LMS WEBSITE",
        description: "ORDER CHECK",
        order_id: orderData.data.id,
        handler: async (response) => {
          try {
            const verifyPayment = await axios.post(
              `${serverUrl}/api/razorpay/razor_pay_order`,
              { response, courseId, userId },
              { withCredentials: true }
            );
            setEnrollCourse(true);
            toast.success(verifyPayment.data.message);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient={pageBg}
      px={{ base: 4, md: 10 }}
      py={10}
      pb={{ base: "110px", xl: 10 }}   // 👈 mobile space for sticky bar
    >
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={10}>
        {/* LEFT CONTENT */}
        <Stack spacing={8}>
          {/* Course Info */}
          <Box bg={glassBg} p={8} rounded="2xl" backdropFilter="blur(16px)" border="1px solid" borderColor={borderColor}>
            <Flex direction={{ base: "column", md: "row" }} gap={8}>
              <Image
                src={selectedCourse?.thumbnail || img}
                rounded="2xl"
                w={{ base: "100%", md: "420px" }}
                h="260px"
                objectFit="cover"
              />
              <Stack spacing={4}>
                <Flex gap={3} wrap="wrap">
                  <Badge rounded="full" colorScheme="purple">{selectedCourse?.category}</Badge>
                  <Badge rounded="full" colorScheme="teal">{selectedCourse?.level}</Badge>
                </Flex>
                <Heading size="lg">{selectedCourse?.title}</Heading>
                <Text fontWeight="500" color="gray.500">{selectedCourse?.SubTitle}</Text>
                <Text color={textColor}>{selectedCourse?.description}</Text>
                <Flex align="center" gap={1}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={FaStar} color={i < 4 ? "yellow.400" : "gray.300"} />
                  ))}
                  <Text fontWeight="600">4.6</Text>
                </Flex>
              </Stack>
            </Flex>
          </Box>

          {/* Preview */}
          <Box bg={glassBg} p={8} rounded="2xl" backdropFilter="blur(16px)">
            <Heading size="md" mb={4}>Course Preview</Heading>
            <Box rounded="xl" overflow="hidden">
              <video
                width="100%"
                height="280"
                controls
                src={selectedLecture?.videoUrl || selectedCourse?.previewVideo}
              />
            </Box>
          </Box>

          {/* Lectures */}
          <Box bg={glassBg} p={8} rounded="2xl" backdropFilter="blur(16px)">
            <Heading size="md" mb={4}>
              Lectures ({selectedCourse?.lectures?.length})
            </Heading>
            <Stack spacing={3}>
              {selectedCourse?.lectures?.map((lecture, index) => {
                const isFree = lecture.isPreviewFree;
                return (
                  <Button
                    key={index}
                    justifyContent="space-between"
                    isDisabled={!isFree}
                    variant="outline"
                    colorScheme={isFree ? "purple" : "gray"}
                    onClick={() => isFree && setSelectedLecture(lecture)}
                  >
                    {lecture.lectureTitle}
                    {!isFree && " 🔒"}
                  </Button>
                );
              })}
            </Stack>
          </Box>

          {/* Instructor */}
          <Box bg={glassBg} p={8} rounded="2xl" backdropFilter="blur(16px)">
            <Heading size="md" mb={4}>Instructor</Heading>
            <Flex gap={6} align="center">
              <Avatar size="xl" src={creator?.photoUrl || img} />
              <Stack>
                <Text fontWeight="bold" fontSize="lg">{creator?.name}</Text>
                <Badge w="fit-content" colorScheme="purple">{creator?.role}</Badge>
                <Text fontSize="sm" color="gray.500">{creator?.description}</Text>
              </Stack>
            </Flex>
          </Box>

          {/* More Courses */}
          <Box>
            <Heading size="md" mb={5} color="white">More Courses</Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
              {creatorCourse.map((course) => (
                <Box
                  key={course._id}
                  bg={glassBg}
                  rounded="2xl"
                  overflow="hidden"
                  cursor="pointer"
                  backdropFilter="blur(14px)"
                  transition="0.3s"
                  _hover={{ transform: "translateY(-6px)", shadow: "2xl" }}
                  onClick={() => handleCourseSwap(course)}
                >
                  <Image src={course.thumbnail || img} h="180px" w="100%" objectFit="cover" />
                  <Box p={4}>
                    <Text fontWeight="bold" noOfLines={2}>{course.title}</Text>
                    <Text mt={2} fontWeight="bold">₹{course.price}</Text>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Stack>

        {/* DESKTOP RIGHT CARD */}
        <Box
          display={{ base: "none", xl: "block" }}
          bg={glassBg}
          p={8}
          rounded="2xl"
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor={borderColor}
          position="sticky"
          top="100px"
          h="fit-content"
        >
          <Heading size="lg">₹{selectedCourse?.price}</Heading>
          <Text mt={2} color="gray.500">Full lifetime access</Text>
          <Button
            mt={6}
            colorScheme="purple"
            size="lg"
            w="100%"
            onClick={() => handleEnroll(courseId, userData?._id)}
          >
            Enroll Now
          </Button>
        </Box>
      </SimpleGrid>

      {/* MOBILE STICKY ENROLL BAR */}
      <Box
        display={{ base: "block", xl: "none" }}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg={glassBg}
        backdropFilter="blur(18px)"
        borderTop="1px solid"
        borderColor={borderColor}
        px={4}
        py={3}
        zIndex={1000}
      >
        <Flex align="center" justify="space-between">
          <Box>
            <Text fontSize="sm" color="gray.500">Price</Text>
            <Text fontSize="xl" fontWeight="bold">
              ₹{selectedCourse?.price}
            </Text>
          </Box>

          { isEnrollCourse ? <Button
            bgGradient="linear(to-r, purple.400, pink.500)"
            color="white"
            px={10}
            rounded="xl"
            onClick={() => handleEnroll(courseId, userData?._id)}
          >
            Enroll Now
          </Button> : <Button
            bgGradient="linear(to-r, purple.400, pink.500)"
            color="white"
            px={10}
            rounded="xl"
            
          >
            Watch Now
          </Button>}
        </Flex>
      </Box>

      <Box mt={14}>
        <Skeleton h="28px" mb={4} />
        <SkeletonText noOfLines={4} spacing={3} />
      </Box>
    </Box>
  );
};

export default CourseDetails;
