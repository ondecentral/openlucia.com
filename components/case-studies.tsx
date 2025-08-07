import Link from "@/components/tracked-link";

// export default function CaseStudies() {
//   return (
//     <div className="mx-auto py-12 pb-20 max-w-6xl px-4 sm:px-6">
//       {/* Header section */}
//       <div className="mx-auto max-w-3xl pb-12 text-center">
//         <div className="-mx-0.5 flex justify-center -space-x-3">
//           <span className="rounded-full outline outline-stone-300 px-1.5 text-stone-500 text-sm mb-4">
//             Case Studies
//           </span>
//         </div>
//         <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.orange.300),theme(colors.orange.500),theme(colors.orange.400),theme(colors.orange.500),theme(colors.orange.300))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
//           Meet Lucia Attribution
//         </h2>
//         <p className="text-lg text-indigo-200/65">
//           Stuck tracking fragmented data? Unlock clarity to focus on what drives results and scale confidently.
//         </p>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         {/* Problem 1 */}
//         <div className="col-span-2 bg-stone-100 outline outline-stone-200 rounded-md p-4">
//           <div className="flex items-baseline gap-2.5">
//             {/* Icon */}
//             <svg
//               className="fill-current stroke-stone-500 text-transparent"
//               width={16}
//               height={16}
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M5 9.00002V17M9.5 9.00002V17M14.5 9.00002V17M19 9.00002V17M3 18.6L3 19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7952 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7952 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.04 21 17.7599 20.891 17.546C20.7951 17.3579 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H4.6C4.03995 17 3.75992 17 3.54601 17.109C3.35785 17.2049 3.20487 17.3579 3.10899 17.546C3 17.7599 3 18.04 3 18.6ZM11.6529 3.07715L4.25291 4.7216C3.80585 4.82094 3.58232 4.87062 3.41546 4.99082C3.26829 5.09685 3.15273 5.24092 3.08115 5.40759C3 5.59654 3 5.82553 3 6.28349L3 7.40002C3 7.96007 3 8.2401 3.10899 8.45401C3.20487 8.64217 3.35785 8.79515 3.54601 8.89103C3.75992 9.00002 4.03995 9.00002 4.6 9.00002H19.4C19.9601 9.00002 20.2401 9.00002 20.454 8.89103C20.6422 8.79515 20.7951 8.64217 20.891 8.45401C21 8.2401 21 7.96007 21 7.40002V6.2835C21 5.82553 21 5.59655 20.9188 5.40759C20.8473 5.24092 20.7317 5.09685 20.5845 4.99082C20.4177 4.87062 20.1942 4.82094 19.7471 4.7216L12.3471 3.07715C12.2176 3.04837 12.1528 3.03398 12.0874 3.02824C12.0292 3.02314 11.9708 3.02314 11.9126 3.02824C11.8472 3.03398 11.7824 3.04837 11.6529 3.07715Z"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <div className="flex flex-col text-left w-full">
//               <span className="text-stone-900 text-lg font-semibold">
//                 Centralized Exchange
//               </span>
//               <span className="text-stone-500 break-words whitespace-normal">
//                 This Centralized Exchange typically does not use paid ads, but
//                 uses organic content and exchange listing news to do marketing
//                 even if its organic. However, there is still a cost to marketing
//                 (there is no such thing as free lunch)
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Problem 2 */}
//         <div className="bg-stone-100 outline outline-stone-200 rounded-md p-4">
//           <div className="flex items-baseline gap-2.5">
//             {/* Icon */}
//             <svg
//               className="fill-current stroke-stone-500 text-transparent"
//               width={16}
//               height={16}
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M16 7.99983V4.50048C16 3.66874 16 3.25287 15.8248 2.9973C15.6717 2.77401 15.4346 2.62232 15.1678 2.57691C14.8623 2.52493 14.4847 2.6992 13.7295 3.04775L4.85901 7.14182C4.18551 7.45267 3.84875 7.6081 3.60211 7.84915C3.38406 8.06225 3.21762 8.32238 3.1155 8.60966C3 8.93462 3 9.30551 3 10.0473V14.9998M16.5 14.4998H16.51M3 11.1998L3 17.7998C3 18.9199 3 19.48 3.21799 19.9078C3.40973 20.2841 3.71569 20.5901 4.09202 20.7818C4.51984 20.9998 5.07989 20.9998 6.2 20.9998H17.8C18.9201 20.9998 19.4802 20.9998 19.908 20.7818C20.2843 20.5901 20.5903 20.2841 20.782 19.9078C21 19.48 21 18.9199 21 17.7998V11.1998C21 10.0797 21 9.51967 20.782 9.09185C20.5903 8.71552 20.2843 8.40956 19.908 8.21782C19.4802 7.99983 18.9201 7.99983 17.8 7.99983L6.2 7.99983C5.0799 7.99983 4.51984 7.99983 4.09202 8.21781C3.7157 8.40956 3.40973 8.71552 3.21799 9.09185C3 9.51967 3 10.0797 3 11.1998ZM17 14.4998C17 14.776 16.7761 14.9998 16.5 14.9998C16.2239 14.9998 16 14.776 16 14.4998C16 14.2237 16.2239 13.9998 16.5 13.9998C16.7761 13.9998 17 14.2237 17 14.4998Z"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <div className="flex flex-col text-left w-full">
//               <span className="text-stone-900 text-lg font-semibold">
//                 Crypto Wallet Company
//               </span>
//               <span className="text-stone-500 break-words whitespace-normal">
//                 A pioneering crypto wallet company sought to expand its user
//                 base by targeting audiences on Telegram and Discord,
//                 acknowledging the dominance of these platforms within the crypto
//                 community.
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Problem 3 */}
//         <div className="bg-stone-100 outline outline-stone-200 rounded-md p-4">
//           <div className="flex items-baseline gap-2.5">
//             {/* Icon */}
//             <svg
//               className="fill-current stroke-stone-500 text-transparent"
//               width={16}
//               height={16}
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M4 18V17.8C4 16.1198 4 15.2798 4.32698 14.638C4.6146 14.0735 5.07354 13.6146 5.63803 13.327C6.27976 13 7.11984 13 8.8 13H15.2C16.8802 13 17.7202 13 18.362 13.327C18.9265 13.6146 19.3854 14.0735 19.673 14.638C20 15.2798 20 16.1198 20 17.8V18M4 18C2.89543 18 2 18.8954 2 20C2 21.1046 2.89543 22 4 22C5.10457 22 6 21.1046 6 20C6 18.8954 5.10457 18 4 18ZM20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18ZM12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18ZM12 18V8M6 8H18C18.9319 8 19.3978 8 19.7654 7.84776C20.2554 7.64477 20.6448 7.25542 20.8478 6.76537C21 6.39782 21 5.93188 21 5C21 4.06812 21 3.60218 20.8478 3.23463C20.6448 2.74458 20.2554 2.35523 19.7654 2.15224C19.3978 2 18.9319 2 18 2H6C5.06812 2 4.60218 2 4.23463 2.15224C3.74458 2.35523 3.35523 2.74458 3.15224 3.23463C3 3.60218 3 4.06812 3 5C3 5.93188 3 6.39782 3.15224 6.76537C3.35523 7.25542 3.74458 7.64477 4.23463 7.84776C4.60218 8 5.06812 8 6 8Z"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <div className="flex flex-col text-left w-full">
//               <span className="text-stone-900 text-lg font-semibold">
//                 De-Fi Platform
//               </span>
//               <span className="text-stone-500 break-words whitespace-normal">
//                 A DeFi platform for trading perpetual swaps aimed to optimize
//                 its marketing strategy, acknowledging the shift in crypto user
//                 behavior towards community-driven platforms.
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Problem 4 */}
//         <div className="bg-stone-100 outline outline-stone-200 rounded-md p-4">
//           <div className="flex items-baseline gap-2.5">
//             {/* Icon */}
//             <svg
//               className="fill-current stroke-stone-500 text-transparent"
//               width={16}
//               height={16}
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <div className="flex flex-col text-left w-full">
//               <span className="text-stone-900 text-lg font-semibold">
//                 L1 Blockchain
//               </span>
//               <span className="text-stone-500 break-words whitespace-normal">
//                 This project currently is live on mainnet. But they are not a
//                 market leader compared to Solana or Ethereum. They have a number
//                 of channels where they post, do partnership announcements. Those
//                 would be YT, X, Discord, TG
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Problem 5 */}
//         <div className="bg-stone-100 outline outline-stone-200 rounded-md p-4">
//           <div className="flex items-baseline gap-2.5">
//             {/* Icon */}
//             <svg
//               className="fill-current stroke-stone-500 text-transparent"
//               width={16}
//               height={16}
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M2 2L4 4M22 2L20 4M22 22L20 20M2 22L4 20M2 16H3.5M8 2V3.5M22 8H20.5M16 22V20.5M18 16H21.5M16 2V6M2 8H6M8 22V18M11.4343 7.56569L7.56569 11.4343C7.36768 11.6323 7.26867 11.7313 7.23158 11.8455C7.19895 11.9459 7.19895 12.0541 7.23158 12.1545C7.26867 12.2687 7.36768 12.3677 7.56569 12.5657L11.4343 16.4343C11.6323 16.6323 11.7313 16.7313 11.8455 16.7684C11.9459 16.8011 12.0541 16.8011 12.1545 16.7684C12.2687 16.7313 12.3677 16.6323 12.5657 16.4343L16.4343 12.5657C16.6323 12.3677 16.7313 12.2687 16.7684 12.1545C16.8011 12.0541 16.8011 11.9459 16.7684 11.8455C16.7313 11.7313 16.6323 11.6323 16.4343 11.4343L12.5657 7.56569C12.3677 7.36768 12.2687 7.26867 12.1545 7.23158C12.0541 7.19895 11.9459 7.19895 11.8455 7.23158C11.7313 7.26867 11.6323 7.36768 11.4343 7.56569Z"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <div className="flex flex-col text-left w-full">
//               <span className="text-stone-900 text-lg font-semibold">
//                 Textile Manufactuer
//               </span>
//               <span className="text-stone-500 break-words whitespace-normal">
//                 A large-scale manufacturer creates a novel process where instead
//                 of using plastic materials, they use biodegradable PLA
//                 (poly-lactic acid) to be used fashion forward apparel. This
//                 company has several workstreams
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center mt-10">
//         <a
//           className="btn justify-self-center w-full bg-white text-stone-800 shadow hover:bg-stone-50 sm:ml-4 sm:w-auto"
//           href="https://lucia-protocol.notion.site/Lucia-Ad-Attribution-Case-Studies-862e0f534eed441b9478366060a3b22b?pvs=25"
//           target="_blank"
//         >
//           View Case Studies
//         </a>
//       </div>
//     </div>
//   );
// }

export default function CaseStudies() {
  return (
    <div className="mx-auto py-12 pb-20 max-w-6xl px-4 sm:px-6">
      {/* Header section */}
      <div className="mx-auto max-w-3xl pb-12 text-center">
        <div className="-mx-0.5 flex justify-center -space-x-3">
          <span className="rounded-full outline outline-stone-300 px-1.5 text-stone-500 text-sm mb-4">
            Case Studies
          </span>
        </div>
        <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.orange.300),theme(colors.orange.500),theme(colors.orange.400),theme(colors.orange.500),theme(colors.orange.300))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
          Meet Lucia Attribution
        </h2>
        <p className="text-lg text-indigo-200/65">
          Stuck tracking fragmented data? Unlock clarity to focus on what drives results and scale confidently.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Problem 1 */}
        <div className="col-span-1 md:col-span-2 bg-stone-100 outline outline-stone-200 rounded-md p-4">
          <div className="flex items-baseline gap-2.5">
            {/* Icon */}
            <svg
              className="fill-current stroke-stone-500 text-transparent"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 9.00002V17M9.5 9.00002V17M14.5 9.00002V17M19 9.00002V17M3 18.6L3 19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7952 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7952 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.04 21 17.7599 20.891 17.546C20.7951 17.3579 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H4.6C4.03995 17 3.75992 17 3.54601 17.109C3.35785 17.2049 3.20487 17.3579 3.10899 17.546C3 17.7599 3 18.04 3 18.6ZM11.6529 3.07715L4.25291 4.7216C3.80585 4.82094 3.58232 4.87062 3.41546 4.99082C3.26829 5.09685 3.15273 5.24092 3.08115 5.40759C3 5.59654 3 5.82553 3 6.28349L3 7.40002C3 7.96007 3 8.2401 3.10899 8.45401C3.20487 8.64217 3.35785 8.79515 3.54601 8.89103C3.75992 9.00002 4.03995 9.00002 4.6 9.00002H19.4C19.9601 9.00002 20.2401 9.00002 20.454 8.89103C20.6422 8.79515 20.7951 8.64217 20.891 8.45401C21 8.2401 21 7.96007 21 7.40002V6.2835C21 5.82553 21 5.59655 20.9188 5.40759C20.8473 5.24092 20.7317 5.09685 20.5845 4.99082C20.4177 4.87062 20.1942 4.82094 19.7471 4.7216L12.3471 3.07715C12.2176 3.04837 12.1528 3.03398 12.0874 3.02824C12.0292 3.02314 11.9708 3.02314 11.9126 3.02824C11.8472 3.03398 11.7824 3.04837 11.6529 3.07715Z"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col text-left w-full">
              <span className="text-stone-900 text-lg font-semibold">
                Centralized Exchange
              </span>
              <span className="text-stone-500 break-words whitespace-normal">
                This Centralized Exchange typically does not use paid ads, but
                uses organic content and exchange listing news to do marketing
                even if its organic. However, there is still a cost to marketing
                (there is no such thing as free lunch)
              </span>
            </div>
          </div>
        </div>

        {/* Problem 2 */}
        <div className="bg-stone-100 outline outline-stone-200 rounded-md p-4">
          <div className="flex items-baseline gap-2.5">
            {/* Icon */}
            <svg
              className="fill-current stroke-stone-500 text-transparent"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7.99983V4.50048C16 3.66874 16 3.25287 15.8248 2.9973C15.6717 2.77401 15.4346 2.62232 15.1678 2.57691C14.8623 2.52493 14.4847 2.6992 13.7295 3.04775L4.85901 7.14182C4.18551 7.45267 3.84875 7.6081 3.60211 7.84915C3.38406 8.06225 3.21762 8.32238 3.1155 8.60966C3 8.93462 3 9.30551 3 10.0473V14.9998M16.5 14.4998H16.51M3 11.1998L3 17.7998C3 18.9199 3 19.48 3.21799 19.9078C3.40973 20.2841 3.71569 20.5901 4.09202 20.7818C4.51984 20.9998 5.07989 20.9998 6.2 20.9998H17.8C18.9201 20.9998 19.4802 20.9998 19.908 20.7818C20.2843 20.5901 20.5903 20.2841 20.782 19.9078C21 19.48 21 18.9199 21 17.7998V11.1998C21 10.0797 21 9.51967 20.782 9.09185C20.5903 8.71552 20.2843 8.40956 19.908 8.21782C19.4802 7.99983 18.9201 7.99983 17.8 7.99983L6.2 7.99983C5.0799 7.99983 4.51984 7.99983 4.09202 8.21781C3.7157 8.40956 3.40973 8.71552 3.21799 9.09185C3 9.51967 3 10.0797 3 11.1998ZM17 14.4998C17 14.776 16.7761 14.9998 16.5 14.9998C16.2239 14.9998 16 14.776 16 14.4998C16 14.2237 16.2239 13.9998 16.5 13.9998C16.7761 13.9998 17 14.2237 17 14.4998Z"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col text-left w-full">
              <span className="text-stone-900 text-lg font-semibold">
                Crypto Wallet Company
              </span>
              <span className="text-stone-500 break-words whitespace-normal">
                A pioneering crypto wallet company sought to expand its user
                base by targeting audiences on Telegram and Discord,
                acknowledging the dominance of these platforms within the crypto
                community.
              </span>
            </div>
          </div>
        </div>

        {/* Problem 3 */}
        <div className="bg-stone-100 outline outline-stone-200 rounded-md p-4">
          <div className="flex items-baseline gap-2.5">
            {/* Icon */}
            <svg
              className="fill-current stroke-stone-500 text-transparent"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 18V17.8C4 16.1198 4 15.2798 4.32698 14.638C4.6146 14.0735 5.07354 13.6146 5.63803 13.327C6.27976 13 7.11984 13 8.8 13H15.2C16.8802 13 17.7202 13 18.362 13.327C18.9265 13.6146 19.3854 14.0735 19.673 14.638C20 15.2798 20 16.1198 20 17.8V18M4 18C2.89543 18 2 18.8954 2 20C2 21.1046 2.89543 22 4 22C5.10457 22 6 21.1046 6 20C6 18.8954 5.10457 18 4 18ZM20 18C18.8954 18 18 18.8954 18 20C18 21.1046 18.8954 22 20 22C21.1046 22 22 21.1046 22 20C22 18.8954 21.1046 18 20 18ZM12 18C10.8954 18 10 18.8954 10 20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20C14 18.8954 13.1046 18 12 18ZM12 18V8M6 8H18C18.9319 8 19.3978 8 19.7654 7.84776C20.2554 7.64477 20.6448 7.25542 20.8478 6.76537C21 6.39782 21 5.93188 21 5C21 4.06812 21 3.60218 20.8478 3.23463C20.6448 2.74458 20.2554 2.35523 19.7654 2.15224C19.3978 2 18.9319 2 18 2H6C5.06812 2 4.60218 2 4.23463 2.15224C3.74458 2.35523 3.35523 2.74458 3.15224 3.23463C3 3.60218 3 4.06812 3 5C3 5.93188 3 6.39782 3.15224 6.76537C3.35523 7.25542 3.74458 7.64477 4.23463 7.84776C4.60218 8 5.06812 8 6 8Z"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col text-left w-full">
              <span className="text-stone-900 text-lg font-semibold">
                De-Fi Platform
              </span>
              <span className="text-stone-500 break-words whitespace-normal">
                A DeFi platform for trading perpetual swaps aimed to optimize
                its marketing strategy, acknowledging the shift in crypto user
                behavior towards community-driven platforms.
              </span>
            </div>
          </div>
        </div>

        {/* Problem 4 */}
        <div className="bg-stone-100 outline outline-stone-200 rounded-md p-4">
          <div className="flex items-baseline gap-2.5">
            {/* Icon */}
            <svg
              className="fill-current stroke-stone-500 text-transparent"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5 7.27783L12 12.0001M12 12.0001L3.49997 7.27783M12 12.0001L12 21.5001M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col text-left w-full">
              <span className="text-stone-900 text-lg font-semibold">
                L1 Blockchain
              </span>
              <span className="text-stone-500 break-words whitespace-normal">
                This project currently is live on mainnet. But they are not a
                market leader compared to Solana or Ethereum. They have a number
                of channels where they post, do partnership announcements. Those
                would be YT, X, Discord, TG
              </span>
            </div>
          </div>
        </div>

        {/* Problem 5 */}
        {/* <div className="bg-stone-100 outline outline-stone-200 rounded-md p-4">
          <div className="flex items-baseline gap-2.5"> */}
            {/* Icon */}
            {/* <svg
              className="fill-current stroke-stone-500 text-transparent"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L4 4M22 2L20 4M22 22L20 20M2 22L4 20M2 16H3.5M8 2V3.5M22 8H20.5M16 22V20.5M18 16H21.5M16 2V6M2 8H6M8 22V18M11.4343 7.56569L7.56569 11.4343C7.36768 11.6323 7.26867 11.7313 7.23158 11.8455C7.19895 11.9459 7.19895 12.0541 7.23158 12.1545C7.26867 12.2687 7.36768 12.3677 7.56569 12.5657L11.4343 16.4343C11.6323 16.6323 11.7313 16.7313 11.8455 16.7684C11.9459 16.8011 12.0541 16.8011 12.1545 16.7684C12.2687 16.7313 12.3677 16.6323 12.5657 16.4343L16.4343 12.5657C16.6323 12.3677 16.7313 12.2687 16.7684 12.1545C16.8011 12.0541 16.8011 11.9459 16.7684 11.8455C16.7313 11.7313 16.6323 11.6323 16.4343 11.4343L12.5657 7.56569C12.3677 7.36768 12.2687 7.26867 12.1545 7.23158C12.0541 7.19895 11.9459 7.19895 11.8455 7.23158C11.7313 7.26867 11.6323 7.36768 11.4343 7.56569Z"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col text-left w-full">
              <span className="text-stone-900 text-lg font-semibold">
                Textile Manufactuer
              </span> */}
              {/* <span className="text-stone-500 break-words whitespace-normal">
                A large-scale manufacturer creates a novel process where instead
                of using plastic materials, they use biodegradable PLA
                (poly-lactic acid) to be used fashion forward apparel. This
                company has several workstreams */}
              {/* </span> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
      <div className="flex justify-center mt-10">
        <Link
          className="btn w-full outline outline-1 outline-slate-300 bg-transparent text-stone-800 shadow hover:drop-shadow-lg hover:outline-2 hover:outline-orange-500 hover:bg-orange-50 sm:ml-4 sm:w-auto"
          href="https://lucia-protocol.notion.site/Lucia-Ad-Attribution-Case-Studies-862e0f534eed441b9478366060a3b22b?pvs=25"
          target="_blank"
          aria-label="View Case Studies"
        >
          View Case Studies
        </Link>
      </div>
    </div>
  );
}

