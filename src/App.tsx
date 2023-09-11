import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequireAuth } from './ui/RequireAuth';
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { OAuthCallback } from './routes/callbacks/OAuthCallback';
import { MinhasMesas } from './routes/MinhasMesas';
import { MinhasFichas } from './routes/MinhasFichas';
import { DetalhesFichaCoCQueryParam } from './routes/coc/DetalhesFichaCoCQueryParam';
import { DetalhesMesaCoCQueryParam } from './routes/coc/DetalhesMesaCoCQueryParam';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import { StompSessionProvider } from 'react-stomp-hooks';
import { Layout } from './ui/Layout';
import { CoCAmmoListing } from './routes/coc/CoCAmmoListing';
import { CoCOccupationListing } from './routes/coc/CoCOccupationListing';
import { COCPulpTalentListing } from './routes/coc/CoCPulpTalentsListing';
import { CoCSkillListing } from './routes/coc/CoCSkillListing';
import { CoCWeaponListing } from './routes/coc/CoCWeaponListing';

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
						<Route path="/" element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						} />
						<Route path="/login" element={<Login />}/>
						<Route path="/login/oauth/callback" element={<OAuthCallback />}/>
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
						<Route path='me'>
							<Route path="sessions" element={
								<RequireAuth mestrePerm={true}>
									<StompSessionProvider url={`${process.env.REACT_APP_WS_URL}core/ws`}>
										<MinhasMesas />
									</StompSessionProvider>
								</RequireAuth>
							}/>
							<Route path="sheets" element={
								<RequireAuth>
									<MinhasFichas />
								</RequireAuth>
							}/>
						</Route>
						<Route path='listing'>
							<Route path='coc'>
								<Route path='ammo' element={
									<RequireAuth>
										<CoCAmmoListing />
									</RequireAuth>
								}/>
								<Route path='occupations' element={
									<RequireAuth>
										<CoCOccupationListing />
									</RequireAuth>
								}/>
								<Route path='pulp-talents' element={
									<RequireAuth>
										<COCPulpTalentListing />
									</RequireAuth>
								}/>
								<Route path='skills' element={
									<RequireAuth>
										<CoCSkillListing />
									</RequireAuth>
								}/>
								<Route path='weapons' element={
									<RequireAuth>
										<CoCWeaponListing />
									</RequireAuth>
								}/>
							</Route>
						</Route>
					</Routes>
				</Layout>
			</Router>
		</MantineProvider>
	);
}
