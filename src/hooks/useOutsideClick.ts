import { DependencyList, RefObject, useEffect, useRef } from 'react'

export function useOutsideClick<T extends HTMLElement>(
  handler: (event: MouseEvent) => void,
  deps: DependencyList
): RefObject<T> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, ...deps])

  return ref
}
