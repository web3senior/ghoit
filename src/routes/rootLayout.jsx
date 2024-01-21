import { useEffect, useState } from 'react'
import { Outlet, useLocation, Link, NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MaterialIcon from './helper/MaterialIcon'
import { MenuIcon } from './components/icons'
import styles from './RootLayout.module.scss'
import Logo from './../../src/assets/logo.svg'
import { useAuth } from './../contexts/AuthContext'

let link = [
  {
    name: 'Home',
    path: 'home',
  },
  {
    name: 'Aave',
    path: 'aave',
  },
  {
    name: 'GHO',
    path: 'gho',
  },
  {
    name: 'Payment Process',
    path: 'payment-process',
  },
  {
    name: 'Badge',
    path: 'badge',
  },
  {
    name: 'About',
    path: 'about',
  },
]

export default function Root() {
  const [network, setNetwork] = useState()
  const [isLoading, setIsLoading] = useState()
  const noHeader = ['/', '/splashscreen', '/tour']
  const navigate = useNavigate()
  const navigation = useNavigation()
  const location = useLocation()
  const auth = useAuth()

  const handleNavLink = (route) => {
    if (route) navigate(route)
    handleOpenNav()
  }

  const handleOpenNav = () => {
    document.querySelector('#modal').classList.toggle('open')
    document.querySelector('#modal').classList.toggle('blur')
    document.querySelector('.cover').classList.toggle('showCover')
  }
  useEffect(() => {}, [])

  return (
    <>
      <Toaster />
      <>
        <div className={styles.rootLayout}>
          {!noHeader.includes(location.pathname) && (
            <>
              <header className="animate fade">
                <Link to={`/`}>
                  <figure>
                    <img alt="Logo" src={Logo} draggable={false} />
                  </figure>
                </Link>

                <nav>
                  <ul className="d-flex align-items-center justify-content-center">
                    {link &&
                      link.map((item, i) => (
                        <li key={i}>
                          <NavLink to={`${item.path}`} className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : null)}>
                            <span>{item.name}</span>
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </nav>

                {auth.wallet ? `${auth.wallet.slice(0, 4)}...${auth.wallet.slice(38)}` : <button>Connect</button>}
              </header>
            </>
          )}

          <main>
            <Toaster />
            <Outlet />
          </main>
        </div>
      </>

      {/* <div className="cover" onClick={() => handleOpenNav()} />
      <nav className={`${styles.nav} animate`} id="modal">
        <figure>
          <img src={Logo} alt={`logo`} />
        </figure>
        <ul>
          <li className="">
            <button onClick={() => handleNavLink(`/`)}>
              <MaterialIcon name="home" />
              <span>Home</span>
            </button>
          </li>
          <li className="">
            <button onClick={() => handleNavLink(`/about`)}>
              <MaterialIcon name="info" />
              <span>About us</span>
            </button>
          </li>
          <li className="">
            <button onClick={() => handleNavLink(`/feedback`)}>
              <MaterialIcon name="feedback" />
              <span>Feedback</span>
            </button>
          </li>
          <li>
            X:{' '}
            <a href="https://twitter.com/" style={{ color: 'var(--area1)' }}>
              @upcardlink
            </a>
          </li>
        </ul>

        <small>{`Version ${import.meta.env.VITE_VERSION}`}</small>
      </nav> */}
    </>
  )
}
