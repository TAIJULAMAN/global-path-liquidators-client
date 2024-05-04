import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/home2"?: {};
  "/home3"?: {};
  "/product-detail"?: {};
  "/product-detail-2"?: {};
  "/page-collection"?: {};
  "/page-collection-2"?: {};
  "/page-search"?: {};
  "/home-header-2"?: {};
  "/dashboard"?: {};
  "/messaging"?: {};
  "/ticket"?: {};
  "/allTickets"?: {};
  "/notifications"?: {};
  "/subscriptions"?: {};
  "/replyTicket/:ticketId"?: {};
  "/order-history"?: {};
  "/shipment-status"?: {};
  "/account"?: {};
  "/account-savelists"?: {};
  "/account-change-password"?: {};
  "/account-billing"?: {};
  "/order-details/:id"?: {};
  "/account-my-order"?: {};
  "/account-my-bidding"?: {};
  "/my-bidding-details/:id"?: {};
  // "/my-bid-payment"?: {};
  "/cart"?: {};
  "/checkout"?: {};
  "/bid-checkout/:id/:amount"?: {};
  "/blog"?: {};
  "/blog-single"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/account/verify"?: {};
  "/forget-password"?: {};

  "/merchandise-purchase-agreement"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
  "/pallet-page"?: {};
  "/case-page"?: {};
  "/case/product/details/:id"?: {};
  "/pallet/product/details/:id"?: {};
  "/auction-page"?: {};
  "/auction/product/details/:id"?: {};
  "/bin-store"?: {};
  "/bin-store/products/:dayName"?: {};
  "/bin-store/product/details/:id"?: {};
  "/truckload-page"?: {};
  "/truckload/product/details/:id"?: {};
  "/truckload/xls/viewer"?: {};
  "/support-chat"?: {};
  "/about-us"?: {};
  "/how-it-works"?: {};
  "/manifest-data/:id"?: {};
  "/manifest-details"?: {};
  "/terms-conditions"?: {};
  "/resources"?: {};
  "/faqs"?: {};
  "/industry-terms-definitions"?: {};
  "/product-conditions"?: {};
  "/shipping-information"?: {};
  "/facility-visits"?: {};
  "/my-reffer-list"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  component: ComponentType<Object>;
}
