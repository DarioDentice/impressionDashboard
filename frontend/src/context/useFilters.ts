import {FilterContext} from "./FilterContext.tsx";
import {useContext} from 'react'

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
}