import {useQuery} from '@tanstack/react-query';
import {useFilters} from '../../context/FilterContext';
import {getKpiData} from '../../api';
import * as Style from './KpiCards.style';
import type {KpiData} from "../../types";

export function KpiCards() {
    const {country} = useFilters();
    const {data, isLoading, isError} = useQuery<KpiData>({
        queryKey: ['kpiData', country],
        queryFn: () => getKpiData(country)
    });

    if (isLoading) {
        return (
            <Style.KpiGrid>
                {[...Array(4)].map((_, i) => (
                    <Style.KpiCard key={i} data-loading="true"/>
                ))}
            </Style.KpiGrid>
        );
    }

    if (isError) return <Style.KpiCard>KPI Loading Error.</Style.KpiCard>;

    const formatPercent = (val: number | null | undefined): number => {
        if (val == null ) return 0;
        return parseFloat(val.toFixed(1));
    };

    const dailyChange = formatPercent(data?.dailyChangePercent);
    const weeklyChange = formatPercent(data?.weeklyChangePercent);

    return (
        <Style.KpiGrid>
            <Style.KpiCard>
                <Style.KpiTitle>Total Impressions</Style.KpiTitle>
                <Style.KpiValue>{data?.totalImpressions.toLocaleString()}</Style.KpiValue>
            </Style.KpiCard>

            <Style.KpiCard>
                <Style.KpiTitle>Daily Change</Style.KpiTitle>
                <Style.KpiValue>
                    {dailyChange}%
                    <Style.KpiPercent $isPositive={dailyChange >= 0}>{Math.abs(dailyChange)}%</Style.KpiPercent>
                </Style.KpiValue>
            </Style.KpiCard>

            <Style.KpiCard>
                <Style.KpiTitle>Weekly Change</Style.KpiTitle>
                <Style.KpiValue>
                    {weeklyChange}%
                    <Style.KpiPercent $isPositive={weeklyChange >= 0}>{Math.abs(weeklyChange)}%</Style.KpiPercent>
                </Style.KpiValue>
            </Style.KpiCard>

            <Style.KpiCard>
                <Style.KpiTitle>Top Device</Style.KpiTitle>
                <Style.KpiValue>
                    {data?.topDevice?.id || <span className="suffix">N/D</span>}
                </Style.KpiValue>
            </Style.KpiCard>
        </Style.KpiGrid>
    );
}