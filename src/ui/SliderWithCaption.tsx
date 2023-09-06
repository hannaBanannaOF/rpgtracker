import { Group, Slider, Title, rem } from "@mantine/core";
import { useEffect, useState } from "react";

export interface SliderWithCaptionProps {
    thumbChildren? : React.ReactNode,
    value: number,
    max?: number,
    disabled?: boolean,
    color?: string,
    endBadge?: React.ReactNode,
}

export default function SliderWithCaption(props: SliderWithCaptionProps) {

    const [currentValue, setCurrentValue] = useState(props.value);

    useEffect(() => {
        setCurrentValue(props.value)
    }, [props])

    return <>
        <Group position="apart" mb={6}>
            <Group>
                <Title order={5}>Current: </Title>
                {currentValue.toString()}
            </Group>
            {props.endBadge}
        </Group>
        <Slider 
            onChange={(val) => setCurrentValue(val)}
            thumbChildren={props.thumbChildren}
            thumbSize={26}
            styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
            color={props.color}
            label={null}
            min={0}
            max={props.max ?? 99}
            step={1}
            value={currentValue}
            disabled={props.disabled}
        />
    </>
}