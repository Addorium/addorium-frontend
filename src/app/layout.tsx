import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Toaster } from 'sonner'

import { SITE_NAME } from '@/constants/seo.constants'

import { NavBar } from '@/components/main-layout/navbar/NavBar'
import clsx from 'clsx'
import { Ban, Check, CircleAlert, InfoIcon } from 'lucide-react'
import './globals.scss'
import { Providers } from './providers'

const zen = Roboto({
	subsets: ['cyrillic', 'latin'],
	weight: ['400', '700', '900', '100', '300', '500'],
	display: 'swap',
	variable: '--font-roboto',
	style: ['normal'],
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={clsx(zen.className)}>
				<Providers>
					<NavBar />
					<div className='min-h-full min-w-full'>{children}</div>
					<Toaster
						theme='dark'
						position='bottom-right'
						pauseWhenPageIsHidden
						duration={5000}
						expand
						toastOptions={{
							unstyled: true,
							classNames: {
								toast:
									'bg-background-2 px-4 py-2 flex gap-4 justify-start items-center rounded-2xl min-w-[300px]',
								title: 'text-red',
								description: 'text-gre',
								actionButton: 'bg-zinc',
								cancelButton: 'bg-orange',
								closeButton: 'bg-green',
								error: 'bg-red/50 border-red border border-2',
								info: 'bg-core-1/50 border-core-1 border border-2',
								success: 'bg-green/50 border-green border border-2',
								warning: 'bg-orange/50 border-orange border border-2',
							},
						}}
						icons={{
							error: <Ban />,
							info: <InfoIcon />,
							success: <Check />,
							warning: <CircleAlert />,
						}}
					/>
				</Providers>
			</body>
		</html>
	)
}
