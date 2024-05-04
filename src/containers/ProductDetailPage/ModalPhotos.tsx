import React, { FC, useEffect, useId, useMemo, useRef } from "react";
import { Dialog } from "@headlessui/react";
import NextPrev from "shared/NextPrev/NextPrev";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Glide from "@glidejs/glide";
import NcImage from "shared/NcImage/NcImage";

export interface ModalPhotosProps {
  imgs: string[];
  onClose: () => void;
  isOpen: boolean;
  initFocus?: number;
  uniqueClassName: string;
}

const ModalPhotos: FC<ModalPhotosProps> = ({
  imgs,
  isOpen,
  onClose,
  initFocus = 0,
  uniqueClassName = "",
}) => {
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");
  let completeButtonRef = useRef(null);

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      // @ts-ignore
      direction:
        document.querySelector("html")?.getAttribute("dir") === "rtl"
          ? "rtl"
          : "ltr",
      gap: 10,
      perView: 1,
      startAt: initFocus,
    });
  }, [UNIQUE_CLASS, initFocus]);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 10);
  }, [MY_GLIDEJS, isOpen, UNIQUE_CLASS]);

  const renderSlider = () => {
    return (
      <div
        className={`modalPhotos-single-gallery ${UNIQUE_CLASS} group relative flex flex-col z-50 w-full h-full`}
      >
        {/*  */}
        <div
          className="controls_nav glide__bullets mb-4"
          data-glide-el="controls[nav]"
        >
          {imgs.map((_, index) => (
            <div key={index} className="text-center hidden text-sm">
              <span className="text-xl font-semibold"> {index + 1}</span>
              <span> / {imgs.length}</span>
            </div>
          ))}
        </div>
        {/*  */}

        <div
          className="glide__track max-h-full h-full relative z-50"
          data-glide-el="track"
        >
          <ul className="glide__slides h-full ">
            {imgs.map((item, index) => (
              <li className="glide__slide relative h-full" key={index}>
                <NcImage
                  src={item}
                  containerClassName=" w-full h-full flex items-center justify-center "
                  className=" max-w-full max-h-full rounded-2xl"
                />
              </li>
            ))}
          </ul>
        </div>
        {/*  */}
        <div className="xl:absolute z-20 xl:-inset-x-20 max-w-6xl my-2 mx-auto top-full xl:top-1/2 transform xl:-translate-y-1/2 flex xl:justify-between glide__arrows">
          <NextPrev
            onlyPrev
            className="mr-1.5"
            btnClassName="w-8 h-8 sm:w-10 sm:h-10 "
          />
          <NextPrev
            onlyNext
            className="ml-1.5"
            btnClassName="w-8 h-8 sm:w-10 sm:h-10 "
          />
        </div>
      </div>
    );
  };

  const renderModalPhotos = () => {
    return (
      <Dialog
        initialFocus={completeButtonRef}
        as="div"
        className="ProductDetailModalPhotos fixed inset-0 z-50 overflow-y-auto dark bg-neutral-800 text-neutral-200 hiddenScrollbar"
        onClose={onClose}
        open={isOpen}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-white dark:bg-neutral-800" />
          <div
            ref={completeButtonRef}
            className="absolute left-2 top-2 md:top-4 md:left-4 z-50"
          >
            <ButtonClose className=" sm:w-11 sm:h-11" onClick={onClose} />
          </div>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="relative inline-block w-full max-w-5xl py-5 sm:py-8 h-screen align-middle mx-auto">
            {renderSlider()}
          </div>
        </div>
      </Dialog>
    );
  };

  return renderModalPhotos();
};

export default ModalPhotos;
