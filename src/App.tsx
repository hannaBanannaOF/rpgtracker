import { ConfigProvider } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './components/providers/AuthProvider';
import { RequireAuth } from './components/routes/RequiredPermRoute';
import Home from './routes/Home';
import { Login } from './routes/Login';
import "./App.css";
import { SmileOutlined } from '@ant-design/icons';
import { OAuthCallback } from './routes/callbacks/OAuthCallback';
import DetalhesFichaCoC from './routes/DetalhesFichaCoC';
import { Layout } from './ui/Layout';
import { MinhasMesas } from './routes/MinhasMesas';
class App extends React.Component {

	customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <SmileOutlined style={{ fontSize: 20 }} />
            <p>Nada encontrado</p>
        </div>
    );

  	render() {
        return (
			<AuthProvider>
				<ConfigProvider renderEmpty={this.customizeRenderEmpty}>
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
				</ConfigProvider>
			</AuthProvider>
        );
  	}
}

export default App
