import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {FilterProvider} from './context/FilterContext.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import './lib/chartjs-setup';

const queryClient = new QueryClient();

async function enableMocking() {
    if (!import.meta.env.DEV) {
        return;
    }
    const {worker} = await import('./mocks/browser');

    return worker.start({
        onUnhandledRequest: 'bypass',
    });
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <FilterProvider>
                    <App/>
                </FilterProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </StrictMode>,
    )
})
