import './index.scss'
import React from 'react';
import { Card,Button, Checkbox, Form, Input, message } from 'antd';
import {useDispatch} from 'react-redux'
import { fetchLogin } from '@/store/modules/user';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (values) => {
        try {
            console.log('Success:', values);
            await dispatch(fetchLogin(values)); 
            navigate('/layout');
            message.success('Login success');
        } catch (error) {
            console.error('Login failed:', error);
            message.error('Login failed. Please check your credentials and try again.');
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return  <div className="login">

    <Card
      className="login-container"
    >
  <Form
    name="basic"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    validateTrigger={['onBlur']}
  >
  <Form.Item
      name="mobile"
      
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input placeholder= "please input username" />
    </Form.Item>

    <Form.Item
      name="code"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password placeholder= "please input password"/>
    </Form.Item>

    <Form.Item label={null}>
      <Button block type="primary" htmlType="submit">
        Log in
      </Button>
    </Form.Item>
  </Form>
  </Card>
    </div>
  }
  export default Login