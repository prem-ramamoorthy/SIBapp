import { FilePlus } from 'lucide-react'
import Helpful from './Helpful'

function ActivityP({
    content = 'Activity',
    upcoming = null,
    actual = 102,
}) {
    return (
        <div className="activityP flex flex-row justify-between align-middle m-3 px-2 lg:py-0.5">
            <p className='text-gray-600 text-md font-semibold '>{content}</p>
            <div className="nums flex flex-row gap-4 align-middle">
                <Helpful content={upcoming !== null ? `+${upcoming}` : ''} content2="Values Yet to be added" styles="num font-bold text-[gold]"/>
                <Helpful content={actual} styles="actual font-bold text-gray-600"/>
                <FilePlus className="icon mt-1" style={{ color: '#4B5563' , height: '1.2rem' , width: '1.2rem' }} />
            </div>
        </div>
    )
}

export default ActivityP