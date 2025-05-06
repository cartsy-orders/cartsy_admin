
import React from "react";
import { worldMill } from "@react-jvectormap/world";
import dynamic from "next/dynamic";

const nigeriaStateMarkers = [
  // South-West
  { latLng: [6.5244, 3.3792], name: "Lagos", style: { fill: "#FF0000", borderColor: "white" } },
  { latLng: [7.3775, 3.9470], name: "Oyo", style: { fill: "#0000FF", borderColor: "white" } },
  { latLng: [7.1600, 3.3500], name: "Ogun", style: { fill: "#00FF00", borderColor: "white" } },
  { latLng: [7.6000, 4.5500], name: "Osun", style: { fill: "#FF00FF", borderColor: "white" } },
  { latLng: [7.7000, 5.2000], name: "Ekiti", style: { fill: "#FFFF00", borderColor: "white" } },
  { latLng: [7.2500, 5.2000], name: "Ondo", style: { fill: "#00FFFF", borderColor: "white" } },

  // North-Central
  { latLng: [9.0579, 7.4951], name: "Abuja (FCT)", style: { fill: "#FFA500", borderColor: "white" } },
  { latLng: [8.5000, 8.5000], name: "Nasarawa", style: { fill: "#800080", borderColor: "white" } },
  { latLng: [8.7500, 6.0833], name: "Kogi", style: { fill: "#008000", borderColor: "white" } },
  { latLng: [9.0833, 7.5333], name: "Niger", style: { fill: "#000080", borderColor: "white" } },
  { latLng: [7.5333, 6.4333], name: "Kwara", style: { fill: "#808000", borderColor: "white" } },
  { latLng: [7.3333, 8.9833], name: "Benue", style: { fill: "#800000", borderColor: "white" } },
  { latLng: [9.2167, 9.5167], name: "Plateau", style: { fill: "#008080", borderColor: "white" } },

  // North-West
  { latLng: [10.3103, 9.8449], name: "Kano", style: { fill: "#FF4500", borderColor: "white" } },
  { latLng: [12.0000, 8.5167], name: "Katsina", style: { fill: "#DA70D6", borderColor: "white" } },
  { latLng: [11.5000, 7.3000], name: "Zamfara", style: { fill: "#FF6347", borderColor: "white" } },
  { latLng: [12.1667, 6.6667], name: "Kebbi", style: { fill: "#4682B4", borderColor: "white" } },
  { latLng: [11.8333, 9.3500], name: "Jigawa", style: { fill: "#32CD32", borderColor: "white" } },
  { latLng: [11.7500, 11.9667], name: "Yobe", style: { fill: "#9370DB", borderColor: "white" } },
  { latLng: [11.5000, 13.6833], name: "Borno", style: { fill: "#3CB371", borderColor: "white" } },
  { latLng: [11.0000, 7.7167], name: "Kaduna", style: { fill: "#7B68EE", borderColor: "white" } },
  { latLng: [10.2833, 9.8333], name: "Bauchi", style: { fill: "#20B2AA", borderColor: "white" } },
  { latLng: [10.3333, 11.1667], name: "Gombe", style: { fill: "#778899", borderColor: "white" } },
  { latLng: [10.6167, 12.4500], name: "Adamawa", style: { fill: "#FF8C00", borderColor: "white" } },
  { latLng: [11.0000, 8.0000], name: "Sokoto", style: { fill: "#9932CC", borderColor: "white" } },

  // South-South
  { latLng: [5.0000, 6.0000], name: "Rivers", style: { fill: "#8FBC8F", borderColor: "white" } },
  { latLng: [5.1167, 5.9333], name: "Bayelsa", style: { fill: "#E9967A", borderColor: "white" } },
  { latLng: [5.5000, 5.7500], name: "Delta", style: { fill: "#8A2BE2", borderColor: "white" } },
  { latLng: [5.7500, 7.0833], name: "Edo", style: { fill: "#A0522D", borderColor: "white" } },
  { latLng: [5.3333, 7.3667], name: "Anambra", style: { fill: "#5F9EA0", borderColor: "white" } },
  { latLng: [6.3333, 8.1000], name: "Enugu", style: { fill: "#D2691E", borderColor: "white" } },
  { latLng: [5.8333, 7.3833], name: "Imo", style: { fill: "#6495ED", borderColor: "white" } },
  { latLng: [5.5000, 7.0167], name: "Abia", style: { fill: "#DC143C", borderColor: "white" } },
  { latLng: [4.7500, 7.0833], name: "Akwa Ibom", style: { fill: "#00008B", borderColor: "white" } },
  { latLng: [5.1667, 7.7167], name: "Ebonyi", style: { fill: "#B8860B", borderColor: "white" } },
  { latLng: [4.9500, 8.3333], name: "Cross River", style: { fill: "#006400", borderColor: "white" } },
] as Marker[];

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap),
  { ssr: false }
);

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

type MarkerStyle = {
  initial: {
    fill: string;
    r: number; 
  };
};

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
};

const CountryMap: React.FC<CountryMapProps> = ({  }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={
        {
          initial: {
            fill: "#465FFF",
            r: 4, 
          }, 
        } as MarkerStyle
      }
      markersSelectable={true}
      markers={nigeriaStateMarkers}
      focusOn={{
        region: "NG", 
        animate: true,
        scale: 6, 
        x: 0, 
        y: 0,
      }}
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: "#D0D5DD", // Default color for other countries
          fillOpacity: 0.2, // Make other countries semi-transparent
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465FFF",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;
