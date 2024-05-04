import React from 'react';
import { useGetSettingsQuery } from 'features/api/settingsApi';
import { Helmet } from 'react-helmet-async';


const PurchaseAgreement = () => {
    const { data } = useGetSettingsQuery(undefined);
    // console.log(data?.result?.merchandise_agreement)
    return (
        <div>
            <Helmet>
                <title>Merchandise Purchase Agreement || Global Path Liquidators</title>
            </Helmet>
            <div className='mx-auto w-full max-w-7xl px-5 py-12 md:py-16 lg:py-20'>
                <div className="py-2" dangerouslySetInnerHTML={{ __html: data?.result?.merchandise_agreement }}></div>
            </div>
        </div>
    );
};

export default PurchaseAgreement;