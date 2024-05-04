
import { useGetSettingsQuery } from 'features/api/settingsApi';
import React from 'react';

const FacilityVisit = () => {
  const { data: productCondition } = useGetSettingsQuery(undefined)

  console.log(productCondition?.result)
  const resultData = productCondition?.result?.facility_visits;



  return (
    <div className="container text-justify">
      <section className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-10 lg:py-10">
        <>
          <div >
            <h2 className="text-3xl text-center font-bold md:text-5xl">
              FACILITY VISIT
            </h2>
            <p
              className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4 text-justify"
              dangerouslySetInnerHTML={{ __html: resultData }}
            />
          </div>
        </>
      </section>
    </div>
  );
};

export default FacilityVisit;