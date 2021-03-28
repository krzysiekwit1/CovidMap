import React, { Component } from "react";
import MapChart from "../components/Maps/MapChart";
import axios from "axios";
import CovidRow from "../components/CovidRow";
import CovidDataComponent from "../components/CovidDataComponent";
import CovidDataForSpecificCountry from "../components/CovidDataForSpecificCountry";
class CovidMapContainer extends Component {
  state = {
    data: [["Country", "Cases"]],
    cases: 0,
    active: 0,
    deaths: 0,
    recovered: 0,
    tableCovidData: [
      ["Country"],
      ["Cases"],
      ["ActiveCases"],
      ["Deaths"],
      ["Recovered"],
      ["TestsNumber"],
      ["TodayCases"],
      ["TodayRecovered"],
      ["TodayDeaths"],
      ["isoAlpha2"],
    ],
    inputSpecificCountry: "",
    showDataSpecificCountry: "",
    specificCountryDays: [],
    specificCountryActiveCases: [],
    specificCountryNewCases: [],
    specificCountryTotalCases: [],
    specificCountryTotalDeaths: [],
    specificCountryTotalTests: [],
    specificCountryNewDeaths: [],
  };
  componentDidMount() {
    //summed covid data for all countries
    const optionsBasicData = {
      method: "GET",
      url: "https://covid-19-statistics.p.rapidapi.com/reports/total",
      headers: {
        "x-rapidapi-key": "0d45c40ca1msh7f414238ad946a1p1d31dfjsn310aae9427a1",
        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
      },
    };
    axios
      .request(optionsBasicData)
      .then((response) => {
        this.setState({
          cases: response.data["data"]["confirmed"],
          active: response.data["data"]["active"],
          deaths: response.data["data"]["deaths"],
          recovered: response.data["data"]["recovered"],
        });
      })
      .catch((error) => {
        console.error(error);
      });
    //covid data per country
    const optionsAllCountryData = {
      method: "GET",
      url: "https://corona.lmao.ninja/v2/countries?yesterday&sort",
    };
    let array = [["Country", "Cases"]];
    let dataArrayAllCountries = [];
    axios
      .request(optionsAllCountryData)
      .then((response) => {
        for (let i = 0; i <= 220; i++) {
          if (response.data[i]["countryInfo"]["iso2"] !== null) {
            if (i === 208) {
              array.push(["US", response.data[i]["cases"]]);
            }
            array.push([
              response.data[i]["country"],
              response.data[i]["cases"],
            ]);
          }
        }
        for (let i = 0; i <= 220; i++) {
          if (response.data[i]["countryInfo"]["iso2"] != null) {
            dataArrayAllCountries.push({
              country: response.data[i]["country"],
              cases: response.data[i]["cases"],
              activeCases: response.data[i]["active"],
              deaths: response.data[i]["deaths"],
              recovered: response.data[i]["recovered"],
              testsNumber: response.data[i]["tests"],
              todayCases: response.data[i]["todayCases"],
              todayRecovered: response.data[i]["todayRecovered"],
              todayDeaths: response.data[i]["todayCases"],
              isoAlpha2: response.data[i]["countryInfo"]["iso2"],
            });
          }
        }
        ///
        dataArrayAllCountries.sort((a, b) => {
          return b.cases - a.cases;
        });
        this.setState({ data: array });
        this.setState({ tableCovidData: dataArrayAllCountries });
        //console.log(this.state.tableCovidData);
      })
      .catch((error) => {
        console.error(error);
      });
    //history by country
  }
  getHistoryForCountry(e) {
    e.preventDefault();
    const array = {
      days: [],
      activeCases: [],
      newCases: [],
      totalCases: [],
      totalDeaths: [],
      totalTests: [],
      newDeaths: [],
    };
    const options = {
      method: "GET",
      url: "https://covid-193.p.rapidapi.com/history",
      params: { country: this.state.inputSpecificCountry },
      headers: {
        "x-rapidapi-key": "0d45c40ca1msh7f414238ad946a1p1d31dfjsn310aae9427a1",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        if (response.data.response != "") {
          for (let i = 0; i <= 210; i++) {
            array.days.push(response.data.response[i]["day"]);
            array.activeCases.push(response.data.response[i]["cases"].active);
            array.newCases.push(response.data.response[i]["cases"].new);
            array.totalCases.push(response.data.response[i]["cases"].total);
            array.totalDeaths.push(response.data.response[i]["deaths"].total);
            array.totalTests.push(response.data.response[i]["tests"].total);
            array.newDeaths.push(response.data.response[i]["deaths"].new);
          }
          this.setState({ specificCountryDays: array.days });
          this.setState({
            specificCountryActiveCases: array.activeCases,
          });
          this.setState({
            specificCountryTotalCases: array.totalCases,
          });
          this.setState({
            specificCountryNewCases: array.newCases,
          });
          this.setState({
            specificCountryTotalDeaths: array.totalDeaths,
          });
          this.setState({
            specificCountryTotalTests: array.totalTests,
          });
          this.setState({
            specificCountryNewDeaths: array.newDeaths,
          });
          this.setState({ showDataSpecificCountry: "a" });
        } else {
          alert("No data for that country");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleInputChange = (e) => {
    this.setState({ inputSpecificCountry: e });
  };
  prepareDataSpecificCountry = (label, x, y, fill, backgroundColor) => {
    const data = {
      labels: x,
      datasets: [
        {
          label: label,
          data: y,
          fill: fill,
          backgroundColor: backgroundColor,
        },
      ],
    };
    return data;
  };
  handleClickOnCountry(e, country) {
    e.persist();
    this.setState({ inputSpecificCountry: country }, () => {
      this.getHistoryForCountry(e);
    });
    window.scrollTo(0, 0);
  }

  render() {
    document.body.style = "overflow:auto";
    const showSpecificCountry = this.state.showDataSpecificCountry;
    let specificCountryDataContainer;
    if (showSpecificCountry) {
      specificCountryDataContainer = (
        <CovidDataForSpecificCountry
          chart1={this.prepareDataSpecificCountry(
            "Active Cases",
            this.state.specificCountryDays,
            this.state.specificCountryActiveCases,
            true,
            "#5cb04d",
            1
          )}
          chart2={this.prepareDataSpecificCountry(
            "Total Cases",
            this.state.specificCountryDays,
            this.state.specificCountryTotalCases,
            true,
            "#2668c9",
            1
          )}
          chart3={this.prepareDataSpecificCountry(
            "New Deaths",
            this.state.specificCountryDays,
            this.state.specificCountryNewDeaths,
            true,
            "#d9db39",
            1
          )}
          chart4={this.prepareDataSpecificCountry(
            "New Cases",
            this.state.specificCountryDays,
            this.state.specificCountryNewCases,
            true,
            "#ad181d",
            1
          )}
        />
      );
    } else {
      specificCountryDataContainer = <div className=""></div>;
    }
    return (
      <div className="covid-page-container">
        <div className="specific-country-container">
          <input
            onChange={(event) => this.handleInputChange(event.target.value)}
            className="specific-country-input"
            type="text"
            placeholder="Check your country"
          />
          <button
            onClick={(e) => this.getHistoryForCountry(e)}
            className="specific-country-button"
          >
            Search
          </button>
          {specificCountryDataContainer}
        </div>
        <MapChart data={this.state.data} />
        <div className="covid-basic-data-container">
          <CovidDataComponent
            style={{ background: "#f0d807" }}
            icon={"http://krzysztofwitkowski.pl/assets/medical-mask.png"}
            information="Total Cases:"
            informationData={this.state.cases}
          />
          <CovidDataComponent
            style={{ background: "#14db2f" }}
            icon={"http://krzysztofwitkowski.pl/assets/medical-mask.png"}
            information="Total Active Cases:"
            informationData={this.state.active}
          />
          <CovidDataComponent
            style={{ background: "#e60b1a" }}
            icon={"http://krzysztofwitkowski.pl/assets/coronavirus.png"}
            information="Total Deaths:"
            informationData={this.state.deaths}
          />
          <CovidDataComponent
            style={{ background: "#17aeff" }}
            icon={"http://krzysztofwitkowski.pl/assets/healthy.png"}
            information="Total Recovered:"
            informationData={this.state.recovered}
          />
        </div>

        <table className="table-covid">
          <tbody>
            <tr className="table-covid-first-row">
              <th></th>
              <th>Country</th>
              <th>Cases</th>
              <th>Active Cases</th>
              <th>Deaths</th>
              <th>Tests Number</th>
              <th>Today Cases</th>
              <th>Today Deaths</th>
              <th>Today Recovered</th>
            </tr>
            {this.state.tableCovidData.map((item, i) => {
              return (
                <CovidRow
                  showCharts={(e) => this.handleClickOnCountry(e, item.country)}
                  key={i}
                  number={i + 1}
                  country={item.country}
                  cases={item.cases}
                  activeCases={item.activeCases}
                  deaths={item.deaths}
                  testsNumber={item.testsNumber}
                  todayCases={item.todayCases}
                  todayDeaths={item.todayDeaths}
                  todayRecovered={item.todayRecovered}
                />
              );
            })}
          </tbody>
        </table>
        <div style={{ display: "none" }}>
          Icons made by{" "}
          <a
            style={{ display: "none" }}
            href="https://www.freepik.com"
            title="Freepik"
          >
            Freepik
          </a>{" "}
          from{" "}
          <a
            style={{ display: "none" }}
            href="https://www.flaticon.com/"
            title="Flaticon"
          >
            www.flaticon.com
          </a>
        </div>
      </div>
    );
  }
}
export default CovidMapContainer;
