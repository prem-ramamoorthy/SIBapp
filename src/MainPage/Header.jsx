import { HeaderAvatar } from './Components/Avatar'
import { Bell, Menu } from 'lucide-react'

function Header() {
  return (
    <div className="div1 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl
                  [grid-area:1/1/2/2] 
                  sm:[grid-area:1/1/2/5] 
                  md:[grid-area:1/1/2/7] 
                  lg:[grid-area:1/1/2/9] 
                  xl:[grid-area:1/1/2/11]
                  flex justify-between align-middle"
    >
      <div className="front flex flex-row">
        <div className="icon pt-5 pl-5"><Menu/></div>
        <h1 className='h-[40px] w-[40px] bg-amber-400 rounded-full font-bold py-2 m-3'>
          <span className='relative pl-2 '>SIB</span>
        </h1>
        <h1 className='font-bold pt-4 pl-2 text-lg [display:none] lg:[display:inline-block]
        xl:[display:inline-block] md:[display:inline-block]'>SENGUNTHAR IN BUSINESS</h1>
      </div>
      <div className="profile flex flex-row justify-end p-2 mx-4">
        <div className='pt-3 px-2'><Bell size={"20"} color='black' /></div>
        <h1 className='text-gray-700 font-bold text-[1.1rem] pt-2 px-2 [display:none] lg:[display:inline-block]
        xl:[display:inline-block] md:[display:inline-block]'>Chapter Name</h1>
        <HeaderAvatar />
      </div>
    </div>
  )
}

export default Header