 import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Stack,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import useCurrentUser from "../customHooks/getCurrentUser";
import { serverUrl } from "../App";

const Profile = () => {
  useCurrentUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(userData?.user?.name || "");
  const [description, setdescription] = useState(
    userData?.user?.description || ""
  );
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEditProfile = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (photoUrl) formData.append("photoUrl", photoUrl);

    try {
      const res = await axios.post(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });

      dispatch(setUserData(res.data));
      toast.success("Profile updated");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-r, purple.600, blue.600)"
      justify="center"
      align="center"
      p={{ base: 3, md: 6 }}
    >
      {/* Main Card */}
      <Flex
        w="100%"
        maxW="1200px"
        bg="whiteAlpha.200"
        backdropFilter="blur(12px)"
        borderRadius="2xl"
        overflow="hidden"
        flexDir={{ base: "column", lg: "row" }}
        boxShadow="xl"
      >
        {/* LEFT SIDE VIDEO */}
        <Box
          w={{ base: "100%", lg: "50%" }}
          h={{ base: "220px", md: "300px", lg: "auto" }}
        >
          <video
            src="/3209298-uhd_3840_2160_25fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* RIGHT SIDE PROFILE */}
        <Flex
          w={{ base: "100%", lg: "50%" }}
          p={{ base: 6, md: 10 }}
          justify="center"
          align="center"
        >
          <VStack spacing={4} w="100%" textAlign="center">
            <Avatar
              size={{ base: "xl", md: "2xl" }}
              name={userData?.user?.name}
              src={userData?.user?.photoUrl || ""}
            />

            <Heading fontSize={{ base: "xl", md: "3xl" }} color="white">
              {userData?.user?.name}
            </Heading>

            <Text color="whiteAlpha.800">{userData?.user?.email}</Text>

            <Text color="whiteAlpha.900">
              Role: {userData?.user?.role}
            </Text>

            <Text color="whiteAlpha.900">
              Bio: {userData?.user?.description}
            </Text>

            <Text color="whiteAlpha.900">
              Enrolled Courses: {userData?.user?.enrollCourse?.length}
            </Text>

            {/* Buttons responsive */}
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              w="100%"
              pt={4}
            >
              <Button
                w="100%"
                colorScheme="teal"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </Button>

              <Button w="100%" variant="ghost" color="white">
                Sign Out
              </Button>
            </Stack>
          </VStack>
        </Flex>
      </Flex>

      {/* Modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />

        <ModalContent
          mx={3}
          bg="whiteAlpha.200"
          backdropFilter="blur(15px)"
          borderRadius="2xl"
        >
          <ModalHeader color="white">Edit Profile</ModalHeader>
          <ModalCloseButton color="white" />

          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel color="white">Avatar</FormLabel>
                <Input
                  type="file"
                  bg="whiteAlpha.300"
                  color="white"
                  onChange={(e) => setPhotoUrl(e.target.files[0])}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="white">Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  bg="whiteAlpha.300"
                  color="white"
                />
              </FormControl>

              <FormControl>
                <FormLabel color="white">Bio</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  bg="whiteAlpha.300"
                  color="white"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              w="100%"
              colorScheme="teal"
              onClick={handleEditProfile}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} /> : "Save Changes"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Profile;
