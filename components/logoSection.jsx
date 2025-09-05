import Marquee from "react-fast-marquee";
import Image from "next/image";

const LogoSection = () => {
  return (
    <Marquee
      speed={50}
      gradient={false}
      className="pb-20 pt-20"
      autoFill={true}
    >
      <Image
        src="/images/nillion.svg"
        alt="Logo 1"
        width={120}
        height={40}
        className="mr-40"
      />
      <Image
        src="/images/lucky-sea.svg"
        alt="Logo 2"
        width={120}
        height={40}
        className="mr-40"
      />
      <Image
        src="/images/og.svg"
        alt="Logo 3"
        width={120}
        height={40}
        className="mr-40"
      />
      <Image
        src="/images/other-partner.png"
        alt="Logo 4"
        width={120}
        height={40}
        className="mr-40"
      />
      {/* Add more logos as needed */}
    </Marquee>
  );
};

export default LogoSection;
