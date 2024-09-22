'use client'

import MiniLoader from './ui/loader/mini-loader/mini-loader'

interface LoaderProps {
	loading: boolean
	loaderComponent?: React.ReactNode
	children: React.ReactNode
	classNames?: string
}

const LoaderLayout: React.FC<LoaderProps> = ({
	loading,
	children,
	loaderComponent,
}) => {
	if (loading) {
		if (loaderComponent) {
			return loaderComponent
		}
		return <MiniLoader />
	}
	return <>{children}</>
}

export default LoaderLayout
