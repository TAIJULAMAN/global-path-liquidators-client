import React, { FC, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NotificationsDropdown from "./NotificationsDropdown";

export interface MainNav2LoggedProps { }

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const navigate = useNavigate();
  const user: any = localStorage.getItem("UserDetails");


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
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/page-search");
        }}
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
          {renderMagnifyingGlassIcon()}
          <input
            ref={inputRef}
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

  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center">
          <Logo className="flex-shrink-0" />
        </div>

        <div className="flex-[2] hidden lg:flex justify-center mx-4">
          {showSearchForm ? renderSearchForm() : <Navigation />}
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100 space-x-0.5">
          {/* {!showSearchForm && (
            <button
              className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
              onClick={() => setShowSearchForm(!showSearchForm)}
            >
              {renderMagnifyingGlassIcon()}
            </button>
          )} */}
           
          {user ? <>
            <NotificationsDropdown />
            <CartDropdown />
            <AvatarDropdown />
          </> : (
            <Link
              to={"/login"}
              className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"

            >
              <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300" title="Login">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12H14.88"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.65 8.6499L16 11.9999L12.65 15.3499"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

            </Link>
          )}
         
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
