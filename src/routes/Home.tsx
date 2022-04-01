import React from "react";
import { Skeleton, Typography } from "antd";
import MinhasFichas from "../ui/MinhasFichas";
import AuthContext from "../components/providers/AuthProvider";

export interface HomeState {}

class Home extends React.Component<any, HomeState> {

	static contextType = AuthContext;

    render() {
		let context = this.context
        return(
			<Skeleton active loading={false}>
				<Typography.Title>Welcome back, {context.getCurrUser()?.first_name ?? context.getCurrUser()?.nickname ?? "Anon"}</Typography.Title>
				<MinhasFichas />
			</Skeleton>
        );
    }
}

export default Home;