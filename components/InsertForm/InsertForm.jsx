import React, { useState } from 'react'
import {
  Button,
  InputWrapper,
  Group,
  Input,
  NativeSelect,
  theming,
  Textarea,
} from '@mantine/core'
import { supabase } from '../../utils/supabaseClient'
import { createUseStyles } from 'react-jss'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { getStatusLabelsFromStatus, statusEnum } from '../../utils/statusHelper'

const useStyles = createUseStyles(
  (theme) => ({
    form: {
      marginBottom: theme.spacing.md,
    },
    inputWrapper: {},
  }),
  { theming }
)

export default function InsertForm() {
  const [insert, setInsert] = useState(false)
  const [loading, setLoading] = useState(false)
  const classes = useStyles()

  const initialValues = {
    status: statusEnum.TODO,
    title: '',
    link: '',
    contact: 1,
  }

  const Schema = Yup.object().shape({
    status: Yup.string(),
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(200, 'Too Long!')
      .required('Required'),
    link: Yup.string().url(),
    contact: Yup.string(),
  })

  async function save({ status, title, link, contact }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const application = {
        user_id: user.id,
        status,
        title,
        link,
        contact,
      }

      let { data, error } = await supabase.from('applications').insert([application])

      if(data) {
        setInsert(false)
      }

    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.form}>
      {insert ? (<Formik
        initialValues={initialValues}
        validationSchema={Schema}
        onSubmit={(values) => {
          // same shape as initial values
          save(values)
        }}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Group grow style={{ alignItems: 'flex-start' }}>
              <InputWrapper>
                <NativeSelect
                  name="status"
                  id="status"
                  value={values.status}
                  onChange={handleChange}
                  data={Object.entries(statusEnum).map((status) => {
                    return {
                      value: status[1],
                      label: getStatusLabelsFromStatus(status[1]),
                    }
                  })}
                />
              </InputWrapper>
              <InputWrapper
                className={classes.inputWrapper}
                error={
                  errors.title && touched.title ? (
                    <div>{errors.title}</div>
                  ) : null
                }
              >
                <Input
                  value={values.title || ''}
                  onChange={handleChange}
                  name="title"
                  type="text"
                  placeholder="Title"
                />
              </InputWrapper>
              <InputWrapper
                className={classes.inputWrapper}
                error={
                  errors.link && touched.link ? <div>{errors.link}</div> : null
                }
              >
                <Input
                  value={values.link || ''}
                  onChange={handleChange}
                  name="link"
                  type="text"
                  placeholder="Link"
                />
              </InputWrapper>
              <InputWrapper
                className={classes.inputWrapper}
                error={
                  errors.contact && touched.contact ? (
                    <div>{errors.contact}</div>
                  ) : null
                }
              >
                <Textarea
                  id="contact"
                  value={values.contact || ''}
                  onChange={handleChange}
                  name="contact"
                  type="text"
                  placeholder="Contact"
                />
              </InputWrapper>

              <Button type="submit" loading={loading}>
                Save
              </Button>
            </Group>
          </form>
        )}
      </Formik>) : (<div><Button onClick={() => setInsert(true)}>New</Button></div>)}
    </div>
  )
}
