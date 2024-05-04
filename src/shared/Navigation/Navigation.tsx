import React, { useEffect, useState } from "react";
import NavigationItem, { NavItemType } from "./NavigationItem";
import ncNanoId from "utils/ncNanoId";
import { useGetDealTypeQuery } from "features/api/settingsApi";

interface Deal {
  deal_type_id: number;
  deal_type_name: string;
  deal_sign: string;
  deal_open: number;
  created_at: string;
  updated_at: string;
}

function Navigation() {
  let user: any;
  const userDetailsString = localStorage.getItem("UserDetails");
  if (userDetailsString !== null) {
    user = JSON.parse(userDetailsString);
  }

  const NAVIGATION: NavItemType[] = [
    {
      id: ncNanoId(),
      href: "/dashboard",
      name: "Dashboard",
    },
    {
      id: ncNanoId(),
      href: "/",
      name: "Home",
    },
    {
      id: ncNanoId(),
      href: "/pallet-page",
      name: "Products",
      type: "dropdown",
      children: [
        {
          id: ncNanoId(),
          href: "/pallet-page",
          name: "Pallets",
          deal_sign: "pallet",
        },
        {
          id: ncNanoId(),
          href: "/truckload-page",
          name: "Truckloads",
          deal_sign: "truckload",
        },

        {
          id: ncNanoId(),
          href: "/case-page",
          name: "Cases",
          deal_sign: "case",
        },
      ],
    },
    {
      id: ncNanoId(),
      href: "/auction-page",
      name: "Auction",
      deal_sign: "auction",
    },
    {
      id: ncNanoId(),
      href: "/bin-store",
      name: "Bin Store",
      deal_sign: "bin",
    },
    {
      id: ncNanoId(),
      href: "/how-it-works",
      name: "How it Works?",
    },
    {
      id: ncNanoId(),
      href: "/resources",
      name: "Resources",
    },

    {
      id: ncNanoId(),
      href: "/about-us",
      name: "About Us",
    },
  ];

  const navigationItems = (data: any, item: NavItemType) => {
    if (data?.user) {
      return item;
    }
    return;
  };

  const [dealTypes, setDealTypes] = useState<Array<Deal>>([]);
  const { data: dealTypesData, isLoading } = useGetDealTypeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // console.log(dealTypesData);
  useEffect(() => {
    if (!isLoading) {
      setDealTypes(dealTypesData?.result);
    }
  }, [dealTypesData, isLoading]);

  return (
    <ul className="nc-Navigation flex justify-center items-center">
      {NAVIGATION.filter((item) => {
        if (item.name === "Dashboard") {
          return navigationItems(user, item);
        }
        return item;
      }).map((item) => {
        // console.log(item);
        if (item?.type === "dropdown") {
          // console.log(item);
          if (item.children && item?.children?.length > 0) {
            const filtered = item?.children.filter((i) => {
              const deal = dealTypes.find((d) => d.deal_sign === i?.deal_sign);
              // console.log(deal);
              if (deal?.deal_open !== 0) return i;
              else return undefined;
            });
            // console.log(filtered);
            item.children = [...filtered];
          }
        }
        if (item?.deal_sign) {
          const deal = dealTypes.find((d) => d.deal_sign === item?.deal_sign);
          // console.log(deal);
          if (deal?.deal_open !== 1) return <></>;
        }
        // console.log(item);
        return <NavigationItem key={item.id} menuItem={item} />;
      })}
    </ul>
  );
}

export default Navigation;
