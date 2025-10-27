import * as Style from './Switch.style';
import * as React from "react";

type SwitchProps = {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Switch({checked, onChange}: SwitchProps) {
    return (
        <Style.SwitchLabel>
            <Style.SwitchInput
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <Style.Slider/>
        </Style.SwitchLabel>
    );
}