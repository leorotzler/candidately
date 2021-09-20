import { supabase } from './supabaseClient'

export async function serverSidePropsAndRedirects(req) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return {
      props: {},
      redirect: {
        destination: '/login',
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
