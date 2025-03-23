import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Laptop, Smartphone } from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamQ2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-lg p-10 "
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <Laptop/>
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.card />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <Icons.ticket />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <img src="logo.png" alt="Q2" />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.party />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <Icons.dashboard />
          </Circle>
          <Circle ref={div7Ref}>
            <Smartphone/>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

const Icons = {
  cart: () => (
    <svg
      width="1800px"
      height="1800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  card: () => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12C22 8.22876 22 6.34315 20.8284 5.17157C19.6569 4 17.7712 4 14 4H10C6.22876 4 4.34315 4 3.17157 5.17157C2 6.34315 2 8.22876 2 12C2 15.7712 2 17.6569 3.17157 18.8284C4.34315 20 6.22876 20 10 20H14C17.7712 20 19.6569 20 20.8284 18.8284C21.4816 18.1752 21.7706 17.3001 21.8985 16"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M10 16H6"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M14 16H12.5"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M2 10L7 10M22 10L11 10"
        stroke="#1C274C"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  ),
  ticket: () => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 4L10 20"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="5 5"
      />
    </svg>
  ),
  party: () => (
    <svg
      fill="#000000"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width="800px"
      height="800px"
      viewBox="0 0 256 256"
      enable-background="new 0 0 256 256"
    >
      <path
        d="M87.002,70.047c4.24,10.293,16.021,15.2,26.315,10.96c6.352-2.617,10.643-8.108,12.009-14.347l16.375,4.657l2.249-6.608
	l-16.786-11.215l1.627-13.675c0.305-2.567-1.299-4.975-3.785-5.682l-21.375-6.079c-2.486-0.707-5.118,0.497-6.209,2.84
	l-5.668,12.175L72.12,44.281l-2.249,6.607l16.784,4.774C85.058,60.178,85.034,65.269,87.002,70.047z M127.515,131.464H103.24
	L90.648,85.99c-1.821-8.031-8.992-14.15-17.406-14.15H28.81c-3.065,0-6.129,1.628-7.849,4.309L3.343,106.947
	c-2.68,4.299-0.961,9.699,3.257,12.339c3.843,2.397,9.538,0.931,12.329-3.065l15.04-26.115h23.303L28.588,139.57
	c-3.346,5.771-3.663,12.812-0.848,18.86l14.36,30.856l-12.663,48.457c-1.77,6.999,2.397,14.018,9.214,15.849
	c6.999,1.77,14.008-2.397,15.849-9.214l13.401-53.029c0.718-2.721,0.627-5.947-0.809-8.678l-1.224-2.589l17.204,9.912L66.1,236.236
	c-2.468,6.706,0.708,14.362,7.373,16.901c6.766,2.579,14.221-0.819,16.719-7.596l20.744-56.69
	c2.569-7.009-0.293-14.827-6.766-18.529l-36.664-20.926l14.342-25.053l5.234,18.492c1.184,4.05,4.898,6.834,9.117,6.834h31.314
	c5.065,0.183,8.862-3.65,9.052-8.616C136.739,136.519,132.368,131.908,127.515,131.464z M190.205,60.283
	c16.823-6.387,25.937-24.044,22.136-41.086c-0.049,0.876-0.442,1.597-0.804,2.401c-2.273,5.056-8.353,7.364-13.409,5.09
	c-0.804-0.362-1.557-0.838-2.195-1.263c-5.544-4.565-13.392-6.16-20.387-3.504c-10.494,3.984-16.014,15.798-11.935,26.542
	C167.69,59.206,179.462,64.361,190.205,60.283z M253.942,204.308c0,0-4.046-64.753-29.837-88.016
	c-0.17-0.153-0.337-0.295-0.506-0.443V69.487l21.414-9.347c5.463-2.386,8.391-8.52,6.81-14.269L241.496,8.319
	c-1.258-4.578-5.99-7.268-10.569-6.01c-4.578,1.259-7.269,5.991-6.009,10.569l9.151,33.277l-18.992,8.29l-38.175,16.952
	c-7.452,3.31-12.559,10.408-13.325,18.525l-1.897,20.062l-22.306-12.783c-4.12-2.361-9.373-0.936-11.734,3.184
	c-2.361,4.12-0.935,9.373,3.184,11.734l30.013,17.2c1.772,1.016,3.736,1.526,5.703,1.526c1.805,0,3.612-0.429,5.275-1.29
	c3.478-1.801,5.775-5.204,6.146-9.106l1.797-19.007l8.947,20.92c0,0,1.934,13.718-22.757,31.354
	c-28.32,20.228-18.711,62.202-18.711,62.202s8.44-2.941,20.734-4.623v31.425c0.008,6.093,5.169,11.046,11.126,11.126
	c6.093-0.008,11.038-5.166,11.126-11.126v-32.395c4.144,0.236,8.392,0.733,12.656,1.583l-0.259,0.118l8.408,33.344
	c1.498,5.906,7.713,9.447,13.508,8.068c5.906-1.498,9.44-7.708,8.068-13.508l-6.186-24.531
	C250.962,216.192,253.942,204.308,253.942,204.308z"
      />
    </svg>
  ),
  dashboard: () => (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 512 512"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>report-barchart</title>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="add" fill="#000000" transform="translate(42.666667, 85.333333)">
          <path
            d="M341.333333,1.42108547e-14 L426.666667,85.3333333 L426.666667,341.333333 L3.55271368e-14,341.333333 L3.55271368e-14,1.42108547e-14 L341.333333,1.42108547e-14 Z M330.666667,42.6666667 L42.6666667,42.6666667 L42.6666667,298.666667 L384,298.666667 L384,96 L330.666667,42.6666667 Z M106.666667,85.3333333 L106.666,234.666 L341.333333,234.666667 L341.333333,256 L85.3333333,256 L85.3333333,85.3333333 L106.666667,85.3333333 Z M170.666667,149.333333 L170.666667,213.333333 L128,213.333333 L128,149.333333 L170.666667,149.333333 Z M234.666667,106.666667 L234.666667,213.333333 L192,213.333333 L192,106.666667 L234.666667,106.666667 Z M298.666667,170.666667 L298.666667,213.333333 L256,213.333333 L256,170.666667 L298.666667,170.666667 Z"
            id="Combined-Shape"
          ></path>
        </g>
      </g>
    </svg>
  ),
  phone: () => (
    <svg
      fill="#000000"
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      id="mobile-payment-done-2"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      className="icon flat-line"
    >
      <path
        id="secondary"
        d="M20,3H17l-.5,2h-3L13,3H10A1,1,0,0,0,9,4V20a1,1,0,0,0,1,1H20a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3Z"
        fill="rgb(44, 169, 188)"
        strokeWidth="2"
      ></path>
      <polyline
        id="primary"
        points="13 12 14.09 13.25 16 10.75"
        fill="none"
        stroke="rgb(0, 0, 0)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
      <path
        id="primary-2"
        data-name="primary"
        d="M4,7H9V17H4a1,1,0,0,1-1-1V8A1,1,0,0,1,4,7ZM3,11H9m12,9V4a1,1,0,0,0-1-1H10A1,1,0,0,0,9,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM13.5,5h3L17,3H13Z"
        fill="none"
        stroke="rgb(0, 0, 0)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
  ),
};
