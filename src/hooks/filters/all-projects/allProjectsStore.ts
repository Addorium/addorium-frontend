import { create } from 'zustand'
import type { IAllProjectsStore } from './allProjectsStore.types'

const initialQueryParams: Pick<IAllProjectsStore, 'queryParams'> = {
	queryParams: {
		page: 1,
		perPage: 9,
		orderBy: 'createdAt',
		search: '',
	},
}

const useAllProjectFiltersStore = create<IAllProjectsStore>(set => ({
	...initialQueryParams,
	isFilterUpdated: false,

	updateQueryParam: ({ key, value }) =>
		set(state => ({
			queryParams: { ...state.queryParams, [key]: value },
			isFilterUpdated: true,
		})),

	reset: () => set(() => ({ ...initialQueryParams, isFilterUpdated: true })),
}))

export default useAllProjectFiltersStore
