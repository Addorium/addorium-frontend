'use client'

import { ImagePopupProvider } from '@/components/ui/image-popup-provider/ImagePopupContext'
import { ModalProvider } from '@/components/ui/modal-provider/ModalContext'
import { PopupProvider } from '@/components/ui/popup-provider/PopupContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren, useState } from 'react'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		})
	)

	return (
		<QueryClientProvider client={client}>
			<ModalProvider>
				<PopupProvider>
					<ImagePopupProvider>
						{children}
						<ReactQueryDevtools initialIsOpen={false} />
					</ImagePopupProvider>
				</PopupProvider>
			</ModalProvider>
		</QueryClientProvider>
	)
}
