import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function SimpleButton({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			className={cn(
				'linear rounded-lg bg-transparent py-2 px-2 text-base font-medium text-white transition hover:bg-primary active:bg-brand-700',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
