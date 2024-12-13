import { create } from 'zustand'
import type { IProjectsStore } from './projectsStore.types'

const initialQueryParams: Pick<IProjectsStore, 'queryParams'> = {
	queryParams: {
		page: 1,
		perPage: 9,
		orderBy: 'createdAt',
		search: '',
		orderDirection: 'desc',
		ownerId: undefined,
	},
}

const useProjectFiltersStore = create<IProjectsStore>(set => ({
	...initialQueryParams,
	isFilterUpdated: false,

	updateQueryParam: ({ key, value }) =>
		set(state => ({
			queryParams: { ...state.queryParams, [key]: value },
			isFilterUpdated: true,
		})),

	reset: () => set(() => ({ ...initialQueryParams, isFilterUpdated: true })),
}))

export default useProjectFiltersStore
