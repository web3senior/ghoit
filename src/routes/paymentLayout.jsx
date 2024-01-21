import { useEffect, useState } from 'react'
import { Outlet, useLocation, Link, NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth, chainID } from '../contexts/AuthContext'
import MaterialIcon from './helper/MaterialIcon'
import { MenuIcon } from './components/icons'
import styles from './paymentLayout.module.scss'
import PoweredByGHOIT from './../assets/powered-by-ghoit.svg'

let link = [
  {
    name: 'Dashboard',
    icon: 'Dashboard',
    path: 'dashboard',
  },
  {
    name: 'Merchant',
    icon: 'credit_card',
    path: 'merchant',
  },
  {
    name: 'Invoice',
    icon: 'receipt_long',
    path: 'invoice',
  },
]

export default function Root() {
  const [network, setNetwork] = useState()
  const [isLoading, setIsLoading] = useState()
  const noHeader = ['/', '/splashscreen', '/tour']
  const auth = useAuth()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const location = useLocation()

  const handleNavLink = (route) => {
    if (route) navigate(route)
    handleOpenNav()
  }

  const handleOpenNav = () => {
    document.querySelector('#modal').classList.toggle('open')
    document.querySelector('#modal').classList.toggle('blur')
    document.querySelector('.cover').classList.toggle('showCover')
  }
  useEffect(() => {
    chainID().then((res) => {
      let networkType
      switch (res) {
        case 5:
          networkType = `TESTNET`
          break
        case 1:
          networkType = `MAINNET`
          break
        default:
          break
      }
      setNetwork(networkType)
    })
  }, [])

  return (
    <>
      <Toaster />
      {!noHeader.includes(location.pathname) && (
        <>
          <div className={styles.layout}>


                  <Outlet />
      

            <footer className='d-flex align-items-center justify-content-center'>
              <figure>
                <img src={PoweredByGHOIT} />
              </figure>
            </footer>
          </div>
        </>
      )}
    </>
  )
}
