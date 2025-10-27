import {Routes, Route} from 'react-router-dom';
import * as Style from './App.style';
import {GlobalFilter} from './components/layout/GlobalFilter';
import {MockToggle} from './components/layout/MockToggle';
import {Dashboard} from './pages/Dashboard';
import {DeviceDetails} from './pages/DeviceDetails';
import {TimeDetails} from './pages/TimeDetails';
import {GeoDetails} from './pages/GeoDetails';
import {BlackFridayDetails} from './pages/BlackFridayDetails';
import {DataExplorer} from './pages/DataExplorer';

function App() {
    return (
        <Style.AppContainer>
            <Style.Sidebar>
                <div className="logo"/>
                <Style.NavMenu>
                    <li><Style.NavItem to="/">Dashboard</Style.NavItem></li>
                    <li><Style.NavItem to="/devices">Devices</Style.NavItem></li>
                    <li><Style.NavItem to="/time">Timing Info</Style.NavItem></li>
                    <li><Style.NavItem to="/geo">Geo Information</Style.NavItem></li>
                    <li><Style.NavItem to="/black-friday">Black Friday</Style.NavItem></li>
                    <li><Style.NavItem to="/explorer">Data Exploration</Style.NavItem></li>
                </Style.NavMenu>
            </Style.Sidebar>

            <Style.MainContentWrapper>
                <Style.Header>
                    <MockToggle/>
                    <GlobalFilter/>
                </Style.Header>
                <Style.PageContent>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/devices" element={<DeviceDetails/>}/>
                        <Route path="/time" element={<TimeDetails/>}/>
                        <Route path="/geo" element={<GeoDetails/>}/>
                        <Route path="/black-friday" element={<BlackFridayDetails/>}/>
                        <Route path="/explorer" element={<DataExplorer/>}/>
                    </Routes>
                </Style.PageContent>
            </Style.MainContentWrapper>
        </Style.AppContainer>
    );
}

export default App;