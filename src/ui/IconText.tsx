import { ReactElement } from 'react';
import { Space } from 'antd';

export interface IconTextProps {
    icon: ReactElement,
    text: string,
    iconLeft?: boolean
}

export function IconText(props: IconTextProps){

    return (
        <Space>
            {(props.iconLeft ?? false) && props.icon}
            {props.text}
            {!(props.iconLeft ?? false) && props.icon}
        </Space>
    )
}