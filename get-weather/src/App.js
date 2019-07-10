import React from "react"
import Info from "./components/info"
import Form from "./components/form"
import Weather from "./components/weather"

const API_KEY = "8abc2d76250082284d0f78bd630d8781";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    pressure: undefined,
    error: undefined   
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
       
    if(city) {
      const url = await
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await url.json();

      var sunset = data.sys.sunset;
      var dateS = new Date();
      dateS.setTime(sunset);
      var sunset_date = dateS.getHours() + ":" + dateS.getMinutes() + ":" + dateS.getSeconds();
      var sunrise = data.sys.sunrise;
      var dateR = new Date();
      dateR.setTime(sunrise);
      var sunrise_date = dateR.getHours() + ":" + dateR.getMinutes() + ":" + dateR.getSeconds();

      this.setState ({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunrise: sunrise_date,       
        sunset: sunset_date,
        error: undefined
      });
    }
    else {
      this.setState ({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunrise: undefined,       
        sunset: undefined,
        error: "Enter city"
      });
    }
  }

  render() {
    return(
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather}/>
                <Weather 
                temp = {this.state.temp}
                city = {this.state.city}
                country = {this.state.country}
                pressure = {this.state.pressure}
                sunrise = {this.state.sunrise}
                sunset = {this.state.sunset}
                error = {this.state.error}/>
              </div>
            </div>
          </div> 
        </div>      
      </div>
    );
  }
}

export default App;