import { Badge } from '@mantine/core'

export default function TheBadge({ backgroundColor }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 10,
        height: '10px',
        width: '10px',
        borderRadius: '32px',
        background: backgroundColor
      }}
    />
  )
}
