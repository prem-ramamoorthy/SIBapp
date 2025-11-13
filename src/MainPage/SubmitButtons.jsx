import React from 'react'
import ButtonUI from './Components/ButtonUI'

function SubmitButtons() {
  const buttonData = [
    {
      label: "Submit Referral",
      discription: "Create new referal slip",
      component: "referral",
    },
    {
      label: "Submit TYB",
      discription: "Create new referal slip",
      component: "tyftb",
    },
    {
      label: "Submit M to M",
      discription: "Create new referal slip",
      component: "m2m",
    },
    {
      label: "Submit Visitor",
      discription: "Create new referal slip",
      component: "visitors",
    },
  ];

  const buttons = () => {
    return buttonData.map((button, i) => (
      <ButtonUI
        key={i}
        index={i}
        label={button.label}
        description={button.discription}
        component={button.component}
      />
    ));
  };

  return (
    <div
      className="
        div7 
        bg-white dark:bg-gray-700/5
        rounded-lg sm:rounded-xl lg:rounded-2xl
        [grid-area:20/1/21/2]
        sm:[grid-area:8/1/9/5]  
        md:[grid-area:9/1/10/7] 
        lg:[grid-area:9/1/10/9] 
        xl:[grid-area:10/1/11/11]
        grid 
        grid-cols-2 
        grid-rows-2 
        md:grid-cols-4 
        md:grid-rows-1
        lg:grid-cols-4 
        lg:grid-rows-1
        gap-2 gap-y-0 p-2 place-items-center
        lg:gap-4
        shadow-sm dark:shadow-gray-900/5
        transition-colors duration-300
      "
    >
      {buttons()}
    </div>
  );
}

export default SubmitButtons;