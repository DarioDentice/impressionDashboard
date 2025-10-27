import {Card} from "../../components/Card";
import {TimeCharts} from "../../components/charts/TimeCharts";

export function TimeDetails() {
    return (
        <Card title="Temporal Analysis (Hourly, DOW & Monthly)">
            <TimeCharts showDetailedView={true}/>
        </Card>
    )
}