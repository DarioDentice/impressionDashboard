import type {ChangeEvent, FC} from "react";
import {FilterLabel, FilterWrapper} from './GlobalFilter.style';
import {useFilters} from '../../../context';
import type {CountryFilter} from '../../../types';

const GlobalFilter: FC = () => {
    const {country, setCountry} = useFilters();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value as CountryFilter);
    };

    return (
        <FilterWrapper>
            <strong>Global Filter:</strong>
            <FilterLabel>
                <input type="radio" value="all" checked={country === 'all'} onChange={handleChange}/>
                Tutti
            </FilterLabel>
            <FilterLabel>
                <input type="radio" value="usa" checked={country === 'usa'} onChange={handleChange}/>
                Solo USA
            </FilterLabel>
            <FilterLabel>
                <input type="radio" value="no-usa" checked={country === 'no-usa'} onChange={handleChange}/>
                Non-USA
            </FilterLabel>
        </FilterWrapper>
    );
}

export default GlobalFilter;