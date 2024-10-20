interface IHeading {
	title: string
	description?: string
}

export function Heading({ title, description }: IHeading) {
	return (
		<div className='w-full flex flex-col gap-1'>
			<h1 className='text-gray-1 text-2xl font-bold'>{title}</h1>
			{description && <p className='text-gray-6 text-[16px]'>{description}</p>}
		</div>
	)
}
