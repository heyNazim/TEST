import { Button, Container, Input, Stack, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Allusers = () => {
  const [alldata, setAlldata] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

const [fields, setFields]= useState({})

function onchangehandler(name,e){
setFields((prev)=>({...prev,[name]:e.target.value}))
}

useEffect(()=>{
console.log("hhh", alldata)
},[alldata])
useEffect(()=>{
  console.log(fields)
},[fields])


  useEffect(() => {
    myfunction();
  }, []);


  
  const myfunction = async () => {
    try {
      const result = await axios.post(`${process.env.REACT_APP_API}/api/allusers`,{fields})
      setAlldata(result?.data.data);
      console.log("nazim", result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async(_id)=>{
       await axios.delete(`${process.env.REACT_APP_API}/api/deleteuser/${_id}`)
       window.location.reload()
  }
  return (
    <>
      {/* <Container maxW="container.sm"> */}
        <h1>ALl users</h1>
{/* FIlters */}
<div style={{display:'flex', justifyContent:"center"}} spacing={3}>
  <Input onChange={(e)=>onchangehandler("name", e)} placeholder='Name' size='sm' />
  <Input onChange={(e)=>onchangehandler("email",e)} placeholder='Email' size='sm' />
  {/* <Input placeholder='medium size' size='sm' />
  <Input placeholder='medium size' size='sm' /> */}
  <Button onClick={myfunction}>Button</Button>
</div>

{/* filter end */}
        <TableContainer>
  <Table size='sm' variant='striped' colorScheme='blue'>
    <Thead>
      <Tr>
        <Th>S.no</Th>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Password</Th>
        <Th>Phone</Th>
        <Th>Time</Th>
        <Th>Delete</Th>
      </Tr>
    </Thead>
    <Tbody>
        { alldata && alldata?.map((value, index)=>(
      <Tr>
        <Td key={index}>{index+1}</Td>
        <Td>{value?._id}</Td>
        <Td>{value?.name}</Td>
        <Td>{value?.email}</Td>
        <Td>{value?.password}</Td>
        <Td>{value?.phone}</Td>
        <Td>{value?.createdAt}</Td>
        <Td><Button onClick={()=>deleteUser(value?._id)} variant='outline' colorScheme='red'>Delete</Button></Td>
    </Tr>
        ))}
    </Tbody>
  </Table>
</TableContainer>
      {/* </Container> */}
    </>
  );
};

export default Allusers;
