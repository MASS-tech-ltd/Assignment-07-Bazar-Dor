import Banner from "./Components/Banner";
import PriceDecreased from "./Components/PriceDecreased";
import PriceIncreased from "./Components/PriceIncreased";


export default function Home() {
  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <PriceIncreased></PriceIncreased>
      <PriceDecreased></PriceDecreased>
    </div>
  );
}
