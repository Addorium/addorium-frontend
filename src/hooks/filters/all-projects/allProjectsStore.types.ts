import { TypeProjectsGetAllProps } from '@/types/project.types'

export interface IAllProjectsStore {
	queryParams: TypeProjectsGetAllProps
	isFilterUpdated: boolean
	updateQueryParam: (data: {
		key: keyof TypeProjectsGetAllProps
		value: string
	}) => void
	reset: () => void
}
