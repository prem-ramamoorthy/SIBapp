import ButtonUI from "./ButtonUi";
import Header from '../MainPage/Header'

function SubmitButtons() {
  const buttonData = [
    { label: "Submit Referral", discription: "Create new referal slip", component: "referral" },
    { label: "Submit TYFTB", discription: "Create new referal slip", component: "tyftb" },
    { label: "Submit M to M", discription: "Create new referal slip", component: "m2m" },
    { label: "Submit Visitor", discription: "Create new referal slip", component: "visitors" },
  ];

  return (
    <section className="w-full h-screen min-h-fit p-4">
      <Header />
      <div className="mx-auto max-w-6xl px-4 sm:py-10">
        <header className="mb-2 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Submit Actions</h2>
          <p className="mt-1 text-sm text-gray-600">Pick an action to continue.</p>
        </header>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {buttonData.map((button, i) => (
            <div
              key={i}
              className=""
            >
              <ButtonUI
                index={i}
                label={button.label}
                description={button.discription}
                component={button.component}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SubmitButtons;
