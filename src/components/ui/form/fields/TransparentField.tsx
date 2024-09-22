import cn from 'clsx'
import { forwardRef, type InputHTMLAttributes } from 'react'

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<
	HTMLInputElement,
	TypeTransparentField
>(({ className, ...rest }, ref) => {
	return (
		<input
			className={cn(
				'bg-transparent focus:outline-0 focus:shadow-transparent w-full border-b-2 border-white',
				className
			)}
			ref={ref}
			{...rest}
		/>
	)
})

TransparentField.displayName = 'TransparentField'
