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
    <div className="div2 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl
                    [grid-area:10/1/15/2] 
                    sm:[grid-area:5/1/8/3] 
                    md:[grid-area:5/1/9/4] 
                    lg:[grid-area:5/1/9/5] 
                    xl:[grid-area:5/1/10/5]"
    >
      <div className="header flex flex-row justify-between align-middle m-2">
        <h2 className="text-[18px] font-[600] text-black m-4">Activity</h2>
        <div className="buttonContainer flex gap-2 m-2 flex-row">
          {Buttons}
        </div>
      </div>
      <div className="container -mt-3 md:-mt-4 lg:mt-0 xl:mt-0">
        {ActivityPs}
      </div>
    </div>
  )
}

export default Activity