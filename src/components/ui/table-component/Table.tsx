'use client'
import { ITableGrid, Node } from './Table.types'

export function Table<T extends Node>({ nodes, columns }: ITableGrid<T>) {
	return (
		<>
			<div className='w-full'>
				<table className='w-full text-start shadow-md rounded-2xl h-full overflow-y-auto'>
					<thead className='rounded-2xl'>
						<tr>
							{columns.map(column => (
								<th
									className=' text-start px-4 bg-background-5 first:rounded-tl-2xl last:rounded-tr-2xl text-gray-1 py-3'
									key={column.label?.toString()}
								>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody className='w-full rounded-b-2xl'>
						{nodes.map((node, index) => (
							<tr
								key={node.id}
								className={`transition-all last:rounded-b-2xl ${
									index % 2 === 0
										? 'bg-gray-3 text-gray-6'
										: 'bg-gray-4 text-gray-6'
								} `}
							>
								{columns.map(column => (
									<td
										className={`py-1 text-start px-4 ${
											index + 1 === nodes.length
												? 'last:rounded-br-2xl first:rounded-bl-2xl'
												: ''
										}`}
										key={column.label?.toString()}
									>
										{column.renderCell(node)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
