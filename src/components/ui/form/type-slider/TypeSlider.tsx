import { LucideIcon } from 'lucide-react'

export interface TypeSliderOptions {
	label: string
	value: string
	icon?: LucideIcon
	disabled?: boolean
}

interface TypeSliderProps {
	types: TypeSliderOptions[]
	value?: TypeSliderOptions
	label?: string
	important?: boolean
	onChange: (value: TypeSliderOptions) => void
}

export function TypeSlider({
	types,
	value = types[0],
	onChange,
	label,
	important,
}: TypeSliderProps) {
	// Обновляем индекс для выбранного элемента на основе его value
	const selectedIndex = types.findIndex(type => type.value === value.value)

	return (
		<div className='flex flex-col gap-2 relative'>
			{label && (
				<label className='px-2 flex gap-1 font-bold text-[15px] text-gray-6'>
					{label}
					{important && <p className='text-red'>*</p>}
				</label>
			)}

			<div className='relative flex justify-center bg-background-6 rounded-2xl p-1 overflow-hidden'>
				{/* Подложка для анимации */}
				<div
					className='absolute bg-core-1 top-0 rounded-2xl h-full transition-all duration-300'
					style={{
						width: `${100 / types.length}%`, // Ширина подложки равна ширине одного элемента
						transform: `translateX(${(selectedIndex - (types.length - 1) / 2) * 100}%)`, // Двигаем подложку в зависимости от выбранного элемента
					}}
				></div>

				{/* Кнопки */}
				{types.map(type => (
					<button
						key={type.value}
						disabled={type.disabled}
						onClick={() => !type.disabled && onChange(type)}
						className={`relative z-10 flex flex-col w-full items-center px-4 py-2 transition-colors transform duration-300 rounded-2xl
					${type.value === value.value ? 'text-white' : 'text-gray-6 hover:bg-gray-1/15'}
					${type.disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}`}
						style={{
							width: `${100 / types.length}%`, // Ширина кнопок равна ширине одного элемента
						}}
					>
						{/* Отображение иконки, если она есть */}
						{type.icon && <type.icon className='mb-1 w-6 h-6' />}
						<span>{type.label}</span>
					</button>
				))}
			</div>
		</div>
	)
}
