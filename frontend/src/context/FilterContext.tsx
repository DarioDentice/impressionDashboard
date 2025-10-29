import {createContext} from 'react';
import type {CountryFilter} from '../types';

interface FilterContextType {
    country: CountryFilter;
    setCountry: (country: CountryFilter) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(undefined);

