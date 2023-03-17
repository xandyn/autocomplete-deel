import { DependencyList, EffectCallback, useCallback, useEffect } from 'react'

export function useDebouncedEffect(effect: EffectCallback, deps: DependencyList, delay: number) {
  const callback = useCallback(effect, deps)

  useEffect(() => {
    const handler = setTimeout(() => callback(), delay)

    return () => clearTimeout(handler)
  }, [callback, delay])
}
