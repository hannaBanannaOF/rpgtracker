import { Col, Divider, notification, Row, Typography } from "antd";
import Bg from '../assets/img/bg.jpg';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../components/providers/AuthProvider";
import { FaDiscord, FaLock } from "react-icons/fa";
import React, { useState } from "react";

export interface LoginProps {
    hbauth: boolean
}

export function Login(props: LoginProps) {
    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
  
    let from = (location.state as any)?.from?.pathname || "/";
  
    let [authent, setAuthent] = useState(false);

    function handleSubmit(values: string) {  
        setAuthent(true);
        auth.signin(values, () => {
        navigate(from, { replace: true });
      }, (message) => {
            setAuthent(false);
            notification.error({
                message: 'Falha ao realizar login!',
                description: message
            });
      });
    }

    function redirectOAuth(redirect: string) {
        window.location.replace(redirect);
    }
  
    if (auth.valid()) {
        return <Navigate to={from} replace />;
    }

    return(
        <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0)), url(${Bg})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", height: "100%"}}>
            <Row style={{ height: "50%" }} align="middle">
                <Col span={24} style={{ padding: 20 }} lg={12}>
                    <Form
                        name="login"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        layout="vertical"
                        size="large"
                        onFinish={handleSubmit}
                        >
                            <Divider style={{ color: "white" }} orientation="left">
                                <Typography.Title style={{ color: "white" }}>Login</Typography.Title>
                            </Divider>
                            {!props.hbauth && <React.Fragment>
                                <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Email obrigatório!' }]}
                                style={{ color: "white" }}>
                                    <Input prefix={<UserOutlined />} placeholder="Usuário"/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Senha obrigatória!' }]}
                                >
                                    <Input.Password prefix={<LockOutlined />} placeholder="Senha"/>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={authent}>
                                        Entrar
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Divider orientation="center" style={{ borderColor: "white" }}>
                                        <Typography.Text style={{ color: "white" }}>Ou</Typography.Text>
                                    </Divider>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={() => redirectOAuth(process.env.REACT_APP_DISCORD_OAUTH_REDIRECT!)} style={{ width: "100%", color: "white", backgroundColor:"#7289da", border: "none" }} loading={authent}>
                                        <FaDiscord size={25} style={{ marginRight: "5px" }}/> Login com Discord
                                    </Button>
                                </Form.Item>    
                            </React.Fragment>}
                            {props.hbauth && <Form.Item>
                                <Button onClick={() => redirectOAuth(process.env.REACT_APP_HBAUTH_OAUTH_REDIRECT!)} style={{ width: "100%", color: "azure", backgroundColor:"purple", border: "none" }}>
                                    <FaLock size={25} style={{ marginRight: "5px" }}/> Login com HBAuth
                                </Button>
                            </Form.Item>}
                        </Form>
                </Col>
            </Row>
        </div>
    );
}