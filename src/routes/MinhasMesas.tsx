import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Descriptions, Divider, List, PageHeader, Row, Skeleton, Tag, Tooltip } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { GiHarryPotterSkull, GiOctopus } from "react-icons/gi";
import { useNavigate } from "react-router";
import { FichaBase } from "../components/models/Ficha";
import { MesaBase } from "../components/models/Mesa";
import { AccountService } from "../components/services/AccountService";

export function MinhasMesas() {

    const [loading, setLoading] = useState(true);
    const [mesas, setMesas] = useState<MesaBase[] | null>(null);

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        AccountService.getCurrentUserMesasMestradas().then(res => {
            setMesas(res.data);
            setLoading(false);
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

    return <Row justify='center'>
        <Divider orientation="left">Minhas Mesas</Divider>
        <Col span={24} lg={12}>
            <Skeleton loading={loading} active>
                <List dataSource={mesas!} grid={{ gutter: 16, column: 1 }} renderItem={(item: MesaBase) => (
                    <List.Item key={item.id}>
                        <PageHeader avatar={{ icon: getContentTypeItem(item.get_content_type) }} 
                            subTitle={getContentTypeTooltip(item.get_content_type)}
                            ghost={false} title={item.name} 
                            tags={item.open_session ? <Tag color={"green"}>Sessão aberta</Tag> : undefined}
                            extra={[
                                <Button key="open-mesa-action" type="primary" onClick={() => {navigate(`mesas/${item.get_content_type}/details?pk=${item.id}`)}}>
                                    Ver fichas
                                </Button>
                            ]}>
                            <Descriptions size="small">
                                <Descriptions.Item label="Players">
                                    <Avatar.Group>
                                        {item.fichas_mesa.map((ficha: FichaBase) => <Tooltip title={ficha.jogador.first_name ?? "Anon"}>
                                            <Avatar src={ficha.jogador?.photo ?? undefined} icon={<UserOutlined />} style={{ cursor: "pointer" }}/>
                                        </Tooltip>)}
                                    </Avatar.Group>
                                </Descriptions.Item>
                            </Descriptions>
                        </PageHeader>
                    </List.Item>
                )}/>
            </Skeleton>
        </Col>
    </Row>
}