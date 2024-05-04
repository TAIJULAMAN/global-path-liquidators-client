import React from "react";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderLargeProduct from "components/SectionSliderLargeProduct";
import SectionSliderProductCard from "components/SectionSliderProductCard";
import SectionGridMoreExplore, {
  DEMO_MORE_EXPLORE_DATA,
} from "components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "components/SectionPromo2";
import SectionGridFeatureItems from "./SectionGridFeatureItems";
import SectionHero3 from "components/SectionHero/SectionHero3";
import SectionPromo1 from "components/SectionPromo1";
import { SPORT_PRODUCTS } from "data/data";

function PageHome2() {
  return (
    <div className="nc-PageHome2 relative overflow-hidden">
      <div className="container px-4">
        {/* SECTION HERO */}
        <SectionHero3 />
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionHowItWork />

        {/* SECTION */}
        <SectionSliderProductCard
          data={SPORT_PRODUCTS.filter((_, i) => i < 8)}
          subHeading="New Sports equipment"
        />

        {/* SECTION */}
        <SectionPromo2 />

        {/* SECTION 3 */}
        <SectionSliderLargeProduct />

        {/* SECTION */}
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore
            data={DEMO_MORE_EXPLORE_DATA.filter((_, i) => i > 2)}
          />
        </div>

        {/* SECTION */}
        <SectionGridFeatureItems data={SPORT_PRODUCTS} />

        {/* SECTION */}
        <SectionPromo1 />
      </div>
    </div>
  );
}

export default PageHome2;
