import {Routes, Route} from 'react-router-dom';
import {NavItem, AppContainer, Sidebar, NavMenu, MainContentWrapper, Header, PageContent} from './App.style';
import GlobalFilter from './components/layout/GlobalFilter';
import MockToggle from './components/layout/MockToggle';
import Dashboard from './pages/Dashboard';
import DeviceDetails from './pages/DeviceDetails';
import TimeDetails from './pages/TimeDetails';
import GeoDetails from './pages/GeoDetails';
import BlackFridayDetails from './pages/BlackFridayDetails';
import DataExplorer from './pages/DataExplorer';
import logo from './asserts/logo.webp'

function App() {
    return (
        <AppContainer>
            <Sidebar>
                <div className="logo"><img src={logo} height='30px' width='150px'  alt='companyLogos'/> </div>
                <NavMenu>
                    <li><NavItem to="/">Dashboard</NavItem></li>
                    <li><NavItem to="/devices">Devices</NavItem></li>
                    <li><NavItem to="/time">Timing Info</NavItem></li>
                    <li><NavItem to="/geo">Geo Information</NavItem></li>
                    <li><NavItem to="/black-friday">Black Friday</NavItem></li>
                    <li><NavItem to="/explorer">Data Exploration</NavItem></li>
                </NavMenu>
            </Sidebar>

            <MainContentWrapper>
                <Header>
                    <MockToggle/>
                    <GlobalFilter/>
                </Header>
                <PageContent>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/devices" element={<DeviceDetails/>}/>
                        <Route path="/time" element={<TimeDetails/>}/>
                        <Route path="/geo" element={<GeoDetails/>}/>
                        <Route path="/black-friday" element={<BlackFridayDetails/>}/>
                        <Route path="/explorer" element={<DataExplorer/>}/>
                    </Routes>
                </PageContent>
            </MainContentWrapper>
        </AppContainer>
    );
}

export default App;