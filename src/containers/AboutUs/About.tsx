import { useGetSettingsQuery } from "features/api/settingsApi";
import React, { FC } from "react";
import SocialsList from "shared/SocialsList/SocialsList";

export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ PHONE",
    desc: "000-123-456-7890",
  },
];

const About: FC<PageContactProps> = () => {
  const { data: aboutList } = useGetSettingsQuery(undefined)
  console.log(aboutList?.result)
  return (
    <>
      <section>
        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20 space-y-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* <!-- about us --> */}
            <div className="flex flex-col gap-8">
              <h2 className="my-5 text-3xl font-bold md:text-5xl">About us</h2>
              <div
                dangerouslySetInnerHTML={{ __html: aboutList?.result?.about_us }}>
              </div>
            </div>
            {/* <!-- Image --> */}
            {/* <div className="w-full rounded-md bg-[#f2f2f7] max-[991px]:h-[475px] lg:w-2/5">
              <img src={`https://darktechteam.com/api/${aboutList?.result?.about_img}`} alt="" />
            </div> */}
          </div>

          {/* <!-- why gpl --> */}
          <div className="flex flex-col gap-8">
            <h2 className="my-5 text-3xl font-bold md:text-5xl">
              Why GPL?
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: aboutList?.result?.why_gpl }}>
            </div>
          </div>

          {/* <!-- contact us --> */}
          <div className="">
            <h2 className="my-5 text-3xl font-bold md:text-5xl">
              Contact Us
            </h2>
            <div className="mt-10">
              <div>
                <div className="md:flex flex-row gap-5 justify-between space-y-5 md:space-y-0">
                  <div>
                    <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                      🗺 ADDRESS
                    </h3>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                      {aboutList?.result?.gpl_address}
                    </span>
                  </div>
                  <div>
                    <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                      💌 EMAIL
                    </h3>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                      {aboutList?.result?.gpl_email}
                    </span>
                  </div>
                  <div>
                    <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                      ☎ PHONE
                    </h3>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                      {aboutList?.result?.gpl_phone}
                    </span>
                  </div>
                  <div>
                    <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                      🌏 SOCIALS LINKS
                    </h3>
                    <SocialsList className="mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
