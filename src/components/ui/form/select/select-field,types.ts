export interface SelectFieldProps {
	id?: string
	size?: 'small' | 'medium' | 'normal' | 'large'
	options: readonly CustomOption[]
	value?: CustomOption | readonly CustomOption[]
	onChange?: (value: CustomOption) => void
	label?: string
	labelPosition?: 'top' | 'left'
	important?: boolean
	placeholder?: string
	defaultValue?: CustomOption
	className?: string
	width?: string
	disabled?: boolean
}
export interface CustomOption {
	value: string
	label: string
}
