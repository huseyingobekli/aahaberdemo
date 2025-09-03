"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createPortal } from "react-dom";

const Marker = ({ map, feature, isActive, onClick }) => {
  const { geometry, properties } = feature;

  const markerRef = useRef(null);
  const contentRef = useRef(document.createElement("div"));

  useEffect(() => {
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .addTo(map);

    return () => {
      markerRef.current.remove();
    };
  }, []);

  return (
    <>
      {createPortal(
        <div
          onClick={() => onClick(feature)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "100px",
            borderRadius: "20%",
            overflow: "hidden",
            cursor: "pointer",
            border: isActive ? "2px solid #333" : "2px solid #fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
            backgroundColor: "#fff",
          }}
        >
          <img
            src={properties.img}
            alt={properties.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Marker;
