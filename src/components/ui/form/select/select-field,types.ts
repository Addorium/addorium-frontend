export interface SelectFieldProps {
	id?: string
	size?: 'small' | 'medium' | 'large'
	options: readonly CustomOption[]
	value?: CustomOption | readonly CustomOption[]
	onChange: (value: CustomOption) => void
	label?: string
	important?: boolean
	placeholder?: string
	defaultValue?: CustomOption
	className?: string
}
export interface CustomOption {
	value: string
	label: string
}
