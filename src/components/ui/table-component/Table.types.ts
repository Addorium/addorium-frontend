import { ReactNode } from 'react'

export declare type Column<T extends Node> = {
	label: ReactNode
	renderCell: (node: T) => React.ReactNode
}
export type Node = {
	id: number
}
export interface ITableGrid<T extends Node>
	extends React.HTMLAttributes<HTMLDivElement> {
	columns: Column<T>[]
	nodes: T[]
}
