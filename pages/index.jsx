import React from 'react'
import Auth from '../components/Auth/Auth'
import { redirectIfUser } from '../utils/page'

export default function Home() {
  return (
    <div>
      <Auth />
    </div>
  )
}

export async function getServerSideProps({ req }) {
  return redirectIfUser(req)
}
