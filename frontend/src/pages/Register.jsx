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
  Link,
  Select,
} from "@chakra-ui/react";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import AuthLayout from "./AuthLayout";
import { serverUrl } from "../App";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const dispatch = useDispatch();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/register`,
        { name, role, email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(response.data?.user));
      setLoading(false);
      navigate("/");
      toast.success("Register successfully");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <AuthLayout image="/src/assets/newregister.jpg">
      <Heading mb={6} color="white">
        Create Account 🚀
      </Heading>

      <Stack spacing={4} onClick={(e) => e.preventDefault()}>
        <FormControl>
          <FormLabel color="white">Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel color="white">Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel color="white">Role</FormLabel>
          <Select onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="educator">Educator</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel color="white">Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <Button size="sm" onClick={toggleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          onClick={handleRegister}
          colorScheme="teal"
          isDisabled={loading}
        >
          {loading ? <ClipLoader size={20} /> : "Register"}
        </Button>

        <Text color="gray.200" fontSize="sm">
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="teal.300">
            Login
          </Link>
        </Text>
      </Stack>
    </AuthLayout>
  );
};

export default Register;
