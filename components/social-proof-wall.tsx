import { Star } from "lucide-react";

type ProofCardType = "chat" | "email" | "tweet" | "testimonial" | "instagram";

type ProofItem = {
  id: string;
  type: ProofCardType;
  author: string;
  handle: string;
  message: string;
  detail: string;
  rating?: number;
  metric?: string;
  platform: "WhatsApp" | "Email" | "X" | "Instagram" | "Review";
  layoutClass: string;
};

export const SOCIAL_PROOF_ITEMS: ProofItem[] = [
  {
    id: "proof-01",
    type: "instagram",
    author: "Lena / Growth Lead",
    handle: "@lena",
    message: "ROAS jumped 43% in 8 days. Keep this running.",
    detail: "sent 9:41 PM",
    platform: "Instagram",
    layoutClass: "w-full min-h-[180px]",
  },
  {
    id: "proof-02",
    type: "email",
    author: "ryan@northline.ai",
    handle: "Inbox",
    message: "Subject: Attribution is finally clean",
    detail: "Every paid channel is now mapped. Team trusts the numbers again.",
    platform: "Email",
    layoutClass: "w-full min-h-[190px]",
  },
  {
    id: "proof-03",
    type: "tweet",
    author: "Nina Park",
    handle: "@ninapark",
    message: "6 figures in spend and this is the first dashboard my CFO believed.",
    detail: "18.2K views",
    platform: "X",
    layoutClass: "w-full min-h-[170px]",
  },
  {
    id: "proof-04",
    type: "testimonial",
    author: "Mason",
    handle: "CMO, Arcjet",
    message: "Best attribution stack we have used. It paid itself in the first month.",
    detail: "Verified customer",
    rating: 5,
    metric: "+31% CAC efficiency",
    platform: "Review",
    layoutClass: "w-full min-h-[200px]",
  },
  {
    id: "proof-05",
    type: "chat",
    author: "Ari / Founder",
    handle: "@ari",
    message: "Can we screenshot this? Results look unreal.",
    detail: "WhatsApp 07:12",
    platform: "WhatsApp",
    layoutClass: "w-full min-h-[130px]",
  },
  {
    id: "proof-06",
    type: "email",
    author: "ops@millwright.co",
    handle: "Inbox",
    message: "Subject: Week 2 report",
    detail: "Revenue up 22%, paid social waste down 38%. We are scaling this.",
    platform: "Email",
    layoutClass: "w-full min-h-[180px]",
  },
  {
    id: "proof-07",
    type: "tweet",
    author: "Tara Singh",
    handle: "@tarasingh",
    message: "This wall of receipts is why our board stopped questioning marketing.",
    detail: "Pinned",
    platform: "X",
    layoutClass: "w-full min-h-[158px]",
  },
  {
    id: "proof-08",
    type: "testimonial",
    author: "Jules",
    handle: "Head of Growth, Coinsub",
    message: "Our team replaced 4 tools with this and still got better signal.",
    detail: "3 months using Lucia",
    rating: 5,
    metric: "4.2x blended ROAS",
    platform: "Review",
    layoutClass: "w-full min-h-[188px]",
  },
  {
    id: "proof-09",
    type: "instagram",
    author: "Eva / UA Manager",
    handle: "@eva",
    message: "The anomaly alert saved us before burnout spend kicked in.",
    detail: "Instagram DM 11:02",
    platform: "Instagram",
    layoutClass: "w-full min-h-[148px]",
  },
  {
    id: "proof-10",
    type: "email",
    author: "finance@westdock.io",
    handle: "Inbox",
    message: "Subject: Budget approved",
    detail: "Approved because attribution evidence was clear and auditable.",
    platform: "Email",
    layoutClass: "w-full min-h-[165px]",
  },
  {
    id: "proof-11",
    type: "tweet",
    author: "Leo Han",
    handle: "@leohan",
    message: "I thought this was hype. Then we saw 29% lift in 12 days.",
    detail: "4,901 likes",
    platform: "X",
    layoutClass: "w-full min-h-[174px]",
  },
  {
    id: "proof-12",
    type: "testimonial",
    author: "Noah",
    handle: "VP Marketing, Atlas",
    message: "Looks like screenshots from every channel because it is our real data.",
    detail: "Enterprise plan",
    rating: 5,
    metric: "-27% CPA",
    platform: "Review",
    layoutClass: "w-full min-h-[205px]",
  },
  {
    id: "proof-13",
    type: "chat",
    author: "Mina / Performance",
    handle: "@mina",
    message: "Launching in two regions now. Signal is consistent.",
    detail: "WhatsApp 18:47",
    platform: "WhatsApp",
    layoutClass: "w-full min-h-[142px]",
  },
  {
    id: "proof-14",
    type: "email",
    author: "ceo@novaedge.com",
    handle: "Inbox",
    message: "Subject: Keep attribution wall in board deck",
    detail: "The before/after screenshots made the discussion easy.",
    platform: "Email",
    layoutClass: "w-full min-h-[172px]",
  },
  {
    id: "proof-15",
    type: "tweet",
    author: "Devon R.",
    handle: "@devonr",
    message: "Dense wall of user proof > polished case studies, every time.",
    detail: "Reposted 190 times",
    platform: "X",
    layoutClass: "w-full min-h-[160px]",
  },
  {
    id: "proof-16",
    type: "testimonial",
    author: "Sophie",
    handle: "Growth Ops, Northline",
    message: "Feels like cheating compared to our old reporting setup.",
    detail: "Trusted by 14 teammates",
    rating: 5,
    metric: "+58% conversion clarity",
    platform: "Review",
    layoutClass: "w-full min-h-[196px]",
  },
  {
    id: "proof-17",
    type: "instagram",
    author: "Sam / Paid Social",
    handle: "@sam",
    message: "We finally know which creatives print money.",
    detail: "Instagram DM 08:05",
    platform: "Instagram",
    layoutClass: "w-full min-h-[145px]",
  },
  {
    id: "proof-18",
    type: "email",
    author: "hello@covalentlabs.com",
    handle: "Inbox",
    message: "Subject: Retention campaigns now measurable",
    detail: "The stitched timeline and source breakdown are exactly what we needed.",
    platform: "Email",
    layoutClass: "w-full min-h-[186px]",
  },
];

const columnSpeeds = [46, 54, 42, 60, 49, 57];
const columnOffsets = [
  "pt-0",
  "pt-0",
  "pt-0",
  "pt-0",
  "pt-0",
  "pt-0",
];
const columnVisibility = [
  "block",
  "hidden sm:block",
  "hidden md:block",
  "hidden lg:block",
  "hidden xl:block",
  "hidden 2xl:block",
];

function splitIntoColumns(items: ProofItem[], columns: number) {
  return Array.from({ length: columns }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % columns === columnIndex),
  );
}

function cardBaseClass(index: number) {
  const zClass = index % 4 === 0 ? "z-20" : "z-10";
  return zClass;
}

function PlatformPill({ platform }: { platform: ProofItem["platform"] }) {
  const toneClass =
    platform === "WhatsApp"
      ? "bg-emerald-500/20 text-emerald-200"
      : platform === "Email"
          ? "bg-violet-500/20 text-violet-200"
        : platform === "Instagram"
          ? "bg-pink-500/20 text-pink-200"
          : platform === "X"
            ? "bg-slate-200/15 text-slate-200"
            : "bg-amber-500/20 text-amber-100";

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${toneClass}`}
    >
      {platform}
    </span>
  );
}

function ProofCard({ item, index }: { item: ProofItem; index: number }) {
  const shellClass = `relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm ${item.layoutClass} ${cardBaseClass(index)}`;

  if (item.type === "instagram") {
    return (
      <article className={shellClass}>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-amber-300 p-[1px]">
              <div className="h-full w-full rounded-full bg-slate-900" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-100">{item.author}</p>
              <p className="text-[10px] text-slate-400">{item.handle}</p>
            </div>
          </div>
          <PlatformPill platform={item.platform} />
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3">
          <p className="text-[11px] leading-relaxed text-slate-200">{item.message}</p>
          <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
            <span>{item.detail}</span>
            <span>12.4k views</span>
          </div>
        </div>
      </article>
    );
  }

  if (item.type === "chat") {
    return (
      <article className={shellClass}>
        <div className="mb-2 flex items-center justify-between">
          <PlatformPill platform={item.platform} />
          <span className="text-[10px] text-slate-400">{item.detail}</span>
        </div>
        <div className="space-y-2 text-xs">
          <div className="max-w-[88%] rounded-2xl rounded-bl-md bg-slate-800 px-3 py-2 text-slate-200">
            <p className="text-[11px] leading-relaxed">{item.message}</p>
          </div>
          <div className="ml-auto max-w-[82%] rounded-2xl rounded-br-md bg-blue-500/85 px-3 py-2 text-blue-50">
            <p className="text-[11px] leading-relaxed">That is insane. Scaling now.</p>
          </div>
          <p className="pt-1 text-[11px] text-slate-300">{item.author}</p>
        </div>
      </article>
    );
  }

  if (item.type === "email") {
    return (
      <article className={shellClass}>
        <div className="mb-3 flex items-center justify-between">
          <PlatformPill platform={item.platform} />
          <span className="text-[10px] text-slate-400">{item.author}</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
            From {item.author}
          </p>
          <p className="mt-1 text-[12px] font-semibold text-slate-100">{item.message}</p>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-300">{item.detail}</p>
          <div className="mt-3 flex gap-1">
            <span className="h-1.5 w-10 rounded-full bg-emerald-400/70" />
            <span className="h-1.5 w-6 rounded-full bg-blue-400/70" />
            <span className="h-1.5 w-4 rounded-full bg-violet-400/70" />
          </div>
        </div>
      </article>
    );
  }

  if (item.type === "tweet") {
    return (
      <article className={shellClass}>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700/80 text-[11px] font-semibold text-slate-200">
            {item.author
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-[12px] font-semibold text-slate-100">{item.author}</p>
            <p className="text-[11px] text-slate-400">{item.handle}</p>
          </div>
        </div>
        <p className="text-[12px] leading-relaxed text-slate-200">{item.message}</p>
        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400">
          <PlatformPill platform={item.platform} />
          <span>{item.detail}</span>
        </div>
      </article>
    );
  }

  return (
    <article className={shellClass}>
      <div className="mb-2 flex items-center justify-between">
        <PlatformPill platform={item.platform} />
        <div className="flex items-center gap-0.5 text-amber-300">
          {Array.from({ length: item.rating ?? 5 }).map((_, starIndex) => (
            <Star key={`${item.id}-star-${starIndex}`} className="h-3 w-3 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-[12px] leading-relaxed text-slate-100">{item.message}</p>
      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="text-[11px] font-semibold text-slate-200">{item.author}</p>
        <p className="text-[10px] text-slate-400">{item.handle}</p>
        <p className="mt-1 text-[11px] text-emerald-300">{item.metric}</p>
      </div>
    </article>
  );
}

export default function SocialProofWall() {
  const columns = splitIntoColumns(SOCIAL_PROOF_ITEMS, 6);

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-slate-950 py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_85%_30%,rgba(139,92,246,0.14),transparent_45%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
            Social Proof Wall
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold text-slate-100 sm:text-3xl">
            Real screenshots, real receipts, real growth signals.
          </h2>
        </div>

        <div className="relative h-[32rem] overflow-hidden sm:h-[40rem]">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-16 bg-gradient-to-b from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-20 bg-gradient-to-t from-slate-950 to-transparent" />

          <div className="relative flex h-full gap-2 sm:gap-3">
            {columns.map((columnItems, columnIndex) => (
              <div
                key={`proof-column-${columnIndex}`}
                className={`relative flex-1 ${columnOffsets[columnIndex]} ${columnVisibility[columnIndex]}`}
              >
                <div
                  className="proof-column-track flex flex-col gap-2 sm:gap-3"
                  style={{
                    animationDuration: `${columnSpeeds[columnIndex]}s`,
                    animationDelay: `${columnIndex * -4}s`,
                  }}
                >
                  {[...columnItems, ...columnItems].map((item, itemIndex) => (
                    <div key={`${item.id}-${columnIndex}-${itemIndex}`} className="w-full">
                      <ProofCard item={item} index={itemIndex} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
