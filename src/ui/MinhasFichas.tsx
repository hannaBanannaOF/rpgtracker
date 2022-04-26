import { Avatar, Button, Col, Divider, List, notification, Row, Skeleton, Tooltip } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { GiOctopus, GiHarryPotterSkull } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FichaBase as Ficha } from '../components/models/Ficha';
import { AccountService } from '../components/services/AccountService';


export function MinhasFichas() {

    const [loading, setLoading] = useState(true);
    const [fichas, setFichas] = useState<Ficha[] | null>(null);

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        AccountService.getCurrentUserFichas().then((res) => {
            setLoading(false);
            setFichas(res.data)
		}).catch(err => {
			notification.error({
				message: "Erro ao buscar fichas do usuário",
				description: err.response?.data?.detail ?? ""
			});
		});
    }, []);

    const getContentTypeItem = (content_type: string) => {
        let defStyle: CSSProperties = { color: "black" }
        if(content_type === 'coc') {
            return <GiOctopus style={defStyle}/>;
        }
        if(content_type === 'hp') {
            return <GiHarryPotterSkull style={defStyle}/>;
        }
    }

    const getContentTypeTooltip = (content_type: string) => {
        if(content_type === 'coc') {
            return "Call of Cthulhu";
        }
        if(content_type === 'hp') {
            return "Harry Potter (Broomstix)";
        }
    }

    return (
        <Row justify='center'>
            <Divider orientation="left">Minhas fichas</Divider>
            <Col span={24} lg={12}>
                <Skeleton loading={loading} active>
                    <List dataSource={fichas!} renderItem={(item: Ficha) => (
                        <List.Item 
                            key={item.id}    
                            style={{ backgroundColor: "white", padding: 20 }}
                            actions={[
                                <Button type="primary" onClick={() => {navigate(`fichas/${item.get_content_type}/details?pk=${item.id}`)}}>
                                    Ver
                                </Button>
                        ]}>
                            <List.Item.Meta
                                avatar={<Tooltip title={getContentTypeTooltip(item.get_content_type)}><Avatar icon={getContentTypeItem(item.get_content_type)} /></Tooltip>}
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