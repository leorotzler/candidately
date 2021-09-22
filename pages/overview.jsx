import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import Table from '../components/Table/Table'
import { serverSidePropsAndRedirects } from '../utils/page'
import { supabase } from '../utils/supabaseClient'

export default function Overview({ user }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  async function getApplications() {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('applications').select(
        `
          id,
          status,
          title,
          link,
          date,
          contact,
          created_at
         `
      ).eq('deleted', false)

      if (data) {
        setData(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getApplications()
    const subscription = supabase
      .from(`applications:user_id=eq.${supabase.auth.user().id}`)
      .on('INSERT', getApplications)
      .on('UPDATE', getApplications)
      .on('DELETE', getApplications)
      .subscribe()
    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  return (
    <Layout>
      <div>
        <Table data={data} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  return serverSidePropsAndRedirects(req)
}
