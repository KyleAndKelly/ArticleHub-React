import './index.scss'
import React from 'react';
import { Card,Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
const Login = () => {
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
      label="Username"
      name="username"
      
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
      label="Password"
      name="password"
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