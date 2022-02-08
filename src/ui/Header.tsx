import { Col, Dropdown, Menu, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/providers/AuthProvider';
import { BiLogOut } from "react-icons/bi";
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import Logo from "../assets/img/menuIcon.png";

export interface HeaderContentProps {
    siderHidden: boolean,
    siderCollapsed: boolean,
    siderCallback: () => void
}

export function HeaderContent(props: HeaderContentProps) {

    let auth = useAuth();
    let navigate = useNavigate();

    const menu = (
        <Menu style={{ marginTop: "10px" }}>
            <Menu.Item key="logout_menuItem" onClick={() => {auth.signout(() => {navigate("/login")})}}>
                <BiLogOut /> <Typography.Text>Sair</Typography.Text>
            </Menu.Item>
        </Menu>
    );

    return(
        <Row justify="space-between">
            <Col>
                {props.siderHidden && props.siderCollapsed && <img src={`${Logo}`} alt="logo" width={75} onClick={() => {props.siderCallback()}}/>}
            </Col>
            <Col style={{ marginRight: props.siderHidden ?  "5px" : 0 }}>
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                    <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }}/>
                </Dropdown>
            </Col>
        </Row>
    );

}