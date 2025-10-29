import {SwitchInput,Slider, SwitchLabel} from './Switch.style';
import * as React from "react";

type SwitchProps = {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Switch = ({checked, onChange}: SwitchProps) => {
    return (
        <SwitchLabel>
            <SwitchInput
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <Slider/>
        </SwitchLabel>
    );
}
export default Switch;