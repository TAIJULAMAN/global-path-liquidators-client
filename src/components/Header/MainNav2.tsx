import React, { FC, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import LangDropdown from "./LangDropdown";
import AvatarDropdown from "./AvatarDropdown";
import TemplatesDropdown from "./TemplatesDropdown";
import DropdownCategories from "./DropdownCategories";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const user: any = localStorage.getItem("UserDetails");
  const navigate = useNavigate();

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/page-search");
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          {renderMagnifyingGlassIcon()}
          <input
            type="text"
            placeholder="Type and press enter"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            autoFocus
          />
          <button type="button" onClick={() => setShowSearchForm(false)}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <input type="submit" hidden value="" />
      </form>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 flex justify-between">
          <div className="flex items-center md:hidden flex-1">
            <MenuBar />
          </div>

          <div className="flex lg:flex-1 items-center space-x-3 sm:space-x-8">
            <Logo />
            {!showSearchForm && (
              <div className="hidden md:block h-10 border-l border-slate-200 dark:border-slate-700"></div>
            )}
            {!showSearchForm && (
              <div className="hidden md:block">
                <DropdownCategories />
              </div>
            )}
          </div>

          {/* {showSearchForm && (
            <div className="flex-[2] flex !mx-auto px-10">
              {renderSearchForm()}
            </div>
          )} */}

          <div className="flex-1 flex items-center justify-end ">
            {/* {!showSearchForm && <TemplatesDropdown />}
            {!showSearchForm && <LangDropdown />}
            {!showSearchForm && (
              <button
                className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                onClick={() => setShowSearchForm(!showSearchForm)}
              >
                {renderMagnifyingGlassIcon()}
              </button>
            )} */}
            <CartDropdown />
            <AvatarDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
