import { useState, type PropsWithChildren, type FC } from 'react'
import type { CountryFilter } from '../types'
import { FilterContext } from './FilterContext'

export const FilterProvider:FC<PropsWithChildren> = ({children}) => {
    const [country, setCountry] = useState<CountryFilter>('all');

    return (
        <FilterContext.Provider value={{country, setCountry}}>
            {children}
        </FilterContext.Provider>
    );
}
