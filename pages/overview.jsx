import React from 'react'
import Layout from '../components/Layout/Layout'
import Table from '../components/Table/Table'
import { serverSidePropsAndRedirects } from '../utils/page'

export default function Overview({ user }) {
  console.log(user)



  return (
    <Layout>
      <div>
        <Table />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  return serverSidePropsAndRedirects(req)
}
