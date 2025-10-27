import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import {FilterProvider} from './context/FilterContext.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import App from './App.tsx'
import './lib/chartjs-setup';
import {GlobalStyle} from './styles/Global.style';


const queryClient = new QueryClient();

async function enableMocking() {
    const mocksEnabled = import.meta.env.DEV &&
        localStorage.getItem('enable_mocks') === 'true';
    if (!mocksEnabled) {
        return;
    }
    console.warn('Mock Service Worker (MSW) is Active.');

    const {worker} = await import('./mocks/browser');
    return worker.start({
        onUnhandledRequest: 'bypass',
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <GlobalStyle/>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <FilterProvider>
                        <App/>
                    </FilterProvider>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
            </BrowserRouter>
        </StrictMode>,
    )
})