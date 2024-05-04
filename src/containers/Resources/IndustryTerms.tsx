import { useGetAllTermsQuery } from 'features/api/cartApi';
import React from 'react';

const IndustryTerms = () => {

  const { data: termsData, isLoading: linksLoading } = useGetAllTermsQuery({
    refetchOnMountOrArgChange: true,
  });

  console.log(termsData?.result)
  const resultData = termsData?.result;



  return (
    <div className="container text-justify">
      <section className="mx-auto w-full max-w-7xl px-5 py-5 md:px-10 md:py-10 lg:py-10">

        <>
          {resultData?.map((terms: any, index: any) => (
            <div key={index}>
              <p
                className="mb-4 text-sm text-[#808080] sm:text-base lg:mb-4 text-justify"
                dangerouslySetInnerHTML={{ __html: terms?.term }}
              />
            </div>
          ))}
        </>



      </section>
    </div>
  );
};

export default IndustryTerms;