import { useState } from 'react'
import { Button, Form, Input, Flex, Anchor } from 'antd';
import { Link } from 'react-router-dom'
// import axios from 'axios'
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/auth/authSlice';



function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
        
    });
    const dispatch=useDispatch()
    const onFinish = (values) => {
        // axios.post('http://127.0.0.1:5000/users/signup',{
        //     username:formData.name,
        //     email:formData.email,
        //     password:formData.password
        // })
        // .then((res)=>{
        //     console.log(res.data)
        // }).catch((err)=>{
        //     alert(err)
        // })
       dispatch(signUp(formData)).then(()=>{
        console.log('Success:', values)
       }
       ).catch((err)=>{
        console.log(err)
       })
       
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Flex justify='center' style={{ marginTop: '20px' }}>
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
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },{
                            min:5
                        }
                    ]}hasFeedback
                >
                    <Input placeholder="YourName"
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }}
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },{
                            type:"email"
                        }
                    ]}hasFeedback
                >
                    <Input placeholder="youMail@gmail.com"
                        value={formData.email}
                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },{
                            min:5
                        },{max:15}
                    ]}hasFeedback
                >
                    <Input.Password placeholder="******"
                        value={formData.password}
                        onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }}
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
                        <Link to="/signin">Already have an Account</Link>
                    </Anchor>
                </Form.Item>
            </Form>

        </Flex>
    )
}

export default SignUp