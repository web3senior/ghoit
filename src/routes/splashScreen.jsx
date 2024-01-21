import { useState, useEffect, useRef } from 'react'
import { defer, useNavigate, useLoaderData } from 'react-router-dom'
import { Title } from './helper/DocumentTitle'
import Logo from '/logo.svg'
import styles from './SplashScreen.module.scss'

export const loader = async () => {
  return defer({
    isTourSeen: localStorage.getItem('tour'),
  })
}

const SplashScreen = ({ title }) => {
  Title(title)
  const [loaderData, setLoaderData] = useState(useLoaderData())
  const navigate = useNavigate()
  const frameRef = useRef()

  const runAnimation = (e) => {
    window.setTimeout(() => {
      frameRef.current.classList.add('animate__fadeOut')
    }, 1000)

    window.setTimeout(() => {
      if (JSON.parse(loaderData.isTourSeen)) navigate('/home')
      else navigate('/home')
    }, 1500)
  }

  useEffect(() => {
    runAnimation()
  }, [])

  return (
    <section className={`${styles.section} animate__animated animate__fadeIn`} ref={frameRef} data-app-name={import.meta.env.VITE_NAME}>
      <figure>
        <img alt={import.meta.env.VITE_NAME} src={Logo} />
      </figure>
    </section>
  )
}

export default SplashScreen
