import { Fragment } from 'react'

export type HighlightTextProps = {
  text: string
  highlight: string
}

export const HighlightText = (props: HighlightTextProps) => {
  const { text, highlight } = props
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

  return (
    <Fragment>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part.toLowerCase() === highlight.toLowerCase() ? (
            <span style={{ backgroundColor: '#58779f' }}>{part}</span>
          ) : (
            <span>{part}</span>
          )}
        </Fragment>
      ))}
    </Fragment>
  )
}
