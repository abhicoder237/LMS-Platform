import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const AuthLayout = ({ children, image }) => {
  return (
    <Flex
      minH="100vh"
      bg="linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      align="center"
      justify="center"
      px={4}
    >
      <Flex
        w="full"
        maxW="900px"
        bg="rgba(255,255,255,0.12)"
        backdropFilter="blur(18px)"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="2xl"
        flexDir={{ base: "column", md: "row" }}
      >
        {/* LEFT FORM */}
        <MotionBox
          flex="1"
          p={{ base: 6, md: 10 }}
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </MotionBox>

        {/* RIGHT IMAGE */}
        <MotionBox
          flex="1"
          display={{ base: "none", md: "block" }}
          bgImage={`url(${image})`}
          bgSize="cover"
          bgPosition="center"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
