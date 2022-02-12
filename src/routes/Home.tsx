import React from "react";
import { notification, Skeleton, Typography } from "antd";
import MinhasFichas from "../ui/MinhasFichas";
import { AccountService } from "../components/services/AccountService";
import { CurrentUser } from "../components/models/CurrentUser";

export interface HomeState {
	currentUserObj?: CurrentUser;
	loading: boolean;
}

class Home extends React.Component<any, HomeState> {

    state : HomeState = {
		currentUserObj: undefined,
		loading: true
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

    render() {
        return(
			<Skeleton active loading={this.state.loading}>
				<Typography.Title>Welcome back, {this.state.currentUserObj?.first_name ?? this.state.currentUserObj?.nickname ?? "Anon"}</Typography.Title>
				<MinhasFichas />
			</Skeleton>
        );
    }
}

export default Home;