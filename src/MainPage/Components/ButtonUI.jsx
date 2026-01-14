import React, { useState, useMemo } from 'react';
import ReferralSlip from '../../ButtonPages/ReferalSlip';
import TYFTBSlip from '../../ButtonPages/TYFTBSlip';
import M2MSlip from '../../ButtonPages/M2MSlip';
import Visitors from '../../ButtonPages/Visitors';
import { LogOut } from 'lucide-react';

function ButtonUI({ label, description, component }) {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(v => !v);
  const handleClose = () => setOpen(false);

  const componentMap = useMemo(() => ({
    visitors: Visitors,
    referral: ReferralSlip,
    m2m: M2MSlip,
    tyftb: TYFTBSlip,
  }), []);

  const Comp = componentMap[component] ?? null;

  return (
    <div className="w-full h-full min-h-[100px]">
      <button
        onClick={handleToggle}
        className="
          bg-yellow-300  dark:bg-yellow-400
          hover:bg-yellow-500 dark:hover:bg-yellow-400/80
          rounded-2xl
          hover:scale-[1.02] active:scale-95
          transition-all duration-200 ease-in-out
          flex flex-col items-center justify-center
          w-full h-full
          p-3 sm:p-4
          text-black
          shadow-sm
        "
        type="button"
      >
        <div>
          <h4 className="text-sm sm:text-base font-bold mt-1">{label}</h4>
          <p className="text-xs sm:text-sm font-medium mt-1 text-gray-700 dark:text-black/70">{description}</p>
        </div>
      </button>

      {open && Comp ? (
        <div
          className="fixed inset-0 z-[1000]"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 backdrop-blur-sm bg-black/20"
            onClick={handleClose}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full h-full max-w-[1600px] max-h-[90vh] sm:max-h-[95vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col">
               <div className="p-2 text-right">
                  <button onClick={handleClose} className="p-2 text-gray-500 hover:text-red-500">Close</button>
               </div>
              <div
                className="
                  relative w-full h-full
                  overflow-y-auto
                  p-2 sm:p-5
                "
              >
                <Comp onClose={handleClose} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {open && !Comp ? (
        <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
          Unknown component: {String(component)}
        </div>
      ) : null}
    </div>
  );
}

export default ButtonUI;