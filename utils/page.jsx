import { supabase } from './supabaseClient'

export async function serverSidePropsAndRedirects(req) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    }
  }

  /* if a user is set, pass it to the page via props */
  return {
    props: {
      user,
    },
  }
}

export async function redirectIfUser(req) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (user) {
    return {
      props: {
        user
      },
      redirect: {
        destination: '/overview',
      },
    }
  }

  return {
    props: {},
  }
}
