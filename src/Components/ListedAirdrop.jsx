import { HeadProvider } from 'react-head'
import Banner from './Banner'
import { Helmet } from 'react-helmet-async'

const ListedAirdrop = () => {
  return (
    <div>
       <Helmet>
        <title>
          Airdrop Infinity | Bringing you the best crypto airdrops, in 2025!
        </title>
      </Helmet>
      <HeadProvider>

        <Banner />
      </HeadProvider>
    </div>
  )
}

export default ListedAirdrop