import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const apiKey = "5879d53253530d398b0f24a36d531e3e";
  const [coordinates, setCoordinates] = useState({})

  function success(pos) {
    let crd = pos.coords;

    setLatitude(crd.latitude);
    setLongitude(crd.longitude);
  }
  console.log("primero");
  console.log(latitude, longitude);
  navigator.geolocation.getCurrentPosition(success);

  const celcius = (coordinates.main?.temp - 273.15).toFixed(2);
  

    useEffect(() => {      

      console.log("segundo");
      console.log(latitude, longitude);

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then((res) => setCoordinates(res.data))
    
  },[])

  console.log(coordinates);

  return (
    <div className="App">
      <h1>{coordinates.sys?.country}</h1>
      <img src="http://openweathermap.org/img/wn/10n@2x.png" alt="" />
      <div>Ciudad: {coordinates.name}</div>
      <div>Temperatura: {celcius} °C</div>
      <button>Change to farenhey</button>
    </div>
  )
}

export default App
