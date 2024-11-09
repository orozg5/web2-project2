import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import bcrypt from "bcryptjs";
import { useState } from "react";

export const Login = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();
  const salt = "$2a$10$" + import.meta.env.VITE_SALT;

  const openToast = (description: string) => {
    toast({
      title: "Error",
      description: description,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const onSubmit = async () => {
    if (!email || !password) {
      openToast("Email and password are required!");
      return;
    }
    await handleSubmit(email, password);
  };

  const handleSubmit = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: hashedPassword }),
        credentials: "include"
      });
      const data = await response.json();
      if (response.ok) {
        onClose();
        window.location.reload();
      } else {
        openToast(data.error);
      }
    } catch (error) {
      console.error("Error submitting form!", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="black" color="white" border="white solid 1px">
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="unstyled" onClick={onClose}>
            Close
          </Button>
          <Button ml="4" onClick={onSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
