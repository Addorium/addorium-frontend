import { TypeProjectsGetAllProps } from '@/types/project.types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import useProjectFiltersStore from './allProjectsStore'

export function useAllProjectFilters() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const { replace } = useRouter()

	const { queryParams, isFilterUpdated, updateQueryParam } =
		useProjectFiltersStore()

	useEffect(() => {
		searchParams.forEach((value, key) => {
			updateQueryParam({
				key: key as keyof TypeProjectsGetAllProps,
				value,
			})
		})
	}, [])

	const updateQueryParams = (
		key: keyof TypeProjectsGetAllProps,
		value: string
	) => {
		const newParams = new URLSearchParams(searchParams.toString())

		if (value) {
			newParams.set(key, String(value))
		} else {
			newParams.delete(key)
		}

		replace(pathname + `?${newParams.toString()}`)
		updateQueryParam({ key, value })
	}

	return {
		updateQueryParams,
		queryParams,
		isFilterUpdated,
	}
}
