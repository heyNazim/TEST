import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs} from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'

const Home = () => {
  return (
 <>
 <div className='homepage'>
<Container >
  <Box mt='4' boxShadow='md' p='6' rounded='md' bg='white'>
  <Tabs variant='soft-rounded'>
  <TabList>
    <Tab width='50%'>Login</Tab>
    
    <Tab width='50%'>SignUp</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
               <Login/>
    </TabPanel>
    <TabPanel>
               <Register/>
    </TabPanel>
  </TabPanels>
</Tabs>
  </Box>
</Container>
 </div>
 </>
  )
}

export default Home