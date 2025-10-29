import Card from "../../components/Card";
import GeoCharts from "../../components/charts/GeoCharts";
import type {FC} from "react";

const GeoDetails:FC = () =>  {
    return (
        <Card title="Geographic Analysis (Top 50 US States)">
            <GeoCharts/>
        </Card>
    )
}

export default GeoDetails;