import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/providers/AuthProvider';
import { RequireAuth } from './components/routes/RequiredPermRoute';
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { OAuthCallback } from './routes/callbacks/OAuthCallback';
import { DetalhesFichaCoC } from './routes/DetalhesFichaCoC';
import { MinhasMesas } from './routes/MinhasMesas';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { Layout } from './ui/Layout';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CssBaseline, Fade, IconButton } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Close } from '@mui/icons-material';
import { PermissionProvider } from './components/providers/PermissionProvider';
import { MinhasFichas } from './ui/MinhasFichas';

export function App(){

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const notistackRef: any = React.createRef();
	const onClickDismiss = (key: any) => () => { 
		notistackRef.current.closeSnackbar(key);
	}

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
			<PermissionProvider>
				<ThemeProvider theme={theme}>
					<SnackbarProvider 
					ref={notistackRef}
					action={(key: any) => (
						<IconButton onClick={onClickDismiss(key)}>
							<Close />
						</IconButton>
					)}
					maxSnack={3} 
					preventDuplicate 
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					TransitionComponent={Fade}
					>
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
								<Route path="/me/sesssions" element={
									<RequireAuth mestrePerm={true}>
										<Layout>
											<MinhasMesas />
										</Layout>
									</RequireAuth>
								}/>
								<Route path="/me/sheets" element={
									<RequireAuth>
										<Layout>
											<MinhasFichas />
										</Layout>
									</RequireAuth>
								}/>
							</Routes>
						</Router>
					</SnackbarProvider>
				</ThemeProvider>
			</PermissionProvider>
		</AuthProvider>
	);
}
