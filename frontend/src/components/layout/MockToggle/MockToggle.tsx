import React, {useState, useEffect} from 'react';
import * as Style from './MockToggle.style';
import {Switch} from '../../Switch';

export function MockToggle() {
    const [isMocking, setIsMocking] = useState(false);

    useEffect(() => {
        setIsMocking(localStorage.getItem('enable_mocks') === 'true');
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;

        if (checked) {
            localStorage.setItem('enable_mocks', 'true');
        } else {
            localStorage.removeItem('enable_mocks');
        }
        setIsMocking(checked);
        window.location.reload();
    };
    if (!import.meta.env.DEV) {
        return null;
    }

    return (
        <Style.ToggleWrapper title="Reload the page for apply">
            <span>API Mock:</span>
            <Switch
                checked={isMocking}
                onChange={handleChange}
            />
        </Style.ToggleWrapper>
    );
}