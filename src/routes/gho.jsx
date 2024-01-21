import { Title } from './helper/DocumentTitle'
import styles from './Gho.module.scss'

export default function About({ title }) {
  Title(title)

  return (
    <section className={styles.section}>
      <div className={`__container ms-motion-slideUpIn ${styles.container}`} data-width={`large`}>
        <div className={`card ms-depth-4 text-justify`}>
        <div className="card__header">{title}</div>
          <div className="card__body">
            <p>
              GHO (pronounced &quot;go&quot;) is a decentralized overcollateralized stablecoin that is initially only minted from assets supplied to the Aave Protocol. GHO&rsquo;s
              value is programmatically aligned to the U.S. Dollar, which will be maintained through market efficiency.
            </p>

            <p>
              As a decentralized stablecoin on the Ethereum Mainnet, GHO is minted by users. As with all borrowing on the Aave Protocol, a user must supply collateral (at a
              specific collateral ratio) to be able to mint GHO. Correspondingly, when a user repays a borrow position (or is liquidated), the GHO is returned to the Aave pool and
              burned. All the interest payments accrued by minters of GHO will go directly to the&nbsp;
              <a href="https://zapper.fi/daos/aave" target="_blank">
                Aave DAO treasury
              </a>
              , in contrast to the standard reserve factor collected when users borrow other assets, and the principal is burned.
            </p>

            <p>
              Significant demand exists for a stablecoin that is truly decentralized, overcollateralized, and configurable. Recent events have demonstrated the use case for
              decentralized stablecoins as a means of maintaining a stable value during periods of market volatility. GHO, a stablecoin controlled by Aave Governance, has the
              potential to become an integral part of the continued growth of the DeFi ecosystem with community support.
            </p>

            <p>
              Explore the GHO documentation to understand how it works and why the development of GHO is essential for the broader ecosystem. The&nbsp;
              <a href="https://github.com/aave/gho-core/blob/main/techpaper/GHO_Technical_Paper.pdf" target="_blank">
                Technical Paper
              </a>
              &nbsp;and Smart Contracts pages will provide guidance on how to integrate GHO.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
