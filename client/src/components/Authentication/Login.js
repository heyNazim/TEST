import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // For password
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        `${process.env.REACT_APP_API}/api/login`,
        { email, password }
      );
      if (result.data.success === true) {
        alert(`${result.data.user.name} ${result.data.message}`);
      } else {
        alert(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Emil</FormLabel>
          <InputGroup mb="10px">
            <Input
              type="email"
              placeholder="Enter your name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        </FormControl>
        <Link to='forgot-password'>Forgot password</Link>
        <Button onClick={handleLogin}>Login</Button>
      </Stack>
    </>
  );
};

export default Login;
