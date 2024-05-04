import React from 'react';

import ProductConditions from './ProductConditions';
import ShippingInfo from './ShippingInfo';
import FacilityVisit from './FacilityVisit';
import IndustryTerms from './IndustryTerms';
import Faqs from './Faqs';
import ProductCondition from './ProductCondition';
import ShippingInfos from './ShippingInfos';

const Resources = () => {
    return (
        <div>

            <Faqs />
            <IndustryTerms />
            {/* <ProductConditions /> */}
            <ProductCondition />
            <ShippingInfos />
            {/* <ShippingInfo /> */}
            <FacilityVisit />
        </div>
    );
};

export default Resources;