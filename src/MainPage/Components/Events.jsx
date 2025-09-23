
function Events({company = "The Future of AI in Everyday Life" , date = "July 15, 2024", time = "3:00 PM - 4:00 PM", vatNumber = "FBIOPENUP"}) {
    return (
        <div className="event flex flex-wrap gap-2 px-4 overflow-auto sm:px-6 lg:px-4 md:px-2 pb-4">
            <h3 className="text-gray-600">
                <span className="font-semibold text-gray-800">Company :</span>{company}</h3>
            <p className="text-gray-600">
                <span className="font-semibold text-gray-800">Date :</span> {date} | <span className="font-semibold text-gray-800">Time :</span> {time}</p>
            <p className="text-gray-600">
                <span className="font-semibold text-gray-800">VAT Number :</span> {vatNumber}  </p>
        </div>
    )
}

export default Events