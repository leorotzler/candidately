import { useEffect, useState } from 'react'
import { JssProvider, createGenerateId } from 'react-jss'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import { NotificationsProvider } from '@mantine/notifications'
import {
  MantineProvider,
  NormalizeCSS,
  GlobalStyles,
  LoadingOverlay,
} from '@mantine/core'

export default function App(props) {
  const { Component, pageProps } = props
  const router = useRouter()
  const [authenticatedState, setAuthenticatedState] =
    useState('not-authenticated')
  const [waitingForLogin, setWaitingForLogin] = useState(false)

  useEffect(() => {
    const jssStyles = document.getElementById('mantine-ssr-styles')
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }

    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setWaitingForLogin(true)
        handleAuthChange(event, session)
        if (event === 'SIGNED_IN') {
          setAuthenticatedState('authenticated')
        }
        if (event === 'SIGNED_OUT') {
          setAuthenticatedState('not-authenticated')
          router.push('/login')
          setWaitingForLogin(false)
        }
      }
    )
    return () => {
      authListener.unsubscribe()
    }
  }, [])

  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    }).then(() => {
      if (event === 'SIGNED_IN') {
        router.push('/overview').then(() => {
          setWaitingForLogin(false)
        })
      }
    })
  }

  return (
    <>
      <JssProvider generateId={createGenerateId()}>
        <Head>
          <title>Candidately</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <MantineProvider
          theme={{
            /** Put your mantine theme override here */
            primaryColor: 'cyan',
            colorScheme: 'dark',
          }}
        >
          <NormalizeCSS />
          <GlobalStyles />
          <NotificationsProvider>
            <LoadingOverlay visible={waitingForLogin} />
            {!waitingForLogin && <Component {...pageProps} />}
          </NotificationsProvider>
        </MantineProvider>
      </JssProvider>
    </>
  )
}
