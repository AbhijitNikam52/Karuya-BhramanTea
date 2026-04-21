import TourCallBack from "../components/TourCallBack";
import TourHero from "../components/TourHero";
import TourOverview from "../components/TourOverview";
import TourPricing from "../components/TourPricing";
import TourItinerary from "../components/TourItinerary";
import TourInclusions from "../components/TourInclusions";
import TourGallery from "../components/TourGallery";
import TourFooterInfo from "../components/TourFooterInfo";

function TourDetails() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <TourHero />
      <TourOverview />
      <TourPricing />
      <TourCallBack />
      <TourItinerary />
      <TourInclusions />
      <TourGallery />
      <TourFooterInfo />
    </div>
  );
}

export default TourDetails;
