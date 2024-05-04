import React from "react";
import image1 from "./images/customer return.avif";
import image2 from "./images/clearanceSell.avif";
import image3 from "./images/overstock.avif";
import image4 from "./images/masterclass.avif";

const ProductConditions = () => {
  return (
    <div className="container text-justify">
      {/* heading */}
      <div className="mb-8 text-center md:mb-12 lg:mb-16">
        <h2 className="text-3xl font-bold md:text-5xl">
          Liquidation Product Conditions.
        </h2>
        <p className="mx-auto mt-4  text-[#647084]">
          Companies or programs may use varying product definitions to describe
          the condition of the goods being sold. Terms such as Liquidation,
          Salvage, Closeouts, Shelf Pulls, Overstocks and Returns are often used
          in the liquidation industry. At Via Trading we use different general
          condition definitions to group and describe the condition of the
          products we sell:
        </p>
      </div>
      {/* customer returns */}
      <section>
        {/* <!-- Container --> */}
        <div className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-10 lg:py-10">
          {/* <!-- Title --> */}
          <h2 className="mb-8 text-3xl font-bold md:text-5xl lg:mb-14">
            Customer Return/Salvage Goods.{" "}
          </h2>
          {/* desscription */}
          <p className="mb-4  text-sm text-[#808080] sm:text-base lg:mb-4">
            Customer Returns are typically items that have been purchased from a
            store (or online store) but then returned by a customer. Stores have
            varying individual return policies as well as product liquidation
            policies that can affect the type & condition of products you may
            see in varying loads.
          </p>
          {/* text with picture */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-5   ">
              <p className="text-sm text-[#808080] sm:text-base">
                Customer return goods are typically not tested by anyone prior
                to making their way into a return load. Many stores do not have
                separate programs for customer returns, and shelf-pulls
                (discontinued, end of season, overstocked goods) are commonly
                found in customer return loads.Not all stores do so however, but
                Via Trading will always define a listing as ‘Customer Returns’
                if it includes even a minor percentage of returns. Depending on
                what store they come from and what category of product it is,
                working percentages on customer return loads can vary
                greatly.Often when one refers to ‘working percentage’ of
                products, they are referring to the ‘sellable percentage’ of the
                load. For example if we are talking about a 6-piece cookware set
                and 1 piece is missing or damaged, the item still has resale
                value (albeit not as a complete set) and you could still recover
                a percentage of the product’s original value despite the 1
                missing piece.
              </p>
            </div>
            <img
              src={image1}
              alt=""
              className="inline-block h-full w-full rounded-2xl "
            />
          </div>
          {/* bottom text */}
          <p className="mb-4  text-sm text-[#808080] sm:text-base lg:mb-4">
            Often when one refers to ‘working percentage’ of products, they are
            referring to the ‘sellable percentage’ of the load. For example if
            we are talking about a 6-piece cookware set and 1 piece is missing
            or damaged, the item still has resale value (albeit not as a
            complete set) and you could still recover a percentage of the
            product’s original value despite the 1 missing piece.
          </p>
          <p className="mb-4 font-semibold  text-sm text-[#808080] sm:text-base lg:mb-4">
            Generally speaking, the recognized industry average when trying to
            estimate working percentages is around 65-75% working, 20%
            repairable, and the remainder throwaway/scrap/parts, etc
          </p>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            In practice, no individual load or pallet will have that exact
            breakdown, but these percentages are fairly representative when
            describing the average expected condition of customer returns when
            purchasing them regularly. Ultimately, this is a rough approximation
            and the actual working percentage on any given pallet or load can be
            much worse or better.
          </p>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            In general, purchasing wholesale liquidation goods (including
            customer returns) and reselling them for profit is a tried, tested
            and proven concept. However, before purchasing liquidation items you
            should know that:
          </p>
          <ol className="pl-10">
            <li>
              • Liquidators like Via Trading typically operate with a no returns
              policy, all sales deemed final and all goods sold AS-IS
              irrespective of their condition, unless otherwise stated.
            </li>
            <li>• Purchasing customer returns is not for everyone.</li>
            <li>
              • There is a risk your purchases may not be profitable and this
              risk increases when purchasing customer returns.
            </li>
            <li>
              • There is a steep learning curve that newcomers to the industry
              typically experience and you should expect to do much better once
              you have more experience with such goods.{" "}
            </li>
            <li>
              • In many cases, items are not retail-ready and dealing with
              liquidation goods requires considerably more work in terms of
              researching, processing, pricing & creativily marketing than
              dealing with new master case items.
            </li>
          </ol>
          <p className="mb-4 font-semibold text-sm text-[#808080] sm:text-base lg:mb-4">
            In order to maximize your success with this type of merchandise, you
            need to be prepared to process, test, check and research pricing on
            the goods prior to selling them.
          </p>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            In the long term (and over several purchases), most people in this
            industry agree that the payoffs and returns are profitable and that
            the long-term risk is generally minimal.
          </p>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            More experienced buyers can benefit from our Graded Potential
            Revenue Calculator specifically designed to estimate your potential
            revenues from a customer return load filled with a variety of items
            in different conditions.
          </p>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            Customer Returns typically have the following characteristics and
            stores can decide to liquidate these goods for a number of reasons:
          </p>
          <ol className="pl-10">
            <li>• Defective when returned by the customer.</li>
            <li>• Cosmetic blemishes or slight defects.</li>
            <li>• Out of box goods.</li>
            <li>
              • Missing minor or major components (remote controls, manuals,
              etc)
            </li>
            <li>• Damaged exterior packaging.</li>
            <li>
              • Items that the store does not want to or cannot re-shelve.
            </li>
            <li>
              • Signs of handling - both external packaging and the item itself
            </li>
          </ol>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            Often, additional internal store tracking or return labels can be
            found on the items.{" "}
            <span className="font-semibold">
              All customer return goods are always sold with no warranty or
              guarantee.
            </span>{" "}
            Any warranties found with the goods are invalid and cannot legally
            be used.
          </p>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            Purchasing department store returns is not for everyone. This is not
            a ‘get rich quick’ scheme. The payoffs are high for those prepared
            to work hard and put effort in their purchases in order to create
            the highest possible return on investment. This is a ‘get-rich
            consistently with hard work & creativity scheme’.
          </p>
          <ol className="pl-10">
            <li>
              • If you are not prepared to test items, do not purchase customer
              returns.
            </li>
            <li>
              • If you are not prepared to repair items, do not purchase
              customer returns.
            </li>
            <li>
              • If you only want to deal with 100% retail ready items do not
              purchase customer returns.
            </li>
            <li>
              • If you are not prepared to expect a percentage of items to be
              out of box, defective, cosmetically blemished etc., do not
              purchase customer returns.
            </li>
          </ol>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            If you are prepared to test, fix, clean, cannibalize, be creative in
            sales, open new sales channels in order to get the most revenue back
            when needed, then do purchase. Please do not get this wrong - after
            all we do not want to discourage you. This is a profitable business
            for the large majority and the industry as a whole is approximately
            $100 billion in size.
          </p>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            Bottom line is: if you are prepared to put in a fair share of work
            and effort, then this could be very profitable for you. If not, we
            do have new overstock items that are typically in better selling
            condition and require minimal work on your part.
          </p>
          <p className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4">
            Please use the product filters on any product category page to see
            new overstock items in that category.
          </p>
        </div>
      </section>
      {/* shelf pulls */}
      <section>
        {/* <!-- Container --> */}
        <div className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-10 lg:py-10">
          {/* <!-- Title --> */}
          <h2 className="mb-8 text-3xl font-bold md:text-5xl lg:mb-14">
            Shelf Pulls.{" "}
          </h2>
          {/* desscription */}
          <p className="mb-4  text-sm text-[#808080] sm:text-base lg:mb-4">
            Shelf pulls are typically overstocked goods that have been displayed
            for sale in a store or online but have never been purchased by a
            customer. Shelf pulls are typically considered excess inventory from
            store shelves.
          </p>
          {/* text with picture */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-5   ">
              <p className="text-sm text-[#808080] sm:text-base">
                In the majority of cases, shelf pulls require much less work
                than customer returns in terms of testing and repairing, but you
                should expect to have some checking work to do as well as
                cleaning off potentially dusty items and removing price tags (if
                necessary) before reselling the items.Discover a treasure trove
                of high-quality products with our Shelf Pulls collection. These
                items, carefully sourced from retail shelves, offer unbeatable
                value and savings. Whether it's overstock, customer returns, or
                seasonal items, our Shelf Pulls section brings you quality
                merchandise at prices you won't find anywhere else.
              </p>
            </div>
            <img
              src={image2}
              alt=""
              className="inline-block h-full w-full rounded-2xl "
            />
          </div>
          {/* bottom text */}
          <p className="text-sm font-semibold text-[#808080] sm:text-base">
            Shelf pulls will typically be in good selling condition and may have
            some or all of the following characteristics:
          </p>
          <ol className="pl-10">
            <li>• End of season & seasonal goods.</li>
            <li>• Discontinued goods.</li>
            <li>
              • Items may still have their original retail pricing
              stickers/tags.
            </li>
            <li>• Items may have additional retail discount tags on them.</li>
            <li>• Packaging or item may show signs of handling. </li>
            <li>
              • May be defaced/de-labeled (inner labels or tags removed).{" "}
            </li>
            <li>• A % of the items may be out of box or in open boxes </li>
          </ol>
        </div>
      </section>
      {/* Overstocks  */}
      <section>
        {/* <!-- Container --> */}
        <div className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-10 lg:py-10">
          {/* <!-- Title --> */}
          <h2 className="mb-8 text-3xl font-bold md:text-5xl lg:mb-14">
            Overstocks.{" "}
          </h2>
          {/* text with picture */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-5   ">
              <p className="text-sm text-[#808080] sm:text-base">
                Overstocks, also often refereed to as Closeouts, tend to be
                goods which typically have never been merchandised or exposed
                for sale in a retail store. Such goods can materialize from
                importers, manufacturers or distributors who are closing down or
                simply have excess goods in their warehouses that they need to
                move. Via Trading also sources Overstocks from confiscated
                and/or abandoned freight, financial institutions and insurance
                companies. Department stores will also regularly clear excess
                goods from their warehouses and often have overstocked goods for
                sale. New Overstock pallets and loads tend to be less assorted
                then typical customer return loads but are generally in new
                condition.
              </p>
            </div>
            <img
              src={image3}
              alt=""
              className="inline-block h-full w-full rounded-2xl "
            />
          </div>
          {/* bottom text */}
          <p className="text-sm font-semibold text-[#808080] sm:text-base">
            New Overstock items typically have the following characteristics:
          </p>
          <ol className="pl-10">
            <li>
              • Items are typically 100% retail-ready and in new condition.
            </li>
            <li>
              • No additional retail/discount or warehouse labels/tags on the
              items.
            </li>
            <li>
              • Items are typically in their original factory case but
              occasionally can also be loose-packed.
            </li>
            <li>
              • Packaging and item tend to be in good condition with no
              excessive signs of handling.
            </li>
          </ol>
        </div>
      </section>
      {/* Master Case */}
      <section>
        {/* <!-- Container --> */}
        <div className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-10 lg:py-10">
          {/* <!-- Title --> */}
          <h2 className="mb-8 text-3xl font-bold md:text-5xl lg:mb-14">
            Master Case Goods.{" "}
          </h2>
          {/* text with picture */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col gap-5   ">
              <p className="text-sm text-[#808080] sm:text-base">
                Master Case goods are typically 100% new in original
                manufacturer’s packaging and are fully functional and complete.
                These goods have not been exposed for sale in any retail
                environment and products can be considered 100% new and
                retail-ready.
              </p>
              <p className="text-sm text-[#808080] sm:text-base">
                Master Case goods may have the following characteristics:
              </p>
              <ol className="pl-10">
                <li>• 100% new.</li>
                <li>• In original factory or manufacturer’s packaging.</li>
                <li>
                  • Will include all parts, components, accessories and
                  documentation.
                </li>
                <li>• No visual signs of wear, usage or excessive handling.</li>
                <li>• Retail-ready.</li>
              </ol>
            </div>
            <img
              src={image4}
              alt=""
              className="inline-block h-full w-full "
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductConditions;
