import KpiCards from '../../components/KpiCards';
import DeviceCharts from '../../components/charts/DeviceCharts';
import Card from '../../components/Card';
import TimeCharts from "../../components/charts/TimeCharts";
import GeoCharts from "../../components/charts/GeoCharts";
import {DashboardGrid,KpiSection,ChartSection,} from "./Dashboard.style";
import type {FC} from "react";

const Dashboard: FC = () => {
    return (
        <DashboardGrid>
            <KpiSection>
                <KpiCards/>
            </KpiSection>
            <ChartSection>
                <Card title="Top Impression Device">
                    <DeviceCharts showDetailedView={false}/>
                </Card>
            </ChartSection>
            <ChartSection>
                <Card title="Temporal Analysis Hourly">
                    <TimeCharts showDetailedView={false}/>
                </Card>
            </ChartSection>
            <ChartSection>
                <Card title="Geographic Analysis (Top 15 US States)">
                    <GeoCharts/>
                </Card>
            </ChartSection>
        </DashboardGrid>
    );
}

export default Dashboard;