import { GlobalFilter } from './components/GlobalFilter';
import { DeviceCharts } from './components/charts/DeviceCharts';
import { TimeCharts } from './components/charts/TimeCharts/TimeCharts.tsx';
import { GeoCharts } from './components/charts/GeoCharts';
import { BlackFridayChart } from './components/charts/BlackFridayChart';

function App() {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h1>Dashboard Analitica - first test with no style</h1>
            <hr />
            <GlobalFilter />
            <hr />
            <DeviceCharts />
            <TimeCharts />
            <GeoCharts />
            <BlackFridayChart />
        </div>
    );
}

export default App;