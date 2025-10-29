import React, {useState, useEffect, type FC} from 'react';
import {ToggleWrapper} from './MockToggle.style';
import Switch from '../../Switch';

const MockToggle: FC = () => {
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
        <ToggleWrapper title="Reload the page for apply">
            <span>API Mock:</span>
            <Switch
                checked={isMocking}
                onChange={handleChange}
            />
        </ToggleWrapper>
    );
}

export default MockToggle;