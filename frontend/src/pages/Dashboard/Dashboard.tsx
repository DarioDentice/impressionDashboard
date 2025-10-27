import {KpiCards} from '../../components/KpiCards';
import {DeviceCharts} from '../../components/charts/DeviceCharts';
import {Card} from '../../components/Card';
import {TimeCharts} from "../../components/charts/TimeCharts";
import {GeoCharts} from "../../components/charts/GeoCharts";
import * as Style from './Dashboard.style';

export function Dashboard() {
    return (
        <Style.DashboardGrid>
            <Style.KpiSection>
                <KpiCards/>
            </Style.KpiSection>
            <Style.ChartSection>
                <Card title="Top Impression Device">
                    <DeviceCharts showDetailedView={false}/>
                </Card>
            </Style.ChartSection>
            <Style.ChartSection>
                <Card title="Temporal Analysis Hourly">
                    <TimeCharts showDetailedView={false}/>
                </Card>
            </Style.ChartSection>
            <Style.ChartSection>
                <Card title="Geographic Analysis (Top 15 US States)">
                    <GeoCharts/>
                </Card>
            </Style.ChartSection>
        </Style.DashboardGrid>
    );
}