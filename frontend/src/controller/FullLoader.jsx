import {
  Flex,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);

const FullScreenLoader = () => {
  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <MotionFlex
      minH="100vh"
      w="100%"
      bg={bg}
      align="center"
      justify="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <VStack spacing={6}>
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.400"
          size="xl"
        />

        <Text
          fontSize="lg"
          fontWeight="semibold"
          color={textColor}
          letterSpacing="wide"
        >
          Loading courses...
        </Text>
      </VStack>
    </MotionFlex>
  );
};

export default FullScreenLoader;
