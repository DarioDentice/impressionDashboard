import React from "react";
import * as Style from './GlobalFilter.style';
import {useFilters} from '../../../context/FilterContext';
import type {CountryFilter} from '../../../types';

export function GlobalFilter() {
    const {country, setCountry} = useFilters();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value as CountryFilter);
    };

    return (
        <Style.FilterWrapper>
            <strong>Global Filter:</strong>
            <Style.FilterLabel>
                <input type="radio" value="all" checked={country === 'all'} onChange={handleChange}/>
                Tutti
            </Style.FilterLabel>
            <Style.FilterLabel>
                <input type="radio" value="usa" checked={country === 'usa'} onChange={handleChange}/>
                Solo USA
            </Style.FilterLabel>
            <Style.FilterLabel>
                <input type="radio" value="no-usa" checked={country === 'no-usa'} onChange={handleChange}/>
                Non-USA
            </Style.FilterLabel>
        </Style.FilterWrapper>
    );
}