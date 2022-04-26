import { Col, Row, Space, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React from 'react'

export interface CoCStatsProps {
    value: string | number,
    stat: string,
    fullRounded?: boolean,
    improvcheck?: boolean,
    improvedCheck?: boolean,
    fullWidth?: boolean
}

export function CoCStats(props: CoCStatsProps){

    return (
        <React.Fragment>
            {!props.fullRounded && <Col span={24}>
                <Row justify='space-around' align='middle'>
                    <Col span={8}>
                        {props.improvcheck ? <Checkbox checked={props.improvedCheck}>{ props.stat }</Checkbox> : <Typography.Title level={5}>{props.stat}</Typography.Title>}
                    </Col>
                    <Col span={4}>
                        <Space style={{ border: "1px solid black", borderRadius: "0 10px 0 0" }}>
                            <Col span={12} style={{ paddingLeft: 7 }}>{props.value}</Col>
                            <Col span={12} style={{ borderLeft: "1px solid black" }}>
                                <Space direction='vertical' size={0}>
                                    <Col style={{ paddingLeft: 5, paddingRight: 5, borderBottom: "1px solid black" }}>{Math.floor(+props.value/2)}</Col>
                                    <Col style={{ paddingLeft: 5, paddingRight: 5 }}>{Math.floor(+props.value/5)}</Col>
                                </Space>
                            </Col>
                        </Space>
                    </Col>
                </Row>
            </Col>}
            {props.fullRounded && !props.improvcheck && <Col span={24}>
                <Row justify='space-around' align='middle'>
                    <Col span={8}>
                        <Typography.Title level={5}>{props.stat}</Typography.Title>
                    </Col>
                    <Col span={4} style={{ padding: 10, border: "1px solid black", borderRadius: "10px", textAlign: 'center' }}>
                        {props.value}
                    </Col>
                </Row>
            </Col>}
        </React.Fragment>
    );
}