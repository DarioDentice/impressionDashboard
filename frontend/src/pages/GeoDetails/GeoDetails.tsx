import {Card} from "../../components/Card";
import {GeoCharts} from "../../components/charts/GeoCharts";

export function GeoDetails() {
    return (
        <Card title="Geographic Analysis (Top 50 US States)">
            <GeoCharts/>
        </Card>
    )
}