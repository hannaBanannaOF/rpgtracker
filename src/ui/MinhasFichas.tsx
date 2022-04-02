import { Avatar, Col, Divider, List, notification, Row, Skeleton, Tooltip } from 'antd';
import React, { CSSProperties } from 'react';
import { GiOctopus, GiHarryPotterSkull } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { AccountService } from '../components/services/AccountService';

export interface MinhasFichasState {
    fichas: [],
    loading: boolean
}

interface MesaDTO {
    name: string,
}

interface MinhasFichasDTO {
    id: number,
    nome_personagem: string,
    get_content_type: string,
    mesa? : MesaDTO
}

class MinhasFichas extends React.Component<any, MinhasFichasState> {

    state: MinhasFichasState = {
        fichas: [],
        loading: true
    }

    componentDidMount() {
        AccountService.getCurrentUserFichas().then((res) => {
			this.setState({fichas: res.data, loading: false});
		}).catch(err => {
			notification.error({
				message: "Erro ao buscar fichas do usuário",
				description: err.response?.data?.detail ?? ""
			});
		});
    }

    getContentTypeItem = (content_type: string) => {
        let defStyle: CSSProperties = { color: "black" }
        if(content_type === 'coc') {
            return <GiOctopus style={defStyle}/>;
        }
        if(content_type === 'hp') {
            return <GiHarryPotterSkull style={defStyle}/>;
        }
    }

    getContentTypeTooltip = (content_type: string) => {
        if(content_type === 'coc') {
            return "Call of Cthulhu";
        }
        if(content_type === 'hp') {
            return "Harry Potter (Broomstix)";
        }
    }

    render() {
        return (
            <Row justify='center'>
                <Divider orientation="left">Minhas fichas</Divider>
                <Col span={24} lg={12}>
                    <Skeleton loading={this.state.loading} active>
                        
                        <List dataSource={this.state.fichas} renderItem={(item: MinhasFichasDTO) => (
                            <List.Item actions={[
                                <Link to={`fichas/${item.get_content_type}/details/?pk=${item.id}`}>Ver</Link>
                            ]}>
                                <List.Item.Meta
                                    avatar={<Tooltip title={this.getContentTypeTooltip(item.get_content_type)}><Avatar icon={this.getContentTypeItem(item.get_content_type)} /></Tooltip>}
                                    title={item.nome_personagem}
                                    description={item.mesa?.name ?? ""}
                                />
                            </List.Item>
                        )}/>
                    </Skeleton>
                </Col>
            </Row>
        );
    }
}

export default MinhasFichas;