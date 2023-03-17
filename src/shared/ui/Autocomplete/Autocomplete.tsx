import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react'
import { useOutsideClick, useDebouncedEffect } from '~/hooks'
import { HighlightText } from '~/shared/ui/HightlightText'
import './index.css'

export type OptionItem = {
  id: string | number
  label: string
}

/**
 * Autocomplete component
 *
 * This is variation of more encapsulated component.
 * Some props are omitted for brevity,
 * such as `open`, `options`, `multiple`, `loading` etc. for the sake of speed.
 * Also, component should be broken down into several other components.
 * For example, nest levels are `Dropdown` -> `Menu` -> `Overlay`.
 * All the above must be done in production-ready component.
 */
export type AutocompleteProps = {
  selectedOption: OptionItem | null
  placeholder?: string
  onSelect: (value: OptionItem | null) => void
  onFetch: (query: string) => Promise<OptionItem[]>
}

export const Autocomplete = (props: AutocompleteProps) => {
  const { placeholder, selectedOption, onSelect, onFetch } = props
  const [open, setOpen] = useState<boolean>(false)
  const [label, setLabel] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [options, setOptions] = useState<OptionItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Outside click handler, to close the dropdown
  const ref = useOutsideClick<HTMLDivElement>(() => {
    setOpen(false)

    // Scenario when user typed something in the input, but did not select any option
    if (selectedOption === null) {
      setLabel('')
    } else {
      setLabel(selectedOption.label)
    }
  }, [selectedOption])

  // Fetch the options, and set the loading state
  const onFetchHandler = async (query: string) => {
    setLoading(true)

    await onFetch(query)
      .then((data) => setOptions(data))
      .catch(() => setOptions([]))

    setLoading(false)
  }

  const onSelectHandler = (item: OptionItem) => {
    setOpen(false)
    onSelect(item)
    setLabel(item.label)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value)
    setQuery(e.target.value)

    if (e.target.value === '') {
      onSelect(null)
      setOptions([])
    }
  }

  const onTriggerClick = () => {
    setOpen(true)
    inputRef.current?.focus()
    inputRef.current?.select()

    // Refresh the options list or clear it if there is no selected option
    if (selectedOption) {
      onFetchHandler(selectedOption.label)
    } else {
      setOptions([])
    }
  }

  const onClearClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()

    setOpen(true)
    setLabel('')
    onSelect(null)
    setOptions([])

    inputRef.current?.focus()
  }

  const onChevronClick = (e: SyntheticEvent<HTMLSpanElement>) => {
    e.stopPropagation()

    setOpen(!open)
  }

  // Debounce the query to prevent unnecessary requests
  useDebouncedEffect(
    () => {
      if (query.trim()) {
        onFetchHandler(query)
      } else {
        setOptions([])
      }
    },
    [query],
    500
  )

  return (
    <div className="autocomplete" ref={ref}>
      <div className="trigger" onClick={onTriggerClick}>
        <input value={label} onChange={onChange} ref={inputRef} placeholder={placeholder} />
        {selectedOption ? (
          <div className="clear" onClick={onClearClick}>
            ⨉
          </div>
        ) : (
          <div />
        )}
        <span className="chevron" onClick={onChevronClick}>
          {open ? '▲' : '▼'}
        </span>
      </div>
      {open ? (
        <div className="menu">
          {options.length === 0 || loading ? (
            <div className="menu-item info">{loading ? 'Loading...' : 'No results'}</div>
          ) : (
            options.map((item) => (
              <div key={item.id} className="menu-item" onClick={() => onSelectHandler(item)}>
                <HighlightText text={item.label} highlight={label} />
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}
