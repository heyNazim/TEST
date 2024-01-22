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
import ChangePasswordform from './ChangePasswordform';



const Otpform = () => {
const [email, setEmail]=useState('')
const [ottpform, setOtpform]=useState(true)

    const handleotp = async() =>{
        try {
            const result = await axios.post(`${process.env.REACT_APP_API}/api/email-send`,{email})
            if(result.data.message === "plese check your email" ){
              alert(`Otp send to this email=> ${result.data.message}`)
              setOtpform(false)
            }else{
              alert(result.data.message)
            }
        } catch (error) {
           console.log(error) 
        }
    }
  return (
    <>
    {ottpform ?    <Stack spacing={4}>
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
        </FormControl>
        <div style={{display:"flex"}}>
        <Button onClick={handleotp}>Send OTP</Button>
        <Button><Link to='login'>Back</Link></Button>
        </div>
      </Stack> : <ChangePasswordform data={email}/> }
   
    </>
  )
}

export default Otpform