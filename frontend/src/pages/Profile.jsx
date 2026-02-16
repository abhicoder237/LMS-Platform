import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Stack,
  Avatar,
  Img,
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

import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import useCurrentUser from "../customHooks/getCurrentUser";
import { serverUrl } from "../App";

const Profile = () => {
  useCurrentUser()
  const [open, setOpen] = React.useState(false);
  const { userData } = useSelector((state) => state.user);
  console.log("User data is : ", userData);
  const navigate = useNavigate();

  const [name, setName] = useState(userData?.user?.name || "");
  const [description, setdescription] = useState(
    userData?.user?.description || "Study"
  );
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  console.log(userData);

  const handleEditProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("photoUrl", photoUrl);
    try {
      const response = await axios.post(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );
      console.log("Data", response.data);
      dispatch(setUserData(response?.data));
      setLoading(false);
      navigate("/");
      toast.success("profile Updated successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      bgGradient="linear(to-r, purple.600, blue.600)"
      justify="center"
      align="center"
      p={4}
    >
      {/* MAIN CONTAINER */}
      <Flex
        w={{ base: "100%", md: "90%", lg: "80%" }}
        h={{ base: "auto", lg: "85vh" }}
        bg="whiteAlpha.200"
        borderRadius="2xl"
        backdropFilter="blur(12px)"
        overflow="hidden"
        boxShadow="0 8px 30px rgba(0,0,0,0.25)"
        flexDirection={{ base: "column", lg: "row" }}
      >
        {/* LEFT SIDE — ANIMATION / VIDEO */}
        <Box
          w={{ base: "100%", lg: "50%" }}
          h={{ base: "40vh", lg: "100%" }}
          bg="blackAlpha.300"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            w="90%"
            h="90%"
            borderRadius="2xl"
            bg="whiteAlpha.300"
            backdropFilter="blur(10px)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="white"
            fontSize="xl"
            fontWeight="bold"
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
                borderRadius: "20px",
              }}
            />
          </Box>
        </Box>

        {/* RIGHT SIDE — PROFILE UI */}
        <Flex
          w={{ base: "100%", lg: "50%" }}
          h={{ base: "auto", lg: "100%" }}
          justify="center"
          align="center"
          p={10}
        >
          <VStack spacing={5} w="100%" textAlign="center">
            <Avatar
              size="2xl"
              name={userData?.user?.name} // shows initials if no image
              src={userData?.user?.photoUrl || ""} // if empty → initials appear
            />

            <Heading fontSize="3xl" color="white">
              {userData?.user?.name}
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800">
              {userData?.user?.email}
            </Text>

            <Text fontSize="md" color="whiteAlpha.900">
              Role: {userData?.user?.role}
            </Text>
            <Text fontSize="md" color="whiteAlpha.900">
              Bio: {userData?.user?.description}
            </Text>
            <Text fontSize="md" color="whiteAlpha.900">
              Enrolled Courses: {userData?.user?.enrollCourse?.length}
            </Text>

            <Stack direction="row" spacing={6} pt={4}>
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </Button>

              <Button variant="ghost" color="whiteAlpha.900">
                Sign Out
              </Button>
            </Stack>
          </VStack>
        </Flex>
        <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
          <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />
          <ModalContent
            bg="whiteAlpha.200"
            backdropFilter="blur(15px)"
            border="1px solid rgba(255,255,255,0.4)"
            boxShadow="0 4px 25px rgba(0,0,0,0.3)"
            borderRadius="2xl"
          >
            <ModalHeader color="white">Edit Profile</ModalHeader>
            <ModalCloseButton color="white" />

            <ModalBody>
              <VStack spacing={4}>
                {/* Upload Avatar */}
                <FormControl>
                  <FormLabel color="white">Change Avatar</FormLabel>
                  <Input
                    type="file"
                    p={1}
                    bg="whiteAlpha.300"
                    color="white"
                    name="photoUrl"
                    onChange={(e) => setPhotoUrl(e.target.files[0])}
                  />
                </FormControl>

                {/* Name */}
                <FormControl onSubmit={(e) => e.preventDefault()}>
                  <FormLabel color="white">Name</FormLabel>
                  <Input
                    placeholder="Enter new name"
                    defaultValue={userData?.user?.name}
                    bg="whiteAlpha.300"
                    color="white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                {/* Email */}
                <FormControl>
                  <FormLabel color="white">Email</FormLabel>
                  <Input
                    placeholder="Enter new email"
                    defaultValue={userData?.user?.email}
                    readOnly
                    bg="whiteAlpha.300"
                    color="white"
                  />
                </FormControl>

                {/*  description */}
                <FormControl>
                  <FormLabel color="white">Bio</FormLabel>
                  <Textarea
                    rows={3}
                    placeholder="Tell us About YourSelf"
                    bg="whiteAlpha.300"
                    color="white"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                disabled={loading}
                colorScheme="teal"
                mr={3}
                onClick={handleEditProfile}
              >
                {loading ? (
                  <ClipLoader size={30} color="red" />
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                variant="ghost"
                color="white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default Profile;
