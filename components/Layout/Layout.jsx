import {
  Group,
  Title,
  Container,
  theming,
  Anchor,
  Burger,
  Button,
} from '@mantine/core'
import Link from 'next/link'
import { createUseStyles } from 'react-jss'
import { supabase } from '../../utils/supabaseClient'

const useStyles = createUseStyles(
  (theme) => ({
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0 3rem'
    },
    title: {
      display: 'inline-block',
      padding: '.25rem 0.5rem',
      fontSize: '1.2rem',
      fontWeight: 500,
      borderTopRightRadius: '8px',
      borderBottomLeftRadius: '8px',
      backgroundColor: theme.colors.cyan[8],
      '& a': {
        textDecoration: 'none',
        color: 'white'
      },
    },
  }),
  { theming }
)

export default function Layout({children}) {
  const classes = useStyles()

  const logout = () => {
    supabase.auth.signOut()
  }

  return (
    <Container>
      <nav className={classes.nav}>
        <div className={classes.title}>
          <Link href="/">candidately</Link>
        </div>
        <div>
          <Button color="red" variant="link" onClick={() => logout()}>
            Logout
          </Button>
        </div>
      </nav>
      <div>{children}</div>
    </Container>
  )
}
