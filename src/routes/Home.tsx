import React from "react";
import { Layout, notification, Skeleton, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Content, Footer, Header } from 'antd/lib/layout/layout';
//import SubMenu from 'antd/lib/menu/SubMenu';
import Menu from 'antd/lib/menu';
import { HeaderContent } from "../ui/Header";
import Logo from "../assets/img/menuIcon.png";
import MinhasFichas from "../ui/MinhasFichas";
import { AccountService } from "../components/services/AccountService";
import { CurrentUser } from "../components/models/CurrentUser";

interface HomeState {
	siderCollapsed: boolean;
	currentUserObj?: CurrentUser;
	loading: boolean;
	siderCollapsedWidth: number;
}

class Home extends React.Component<any, HomeState> {

    state : HomeState = {
		siderCollapsed: false,
		currentUserObj: undefined,
		loading: true,
		siderCollapsedWidth: 80
	}

	componentDidMount = () => {
		AccountService.getCurrentUserObj().then((res) => {
			this.setState({currentUserObj: res.data, loading: false});
		}).catch(err => {
			notification.error({
				message: "Erro ao buscar informações do usuário",
				description: err.response?.data?.detail ?? ""
			});
		});
	}

    toggle = () => {
		this.setState({
			siderCollapsed: !this.state.siderCollapsed,
		});
    };

    render() {
        return(
            <Layout className="h-100 d-flex flex-row">
				<Sider 
					trigger={null} 
					collapsible 
					collapsed={this.state.siderCollapsed} 
					breakpoint={"md"} 
					collapsedWidth={this.state.siderCollapsedWidth} 
					onBreakpoint={(broken: boolean) => {this.setState({siderCollapsedWidth: broken ? 0 : 80})}}>
					
					<div onClick={this.toggle} style={{ cursor: "pointer", display: "flex", flexDirection: "row", justifyItems: "center", alignItems: "center" }}>
						{!this.state.siderCollapsed && <Typography.Title level={4} style={{ color: "white", paddingLeft: "10px" }}>RPGTracker</Typography.Title>}
						<img src={`${Logo}`} alt="logo" width={75}/>
					</div>
					<Menu
						mode="inline"
						theme="dark">
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ padding: this.state.siderCollapsedWidth === 0 ? "0" : "0, 50px" }}>
						<HeaderContent siderHidden={this.state.siderCollapsedWidth === 0} siderCollapsed={this.state.siderCollapsed} siderCallback={this.toggle}/>
					</Header>
					<Content style={{ margin: '24px 16px 0' }}>
						<Skeleton active loading={this.state.loading}>
							<Typography.Title>Welcome back, {this.state.currentUserObj?.first_name ?? this.state.currentUserObj?.nickname ?? "Anon"}</Typography.Title>
							<MinhasFichas />
						</Skeleton>
					</Content>
					<Footer className="mt-auto text-center" color="primary">
						<Typography>Developed by <Typography.Link>@HannaBananna</Typography.Link></Typography>
					</Footer>
				</Layout>
			</Layout>
        );
    }
}

export default Home;