'use client'
import cn from 'clsx'
import Link from 'next/link'
import React from 'react'
import { baseStyles, CustomLinkButtonProps, iconSize } from './buttons-styles'

const LinkButton: React.FC<CustomLinkButtonProps> = ({
	className,
	children,
	type_style = 'primary',
	size = 'normal',
	Icon,
	onlyIcon = false,
	...rest
}) => {
	return (
		<Link
			href={rest.href}
			className={cn(baseStyles(size, type_style), className)}
		>
			{Icon && <Icon className={`${iconSize} ${!onlyIcon ? 'mr-1.5' : ''}`} />}
			{rest.iconurl && (
				<img
					className={`${iconSize} ${!onlyIcon ? 'mr-1.5' : ''} ${!rest.disabled ? '' : 'opacity-15'}`}
					src={rest.iconurl}
					alt='icon'
				/>
			)}
			{children}
		</Link>
	)
}

export default LinkButton
