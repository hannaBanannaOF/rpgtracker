import React, { ReactElement } from 'react';
import { Space } from 'antd';

export interface IconTextProps {
    icon: ReactElement,
    text: string,
    iconLeft?: boolean
}

class IconText extends React.Component<IconTextProps, any> {

    render = () => {
        return (
            <Space>
                {(this.props.iconLeft ?? false) && this.props.icon}
                {this.props.text}
                {!(this.props.iconLeft ?? false) && this.props.icon}
            </Space>
        )
    }

}

export default IconText;