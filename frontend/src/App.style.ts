import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

export const AppContainer = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f0f2f5;
`;

export const Sidebar = styled.nav`
    width: 200px;
    flex-shrink: 0;
    background: #001529;
    color: white;
    padding: 16px;

    .logo {
        height: 32px;
        margin-bottom: 24px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
`;

export const NavMenu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const NavItem = styled(NavLink)`
    display: block;
    padding: 12px 16px;
    color: rgba(255, 255, 255, 0.65);
    text-decoration: none;
    border-radius: 4px;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    &.active {
        background: #1890ff;
        color: white;
        font-weight: bold;
    }
`;

export const MainContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`;

export const Header = styled.header`
    background: #ffffff;
    padding: 0 24px;
    height: 64px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
`;

export const PageContent = styled.main`
    flex-grow: 1;
    margin: 24px 16px;
    padding: 24px;
    background: #ffffff;
    border-radius: 8px;
    min-height: 280px;
    overflow-y: auto;
`;