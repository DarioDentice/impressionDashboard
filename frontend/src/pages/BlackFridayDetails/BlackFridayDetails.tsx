import {Card} from '../../components/Card';
import {BlackFridayCharts} from '../../components/charts/BlackFridayCharts';

export function BlackFridayDetails() {
    return (
        <Card title="Black Friday Impression Trend (By Year)">
            <BlackFridayCharts/>
        </Card>
    );
}