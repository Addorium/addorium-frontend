'use client'
import React from 'react'
import SvgIcon from '../SvgIcon'

interface ISimpleTagIcon {
	name?: string
	width?: number
	onClick?: () => void
}
const SimpleTagIcon: React.FC<ISimpleTagIcon> = ({ width = 10, ...res }) => {
	const name = res.name ?? 'default.svg'
	const bucket = process.env.NEXT_PUBLIC_S3_BUKKET_URL
	const nameUrl = `${bucket}images/tags/icon/${name}`
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
export default SimpleTagIcon
