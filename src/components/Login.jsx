import bcrypt from 'bcryptjs'
import { Form, Input, Button } from 'antd'

const mySalt = '$2a$10$kAKU.0I/xxkMEjCAftbgg.'

export default function Login ({ setUser, setReturningUser}) {
  function handleLogin({ email, password }) {
    const hashedPassword = bcrypt.hashSync(password, mySalt)
    fetch('https://auth-hash-api-zl.web.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: hashedPassword})
    })
    .then(response => response.json())
    .then(data => setUser(data.user || { email }))
    .catch(err => alert(err))
  }
  return(
    <Form
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    onFinish={handleLogin}
    >
      <h1>Login</h1>
      <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!'}]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset:8, span: 16 }}>
        <Button type="primary" htmlType="submit">Login</Button>
        &nbsp;
        <Button type="ghost" onClick={() => setReturningUser(false)} htmlType="button">Go to Signup</Button>
      </Form.Item>
    </Form>
  )
}
