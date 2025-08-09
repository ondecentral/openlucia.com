import Marquee from 'react-fast-marquee';

const LogoSection = () => {
    return (
      <Marquee speed={50} gradient={false} className='pb-20 pt-20' autoFill={true}>
        <img src="/images/coinsub.svg" alt="Logo 1" className='mr-40'/>
        <img src="/images/cube3.svg" alt="Logo 2" className='mr-40' />
        <img src="/images/fractal-id.svg" alt="Logo 3" className='mr-40' />
        <img src="/images/movement_labs.svg" alt="Logo 1" className='mr-40'/>
          {/* Add more logos as needed */}
      </Marquee>
    );
  };

  export default LogoSection;