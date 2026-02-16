 import {
  Box,
  Stack,
  Input,
  Button,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Text,
  Flex,
  Link,
  Select,
  Image,
} from '@chakra-ui/react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import AuthLayout from './AuthLayout';
import { serverUrl } from '../App';

const Login = () => {

  // ===== LOGIC (UNCHANGED) =====
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        { role, email, password },
        { withCredentials: true }
      );

      toast.success("Login Successfully");
      dispatch(setUserData(response.data.user));
      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  // ============================

  return (
     
      <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="linear(to-br, #0f2027, #203a43, #2c5364)"
      p={6}
    >
      {/* Glass Wrapper */}
      <Flex
        w="full"
        maxW="1100px"
        rounded="3xl"
        overflow="hidden"
        direction={{ base: "column", md: "row" }}
        bg="rgba(255,255,255,0.08)"
        backdropFilter="blur(18px)"
        border="1px solid rgba(255,255,255,0.15)"
        boxShadow="0 25px 60px rgba(0,0,0,0.4)"
      >

        {/* LEFT: LOGIN FORM */}
        <Box
          flex="1"
          p={{ base: 6, md: 12 }}
          bg="rgba(255,255,255,0.85)"
        >
          <Heading
            mb={3}
            fontSize={{ base: "2xl", md: "3xl" }}
            color="teal.600"
          >
            Welcome Back
          </Heading>

          <Text mb={10} color="gray.600">
            Login to continue your journey with <b>LearnX</b>
          </Text>

          <Stack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Role</FormLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="educator">Educator</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              onClick={handleLogin}
              colorScheme="teal"
              size="lg"
              w="full"
              mt={4}
              disabled={loading}
            >
              {loading ? <ClipLoader color="white" size={25} /> : "Login"}
            </Button>
          </Stack>

          <Text mt={8} fontSize="sm" color="gray.600">
            Don&apos;t have an account?{" "}
            <Link
              as={RouterLink}
              to="/register"
              color="teal.600"
              fontWeight="bold"
            >
              Register
            </Link>
          </Text>
        </Box>

        {/* RIGHT: IMAGE / INFO CARD */}
        <Box
          flex="1"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          p={12}
          bg="rgba(255,255,255,0.06)"
          borderLeft="1px solid rgba(255,255,255,0.15)"
        >
          <Box textAlign="center" color="white">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Learning"
              rounded="2xl"
              mb={8}
              boxShadow="2xl"
            />

            <Heading size="lg" mb={3}>
              Learn Smarter
            </Heading>

            <Text opacity={0.85}>
              A modern platform for students & educators
            </Text>
          </Box>
        </Box>

      </Flex>
    </Flex>
 
  );
};

export default Login;
