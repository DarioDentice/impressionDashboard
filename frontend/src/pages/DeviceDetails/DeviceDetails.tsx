import Card from "../../components/Card";
import DeviceCharts from '../../components/charts/DeviceCharts';
import type {FC} from "react";

const DeviceDetails:FC = () => {
    return (
        <Card title="Device Analysis (Top 10)">
            <DeviceCharts showDetailedView={true}/>
        </Card>
    );
}
export default DeviceDetails;