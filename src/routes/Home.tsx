import { useTranslation } from "react-i18next";
import { useAuth } from "../providers/AuthProvider";
import { Skeleton, Title } from '@mantine/core';

export function Home() {
	const auth = useAuth();
	const { t } = useTranslation('home');

	return (
		<Skeleton visible={auth.loading || auth.currentUser == null}>
			<Title order={2}>{t('welcomeBack', { userName: auth.currentUser?.name ?? "Anon" })}</Title>
		</Skeleton>
	)
}