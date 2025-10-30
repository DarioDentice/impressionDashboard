import {useQuery} from '@tanstack/react-query';
import {useFilters} from '../../context';
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

    const latestTrend = data?.yearlyTrends.find(trend => trend.year === 2018);
    const latestYearChange = latestTrend?.changePercent ?? 0;

    return (
        <KpiGrid>
            <KpiCard>
                <KpiTitle>Total Impressions</KpiTitle>
                <KpiValue>{data?.totalImpressions.toLocaleString()}</KpiValue>
            </KpiCard>

            <KpiCard>
                <KpiTitle>Impressions ({latestTrend?.year || 'N/A'})</KpiTitle>
                <KpiValue>
                    {latestTrend?.impressions.toLocaleString() || 0}
                </KpiValue>
            </KpiCard>

            <KpiCard>
                <KpiTitle>YoY Change ({latestTrend?.year || 'N/A'} vs Prev)</KpiTitle>
                <KpiValue>
                    {latestYearChange.toFixed(1)}%
                    <KpiPercent $isPositive={latestYearChange >= 0}>
                        {Math.abs(latestYearChange).toFixed(1)}%
                    </KpiPercent>
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