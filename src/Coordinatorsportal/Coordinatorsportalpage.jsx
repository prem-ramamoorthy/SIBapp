import Header from "../MainPage/Header"
import LowAttendanceAlert from "./components/LowAttendanceAlert"
import MemberActivityReport from "./components/MemberActivityReport"
import AttendanceOverview from './components/AttendanceReport'

function Coordinatorsportal() {
  return (
    <div className="min-h-screen w-full  transition-colors duration-300">
      <div className="fixed top-2 left-0 right-0 z-50  shadow-md">
        <Header />
      </div>
      <MemberActivityReport />
      <LowAttendanceAlert />
      <AttendanceOverview />
    </div>
  )
}

export default Coordinatorsportal