import React from 'react'
import Auth from '../components/Auth/Auth'
import { supabase } from '../utils/supabaseClient'

export default function Login() {
  return (
    <div>
      <Auth />
    </div>
  )
}
