import Card from "../../components/Card";
import TimeCharts from "../../components/charts/TimeCharts";
import type {FC} from "react";

const TimeDetails: FC = () => {
    return (
        <Card title="Temporal Analysis (Hourly, DOW & Monthly)">
            <TimeCharts showDetailedView={true}/>
        </Card>
    )
}

export default TimeDetails;