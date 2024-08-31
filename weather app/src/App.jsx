import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [dataCity, setData] = useState("karachi");
  const [apiData, setDataApi] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setMsg] = useState(false);
  const [classCustom, setClass] = useState("error-page");
  const [errorMsg2, setMsg2] = useState(false);

  useEffect(() => {
    getResult();
  }, [dataCity]);

  const getResult = () => {
    if (dataCity !== "") {
      setLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${dataCity}&appid=2a1bb3ee54e0cbd6b7cf398491d96ae6`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.cod === 200) {
            setDataApi(res);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
            setMsg(false); // Hide error message if fetch is successful
          } else {
            clearTimeout(int1);
            clearTimeout(int2);
            errorHandeler();
          }
        })
        .catch((error) => {
          clearTimeout(int1);
          clearTimeout(int2);

          console.error(error);
          errorHandeler();
        });
    } else {
      setLoading(false);
    }
  };

  let int1;
  let int2;
  const errorHandeler = () => {
    setLoading(false);
    setMsg(true);
    setClass("error-page");
    setTimeout(() => {
      setClass("error-page2");
    }, 2000);
    setTimeout(() => {
      setMsg(false);
    }, 2500);
  };

  let int3;
  let int4;
  const errorHandeler2 = () => {
    setLoading(true);
    setMsg2(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
    setClass("error-page");
    int3 = setTimeout(() => {
      setClass("error-page2");
    }, 2000);
    int4 = setTimeout(() => {
      setMsg2(false);
    }, 2500);
  };

  return (
    <div className="bg-slate-900 rounded text-white m-auto main-div p-2">
      <h1 className="heading">Weather App</h1>
      <div>
        {loading && (
          <div className="loader-page">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7133/7133364.png"
              alt=""
              height={"100px"}
              width={"100px"}
            />
            <h2>WEATHER APP</h2>
          </div>
        )}
        {errorMsg && (
          <div className={classCustom}>
            <h2>Error! City not found</h2>
          </div>
        )}

        {errorMsg2 && (
          <div className={classCustom}>
            <h2>Error! please enter your city</h2>
          </div>
        )}

        <input
          className="p-2 rounded m-2 outline-none text-black"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-orange-500 p-2 px-8 rounded-md"
          onClick={() => {
            if (city !== "") {
              setData(city);
              setCity("");
            } else {
              clearTimeout(int3);
              clearTimeout(int4);
              errorHandeler2();
            }
          }}
        >
          Search
        </button>
      </div>
      {
        <div className="m-auto w-full sect ">
          <div className="bg-green-600 p-2 my-5 rounded flex justify-between items-center">
            <h1 className="heading-2">
              {apiData.name || "Karachi"},{apiData?.sys?.country || "PK"}
            </h1>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${apiData?.weather?.[0]?.icon}@2x.png`}
                alt={apiData?.weather?.[0]?.main || ""}
                height="25px"
                width="25px"
              />
              <h2>{apiData?.weather?.[0]?.main}</h2>
            </div>
          </div>
          <div className="flex justify-between border-2 border-purple-800 bg-slate-800 mb-2 p-2 rounded">
            <h5>TEMPERATURE:</h5>
            <p>
              {Math.round(apiData?.main?.temp - 273.15 || 0)}
              <sup>°C</sup>
            </p>
          </div>
          <div className="flex justify-between bg-slate-800 border-2 border-purple-800 mb-2 p-2 rounded">
            <h5>FEELS LIKE:</h5>
            <p>
              {Math.round(apiData?.main?.feels_like - 273.15 || 0)}
              <sup>°C</sup>
            </p>
          </div>
          <div className="flex justify-between bg-slate-800 border-2 border-purple-800 mb-2 p-2 rounded">
            <h5>HUMIDITY:</h5>
            <p>{Math.round(apiData?.main?.humidity || 0)}%</p>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
