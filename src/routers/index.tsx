import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import AccountPage from "containers/AccountPage/AccountPage";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import SiteHeader from "containers/SiteHeader";
import PageCollection from "containers/PageCollection";
import PageSearch from "containers/PageSearch";
import PageHome2 from "containers/PageHome/PageHome2";
import PageHome3 from "containers/PageHome/PageHome3";
import ProductDetailPage from "containers/ProductDetailPage/ProductDetailPage";
import ProductDetailPage2 from "containers/ProductDetailPage/ProductDetailPage2";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountBilling from "containers/AccountPage/AccountBilling";
import AccountOrder from "containers/AccountPage/AccountOrder";
import CartPage from "containers/ProductDetailPage/CartPage";
import CheckoutPage from "containers/PageCheckout/CheckoutPage";
import PageCollection2 from "containers/PageCollection2";
import { Toaster } from "react-hot-toast";

//bin-store
import BinStore from "containers/BinStore/BinStore";
import BinStoreProducts from "containers/BinStore/BinStoreProducts";
import RequireAuth from "privateroute/Requireauth";
// import PalletPage from "containers/PalletPage/PalletPage";

import AuctionPage from "containers/AuctionPage/AuctionPage";
import AuctionProductDetails from "containers/AuctionPage/AuctionProductDetails";
import PalletPageDetails from "containers/PalletPage/PalletPageDetails";
import TruckloadPage from "containers/TruckloadPage/TruckloadPage";
import TruckLoadProductDetails from "containers/TruckloadPage/TruckLoadProductDetails";
import BinStoreProductDetails from "containers/BinStore/BinStoreProductDetails";
import SupportChat from "containers/Chat/SupportChat";
import About from "containers/AboutUs/About";
import TermsCondition from "containers/TermsCondition/TermsCondition";
import Dashboard from "containers/DashboardPage/Dashboard";
import Messaging from "containers/DashboardPage/Messaging";
import Resources from "containers/Resources/Resources";
import ITC from "containers/Resources/IndustryTerms";
// import ProductConditions from "containers/Resources/ProductConditions";
// import ShippingInformation from "containers/Resources/ShippingInfo";
import FacilityVisits from "containers/Resources/FacilityVisit";
import OrderHistory from "containers/DashboardPage/OrderHistory/OrderHistory";
import ShipmentStatus from "containers/DashboardPage/ShipmentsStatus/ShipmentStatus";
import TruckloadXlViewer from "containers/TruckloadPage/TruckloadXlViewer";
import MyBidding from "containers/MyBidding/MyBidding";
import MyReferList from "containers/MyBidding/MyReferList";


import SingleBidDetails from "containers/MyBidding/SingleBidDetails";
// import BidPaymentPop from "containers/MyBidding/BidPaymentPop";
import PalletFilter from "containers/PalletPage/PalletFilter";
import CheckoutPageBid from "containers/PageCheckout/CheckoutPageBid";
import PalletManifest from "containers/PalletPage/PalletManifest";
import ManifestProductDetails from "containers/Products/ManifestProductDetails";
import Tickets from "containers/DashboardPage/Tickets/Tickets";
import ReplyTicket from "containers/DashboardPage/Tickets/ReplyTicket";
import AllTickets from "containers/DashboardPage/Tickets/AllTickets";
import OrderDetails from "containers/DashboardPage/OrderHistory/OrderDetails";
import Notifications from "containers/DashboardPage/Notifications";
import PurchaseAgreement from "containers/PageSignUp/PurchaseAgreement";
import CaseFilter from "containers/CasesPage/CaseFilter";
import CaseDetails from "containers/CasesPage/CaseDetails";
import HowItWorks from "containers/HowItWorks/HowItWorks";
import VerifyAccount from "containers/PageLogin/VerifyAccount";
import Subscription from "containers/DashboardPage/Subscription";
import Faqs from "containers/Resources/Faqs";
import ProductCondition from "containers/Resources/ProductCondition";
import ShippingInfos from "containers/Resources/ShippingInfos";
import ForgetPassword from "containers/PageLogin/ForgetPassword";



export const pages: Page[] = [
  { path: "/", component: PageHome },
  { path: "/home2", component: PageHome2 },
  { path: "/home3", component: PageHome3 },
  //
  { path: "/home-header-2", component: PageHome },
  { path: "/product-detail", component: ProductDetailPage },
  { path: "/product-detail-2", component: ProductDetailPage2 },
  //
  { path: "/page-collection-2", component: PageCollection2 },
  { path: "/page-collection", component: PageCollection },
  { path: "/page-search", component: PageSearch },

  //
  { path: "/dashboard", component: Dashboard },
  { path: "/messaging", component: Messaging },
  { path: "/ticket", component: Tickets },
  { path: "/replyTicket/:ticketId", component: ReplyTicket },
  { path: "/order-history", component: OrderHistory },
  { path: "/shipment-status", component: ShipmentStatus },
  { path: "/allTickets", component: AllTickets },
  { path: "/notifications", component: Notifications },
  { path: "/subscriptions", component: Subscription },

  //
  { path: "/account", component: AccountPage },
  { path: "/account-savelists", component: AccountSavelists },
  { path: "/account-change-password", component: AccountPass },
  { path: "/account-billing", component: AccountBilling },
  { path: "/account-my-order", component: AccountOrder },
  { path: "/order-details/:id", component: OrderDetails },
  { path: "/account-my-bidding", component: MyBidding },






  { path: "/my-bidding-details/:id", component: SingleBidDetails },
  { path: "/my-reffer-list", component: MyReferList },
  //
  { path: "/cart", component: CartPage },
  { path: "/checkout", component: CheckoutPage },
  { path: "/bid-checkout/:id/:amount", component: CheckoutPageBid },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },
  { path: "/signup", component: PageSignUp },
  { path: "/login", component: PageLogin },
  { path: "/account/verify", component: VerifyAccount },
  { path: "/forget-password", component: ForgetPassword },


  { path: "/merchandise-purchase-agreement", component: PurchaseAgreement },

  { path: "/subscription", component: PageSubcription },
  { path: "/manifest-data/:id", component: PalletManifest },
  { path: "/manifest-details", component: ManifestProductDetails },

  //auction-page
  { path: "/auction-page", component: AuctionPage },
  { path: "/auction/product/details/:id", component: AuctionProductDetails },

  //bin-store
  { path: "/bin-store", component: BinStore },
  { path: "/bin-store/products/:dayName", component: BinStoreProducts },
  { path: "/bin-store/product/details/:id", component: BinStoreProductDetails },

  // palletPage
  // { path: "/pallet-page", component: PalletPage },

  { path: "/pallet-page", component: PalletFilter },
  { path: "/pallet/product/details/:id", component: PalletPageDetails },

  //Case
  { path: "/case-page", component: CaseFilter },
  { path: "/case/product/details/:id", component: CaseDetails },

  // truckLoadPage
  { path: "/truckload-page", component: TruckloadPage },

  { path: "/truckload/product/details/:id", component: TruckLoadProductDetails },
  { path: "/truckload/xls/viewer", component: TruckloadXlViewer },

  // chat page
  { path: "/support-chat", component: SupportChat },

  // About Us page
  { path: "/about-us", component: About },
  { path: "/how-it-works", component: HowItWorks },

  // Terms & Condition page
  { path: "/terms-conditions", component: TermsCondition },

  // Resources page
  { path: "/resources", component: Resources },
  { path: "/industry-terms-definitions", component: ITC },
  { path: "/product-conditions", component: ProductCondition },
  { path: "/shipping-information", component: ShippingInfos },
  { path: "/facility-visits", component: FacilityVisits },
  { path: "/faqs", component: Faqs },
];

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        {pages.map(({ component: Component, path }, index) => {
          if (path === "/account") {
            return (
              <Route
                key={index}
                element={<RequireAuth>{<AccountPage />}</RequireAuth>}
                path={path}
              />
            );
          } else if (path === "/checkout") {
            return (
              <Route
                key={index}
                element={<RequireAuth>{<CheckoutPage />}</RequireAuth>}
                path={path}
              />
            );
          } else if (path === "/bid-checkout/:id/:amount") {
            return (
              <Route
                key={index}
                element={<RequireAuth>{<CheckoutPageBid />}</RequireAuth>}
                path={path}
              />
            );
          } else if (path === "/cart") {
            return (
              <Route
                key={index}
                element={<RequireAuth>{<CartPage />}</RequireAuth>}
                path={path}
              />
            );
          }

          return <Route key={index} element={<Component />} path={path} />;
        })}
        <Route element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
