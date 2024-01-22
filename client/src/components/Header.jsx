import {AppBar, Toolbar, styled} from '@mui/material'
import { NavLink } from 'react-router-dom'

const Tabs = styled(NavLink)`
font-size:20px;
margin-right:40px;
color:inherit;
text-decoration:none;
`

const Header = () => {
  return (
    <AppBar position='static'>
        <Toolbar>
            <Tabs to='home'>Home</Tabs>
            <Tabs to='/all-products'>All User</Tabs>
            <Tabs to='/'>Add User</Tabs>
        </Toolbar>
    </AppBar>
  )
}

export default Header