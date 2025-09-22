import { useState, useRef } from "react";

export default function Helpful({content = "Helpful tooltip text" , content2 = null , styles = "" }) {
  const [show, setShow] = useState(false);
  const tipRef = useRef(null); // no type in .jsx [web:36]

  const handleMove = (e) => { // no TS annotation in .jsx [web:36]
    if (!tipRef.current) return;
    const OFFSET = 12;
    tipRef.current.style.left = `${e.clientX + OFFSET}px`;
    tipRef.current.style.top = `${e.clientY + OFFSET}px`;
  };

  return (
    <>
      <p
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={handleMove}
        aria-describedby="cursor-tip"
        className={styles}
      >
       {content}
      </p>
    {content2 && (
      <span
        id="cursor-tip"
        ref={tipRef}
        role="tooltip"
        aria-hidden={!show}
        className={[
          "fixed z-[1000] select-none",
          "rounded-md bg-gray-500 px-2 py-1 text-xs text-white shadow-lg",
          "whitespace-nowrap pointer-events-none",
          show ? "opacity-100" : "opacity-0",
          "transition-opacity"
        ].join(" ")}
      >
        {content2}
      </span>
    )}
    </>
  );
}
