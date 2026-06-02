export type Pagination = {
  limit: number
  offset: number
}

export type Ordering = {
  ordering: string[]
}

export type Search = {
  search: string
}

export type PaginationWrapper<T> = {
  count: number
  next: string
  previous: string
  results: T[]
}

/**
 * Converts an object with optional query parameters into a query string
 * Only includes properties that are defined and not null
 * @param params - Object with optional pagination, search, ordering, and filter parameters
 * @returns Query string like "?limit=10&offset=0&search=test" or empty string if no params
 */
export const buildQueryString = (
  params: Record<string, string | number | string[] | undefined | null>,
): string => {
  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (Array.isArray(value)) {
      value.forEach(item => {
        queryParams.append(key, item)
      })
    } else {
      queryParams.append(key, String(value))
    }
  })

  const queryString = queryParams.toString()
  return queryString ? `?${queryString}` : ""
}
