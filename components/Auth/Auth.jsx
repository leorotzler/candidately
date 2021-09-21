import { useState } from 'react'
import { Container, Button, theming, Title } from '@mantine/core'
import { supabase } from '../../utils/supabaseClient'
import { useNotifications } from '@mantine/notifications'
import { createUseStyles } from 'react-jss'
import { FcGoogle } from 'react-icons/fc'

const useStyles = createUseStyles(
  (theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
  { theming }
)

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const notifications = useNotifications()
  const classes = useStyles()

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ provider: 'google' })
      if (error) throw error
    } catch (error) {
      notifications.showNotification({
        title: error.message,
        message: error.error_description,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="md"
        leftIcon={<FcGoogle />}
        onClick={(e) => {
          e.preventDefault()
          handleLogin()
        }}
        disabled={loading}
      >
        {loading ? 'Loading' : 'Login with Google'}
      </Button>
    </>
  )
}
