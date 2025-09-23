import SiteButtonUI from "./Components/SiteButtonUI"

function SiteInfo() {

  const Buttons = {
    renewalDate: <SiteButtonUI content="12 Sep 2025" />,
    website: <SiteButtonUI content="SIB Website" style={{display: "none"}} color="text-red-500/80" style2={{fontWeight: "600" , fontSize: "1rem"}} />,
  }
  return (
     <div className="div4 rounded-lg sm:rounded-xl lg:rounded-2xl
                    [grid-area:2/1/3/2] 
                    sm:[grid-area:2/4/3/5] 
                    md:[grid-area:2/5/3/7] 
                    lg:[grid-area:2/6/3/9] 
                    xl:[grid-area:2/7/3/11]
                    grid place-items-center
                    grid-cols-2
                    grid-rows-1
                    gap-4
                    px-4"
    >
        {Buttons.renewalDate}
        {Buttons.website}
  </div>
  )
}

export default SiteInfo