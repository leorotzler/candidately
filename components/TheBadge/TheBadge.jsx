import { Badge } from '@mantine/core'

export default function TheBadge({ children, ...rest }) {
  return (
    <Badge
      styles={{
        root: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: 0,
        },
      }}
      {...rest}
    >
      {children}
    </Badge>
  )
}
