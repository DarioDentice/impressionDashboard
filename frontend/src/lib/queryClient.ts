
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry:  (failureCount) => {
                return failureCount < 2;
            },
            retryDelay: 3000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            staleTime: 60_000,
        },
        mutations: {
            retry: false,
        },
    },
})
