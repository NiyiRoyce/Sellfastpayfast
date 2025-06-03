import React, { useState } from "react";

const tabs = [
  {
    id: 1,
    title: "IOS",
  },
  {
    id: 2,
    title: "Android",
  },
];

interface DataItem {
  id: number;
  title: string;
}

interface QrItem {
  variant?: string;
}

const Qrcode: React.FC<QrItem> = ({ variant }) => {
  const [active, setActive] = useState(1);

  if (variant === "secondary") {
    return (
      <div className="w-[203px]">
        <div className="w-full flex items-center justify-between gap-[19px] mb-[27px]">
          {tabs.map((item: DataItem, index) => {
            return (
              <div
                onClick={() => setActive(item.id)}
                key={index}
                className={`cursor-pointer p-[8px] rounded-[17px] flex items-center text-[14px] w-full justify-center ${
                  active === item.id
                    ? `bg-[#1d1d1d] text-white font-times font-semibold`
                    : `bg-transparent text-white font-times font-medium`
                }`}
              >
                {item?.title}
              </div>
            );
          })}
        </div>
        <div className="w-[203px] h-[203px] rounded-[16px] bg-[#1d1d1d] p-[17px] shadow-md flex items-center justify-center">
          <svg
            width="169"
            height="150"
            viewBox="0 0 169 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4962_127182)">
              <path
                d="M63.6637 0.79541H0.461914V56.5408H63.6637V0.79541ZM53.1301 47.2499H10.9955V10.0863H53.1301V47.2499Z"
                fill="white"
              />
              <path
                d="M21.5297 19.3784H42.5969V37.9602H21.5297V19.3784ZM0.462402 149.451H63.6642V93.7056H0.462402V149.451ZM10.996 102.997H53.1306V140.16H10.996V102.997Z"
                fill="white"
              />
              <path
                d="M21.5283 112.286H42.5956V130.868H21.5283V112.286ZM105.797 0.79541V56.5408H168.999V0.79541H105.797ZM158.466 47.2499H116.331V10.0863H158.466V47.2499Z"
                fill="white"
              />
              <path
                d="M126.865 19.3772H147.933V37.959H126.865V19.3772ZM21.5292 65.8317H0.461914V84.4135H32.0628V75.1226H21.5292V65.8317ZM74.1973 84.4135H95.2646V102.995H74.1973V84.4135ZM32.0628 65.8317H53.1301V75.1226H32.0628V65.8317ZM95.2646 112.286H74.1973V121.577H84.731V130.868H95.2646V121.577V112.286ZM63.6637 65.8317V75.1226H53.1301V84.4135H74.1973V65.8317H63.6637ZM84.731 37.959H95.2646V56.5408H84.731V37.959ZM95.2646 75.1226V84.4135H116.332V65.8317H84.731V75.1226H95.2646ZM74.1973 56.5408H84.731V65.8317H74.1973V56.5408ZM95.2646 130.868H116.332V149.45H95.2646V130.868ZM74.1973 130.868H84.731V149.45H74.1973V130.868ZM95.2646 102.995H105.798V112.286H95.2646V102.995ZM95.2646 28.6681V10.0863H84.731V0.79541H74.1973V37.959H84.731V28.6681H95.2646ZM126.865 130.868H137.399V149.45H126.865V130.868ZM126.865 112.286H147.933V121.577H126.865V112.286ZM116.332 121.577H126.865V130.868H116.332V121.577ZM105.798 112.286H116.332V121.577H105.798V112.286ZM147.933 93.7044V102.995H158.466V112.286H169V93.7044H158.466H147.933ZM158.466 121.577H147.933V149.45H169V130.868H158.466V121.577ZM105.798 93.7044V102.995H137.399V84.4135H116.332V93.7044H105.798ZM126.865 65.8317V75.1226H147.933V84.4135H169V65.8317H147.933H126.865Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_4962_127182">
                <rect
                  width="168.538"
                  height="148.654"
                  fill="white"
                  transform="translate(0.461914 0.79541)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="w-[203px]">
      <div className="w-full flex items-center justify-between gap-[19px] mb-[27px]">
        {tabs.map((item: DataItem, index) => {
          return (
            <div
              onClick={() => setActive(item.id)}
              key={index}
              className={`cursor-pointer p-[8px] rounded-[17px] flex items-center text-[14px] w-full justify-center ${
                active === item.id
                  ? `bg-white text-black font-outfit font-semibold`
                  : `bg-[#EF767A] text-white font-times font-medium`
              }`}
            >
              {item?.title}
            </div>
          );
        })}
      </div>
      <div className="w-[203px] h-[203px] rounded-[16px] bg-white p-[17px] shadow-md flex items-center justify-center">
        <svg
          width="169"
          height="150"
          viewBox="0 0 169 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_4901_124987)">
            <path
              d="M63.6637 0.461914H0.461914V56.2073H63.6637V0.461914ZM53.1301 46.9164H10.9955V9.75281H53.1301V46.9164Z"
              fill="#334155"
            />
            <path
              d="M21.5294 19.0449H42.5967V37.6267H21.5294V19.0449ZM0.462158 149.118H63.6639V93.3721H0.462158V149.118ZM10.9958 102.663H53.1303V139.827H10.9958V102.663Z"
              fill="#334155"
            />
            <path
              d="M21.5286 111.953H42.5958V130.535H21.5286V111.953ZM105.798 0.461914V56.2073H168.999V0.461914H105.798ZM158.466 46.9164H116.331V9.75281H158.466V46.9164Z"
              fill="#334155"
            />
            <path
              d="M126.865 19.0437H147.933V37.6255H126.865V19.0437ZM21.5292 65.4982H0.461914V84.08H32.0628V74.7891H21.5292V65.4982ZM74.1973 84.08H95.2646V102.662H74.1973V84.08ZM32.0628 65.4982H53.1301V74.7891H32.0628V65.4982ZM95.2646 111.953H74.1973V121.244H84.731V130.535H95.2646V121.244V111.953ZM63.6637 65.4982V74.7891H53.1301V84.08H74.1973V65.4982H63.6637ZM84.731 37.6255H95.2646V56.2073H84.731V37.6255ZM95.2646 74.7891V84.08H116.332V65.4982H84.731V74.7891H95.2646ZM74.1973 56.2073H84.731V65.4982H74.1973V56.2073ZM95.2646 130.535H116.332V149.116H95.2646V130.535ZM74.1973 130.535H84.731V149.116H74.1973V130.535ZM95.2646 102.662H105.798V111.953H95.2646V102.662ZM95.2646 28.3346V9.75281H84.731V0.461914H74.1973V37.6255H84.731V28.3346H95.2646ZM126.865 130.535H137.399V149.116H126.865V130.535ZM126.865 111.953H147.933V121.244H126.865V111.953ZM116.332 121.244H126.865V130.535H116.332V121.244ZM105.798 111.953H116.332V121.244H105.798V111.953ZM147.933 93.3709V102.662H158.466V111.953H169V93.3709H158.466H147.933ZM158.466 121.244H147.933V149.116H169V130.535H158.466V121.244ZM105.798 93.3709V102.662H137.399V84.08H116.332V93.3709H105.798ZM126.865 65.4982V74.7891H147.933V84.08H169V65.4982H147.933H126.865Z"
              fill="#334155"
            />
          </g>
          <defs>
            <clipPath id="clip0_4901_124987">
              <rect
                width="168.538"
                height="148.654"
                fill="white"
                transform="translate(0.461914 0.461914)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Qrcode;
