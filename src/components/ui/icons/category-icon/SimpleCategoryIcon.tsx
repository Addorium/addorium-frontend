'use client'
import React from 'react'
import SvgIcon from '../SvgIcon'

interface ISimpleCategoryIcon {
	name?: string
	width?: number
	onClick?: () => void
}
const SimpleCategoryIcon: React.FC<ISimpleCategoryIcon> = ({
	width = 24,
	...res
}) => {
	const name = res.name ?? 'default.svg'
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const nameUrl = `${bucket}images/categories/icon/${name}`
	return (
		<>
			<SvgIcon
				url={nameUrl}
				width={width.toString()}
				height={width.toString()}
			/>
		</>
	)
}
export default SimpleCategoryIcon
