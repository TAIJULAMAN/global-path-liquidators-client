import { useGetSettingsQuery } from 'features/api/settingsApi';
import React from 'react';

const HowItWorks = () => {
    const { data: howItWorks } = useGetSettingsQuery(undefined)
    // console.log(howItWorks)
    return (
        <>
            <section>
                <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20 space-y-10">
                    <div className="flex flex-col gap-8">
                        <h2 className="my-5 text-3xl font-bold md:text-5xl">
                            How Its Works
                        </h2>
                        <div
                            dangerouslySetInnerHTML={{ __html: howItWorks?.result?.how_it_works }}>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HowItWorks;