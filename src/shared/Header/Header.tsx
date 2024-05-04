import React, { FC } from "react";
import MainNav1 from "./MainNav1";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div id="nc-chifis-header" className="nc-Header w-full z-40">
      {/* NAV */}
      <MainNav1 isTop />
    </div>
  );
};

export default Header;
