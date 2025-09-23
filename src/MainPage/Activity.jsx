import ActivityButton from './Components/ActivityButton'
import ActivityP from './Components/ActivityP';

function Activity() {

  const Buttons = ['Month', '6 Months', 'Lifetime'].map((item, index) => <ActivityButton content={item} key={index} />);

  const ActivityPs = [
    { content: "Referal Given", actual: 102 },
    { content: "Referal Received", upcoming: 42, actual: 62 },
    { content: "New Customers", actual: 42 },
    { content: "New Orders", upcoming: 22, actual: 32 },
    { content: "Referal Received", actual: 62 },
    { content: "New Customers", upcoming: 32, actual: 42 },
    { content: "New Orders", actual: 32 },
  ].map((props, index) => <ActivityP key={index} {...props} />);

  return (
    <div
      className="
                div2 rounded-lg sm:rounded-xl lg:rounded-2xl
                [grid-area:10/1/15/2]
                sm:[grid-area:5/1/8/3]
                md:[grid-area:5/1/9/4]
                lg:[grid-area:5/1/9/5]
                xl:[grid-area:5/1/10/5]
                bg-white
                max-w-full
                min-h-0
                overflow-hidden
                flex flex-col
                "
    >
      <div className="header flex items-center justify-between gap-2 px-4 py-3 shrink-0">
        <h2 className="text-[18px] font-[600] text-black m-0">Activity</h2>
        <div className="buttonContainer flex gap-2">{Buttons}</div>
      </div>

      <div
        className="
      container
      max-w-full
      min-h-0
      flex-1
      overflow-auto
    "
      >
        {ActivityPs}
      </div>
    </div>

  )
}

export default Activity