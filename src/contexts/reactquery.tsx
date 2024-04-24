"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface QueryProps {
    children: React.ReactNode
}

const QueryProviderContext = ({children}: QueryProps) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
           {children}
        </QueryClientProvider>
    );
}

export default QueryProviderContext;