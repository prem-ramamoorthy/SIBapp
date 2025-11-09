import Header from '../MainPage/Header'
import MemberDetailedAnalyticsReport from './componetns/MemberAnalytics'
import ReferralsTable from './componetns/ReferralOverview'
import TYFTBTable from './componetns/Tyftboverview'
import One2OneMeetingsTable from './componetns/M2moverview'

function MemberDetailedAnalytics() {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='top-2 sticky w-[98vw]'>
        <Header />
      </div>
      <div className='flex flex-col justify-center w-max items-middle'>
        <MemberDetailedAnalyticsReport />
        <ReferralsTable />
        <TYFTBTable />
        <One2OneMeetingsTable />
      </div>
    </div>
  )
}

export default MemberDetailedAnalytics