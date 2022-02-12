import React from 'react';
import { Layout as AntdLayout, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content, Footer, Header } from 'antd/lib/layout/layout';
//import SubMenu from 'antd/lib/menu/SubMenu';
import Menu from 'antd/lib/menu';
import { HeaderContent } from "../ui/Header";
import Logo from "../assets/img/menuIcon.png";
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface LayoutState {
	siderCollapsed: boolean;
	siderCollapsedWidth: number;
}

class Layout extends React.Component<any, LayoutState> {

    state : LayoutState = {
		siderCollapsed: false,
		siderCollapsedWidth: 80
	}

    toggle = () => {
		this.setState({
			siderCollapsed: !this.state.siderCollapsed,
		});
    }

    render = () => {
        return(
            <AntdLayout className="h-100 d-flex flex-row">
				<Sider 
					trigger={null} 
					collapsible 
					collapsed={this.state.siderCollapsed} 
					breakpoint={"md"} 
					collapsedWidth={this.state.siderCollapsedWidth} 
					onBreakpoint={(broken: boolean) => {this.setState({siderCollapsedWidth: broken ? 0 : 80, siderCollapsed: broken})}}>
					
					<div onClick={this.toggle} style={{ cursor: "pointer", display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center" }}>
						{!this.state.siderCollapsed && <Typography.Title level={4} style={{ color: "white", paddingLeft: "10px" }}>RPGTracker</Typography.Title>}
						<img src={`${Logo}`} alt="logo" width={75}/>
					</div>
					<Menu
						mode="inline"
						theme="dark">
                            <Menu.Item key="home_menu_opt" icon={<HomeOutlined />}>
                                <Link to={"/"} style={{ textDecoration: "none", color:"white" }}>Home</Link>
                            </Menu.Item>
					</Menu>
				</Sider>
				<AntdLayout>
					<Header style={{ padding: this.state.siderCollapsedWidth === 0 ? "0" : "0, 50px" }}>
						<HeaderContent siderHidden={this.state.siderCollapsedWidth === 0} siderCollapsed={this.state.siderCollapsed} siderCallback={this.toggle}/>
					</Header>
					<Content style={{ margin: '24px 16px 0' }}>
						{this.props.children}
					</Content>
					<Footer className="mt-auto text-center" color="primary">
						<Typography>Developed by <Typography.Link>@HannaBananna</Typography.Link></Typography>
					</Footer>
				</AntdLayout>
			</AntdLayout>
        );
    }

}

export default Layout;