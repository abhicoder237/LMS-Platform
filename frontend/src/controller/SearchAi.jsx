 import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Skeleton,
  Stack,
} from "@chakra-ui/react";

import { FaSearch, FaMicrophone } from "react-icons/fa";
import { Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import img from "../assets/4144421.jpg"
import { serverUrl } from "../App";

const SearchAi = () => {

  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [recomendation, setRecomendation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [visible, setVisible] = useState(6);

  const recognitionRef = useRef(null);

  if (!recognitionRef.current) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
    }
  }

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const handleSearch = async () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    try {
      recognition.start();
    } catch (err) {
      toast.error(err);
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecomendation(transcript);
    };
  };

  const handleRecomendation = async (query) => {
    try {
      setLoading(true);
      setSearched(true);

      const result = await axios.post(
        `${serverUrl}/api/lecture/search`,
        { input: query },
        { withCredentials: true }
      );

      setRecomendation(result.data);
      setVisible(6);

      if (result.data.length > 0) {
        speak(`${result.data.length} top courses found`);
      } else {
        speak("No course found");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (input.trim()) {
        handleRecomendation(input);
      }
    }, 600);

    return () => clearTimeout(delay);
  }, [input]);

  return (
    <Box
      bg="white"
      py={{ base: 8, md: 14 }}
      textAlign="center"
      px={{ base: 6, md: 20 }}
      boxShadow="md"
      borderRadius="2xl"
      mx={{ base: 4, md: 20 }}
      mt={-10}
    >
      <Heading fontSize={{ base: "xl", md: "2xl" }} mb={4}>
        Search Smarter with{" "}
        <Text as="span" color="teal.500">
          AI
        </Text>
      </Heading>

      <Text color="gray.600" mb={6}>
        Type what you want to learn — our AI will help you find the perfect course.
      </Text>

      <Flex justify="center">
        <Box w={{ base: "100%", sm: "80%", md: "60%" }}>

          <InputGroup size="lg">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI to find your course..."
              bg="gray.100"
              borderRadius="full"
              _focus={{ bg: "white", borderColor: "teal.500" }}
            />

            <InputRightElement width="5rem">
              <Flex gap={1}>
                <Button size="sm" rounded="full" bg="gray.200" onClick={handleSearch}>
                  <FaMicrophone />
                </Button>

                {input && (
                  <Button
                    size="sm"
                    rounded="full"
                    colorScheme="teal"
                    onClick={() => handleRecomendation(input)}
                  >
                    <FaSearch />
                  </Button>
                )}
              </Flex>
            </InputRightElement>
          </InputGroup>

          {loading && (
            <Flex justify="center" mt={8}>
              <Spinner size="lg" color="teal.500" />
            </Flex>
          )}

          {loading && (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} mt={10}>
              {[...Array(6)].map((_, i) => (
                <Stack key={i}>
                  <Skeleton height="160px" borderRadius="md" />
                  <Skeleton height="20px" />
                  <Skeleton height="15px" />
                </Stack>
              ))}
            </SimpleGrid>
          )}

          {searched && !loading && recomendation.length === 0 && (
            <Text mt={10} fontWeight="bold" color="gray.500">
              No Course Found
            </Text>
          )}

          {!loading && recomendation.length > 0 && (
            <>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                spacing={8}
                mt={12}
              >
                {recomendation.slice(0, visible).map((course) => (
                  <Box
                    key={course._id}
                    bg="white"
                    p={5}
                    shadow="lg"
                    borderRadius="xl"
                    _hover={{ transform: "translateY(-5px)" }}
                  >
                    <Image
                      src={course.thumbnail || img}
                      borderRadius="md"
                      mb={3}
                      h="160px"
                      w="100%"
                      objectFit="cover"
                    />

                    <Heading size="sm" mb={1}>
                      {course.title}
                    </Heading>

                    <Text fontSize="sm" color="gray.500" mb={2}>
                      {course.SubTitle}
                    </Text>

                    <Text fontSize="xs" noOfLines={2} color="gray.600" mb={3}>
                      {course.description}
                    </Text>

                    <Flex justify="space-between" mb={3}>
                      <Text fontWeight="bold" color="teal.600">
                        {course.level}
                      </Text>
                      <Text fontWeight="bold">₹{course.price}</Text>
                    </Flex>

                    <Button
                      w="100%"
                      colorScheme="teal"
                      onClick={() => navigate(`/course_Details/${course._id}`)}
                    >
                      View Course
                    </Button>
                  </Box>
                ))}
              </SimpleGrid>

              {visible < recomendation.length && (
                <Button
                  mt={10}
                  colorScheme="teal"
                  onClick={() => setVisible((prev) => prev + 6)}
                >
                  Load More
                </Button>
              )}
            </>
          )}

          <Flex justify="center" gap={2} mt={6} color="gray.500">
            <Sparkles size={16} />
            <Text>Powered by AI Search</Text>
          </Flex>

        </Box>
      </Flex>
    </Box>
  );
};

export default SearchAi;
