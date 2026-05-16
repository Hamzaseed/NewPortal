/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import SearchLayout from '../components/layout/SearchLayout'

const SearchContext = createContext(undefined)

export function SearchProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('site')
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  const value = useMemo(() => {
    return {
      openSearch: (nextMode = 'site') => {
        setMode(nextMode)
        setQuery('')
        setDebouncedQuery('')
        setOpen(true)
      },
      closeSearch: () => {
        setQuery('')
        setDebouncedQuery('')
        setOpen(false)
      },
      query,
      setQuery,
      debouncedQuery,
    }
  }, [debouncedQuery, query])

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchLayout open={open} mode={mode} onClose={() => {
        setQuery('')
        setDebouncedQuery('')
        setOpen(false)
      }} />
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }

  return context
}
