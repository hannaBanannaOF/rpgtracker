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
							<Route path="/login/oauth/callback" element={<OAuthCallback provider='discord' />}/>
							<Route path="/" element={
								<RequireAuth>
									<Home />
								</RequireAuth>
							} />
						</Routes>
					</Router>
				</ConfigProvider>
			</AuthProvider>
        );
  	}
}

export default App
