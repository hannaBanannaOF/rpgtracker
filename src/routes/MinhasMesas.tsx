import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, List, Row, Skeleton, Space, Tooltip, Typography } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { GiHarryPotterSkull, GiOctopus } from "react-icons/gi";
import { Mesa } from "../components/models/Mesa";
import { AccountService } from "../components/services/AccountService";

export function MinhasMesas() {

    const [loading, setLoading] = useState(true);
    const [mesas, setMesas] = useState<Mesa[] | null>(null);

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
                <List dataSource={mesas!} grid={{ gutter: 16, column: 1 }} renderItem={(item: Mesa) => (
                    <List.Item key={item.id} actions={[
                        //<Link to={`fichas/${item.get_content_type}/details?pk=${item.id}`}>Ver</Link>
                    ]}>
                        <Card title={
                            <Space direction="horizontal">
                                <Typography.Title level={3}>
                                    <Tooltip title={getContentTypeTooltip(item.get_content_type)}>
                                        {getContentTypeItem(item.get_content_type)}
                                    </Tooltip>
                                    {item.name}
                                </Typography.Title>
                            </Space>
                        }>
                            <Avatar.Group>
                                {item.fichas_mesa.map((ficha) => {
                                    return <Tooltip title={ficha.jogador.first_name ?? "Anon"}>
                                        <Avatar src={ficha.jogador.photo ?? undefined} icon={<UserOutlined />}/>
                                    </Tooltip>
                                })}
                            </Avatar.Group>
                        </Card>
                    </List.Item>
                )}/>
            </Skeleton>
        </Col>
    </Row>
}