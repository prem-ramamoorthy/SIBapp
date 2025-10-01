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
    <div className="my-2">
      <button
        onClick={handleToggle}
        className="bg-yellow-400 hover:bg-yellow-500 rounded-2xl hover:scale-105 transition-transform duration-200 ease-in-out flex flex-col items-center justify-center h-4/5 w-full p-2 lg:h-auto lg:w-60 md:h-auto md:w-40"
        type="button"
      >
        <div>
          <h4 className="text-[0.9rem] font-semibold text-black mt-1">{label}</h4>
          <p className="text-[0.8rem] text-gray-600 font-semibold mb-2">{description}</p>
        </div>
      </button>

      {open && Comp ? (
        <div
          className="fixed inset-0 z-[1000]"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
            onClick={handleClose}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full h-full max-w-[1600px] max-h-[100vh]">
              <div className="relative w-full h-full rounded-xl shadow-xl overflow-scroll
              backdrop-blur-5xl backdrop-saturate-200
                              border border-white/30 p-5">
                  <Comp onClose={handleClose} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {open && !Comp ? (
        <div className="mt-2 text-red-600 text-sm">Unknown component: {String(component)}</div>
      ) : null}
    </div>
  );
}

export default ButtonUI;
