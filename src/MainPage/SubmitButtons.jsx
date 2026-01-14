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
        bg-white dark:bg-gray-700/5
        rounded-lg sm:rounded-xl lg:rounded-2xl
        grid 
        grid-cols-2 
        md:grid-cols-4 
        gap-3 sm:gap-4
        p-3 sm:p-4
        shadow-sm dark:shadow-gray-900/5
        transition-colors duration-300
      "
    >
      {buttons()}
    </div>
  );
}

export default SubmitButtons;