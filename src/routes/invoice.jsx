import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Form, useActionData, Link } from 'react-router-dom'
import { getInvoice } from '../util/api'
import { Title } from './helper/DocumentTitle'
import LoadingSpinner from './components/LoadingSpinner'
import { useAuth, web3 } from '../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import Heading from './helper/Heading'
import styles from './Invoice.module.scss'
import toast from 'react-hot-toast'

export const loader = async ({ request }) => {
  return defer({
    invoice: [],
  })
}

export default function Profile({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [profile, setProfile] = useState([])
  const [pool, setPool] = useState([])
  const auth = useAuth()
  let errors = useActionData()

  useEffect(() => {
    getInvoice(auth.wallet).then((res) => {
      console.log(res)
      setData(res)
    })
  }, [])

  return (
    <section className={`${styles.section} animate fade`}>
      <div className={`__container`} data-width={`large`}>
        <Heading title={`Invoice`} />

        <div className={`${styles.assetItem} grid grid--fit grid--gap-1`} style={{ '--data-width': '400px' }}>
          {data && data.length > 0 && data.map((item, i) => <MerchantItem item={item} key={i} />)}
        </div>
      </div>
    </section>
  )
}

const MerchantItem = ({ item }) => {
  console.log(item)
  return (
    <div className={`card`}>
      <div className={`card__body`}>
        <ul className="d-flex flex-column">
        <li>merchant id: <span className='badge badge-info'>#{item.merchant_id}</span></li>
        <li>invoice id: #{item.acceptor_invoice_id}</li>
          <li>amount: {item.amount} <span className='badge badge-dark'>$GHO</span></li>
          <li>status: {item.status === '0' ? <span className="badge badge-warning">Pending</span> : <span className="badge badge-success">Paid</span>}</li>

          {item.txn !== null ? 
            <>
              <li>
                <small>
                  <a href={`https://sepolia.etherscan.io/tx/${item.txn}`} className="text-danger" target='_blank'>
                    {' '}
                    View transaction
                  </a>
                </small>
              </li>
            </>:<>
            <Link to={`/invoice/${item.id}`} target='_blank'>
              <button className='text-primary' >Make payment</button>
            </Link>
            </>
          }
        </ul>
      </div>
    </div>
  )
}
