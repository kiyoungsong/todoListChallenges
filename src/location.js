const loca = document.querySelector(".location");
const temp = document.querySelector(".temp");
const cloudIcon = document.querySelector(".fas.fa-cloud-rain.fa-3x");
const sunIcon = document.querySelector(".fas.fa-sun.fa-3x");

const COORDS = "coords";
const APIKEY = "f1d96a5f2448e1b04d7c4135508e0435";

const getWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
  );
  const post = await response.json();
  if (post.weather[0].main === "Clear") {
    sunIcon.classList.remove("hide");
    cloudIcon.classList.add("hide");
  }
  loca.innerHTML = post.name;
  temp.innerHTML = `${post.main.temp}°`;
};

const saveCoords = (coordsObj) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const successGetLocation = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
};

const failGetLocation = () => {
  console.log("fail");
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(successGetLocation, failGetLocation);
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoord = JSON.parse(loadedCoords);
    getWeather(parsedCoord.latitude, parsedCoord.longitude);
  }
};

const locationInit = () => {
  loadCoords();
};

locationInit();
