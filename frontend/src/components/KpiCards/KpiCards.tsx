import {useQuery} from '@tanstack/react-query';
import useFilters from '../../context/FilterContext';
import {getKpiData} from '../../api';
import {KpiCard, KpiGrid, KpiPercent, KpiTitle, KpiValue} from './KpiCards.style';
import type {KpiData} from "../../types";
import type {FC} from "react";

const KpiCards: FC = () => {
    const {country} = useFilters();
    const {data, isLoading, isError} = useQuery<KpiData>({
        queryKey: ['kpiData', country],
        queryFn: () => getKpiData(country)
    });

    if (isLoading) {
        return (
            <KpiGrid>
                {[...Array(4)].map((_, i) => (
                    <KpiCard key={i} data-loading="true"/>
                ))}
            </KpiGrid>
        );
    }

    if (isError) return <KpiCard>KPI Loading Error.</KpiCard>;

    const formatPercent = (val: number | null | undefined): number => {
        if (val == null) return 0;
        return parseFloat(val.toFixed(1));
    };

    const dailyChange = formatPercent(data?.dailyChangePercent);
    const weeklyChange = formatPercent(data?.weeklyChangePercent);

    return (
        <KpiGrid>
            <KpiCard>
                <KpiTitle>Total Impressions</KpiTitle>
                <KpiValue>{data?.totalImpressions.toLocaleString()}</KpiValue>
            </KpiCard>

            <KpiCard>
                <KpiTitle>Daily Change</KpiTitle>
                <KpiValue>
                    {dailyChange}%
                    <KpiPercent $isPositive={dailyChange >= 0}>{Math.abs(dailyChange)}%</KpiPercent>
                </KpiValue>
            </KpiCard>

            <KpiCard>
                <KpiTitle>Weekly Change</KpiTitle>
                <KpiValue>
                    {weeklyChange}%
                    <KpiPercent $isPositive={weeklyChange >= 0}>{Math.abs(weeklyChange)}%</KpiPercent>
                </KpiValue>
            </KpiCard>

            <KpiCard>
                <KpiTitle>Top Device</KpiTitle>
                <KpiValue>
                    {data?.topDevice?.id || <span className="suffix">N/D</span>}
                </KpiValue>
            </KpiCard>
        </KpiGrid>
    );
}

export default KpiCards;