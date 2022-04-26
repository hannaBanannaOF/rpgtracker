import React, { useState } from 'react';
import { Layout as AntdLayout, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content, Footer, Header } from 'antd/lib/layout/layout';
//import SubMenu from 'antd/lib/menu/SubMenu';
import Menu from 'antd/lib/menu';
import { HeaderContent } from "../ui/Header";
import Logo from "../assets/img/menuIcon.png";
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/providers/AuthProvider';
import { GiTabletopPlayers } from 'react-icons/gi';

export function Layout(props: any) {

	let auth = useAuth();
	let navigate = useNavigate();

	const [siderCollapsed, setSiderCollapsed] = useState(false);
	const [siderCollapsedWidth, setSiderCollapsedWidth] = useState(80);

    const toggle = () => {
		setSiderCollapsed(!siderCollapsed);
    }

	const getMenuItems = () => {
		const itens = [
			{
				key: "home_menu_opt",
				label: "Home",
				icon: <HomeOutlined />,
				onClick: () => navigate("/")
			}
		];
		if (auth.getCurrUser()?.is_mestre!)
			itens.push({
					key: "minhas_mesas_menu_opt",
					label: "Minhas mesas",
					icon: <GiTabletopPlayers/>,
					onClick: () => navigate("/minhas-mesas")
			});
		return itens
	}

	return(
		<AntdLayout className="d-flex flex-row">
			<Sider 
				trigger={null} 
				collapsible 
				collapsed={siderCollapsed} 
				breakpoint={"md"} 
				collapsedWidth={siderCollapsedWidth} 
				onBreakpoint={(broken: boolean) => {
					setSiderCollapsed(broken);
					setSiderCollapsedWidth(broken ? 0 : 80);
				}}>
				
				<div onClick={toggle} style={{ cursor: "pointer", display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center" }}>
					{!siderCollapsed && <Typography.Title level={4} style={{ color: "white", paddingLeft: "10px" }}>RPGTracker</Typography.Title>}
					<img src={`${Logo}`} alt="logo" width={75}/>
				</div>
				<Menu
					mode="inline"
					theme="dark"
					items={getMenuItems()}/>
			</Sider>
			<AntdLayout style={{ minHeight: "100vh" }}>
				<Header style={{ padding: siderCollapsedWidth === 0 ? "0" : "0, 50px" }}>
					<HeaderContent siderHidden={siderCollapsedWidth === 0} siderCollapsed={siderCollapsed} siderCallback={toggle}/>
				</Header>
				<Content style={{ margin: '24px 16px 0' }}>
					{props.children}
				</Content>
				<Footer className="mt-auto text-center" color="primary">
					<Typography>Developed by <Typography.Link>@HannaBananna</Typography.Link></Typography>
				</Footer>
			</AntdLayout>
		</AntdLayout>
	);
}