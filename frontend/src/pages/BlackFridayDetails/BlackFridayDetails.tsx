import Card from '../../components/Card';
import BlackFridayCharts from '../../components/charts/BlackFridayCharts';
import type {FC} from "react";

const BlackFridayDetails: FC = () => {
    return (
        <Card title="Black Friday Impression Trend (By Year)">
            <BlackFridayCharts/>
        </Card>
    );
}

export default BlackFridayDetails;