import { createContext, useContext, useMemo, useState } from 'react'
import SearchLayout from '../components/layout/SearchLayout'

const SearchContext = createContext(undefined)

export function SearchProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('site')

  const value = useMemo(() => {
    return {
      openSearch: (nextMode = 'site') => {
        setMode(nextMode)
        setOpen(true)
      },
      closeSearch: () => setOpen(false),
    }
  }, [])

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchLayout open={open} mode={mode} onClose={() => setOpen(false)} />
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
