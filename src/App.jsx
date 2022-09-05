import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [incon, setIncon] = useState("");
  const [background, setBackground] = useState("");
  const [tempCelcius, setTempCelcius] = useState(true);

  const apiKey = "5879d53253530d398b0f24a36d531e3e";
  const [coordinates, setCoordinates] = useState({});

  function success(pos) {
    let crd = pos.coords;

    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
  }
  navigator.geolocation.getCurrentPosition(success);

  const celcius = (coordinates.main?.temp - 273.15).toFixed(2);
  const fahrenheit = ((celcius * 9) / 5 + 32).toFixed(2);

  useEffect(() => {
    if (latitude != 0 || longitude != 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        )
        .then((res) => setCoordinates(res.data));
    }
    if (celcius < -90 && celcius < 15) {
      setIncon("https://c.tenor.com/-gDxa1PE0ucAAAAC/fr%C3%ADo.gif");
      setBackground(
        "https://img.freepik.com/foto-gratis/fondo-navidad-nieve_1048-3135.jpg?w=2000"
      );
    } else if (celcius > 15 && celcius < 24) {
      setIncon(
        "https://phoneky.co.uk/thumbs/screensavers/down/nature/tropical_m4hyjhcd.gif"
      );
      setBackground(
        "https://misistemasolar.com/wp-content/uploads/2018/10/clima-16.jpg"
      );
    } else {
      setIncon(
        "https://reportemisiones.com.ar/wp-content/uploads/2017/11/despejadogif.gif"
      );
      setBackground(
        "https://img.freepik.com/foto-gratis/fondo-mar-playa-vacio_74190-313.jpg?w=2000"
      );
    }
  }, [latitude, longitude]);

  console.log(coordinates);

  const chageTemperature = () => {
    setTempCelcius(!tempCelcius);
  };

  document.body.style = `background-image: url(${background})`;

  return (
    <div className="App">
      <h1>{coordinates.sys?.country}</h1>
      <img src={incon} alt="" />
      <div>City: {coordinates.name}</div>
      <div>
        Temperature: {tempCelcius ? celcius : fahrenheit}{" "}
        {tempCelcius ? "°C" : "°F"}
      </div>
      <p>wind: {coordinates.wind?.speed} "m/s"</p>
      <button onClick={chageTemperature}>
        Change to {tempCelcius ? "fahrenheit" : "celcius"}
      </button>
    </div>
  );
}

export default App;
