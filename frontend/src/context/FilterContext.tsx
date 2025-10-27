import {createContext, useState, useContext} from 'react';
import type {ReactNode} from 'react'
import type {CountryFilter} from '../types';

interface FilterContextType {
    country: CountryFilter;
    setCountry: (country: CountryFilter) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({children}: { children: ReactNode }) {
    const [country, setCountry] = useState<CountryFilter>('all');

    return (
        <FilterContext.Provider value={{country, setCountry}}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilters() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
}