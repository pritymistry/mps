import { useState } from "react";
import { Button, Form, Input, Flex, Anchor } from "antd";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/auth/authSlice";


function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // const [username,setUsername]=useState('')
  const onFinish = () => {
    dispatch(signIn(formData)).then(()=>{
      navigate('/')
    }).catch((err)=>{
        console.log(err)
    })

    // axios.post("http://localhost:5000/users/signin",formData)
    // .then((res)=>{
    //     localStorage.setItem("jwtToken",res.data.token)
    //     localStorage.setItem("username",res.data.usfirstername)
    //     console.log(res)
    //     // setUsername(res.data.username)
    // })
    // .catch((err)=>
    // console.log(err.message));
    // console.log("Success:", values);
    // console.log(formData);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Flex justify="center" style={{ marginTop: "20px" }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {type:"email"}
          ]}hasFeedback
        >
          <Input
            placeholder="youMail@gmail.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="******"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Anchor>
            <Link to="/signup">Craete Account</Link>
          </Anchor>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default SignIn;
