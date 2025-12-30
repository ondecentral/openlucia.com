import Link from "@/components/tracked-link";

export default function CaseStudies() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-20 sm:px-6">
      {/* Header section */}
      <div className="mx-auto max-w-3xl pb-12 text-center">
        <div className="-mx-0.5 flex justify-center bg-white/10">
          <span className="mb-4 flex items-center justify-center rounded-full px-1.5 text-sm text-slate-400 outline outline-[0.50px] outline-offset-[-0.50px] outline-slate-400">
            Case Studies
          </span>
        </div>
        <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#6A98FF,#2563EB,#153885)] bg-[length:200%_auto] bg-clip-text pb-4 font-space-grotesk text-3xl font-semibold text-transparent md:text-4xl">
          Web3 Attribution and Behavioral Intelligence
        </h2>
        <p className="text-xl font-normal leading-7 text-slate-400">
          Move beyond fragmented data. Get clarity on what drives results and
          scale with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Problem 1 */}
        <div className="hover:outline-1.5 col-span-1 rounded-md bg-[#F5F9FF] p-4 outline outline-[#6E8ECA6E] hover:outline-[#2463EB] md:col-span-2">
          <div className="flex items-baseline gap-2.5">
            <div className="flex w-full flex-col text-left">
              <span className="text-lg font-semibold text-[#2463EB]">
                Centralized Exchange
              </span>
              <span className="whitespace-normal break-words text-slate-500">
                Leveraged organic content and listing news for cost-effective
                marketing despite no paid ad budget.
              </span>
            </div>
          </div>
        </div>

        {/* Problem 2 */}
        <div className="rounded-md bg-[#F5F9FF] p-4 outline outline-[#6E8ECA6E] hover:outline-[#2463EB]">
          <div className="flex items-baseline gap-2.5">
            <div className="flex w-full flex-col text-left">
              <span className="text-lg font-semibold text-[#2463EB]">
                Crypto Wallet Company
              </span>
              <span className="whitespace-normal break-words text-slate-500">
                Expanded user base by targeting crypto-native audiences on
                Telegram and Discord.
              </span>
            </div>
          </div>
        </div>

        {/* Problem 3 */}
        <div className="rounded-md bg-[#F5F9FF] p-4 outline outline-[#6E8ECA6E] hover:outline-[#2463EB]">
          <div className="flex items-baseline gap-2.5">
            <div className="flex w-full flex-col text-left">
              <span className="text-lg font-semibold text-[#2463EB]">
                De-Fi Platform
              </span>
              <span className="whitespace-normal break-words text-slate-500">
                Optimized marketing by recognizing the shift toward
                community-driven platforms for perpetual swaps.
              </span>
            </div>
          </div>
        </div>

        {/* Problem 4 */}
        <div className="rounded-md bg-[#F5F9FF] p-4 outline outline-[#6E8ECA6E] hover:outline-[#2463EB]">
          <div className="flex items-baseline gap-2.5">
            <div className="flex w-full flex-col text-left">
              <span className="text-lg font-semibold text-[#2463EB]">
                L1 Blockchain
              </span>
              <span className="whitespace-normal break-words text-slate-500">
                Not yet a market leader, but actively building presence through
                partnerships on X, Discord, and Telegram.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          className="btn w-full bg-white/75 text-slate-700 shadow shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline outline-1 outline-blue-400 hover:outline-2 hover:drop-shadow-lg sm:ml-4 sm:w-auto"
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
