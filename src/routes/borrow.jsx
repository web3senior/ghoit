import { Suspense, useState, useEffect } from 'react'
import { useLoaderData, defer, Await, Form, useActionData, Link } from 'react-router-dom'
import { getInvoice } from '../util/api'
import { Title } from './helper/DocumentTitle'
import LoadingSpinner from './components/LoadingSpinner'
import { useAuth, web3 } from '../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import Heading from './helper/Heading'
import styles from './Borrow.module.scss'
import toast from 'react-hot-toast'
import GHOAbi from './../abi/GHO.json'
const POOL_CONTRACT_ADDRESS = '0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951'
const WETH_ADDRESS = '0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c'
const GHO_Address = '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60'
import PoolAbi from './../abi/Pool.json'
import ETHDepositeAbi from './../abi/ETHdeposite.json'


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
  const [balance, setBalance] = useState(0)
  const [pool, setPool] = useState([])
  const auth = useAuth()
  let errors = useActionData()

  const borrow = () => {
    const t = toast.loading(`Borrowing`)
    let asset = document.querySelector("[name='borrow_asset']").value
    let amount = BigInt(web3.utils.toWei(document.querySelector("[name='borrow_amount']").value, 'ether'))
    const contract = new web3.eth.Contract(PoolAbi, POOL_CONTRACT_ADDRESS)
    contract.options.from = auth.wallet

    contract.methods.borrow(asset, amount, 2, 0, auth.wallet).send().then(result =>{
      console.log(result)
      toast.success(`Minted successfully`)
      toast.dismiss(t)
    })
  }
  /**
   *
   * Deposite ETH
   */
  const supply = () => {
    const t = toast.loading(`Supplying`)
    let asset = document.querySelector("[name='supply_asset']").value
    let amount = BigInt(web3.utils.toWei(document.querySelector("[name='supply_amount']").value, 'ether'))
    const contract = new web3.eth.Contract(ETHDepositeAbi, '0x387d311e47e80b498169e6fb51d3193167d89F7D')
    contract.options.from = auth.wallet

    contract.methods.depositETH(asset, auth.wallet, 0).send({ value: amount }).then(result =>{
      console.log(result)
      toast.success(`Supplied successfully, now you can borrow`)
       toast.dismiss(t)
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
    readBalance()
  }, [])

  return (
    <section className={`${styles.section} animate fade`}>
      <div className={`__container`} data-width={`large`}>
        <Heading title={`Supply & Borrow`} />

          <div className="card">
          <div className="card__body">
            Your current balance: <span className='badge badge-success'>{balance} $GHO</span>
          </div>
          </div>

        <div className="card mt-20">
          <div className="card__header">Supply</div>
          <div className="card__body">
            <div>
              <label htmlFor="">Asset <span className='badge badge-warning'>(Accept ETH)</span></label>
              <input type="text" name="supply_asset" defaultValue={WETH_ADDRESS} />
            </div>
            <div>
              <label htmlFor="">Amount</label>
              <input type="number" name="supply_amount" defaultValue={`0.005`} />
            </div>
            <div className='mt-20'>
            <button className='btn' onClick={() => supply()}>Supply</button>
            </div>
          </div>
        </div>

        
        <div className="card mt-20">
          <div className="card__header">Borrow</div>
          <div className="card__body">
          <div>
            <label htmlFor="">Token <span className='badge badge-success'>(GHO)</span></label>
            <input type="text" name="borrow_asset" defaultValue={GHO_Address} />
          </div>
          <div>
            <label htmlFor="">Amount</label>
            <input type="number" name="borrow_amount" defaultValue={15} />
          </div>
          <button onClick={() => borrow()} className='btn mt-40'>Borrow</button>
          </div>
        </div>

        {/* <div className={`${styles.assetItem} grid grid--fit grid--gap-1`} style={{ '--data-width': '400px' }}>
          {data && data.length > 0 && data.map((item, i) => <MerchantItem item={item} key={i} />)}
        </div> */}
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
          <li>
            merchant id: <span className="badge badge-info">#{item.merchant_id}</span>
          </li>
          <li>invoice id: #{item.acceptor_invoice_id}</li>
          <li>
            amount: {item.amount} <span className="badge badge-dark">$GHO</span>
          </li>
          <li>status: {item.status === '0' ? <span className="badge badge-warning">Pending</span> : <span className="badge badge-success">Paid</span>}</li>

          {item.txn !== null ? (
            <>
              <li>
                <small>
                  <a href={`https://sepolia.etherscan.io/tx/${item.txn}`} className="text-danger" target="_blank">
                    {' '}
                    View transaction
                  </a>
                </small>
              </li>
            </>
          ) : (
            <>
              <Link to={`/invoice/${item.id}`} target="_blank">
                <button className="text-primary">Make payment</button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
