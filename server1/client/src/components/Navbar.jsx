import { Button, Menu } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
const navigate=useNavigate();
  const signOut=()=>{
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    navigate('/');
  }
  const id=localStorage.getItem('id');
  return (
    <Menu
      mode='horizontal'
    >
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      {
        !localStorage.getItem('username')?
      (<>
      <Menu.Item>
        <Link to="/signup">SignUp</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/signin">SignIn</Link>
      </Menu.Item>
      </>) :
      (
        <>
        <Menu.Item>
        <b onClick={()=>{
          navigate(`/sellerProfile/${id}`)
        }}>{localStorage.getItem('username') }</b>
        </Menu.Item>
        <Menu.Item>
         <Button onClick={signOut}>SignOut</Button>
      </Menu.Item>
        </>
      )
      }
    </Menu>
  )
}

export default Navbar