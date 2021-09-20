import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout/Layout'
import Table from '../components/Table/Table'
import { serverSidePropsAndRedirects } from '../utils/page'
import { getStatusBadgeFromStatus } from '../utils/statusHelper'

export default function Home({ user }) {
  console.log(user)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Title',
        accessor: 'title',
        width: 200,
      },
      {
        Header: 'Date',
        accessor: 'date',
        width: 100
      },
      {
        Header: 'Link',
        accessor: 'link',
        width: 80
      },
      {
        Header: 'Contact',
        accessor: 'contact',
      },
    ],
    []
  )

  const data = [
    {
      status: 'todo',
      title: 'Test titel',
      date: '123',
      link: 'test',
      contact: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
      status: 'waiting_answer',
      title: 'Test titel Lorem ipsum Lorem ipsum Lorem ipsum',
      date: '123',
      link: 'test',
      contact: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
      status: 'interview',
      title: 'Test titel',
      date: 'Lorem ipsum Lorem ipsum Lorem ipsum',
      link: 'test',
      contact: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
      status: 'interview',
      title: 'Test titel',
      date: '123',
      link: 'Lorem ipsum Lorem ipsum Lorem ipsum',
      contact: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
      status: 'rejection',
      title: 'Test titel',
      date: '123',
      link: 'test',
      contact: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
      status: 'no_answer',
      title: 'Test titel',
      date: '123',
      link: 'test',
      contact: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    },
  ]

  return (
    <Layout>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  return serverSidePropsAndRedirects(req)
}
