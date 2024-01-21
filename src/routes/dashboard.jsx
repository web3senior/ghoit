import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Form, useActionData } from 'react-router-dom'
import { getProfile, getPool } from '../util/api'
import { Title } from './helper/DocumentTitle'
import LoadingSpinner from './components/LoadingSpinner'
import { useAuth, web3 } from './../contexts/AuthContext'
import Heading from './helper/Heading'
import styles from './Dashbaord.module.scss'
export const loader = async ({ request }) => {
  return defer({
    profile: getProfile(),
  })
}

export default function Setting({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [profile, setProfile] = useState([])
  const [totalProfile, setTotalProfile] = useState()
  const [pool, setPool] = useState([])
  const [totalPool, setTotalPool] = useState()
  const auth = useAuth()
  let errors = useActionData()


  useEffect(() => {
  }, [])

  return (
    <section className={`${styles.section} animate fade`}>
      <Heading title={title} />
      
      <div className={`__container`} data-width={`large`}>
        <div className={`${styles.grid} grid grid--fit grid--gap-1`} style={{ '--data-width': '400px' }}>
          <div className={`grid__item ${styles.item}`}>
            <label htmlFor="">Merchant</label>
            <div className="card">
              <div className="card__body">
                <p>3</p>
              </div>
            </div>
          </div>

          <div className={`grid__item ${styles.item}`}>
            <label htmlFor="">Total Invoice</label>
            <div className="card">
              <div className="card__body">
                <p>5</p>
              </div>
            </div>
          </div>

          <div className={`grid__item ${styles.item}`}>
            <label htmlFor="">Paid Invoice</label>
            <div className="card">
              <div className="card__body">
                <p className='text-success'>2</p>
              </div>
            </div>
          </div>

          <div className={`grid__item ${styles.item}`}>
            <label htmlFor="">Pending Invoice</label>
            <div className="card">
              <div className="card__body">
                <p className='text-danger'>3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={loaderData.profile} errorElement={<div>Could not load data 😬</div>}>
          {(data) => (
            <>

            </>
          )}
        </Await>
      </Suspense> */}
    </section>
  )
}
