import { TypeProjectsGetProps } from '@/types/project.types'

export interface IProjectsStore {
	queryParams: TypeProjectsGetProps
	isFilterUpdated: boolean
	updateQueryParam: (data: {
		key: keyof TypeProjectsGetProps
		value: string
	}) => void
	reset: () => void
}
