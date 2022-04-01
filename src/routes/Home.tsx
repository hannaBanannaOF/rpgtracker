import React from "react";
import { Skeleton, Typography } from "antd";
import MinhasFichas from "../ui/MinhasFichas";
import AuthContext, { useAuth } from "../components/providers/AuthProvider";

export interface HomeState {}

export function Home() {

	let auth = useAuth();

    return(
		<Skeleton active loading={auth.getCurrUser() === undefined}>
			<Typography.Title>Welcome back, {auth.getCurrUser()?.first_name ?? auth.getCurrUser()?.nickname ?? "Anon"}</Typography.Title>
			<MinhasFichas />
		</Skeleton>
	);
}

export default Home;