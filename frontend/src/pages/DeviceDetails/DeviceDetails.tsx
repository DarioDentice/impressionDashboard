import {Card} from "../../components/Card";
import {DeviceCharts} from '../../components/charts/DeviceCharts';

export function DeviceDetails() {
    return (
        <Card title="Device Analysis (Top 10)">
            <DeviceCharts showDetailedView={true}/>
        </Card>
    );
}