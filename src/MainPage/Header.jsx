import { HeaderAvatar } from './Components/Avatar'
import { Bell } from 'lucide-react'

function Header() {
  return (
   <div className="div1 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl
                  [grid-area:1/1/2/2] 
                  sm:[grid-area:1/1/2/5] 
                  md:[grid-area:1/1/2/7] 
                  lg:[grid-area:1/1/2/9] 
                  xl:[grid-area:1/1/2/11]"
    >
      <div className="profile flex flex-row justify-end p-2 mx-4">
        <div className='pt-3 px-2'><Bell size={"20"} color='black'/></div>
          <h1 className='text-gray-700 font-bold text-[1.1rem] pt-2 px-2'>Chapter Name</h1>
          <HeaderAvatar/>
      </div>
    </div>
  )
}

export default Header