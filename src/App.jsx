import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

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

    useEffect(() => {      

      console.log("segundo");
      console.log(latitude, longitude);

      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then((res) => setCoordinates(res.data))
    
  },[])

  console.log(coordinates);

  return (
    <div className="App">
      <h1>{latitude}</h1>
      <h1>{longitude}</h1>
    </div>
  )
}

export default App
