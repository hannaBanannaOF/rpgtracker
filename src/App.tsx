import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './components/providers/AuthProvider';
import { RequireAuth } from './components/routes/RequiredPermRoute';
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import "./App.css";
import { OAuthCallback } from './routes/callbacks/OAuthCallback';
import { DetalhesFichaCoC } from './routes/DetalhesFichaCoC';
import { MinhasMesas } from './routes/MinhasMesas';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { Layout } from './ui/Layout';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CssBaseline } from '@mui/material';


export function App(){

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = React.useMemo(
		() =>
		  createTheme({
			palette: {
			  mode: prefersDarkMode ? 'dark' : 'light',
			  primary: {
				  main: deepPurple[900]
			  }
			},
		  }),
		[prefersDarkMode],
	  );


  	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/login/oauth/callback" element={<OAuthCallback />}/>
						<Route path="/" element={
							<RequireAuth>
								<Layout>
									<Home />
								</Layout>
							</RequireAuth>
						} />
						<Route path="/fichas/coc/details" element={
							<RequireAuth>
								<Layout>
									<DetalhesFichaCoC />
								</Layout>
							</RequireAuth>
						}/>
						<Route path="/minhas-mesas" element={
							<RequireAuth mestrePerm={true}>
								<Layout>
									<MinhasMesas />
								</Layout>
							</RequireAuth>
						}/>
					</Routes>
				</Router>
			</ThemeProvider>
		</AuthProvider>
	);
}
