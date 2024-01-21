import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Form, useActionData, Link, useParams } from 'react-router-dom'
import { getInvoiceDetail, updateInvoice } from '../util/api'
import { Title } from './helper/DocumentTitle'
import LoadingSpinner from './components/LoadingSpinner'
import { useAuth, web3 } from '../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import GHOAbi from './../abi/GHO.json'
import Heading from './helper/Heading'
import styles from './Gateway.module.scss'
import toast from 'react-hot-toast'

export const loader = async ({ request }) => {
  console.log(request)
  return defer({
    invoice: [],
  })
}

export default function Gateway({ title }) {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [profile, setProfile] = useState([])
  const [balance, setBalance] = useState(0)
  const auth = useAuth()
  let errors = useActionData()
  const params = useParams()

  const handleMakePayment = async () => {
    const contract = new web3.eth.Contract(GHOAbi, '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60', { from: auth.wallet })

    await contract.methods
      .transfer(data[0].owner_addr, web3.utils.toWei(BigInt(data[0].amount), 'ether'))
      .send()
      .then((result) => {
        console.log(result)
        if (result.status) {
          // update the invoice
          toast.success(`This invoice has been paid successfully`)
          updateInvoice(data[0].id, result.transactionHash)
        }
      })
  }

  const readBalance = async () => {
    const contract = new web3.eth.Contract(GHOAbi, '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60', { from: auth.wallet })

    const balance = await contract.methods
      .balanceOf(auth.wallet)
      .call()
      .then((res) => {
        console.log(web3.utils.fromWei(res, 'ether'))
        setBalance(web3.utils.fromWei(res, 'ether'))
      })
  }

  useEffect(() => {
    const t = toast.loading(`Reading invoice`)

    getInvoiceDetail(params.invoice_id, auth.wallet).then((result) => {
      console.log(result)
      setData(result)
      toast.dismiss(t)
    })

    readBalance()
  }, [])

  return (
    <>
      {data && data.length > 0 && (
        <>
          <header className={`d-flex align-items-center justify-content-center`}>
            <ul>
              <li>
                <h3>{data[0].name}</h3>
              </li>
              <li>{data[0].url}</li>
            </ul>
          </header>

          <main>
            <section className={`${styles.section} animate fade`}>
              <div className={`${styles.container}`}>
                <ul className={`${styles.header} d-flex flex-row align-items-center justify-content-between`}>
                  <li className="d-flex flex-column">
                    <b>Network</b>
                    <span>Order: #{data[0].id}</span>
                  </li>
                  <li className="d-flex flex-column">
                    <select name="" id="">
                      <option value="">ETH</option>
                    </select>
                  </li>
                </ul>

                <div className={`${styles.subContainer}  d-flex flex-column align-items-center justify-content-between`}>
                  <ul className={`${styles.address} d-flex flex-row align-items-center justify-content-between`}>
                    <li className="d-flex flex-column">
                      <span>To:</span>
                    </li>
                    <li className="d-flex flex-column" title={data[0].owner_addr}>
                      <span>{`${data[0].owner_addr.slice(0, 4)}...${data[0].owner_addr.slice(data[0].owner_addr.length - 4, data[0].owner_addr.length)}`}</span>
                    </li>
                    <li>
                      <MaterialIcon name={`content_copy`} />
                    </li>
                  </ul>

                  <h3 className={`${styles.amount} text-center`}>{data[0].amount} $GHO</h3>

                  <div className="text-center">
                    Your current balance: <small className="badge badge-pill badge-success">{balance}</small> $GHO
                  </div>

                  <div className={`d-flex flex-row align-items-center justify-content-center`}>
                    {data[0].status.toString() === '0' ? (
                      <>
                        <button className="btn" onClick={() => handleMakePayment()}>
                          Make payment
                        </button>
                      </>
                    ) : (
                      <span className="badge badge-primary">This transaction has been paid</span>
                    )}
                  </div>

                  <ul className={`${styles.need} d-flex flex-row align-items-center justify-content-between`}>
                    <li className="d-flex flex-row">
                      <MaterialIcon name={`attach_money`} /> <span>Need GHO for purchasing?</span>
                    </li>
                    <li className="d-flex flex-column">
                      <Link to={`/`} className="text-primary">
                        Borrow it
                      </Link>
                    </li>
                  </ul>

                  <ul className={`${styles.details} d-flex flex-column align-items-center justify-content-between`}>
                    <li className="d-flex flex-row align-items-center justify-content-between">
                      <span>1 $GHO is</span>
                      <span>1$</span>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-between">
                      <span>1$ is</span>
                      <span>1 $GHO</span>
                    </li>
                    <li className="d-flex flex-row align-items-center justify-content-between">
                      <span>Compared to </span>
                      <span>Within 0%</span>
                    </li>
                  </ul>
                </div>
              </div>

              <a href={`./../usr/dashboard`} className={styles.cancel}>
                Cancel
              </a>
            </section>
          </main>
        </>
      )}
    </>
  )
}

{
  /* <Suspense fallback={<LoadingSpinner />}>
          <Await resolve={loaderData.invoice} errorElement={<div>Could not load data 😬</div>}>
            {(data) => (
              <>
                {data.map((item, i) => (
                  <MerchantItem item={item} key={i} />
                ))}
              </>
            )}
          </Await>
        </Suspense> */
}
