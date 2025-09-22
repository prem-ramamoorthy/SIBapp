import React from 'react'

function ButtonUI({ label, description , onClick = () => {} }) {
    return (
        <button onClick={onClick} className="bg-yellow-400 hover:bg-yellow-500 rounded-2xl hover:scale-102 transition-transform duration-200 ease-in-out flex flex-col items-center justify-center h-4/5 w-4/4 p-2 m-4 lg:h-6/6 lg:w-60 md:h-5/6 md:w-40">
            <div>
                <h4 className='text-[0.9rem] font-semibold text-black mt-1'>{label}</h4>
                <p className="text-[0.8rem] text-gray-600 font-semibold mb-2">{description}</p>
            </div>
        </button>
    )
}

export default ButtonUI