import {createContext, useState, useContext, type FC,type ReactNode} from 'react';
import type {CountryFilter} from '../types';

interface FilterContextType {
    country: CountryFilter;
    setCountry: (country: CountryFilter) => void;
}
interface FilterProviderType {
    children: ReactNode;
}


const FilterContext = createContext<FilterContextType | undefined>(undefined);

const FilterProvider:FC<FilterProviderType> = ({children}) => {
    const [country, setCountry] = useState<CountryFilter>('all');

    return (
        <FilterContext.Provider value={{country, setCountry}}>
            {children}
        </FilterContext.Provider>
    );
}
export {FilterProvider};

const useFilters= () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
}

export default useFilters;