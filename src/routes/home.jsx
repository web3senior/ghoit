import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Loading from './components/LoadingSpinner'
import { CheckIcon, ChromeIcon, BraveIcon } from './components/icons'
import toast, { Toaster } from 'react-hot-toast'
import Logo from './../../src/assets/logo.svg'
import GHOcoin from './../../src/assets/gho-coin.svg'
import AaveLogo from './../../src/assets/aave.svg'
import GHOLogo from './../../src/assets/gho.svg'
import styles from './Home.module.scss'
import { useAuth } from './../contexts/AuthContext'

function Home({ title }) {
  Title(title)
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()
  const navigate = useNavigate()

  return (
    <>
      {isLoading && <Loading />}

      <section className={styles.section}>
        <div className={`__container`} data-width={`small`}>
          <div className={`${styles.container} d-flex flex-column align-items-center justify-content-center`}>
            <figure className="animate__animated animate__pulse animate__infinite">
              <img src={GHOcoin} />
            </figure>

            <div>
              <h5>{import.meta.env.VITE_NAME}</h5>
              <p>The gateway to a world of secure and transparent transactions, connect, create, and make payment</p>
            </div>

            <button className='btn' onClick={() => auth.connect().then(() => (window.location.href = '/usr/dashboard'))}>Connect</button>
          </div>

          <ul className="d-flex flex-row align-items-center justify-content-center mt-60" style={{ columnGap: '1rem' }}>
            <li>
              <a href="https://aave.com/" target="_blank">
                <figure>
                  <img src={AaveLogo} />
                </figure>
              </a>
            </li>
            <li>
              <a href="https://gho.xyz/" target="_blank">
                <figure>
                  <img src={GHOLogo} />
                </figure>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Home
