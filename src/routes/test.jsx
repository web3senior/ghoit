import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, Link, defer, Await, Form, useActionData } from 'react-router-dom'
import { getProfile } from '../util/api'
import { Title } from './helper/DocumentTitle'
import LoadingSpinner from './components/LoadingSpinner'
import Heading from './helper/Heading'
import styles from './Test.module.scss'

export const loader = async ({ request }) => {
  return defer({
    profile: getProfile(),
  })
}

export default function Test({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  let errors = useActionData()

  useEffect(() => {}, [])

  return (
    <section className={`${styles.section} animate fade`}>
      <Heading title={title} />

      <p className="alert alert--primary">Here are some sample products to buy.</p>

      <div className={`${styles.assetItem} grid grid--fit grid--gap-1`} style={{ '--data-width': '300px' }}>
        <Link to={`d`}>
          <div className="card">
            <div className="card__body">Product/ invoice 1</div>
          </div>
        </Link>

        <Link to={`d`}>
          <div className="card">
            <div className="card__body">Product/ invoice 2</div>
          </div>
        </Link>

        <Link to={`d`}>
          <div className="card">
            <div className="card__body">Product/ invoice 3</div>
          </div>
        </Link>
      </div>

      {/* <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={loaderData.profile} errorElement={<div>Could not load data 😬</div>}>
          {(data) => (
            <>
              
      <Form method="post" action="/login" preventScrollReset={true} className="d-flex flex-column" style={{ rowGap: '1rem' }}>
        {errors?.phone && <span className="text-danger">{errors.phone}</span>}
        <input type="number" name="phone" placeholder=" " defaultValue={`09147086400`} required />

        {errors?.password && <span className="text-danger">{errors.password}</span>}
        <input type="password" name="password" placeholder=" " defaultValue={`102030`} required />

        <button type="submit">{isLoading ? '..' : ''}</button>
      </Form>
            </>
          )}
        </Await>
      </Suspense> */}
    </section>
  )
}

export const action = async ({ request, params }) => {
  switch (request.method) {
    case 'POST': {
      let formData = await request.formData()
      let id = formData.get('id')
      let fullname = formData.get('fullname')
      let status = formData.get('status')
      let result = await getRequest(1, {
        id: id,
        fullname: fullname,
        status: status,
      })
      console.log(result)
      //return redirect('/admin/')
      return null
    }
    case 'DELETE': {
      return fakeDeleteProject(params.id)
    }
    default: {
      throw new Response('', { status: 405 })
    }
  }
}
