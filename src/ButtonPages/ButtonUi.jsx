import React, { useState, useMemo } from 'react';
import ReferralSlip from './ReferalSlip';
import TYFTBSlip from './TYFTBSlip';
import M2MSlip from './M2MSlip';
import Visitors from './Visitors';

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
    <div className="m-4">
      <button
      type="button"
      onClick={handleToggle}
      className="group w-full rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-gray-900">{label}</span>
        <span className="inline-flex h-2 w-2 rounded-full bg-amber-400 transition group-hover:scale-125" />
      </div>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="mt-4 inline-flex items-center gap-2 text-sm text-amber-600">
        Open
        <svg className="h-4 w-4 transition group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M6 4a1 1 0 011-1h7a1 1 0 011 1v7a1 1 0 11-2 0V6.414l-8.293 8.293a1 1 0 01-1.414-1.414L11.586 5H7a1 1 0 01-1-1z" clipRule="evenodd"/>
        </svg>
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
