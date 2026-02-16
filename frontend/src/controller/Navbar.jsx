 import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ScaleFade,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Sparkles, User } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearUserData } from "../redux/userSlice";
import toast from "react-hot-toast";
import SearchAi from "./SearchAi";
import { serverUrl } from "../App";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const handleLogout = async () => {
  try {
    await axios.post(
      `${serverUrl}/api/auth/logout`,
      {},
      { withCredentials: true }
    );

    // 1️⃣ clear redux
    dispatch(clearUserData());

    // 2️⃣ clear any localStorage (if you store anything)
    localStorage.clear();
    sessionStorage.clear();

    toast.success("Logged out successfully");

    // 3️⃣ redirect
    navigate("/login", { replace: true });

    // 4️⃣ force reload to remove any cached auth
    window.location.reload();

  } catch (err) {
    console.log(err);
    toast.error("Logout failed");
  }
};


  return (
    <ScaleFade initialScale={0.9} in={true} transition={{ enter: { duration: 0.6 } }}>
      <Box
        px={{ base: 4, md: 10 }}
        py={3}
        position="sticky"
        top="0"
        zIndex="1000"
        bg="rgba(255, 255, 255, 0.25)"
        backdropFilter="blur(14px)"
        borderBottom="1px solid rgba(255, 255, 255, 0.2)"
        boxShadow="sm"
        fontFamily="Poppins, sans-serif"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="teal.500"
          >
            LearnX
          </Text>

          {/* Desktop */}
          <Flex alignItems="center" gap={4} display={{ base: "none", md: "flex" }}>
            <Button
              as={RouterLink}
              to="/dashboard"
              colorScheme="teal"
              variant="ghost"
              size="sm"
            >
              Dashboard
            </Button>

            <Button
              leftIcon={<Sparkles size={16} />}
              colorScheme="teal"
              rounded="full"
              size="sm"
              onClick={() => navigate("/about")}
            >
              About Us
            </Button>

            {userData ? (
              <Menu>
                <MenuButton>
                  <Avatar
                    name={userData?.user?.name}
                    src={userData?.user?.photoUrl}
                    bg="teal.500"
                    color="white"
                    size="sm"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={RouterLink} to="/my-courses">
                    My Courses
                  </MenuItem>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <IconButton
                as={RouterLink}
                to="/login"
                icon={<User size={18} />}
                aria-label="Login"
                variant="outline"
                rounded="full"
                size="sm"
                colorScheme="teal"
              />
            )}
          </Flex>

          {/* Mobile Toggle */}
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            color="teal.500"
          />
        </Flex>

        {/* Mobile Drawer */}
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color="teal.500">LearnX Menu</DrawerHeader>

            <DrawerBody>
              <Stack spacing={6}>
                <Button
                  as={RouterLink}
                  to="/dashboard"
                  colorScheme="teal"
                  variant="ghost"
                  w="full"
                  onClick={onClose}
                >
                  Dashboard
                </Button>

                {/* ✅ FIXED AI SEARCH BUTTON */}
                <Button
                  leftIcon={<Sparkles size={16} />}
                  colorScheme="teal"
                  rounded="full"
                  size="sm"
                  w="full"
                  onClick={() => {
                    onClose();
                    navigate("/about");
                  }}
                >
                  About Us
                </Button>

                {userData ? (
                  <Button
                    w="full"
                    colorScheme="red"
                    variant="outline"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    as={RouterLink}
                    to="/login"
                    w="full"
                    colorScheme="teal"
                    rounded="full"
                    onClick={onClose}
                  >
                    Login
                  </Button>
                )}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </ScaleFade>
  );
};

export default Navbar;
