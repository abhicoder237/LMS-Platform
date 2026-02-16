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
  Divider,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Sparkles, User } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import { clearUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ================= LOGOUT =================
  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(clearUserData());
      localStorage.clear();
      sessionStorage.clear();

      toast.success("Logged out successfully");

      navigate("/login", { replace: true });
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Logout failed");
    }
  };

  // ================= UI =================
  return (
    <ScaleFade initialScale={0.9} in transition={{ enter: { duration: 0.4 } }}>
      <Box
        px={{ base: 4, md: 10 }}
        py={3}
        position="sticky"
        top="0"
        zIndex="1000"
        bg="rgba(255,255,255,0.25)"
        backdropFilter="blur(14px)"
        borderBottom="1px solid rgba(255,255,255,0.2)"
        boxShadow="sm"
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* ===== LOGO ===== */}
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            color="teal.500"
            cursor="pointer"
            onClick={() => navigate("/")}
          >
            LearnX
          </Text>

          {/* ================= DESKTOP MENU ================= */}
          <Flex gap={4} align="center" display={{ base: "none", md: "flex" }}>
            <Button
              as={RouterLink}
              to="/dashboard"
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
                    size="sm"
                    bg="teal.500"
                    cursor="pointer"
                  />
                </MenuButton>

                <MenuList>
                  <MenuItem as={RouterLink} to="/profile">
                    Profile
                  </MenuItem>

                  <MenuItem as={RouterLink} to="/my-courses">
                    My Courses
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
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

          {/* ================= MOBILE TOGGLE ================= */}
          <IconButton
            display={{ md: "none" }}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="menu"
            onClick={isOpen ? onClose : onOpen}
            color="teal.500"
          />
        </Flex>

        {/* ================= MOBILE DRAWER ================= */}
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color="teal.500">Menu</DrawerHeader>

            <DrawerBody>
              <Stack spacing={5}>
                {/* ===== USER INFO ===== */}
                {userData && (
                  <>
                    <Flex direction="column" align="center" gap={2}>
                      <Avatar
                        name={userData?.user?.name}
                        src={userData?.user?.photoUrl}
                        size="xl"
                        bg="teal.500"
                      />
                      <Text fontWeight="bold">
                        {userData?.user?.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {userData?.user?.email}
                      </Text>
                    </Flex>
                    <Divider />
                  </>
                )}

                <Button
                  as={RouterLink}
                  to="/dashboard"
                  variant="ghost"
                  w="full"
                  onClick={onClose}
                >
                  Dashboard
                </Button>

                <Button
                  leftIcon={<Sparkles size={16} />}
                  variant="ghost"
                  w="full"
                  onClick={() => {
                    navigate("/about");
                    onClose();
                  }}
                >
                  About Us
                </Button>

                {userData && (
                  <>
                    <Button
                      as={RouterLink}
                      to="/profile"
                      variant="ghost"
                      w="full"
                      onClick={onClose}
                    >
                      Profile
                    </Button>

                    <Button
                      as={RouterLink}
                      to="/my-courses"
                      variant="ghost"
                      w="full"
                      onClick={onClose}
                    >
                      My Courses
                    </Button>
                  </>
                )}

                <Divider />

                {userData ? (
                  <Button colorScheme="red" w="full" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button
                    as={RouterLink}
                    to="/login"
                    colorScheme="teal"
                    w="full"
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
