import {useFilters} from '../context/FilterContext';
import type {CountryFilter} from '../types';

export function GlobalFilter() {
    const {country, setCountry} = useFilters();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value as CountryFilter);
    };

    return (
        <div style={{margin: '20px 0'}}>
            <h3>Filtro Globale</h3>
            <label>
                <input type="radio" value="all" checked={country === 'all'} onChange={handleChange}/>
                Tutti
            </label>
            <label style={{marginLeft: '10px'}}>
                <input type="radio" value="usa" checked={country === 'usa'} onChange={handleChange}/>
                Solo USA
            </label>
            <label style={{marginLeft: '10px'}}>
                <input type="radio" value="no-usa" checked={country === 'no-usa'} onChange={handleChange}/>
                Non-USA
            </label>
        </div>
    );
}