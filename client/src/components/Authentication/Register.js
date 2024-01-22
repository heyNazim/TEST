import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";

import React from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  // const [pic, setPic]=useState('');

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  
  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        `${process.env.REACT_APP_API}/api/register`,
        { name, email, password, phone }
      );
      if (result.data.success === true) {
        alert("Register Successfully");
      } else {
        alert(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <InputGroup mb="10px">
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>

          <FormLabel>Email</FormLabel>
          <InputGroup mb="10px">
            <InputLeftElement pointerEvents="none">
              <EmailIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              placeholder="Phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <FormLabel>Phone no.</FormLabel>
          <InputGroup mb="10px">
            <InputLeftElement pointerEvents="none">
              <PhoneIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InputGroup>

          <FormLabel>Password</FormLabel>
          <InputGroup size="md" mb="10px">
            <Input
              value={password}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* <FormLabel>User Profile</FormLabel>
          <InputGroup mb='10px'>
    <Input type='file' placeholder='Phone number' value={pic} />
  </InputGroup>  */}
        </FormControl>

        <Button onClick={handleRegister} colorScheme="blue">
          Register
        </Button>
      </Stack>
    </div>
  );
};

export default Register;
