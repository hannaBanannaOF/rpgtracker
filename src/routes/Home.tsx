import { useAuth } from "../providers/AuthProvider";
import { Title } from '@mantine/core';

export function Home() {
	const auth = useAuth();

	

	return (
		<Title order={2}>Welcome back, {auth.currentUser?.name ?? "Anon"}</Title>
	)
}