import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './ui/RequireAuth';
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { OAuthCallback } from './routes/callbacks/OAuthCallback';
import { MinhasMesas } from './routes/MinhasMesas';
import { MinhasFichas } from './routes/MinhasFichas';
import { DetalhesFichaCoCQueryParam } from './routes/DetalhesFichaCoCQueryParam';
import { DetalhesMesaCoCQueryParam } from './routes/DetalhesMesaCoCQueryParam';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { StompSessionProvider } from 'react-stomp-hooks';
import { Layout } from './ui/Layout';
export function App(){

	const colorScheme = useColorScheme();

  	return (
		<MantineProvider theme={
			{ 
			 	colorScheme,
				primaryColor: 'teal',
				primaryShade: {
					light: 4,
					dark: 6
				},
			}
		} withGlobalStyles withNormalizeCSS>
			<Notifications position="top-right" autoClose={3000}/>
			<Router>
				<Layout>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/login/oauth/callback" element={<OAuthCallback />}/>	
						<Route path="/" element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						} />
						<Route path="/sheets/coc/details" element={
							<RequireAuth>
								<DetalhesFichaCoCQueryParam />
							</RequireAuth>
						}/>
						<Route path="/sessions/coc/details" element={
							<RequireAuth>
								<DetalhesMesaCoCQueryParam />
							</RequireAuth>
						}/>
						<Route path="/me/sessions" element={
							<RequireAuth mestrePerm={true}>
								<StompSessionProvider url={`${process.env.REACT_APP_WS_URL}core/ws`}>
									<MinhasMesas />
								</StompSessionProvider>
							</RequireAuth>
						}/>
						<Route path="/me/sheets" element={
							<RequireAuth>
								<MinhasFichas />
							</RequireAuth>
						}/>
					</Routes>
				</Layout>
			</Router>
		</MantineProvider>
	);
}
