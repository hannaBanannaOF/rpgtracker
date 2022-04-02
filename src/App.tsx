import { ConfigProvider } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './components/providers/AuthProvider';
import { RequireAuth } from './components/routes/PrivateRoute';
import Home from './routes/Home';
import { Login } from './routes/Login';
import "./App.css";
import { SmileOutlined } from '@ant-design/icons';
import { OAuthCallback } from './routes/callbacks/OAuthCallback';
import DetalhesFichaCoC from './routes/DetalhesFichaCoC';
import Layout from './ui/Layout';
import { FeatureToggleService } from './components/services/FeatureToggleService';

class App extends React.Component {

	state = {
		new_login: false,
		render: false
	}

	customizeRenderEmpty = () => (
        <div style={{ textAlign: 'center' }}>
            <SmileOutlined style={{ fontSize: 20 }} />
            <p>Nada encontrado</p>
        </div>
    );

	componentDidMount = () => {
		FeatureToggleService.getFeatureActive("NEW_LOGIN").then(response => {
			this.setState({	
				new_login: response.data,
				render: true
			});
		});
	}

  	render() {
		if (!this.state.render) return null;
        return (
			<AuthProvider>
				<ConfigProvider renderEmpty={this.customizeRenderEmpty}>
					<Router>
						<Routes>
							<Route path="/login" element={<Login hbauth={this.state.new_login}/>} />
							<Route path="/login/oauth/callback" element={<OAuthCallback provider='discord' hbauth={this.state.new_login}/>}/>
							<Route path="/" element={
								<RequireAuth>
									<Layout>
										<Home />
									</Layout>
								</RequireAuth>
							} />
							<Route path="/fichas/coc/details/" element={
								<RequireAuth>
									<Layout>
										<DetalhesFichaCoC />
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
