import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Form, useActionData, Link } from 'react-router-dom'
import { getMerchant, newMerchant } from '../util/api'
import { Title } from './helper/DocumentTitle'
import LoadingSpinner from './components/LoadingSpinner'
import { useAuth, web3 } from '../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import Heading from './helper/Heading'
import styles from './Merchant.module.scss'
import toast from 'react-hot-toast'

export const loader = async ({ request }) => {
  return defer({
    merchant: [],
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

  const handleNewMerchant = () => {
    newMerchant({
      name: document.querySelector('[name="name"]').value,
      url: document.querySelector('[name="url"]').value,
      owner_addr: document.querySelector('[name="owner"]').value
    },auth.wallet).then(result =>{
      console.log(result)
    })
  };

  useEffect(() => {
    getMerchant(auth.wallet).then((res) => {
      console.log(res)
      setData(res)
    })
  }, [])

  return (
    <section className={`${styles.section} animate fade`}>
      <div className={`__container`} data-width={`large`}>
        <Heading title={`New Merchant`} />
        <div className="card">
          <div className="card__body">
            <ul className="d-flex flex-column" style={{ rowGap: '1rem' }}>
              <li>
                <label htmlFor="">Name</label>
                <input type="text" name="name" />
              </li>
              <li>
                <label htmlFor="">URL</label>
                <input name="url" placeholder="https://example.com" />
              </li>
              <li>
                <label htmlFor="">Wallet Address</label>
                <input name="wallet_addr" defaultValue={auth.wallet} disabled />
              </li>
              <li>
                <label htmlFor="">Owner</label>
                <input name="owner" defaultValue={auth.wallet} />
              </li>
              <li>
                <button className="btn" onClick={() => handleNewMerchant()}>
                  Add
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Heading title={`Active Merchants`} />

        <div className={`${styles.assetItem} grid grid--fit grid--gap-1`} style={{ '--data-width': '400px' }}>
          {data && data.length>0 && data.map((item, i) => <MerchantItem item={item} key={i} />)}
        </div>

        <div className={`${styles.assetItem} grid grid--fit grid--gap-1`} style={{ '--data-width': '300px' }}>
          {profile &&
            profile.length > 0 &&
            profile.map((item, i) => {
              return (
                <Link to={`${item.profileId}`} key={i}>
                  <div className="card grid__item">
                    <div className="card__body d-flex justify-content-between" title={item.profileId}>
                      <div>
                        <h6>{item.profileId && `${item.profileId.slice(0, 4)}...${item.profileId.slice(item.profileId.length - 4, item.profileId.length)}`}</h6>
                        <p>Name: {item._name}</p>
                        <p>
                          Member:
                          <span className="badge badge-info badge-pill ml-10">{Array.isArray(item._members) ? JSON.parse(item._members).length : 1}</span>
                        </p>
                      </div>

                      <ul className="d-flex flex-column align-items-ceneter justify-content-between">
                        <li
                          onClick={() => {
                            navigator.clipboard.writeText(item.profileId)
                            toast.success(`Profile Id Copied`)
                          }}
                          style={{ cursor: 'pointer', color: 'var(--area1)' }}
                        >
                          <MaterialIcon name={`content_copy`} />
                        </li>
                        <li style={{ cursor: 'help' }} title={item.timeStamp}>
                          <MaterialIcon name={`today`} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
              )
            })}
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
        <ul className={`d-flex flex-column ${styles.merchantItem}`}>
          <li>
            name: <span>{item.name}</span>
          </li>
          <li>
            url: <span>{item.url}</span>
          </li>
          <li>
            wallet address: <span>{`${item.wallet_addr.slice(0, 4)}...${item.wallet_addr.slice(38)}`}</span>
          </li>
          <li>
            owner address: <span>{`${item.owner_addr.slice(0, 4)}...${item.owner_addr.slice(38)}`}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
