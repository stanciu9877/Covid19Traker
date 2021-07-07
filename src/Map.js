import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import styled from "styled-components";
import { showDataOnMap } from "./util";

const MAPstyle = styled.div`
  .map {
    height: 500px;
    background-color: white;
    padding: 1rem;
    border-radius: 20px;
    margin-top: 16px;
    box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.5);
  }

  .map .leaflet-container {
    height: 100%;
    border-radius: 12px;
  }

  .info-flag img {
    width: 100px;
    border-radius: 5px;
  }

  .info-name {
    font-size: 20px;
    font-weight: bold;
    color: #555;
  }

  .info-container {
    width: 150px;
    padding: 10px;
  }

  .info-flag {
    height: 80px;
    width: 100%;
    background-size: cover;
    border-radius: 8px;
  }

  .info-confirmed,
  .info-recovered,
  .info-deaths {
    font-size: 16px;
    margin-top: 5px;
  }
`;

function Map({ countries, casesType, center, zoom }) {
  return (
    <MAPstyle>
      <div className="map">
        <LeafletMap center={center} zoom={zoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {showDataOnMap(countries, casesType)}
        </LeafletMap>
      </div>
    </MAPstyle>
  );
}

export default Map;
