import { Col, Row, Space, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React from 'react'

export interface CoCStatsProps {
    value: string | number,
    stat: string,
    fullRounded?: boolean,
    improvcheck?: boolean,
    improvedCheck?: boolean
}

class CoCStats extends React.Component<CoCStatsProps, any> {

    render = () => {
        return (
            <React.Fragment>
                {!this.props.fullRounded && !this.props.improvcheck && <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 8 }} xs={{ span: 12 }}>
                    <Row justify='space-around' align='middle'>
                        <Col span={8}>
                            <Typography.Title level={5}>{this.props.stat}</Typography.Title>
                        </Col>
                        <Col span={16}>
                            <Space style={{ border: "1px solid black", borderRadius: "0 10px 0 0" }}>
                                <Col span={12} style={{ paddingLeft: 7 }}>{this.props.value}</Col>
                                <Col span={12} style={{ borderLeft: "1px solid black" }}>
                                    <Space direction='vertical' size={0}>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5, borderBottom: "1px solid black" }}>{Math.floor(+this.props.value/2)}</Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }}>{Math.floor(+this.props.value/5)}</Col>
                                    </Space>
                                </Col>
                            </Space>
                        </Col>
                    </Row>
                </Col>}
                {this.props.fullRounded && !this.props.improvcheck && <Col xl={{ span: 8 }} lg={{ span: 8 }} md={{ span: 8 }} xs={{ span: 12 }}>
                    <Row justify='space-around' align='middle'>
                        <Col span={8}>
                            <Typography.Title level={5}>{this.props.stat}</Typography.Title>
                        </Col>
                        <Col span={16}>
                            <Col span={12} style={{ padding: 10, border: "1px solid black", borderRadius: "10px", textAlign: 'center' }}>
                                {this.props.value}
                            </Col>
                        </Col>
                    </Row>
                </Col>}
                {!this.props.fullRounded && this.props.improvcheck && <Col span={24}>
                    <Row justify='space-around' align='middle'>
                        <Col span={8}>
                            <Checkbox checked={this.props.improvedCheck}>{ this.props.stat }</Checkbox>
                        </Col>
                        <Col span={16}>
                            <Space style={{ border: "1px solid black", borderRadius: "0 10px 0 0" }}>
                                <Col span={12} style={{ paddingLeft: 7 }}>{this.props.value}</Col>
                                <Col span={12} style={{ borderLeft: "1px solid black" }}>
                                    <Space direction='vertical' size={0}>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5, borderBottom: "1px solid black" }}>{Math.floor(+this.props.value/2)}</Col>
                                        <Col style={{ paddingLeft: 5, paddingRight: 5 }}>{Math.floor(+this.props.value/5)}</Col>
                                    </Space>
                                </Col>
                            </Space>
                        </Col>
                    </Row>
                </Col>}
            </React.Fragment>
        );
    }
}

export default CoCStats;