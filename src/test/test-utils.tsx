import React, { type ReactElement } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Create a custom render function that includes providers
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any additional provider props here as needed
  queryClient?: QueryClient
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient()

  return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  const user = userEvent.setup()

  return {
    user,
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  }
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Export useful testing utilities
export const waitForLoadingToFinish = async () => {
  const { waitFor } = await import('@testing-library/react')
  await waitFor(() => {
    const loadingElements = document.querySelectorAll('[aria-busy="true"]')
    expect(loadingElements.length).toBe(0)
  })
}
