// LoaderLayout.tsx
'use client'

import MiniLoader from './ui/loader/mini-loader/mini-loader'

interface LoaderProps {
	loading: boolean
	loaderComponent?: React.ReactNode
	children: React.ReactNode
}

const LoaderLayout: React.FC<LoaderProps> = ({
	loading,
	children,
	loaderComponent,
}) => {
	if (loading) {
		return loaderComponent || <MiniLoader />
	}

	return <>{children}</>
}

export default LoaderLayout
