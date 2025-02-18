import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

const LoginPage = () => {
    const onFinish = () => { };

    return (
        <div className="relative h-screen w-screen flex justify-center items-center bg-gray-100">
            <div className="absolute inset-0 bg-cover bg-center blur-2xl" style={{ backgroundImage: "url('images/bg.jpg')" }}></div>

            <div className="absolute top-5 left-5 w-44 h-16 bg-no-repeat bg-contain" style={{ backgroundImage: "url('images/logo.png')" }}></div>

            <main className="relative z-10 w-full bg-opacity-30 max-w-sm bg-white p-6 rounded-2xl shadow-md">
                <div className="text-center mb-10">
                    <Title level={2} className="mt-6 mb-2" style={{ color: '#486a96' }}>Sign in</Title>
                    <Text className="text-gray-500">
                        Welcome to TatsYM!
                    </Text>
                </div>
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item className="mt-7" name="email"
                        rules={[{ required: true, message: "Email is required!" }]} >
                        <Input placeholder="Email" style={{ backgroundColor: 'rgba(255, 255, 255, 0.66)' }}
                            prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="gray" className="size-4 mr-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>}
                        />
                    </Form.Item>

                    <Form.Item className="mt-7" name="password"
                        rules={[{ required: true, message: "Password is required!" }]} >
                        <Input.Password style={{ backgroundColor: 'rgba(255, 255, 255, 0.66)' }} placeholder="Password"
                            prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.3" stroke="gray" className="size-4 mr-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>}
                        />
                    </Form.Item>

                    <div className="mb-10 flex justify-between items-center">
                        <Checkbox className="text-cyan-900">Remember me</Checkbox>
                        <Link to="#" style={{ float: 'right' }} className="text-cyan-600 hover:underline hover:text-cyan-800 text-sm">
                            Forgot password?
                        </Link>
                    </div>

                    <Form.Item className="mb-6">
                        <Button block htmlType="submit" className='text-white border-0 bg-opacity-50 bg-gradient-to-br from-cyan-700/50 to-blue-700/60 font-medium rounded-lg px-5'>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </main>
        </div>
    );
};

export default LoginPage;