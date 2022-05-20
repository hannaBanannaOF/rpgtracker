import { MinhasFichas } from "../ui/MinhasFichas";
import { useAuth } from "../components/providers/AuthProvider";
import React, { useEffect, useState } from "react";
import { Skeleton, Typography } from "@mui/material";

export function Home() {
	const [loading, setLoading] = useState(true);
	const auth = useAuth();

	useEffect(() => {
		setLoading(auth.currentUser === undefined);
		// eslint-disable-next-line
	}, [auth.currentUser]);

	return loading? <Skeleton animation="wave" variant="text"/> : (
		<React.Fragment>
			<Typography variant="h2" component="div" sx={{ mb: 4 }}>Welcome back, {auth.currentUser?.first_name ?? auth.currentUser?.nickname ?? "Anon"}</Typography>
			<MinhasFichas />
		</React.Fragment>);
}