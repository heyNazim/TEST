import React from 'react'
import { useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";


const ChangePasswordform = (props) => {

    const [email, setEmail]=useState(props.data)
    const [otp, setOtp]=useState('')
    const [password, setPassword]=useState('')

    const handlechangepassword = async()=>{
        try {
            const result = await axios.post(`${process.env.REACT_APP_API}/api/change-password`,{email,otp,password})
            if(result.data.message == 'password changed'){
                alert(result.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    
    
    <Stack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <InputGroup mb="10px">
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Enter Otp</FormLabel>
          <InputGroup mb="10px">
            <Input
              type="Number"
              placeholder="Enter 4 digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Enter new Password</FormLabel>
          <InputGroup mb="10px">
            <Input
              type="test"
              placeholder="Enter New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <div style={{display:"flex"}}>
        <Button onClick={handlechangepassword}>Change Password</Button>
        <Button><Link to='login'>Back</Link></Button>
        </div>
      </Stack>

    </>
  )
}

export default ChangePasswordform