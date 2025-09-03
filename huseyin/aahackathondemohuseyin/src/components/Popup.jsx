"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import mapboxgl from "mapbox-gl";

const Popup = ({ map, activeFeature }) => {
  const popupRef = useRef();
  const contentRef = useRef(document.createElement("div"));

  useEffect(() => {
    if (!map) return;

    popupRef.current = new mapboxgl.Popup({
      closeOnClick: false,
      closeButton: false,
      offset: 20,
    });

    return () => {
      popupRef.current.remove();
    };
  }, []);

  // when activeFeature changes, set the popup's location and content, and add it to the map
  useEffect(() => {
    if (!activeFeature) return;

    popupRef.current
      .setLngLat(activeFeature.geometry.coordinates) // set its position using activeFeature's geometry
      .setHTML(contentRef.current.outerHTML) // use contentRef's `outerHTML` to set the content of the popup
      .addTo(map); // add the popup to the map
  }, [activeFeature]);

  // use a react portal to render the content to show in the popup, assigning it to contentRef
  return (
    <>
      {createPortal(
        <div className="max-w-xs overflow-hidden bg-white border border-gray-200 shadow-md transform transition-all duration-500 hover:shadow-lg hover:scale-105 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-0 transition-opacity duration-500 group-hover:opacity-30 blur-md"></div>
          <div className="p-6 relative z-10">
            <p className="text-xl font-semibold text-gray-800">
              {activeFeature?.properties.title}
            </p>
            <p className="mt-2 text-gray-600">
              {activeFeature?.properties.description}
            </p>
            <div className="flex items-center mt-4 text-gray-600">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 fill-current text-black"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2">
                <a target="_blank" href={activeFeature?.properties.url}>
                  Habere Git
                </a>
              </span>
            </div>
          </div>
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Popup;
