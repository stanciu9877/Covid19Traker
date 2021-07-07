import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

const AppStyles = styled.div`
  * {
    margin: 0;
  }
  .body {
    background-color: #f5f6fa;
  }
  .app__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .app__left {
    flex: 0.9;
  }
  .app__stats {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .app__graph {
    flex-grow: 1;
  }
  .app {
    display: flex;
    justify-content: space-evenly;
  }
  .app__graphTitle {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    .app {
      flex-direction: column;
    }
  }
`;

function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [mapCenter, setmapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setcasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((respone) => respone.json())
      .then((data) => {
        setcountryInfo(data);
      });
  }, []);

  useEffect(() => {
    //async->send a request,wait for it, do something with the code
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((respone) => respone.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setcountries(countries);
          settableData(sortedData);
          setmapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountry(countryCode);
        setcountryInfo(data);

        setmapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setmapZoom(5);
      });
  };

  return (
    <AppStyles>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>Covid-19 TRAKER</h1>
            <FormControl className="app__dropdown">
              <Select
                variant="outlined"
                onChange={onCountryChange}
                value={country}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app__stats">
            <InfoBox
              isRed
              active={casesType === "cases"}
              onClick={(e) => setcasesType("cases")}
              title="Coronavirus cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={prettyPrintStat(countryInfo.cases)}
            />
            <InfoBox
              active={casesType === "recovered"}
              onClick={(e) => setcasesType("recovered")}
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={prettyPrintStat(countryInfo.recovered)}
            />
            <InfoBox
              isRed
              active={casesType === "deaths"}
              onClick={(e) => setcasesType("deaths")}
              title="Death"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={prettyPrintStat(countryInfo.deaths)}
            />
          </div>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
        <Card className="app_right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
            <LineGraph className="app__graph" casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </AppStyles>
  );
}

export default App;
