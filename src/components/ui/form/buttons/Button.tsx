'use client'
import cn from 'clsx'
import React from 'react'
import { baseStyles, CustomButtonProps, iconSize } from './buttons-styles'

const Button: React.FC<CustomButtonProps> = ({
	className,
	children,
	type_style = 'primary',
	size = 'normal',
	Icon,
	onlyIcon = false,
	width = 'auto',
	...rest
}) => {
	onlyIcon = onlyIcon || !children
	return (
		<div className={`${width}`}>
			<button className={cn(baseStyles(size, type_style), className)} {...rest}>
				{Icon && (
					<Icon className={`${iconSize[size]} ${!onlyIcon ? 'mr-1.5' : ''}`} />
				)}
				{rest.iconurl && (
					<img
						className={`${iconSize[size]} ${!onlyIcon ? 'mr-1.5' : ''} ${!rest.disabled ? '' : 'opacity-15'}`}
						src={rest.iconurl}
						alt='icon'
					/>
				)}
				{children}
			</button>
		</div>
	)
}

export default Button
