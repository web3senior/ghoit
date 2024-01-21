import { Title } from './helper/DocumentTitle'
import styles from './Aave.module.scss'

export default function About({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn ${styles.container}`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
          <div className="card__header">{title}</div>
          <div className="card__body">
            <p>
              Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a
              passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion. This Portal links to
              the key resources on Aave to understand the fundamentals of the Protocol. Please join the discussion on Aave community Discord server; our team and members of the
              community look forward to helping you build on top of Aave.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
