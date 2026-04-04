import Image from 'next/image';

const Dado = ({ valor }) => {
  return (
    <div className="flex flex-col items-center">
      <Image 
        src={`/dados/dado${valor}.png`} 
        alt={`Dado valor ${valor}`} 
        width={100} 
        height={100} 
      />
    </div>
  );
};

export default Dado;