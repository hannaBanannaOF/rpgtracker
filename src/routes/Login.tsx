import { Col, Divider, notification, Row, Typography } from "antd";
import Bg from '../assets/img/bg.jpg';
import { Form, Button } from 'antd';
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../components/providers/AuthProvider";
import { FaLock } from "react-icons/fa";
import { useState } from "react";

export interface LoginProps {
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
        setAuthent(true);
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
                            <Form.Item>
                                <Button loading={authent} onClick={() => redirectOAuth(process.env.REACT_APP_HBAUTH_OAUTH_REDIRECT!)} style={{ width: "100%", color: "azure", backgroundColor:"purple", border: "none" }}>
                                    <FaLock size={25} style={{ marginRight: "5px" }}/> Login com HBAuth
                                </Button>
                            </Form.Item>
                        </Form>
                </Col>
            </Row>
        </div>
    );
}