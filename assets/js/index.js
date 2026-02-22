//===============================================navigation===============================================
const navLinks = document.querySelectorAll("nav [data-section]");
const sections = document.querySelectorAll("section[data-section]");
//===============================================apod section===============================================
const todayInSpace = document.getElementById("today-in-space");
//data section is the same value of id
const astronomyPictureDate = document.getElementById("apod-date");
// Astronomy Picture of the Day -+${the date of img}
const dateInput = document.getElementById("apod-date-input");
const dateInputDisplayed = document.querySelector(".date-input-wrapper span");
const loadBtn = document.getElementById("load-date-btn");
const todayBtn = document.getElementById("today-apod-btn");
const displayedImage = document.getElementById("apod-image");
const displayedVideo = document.getElementById("apod-video");
const opac = document.querySelector(".Res");
const fullResolution = document.querySelector("#apod-image-container button");
//hidden or not
const loading = document.getElementById("apod-loading");
const imageTitle = document.getElementById("apod-title");
const imagedate = document.getElementById("apod-date-detail");
const imageExplain_ = document.getElementById("apod-explanation");
//&copy;+${owners...}
const imageCopyRight = document.getElementById("apod-copyright");
//image details
const imagedateDetails = document.getElementById("apod-date-info");
const mediaType = document.getElementById("apod-media-type");
const errorMsg = document.getElementById("apod-error");
let isFetch = false;
const apiKey = "GtmfiovhwRthvmZ7pWDnntU3piQwFUzmrUnvBmX3";
const formatting = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
//===============================================launch section===============================================
const sectionLaunch = document.getElementById("planet-comparison-tbody");
const featuredLaunch = document.getElementById("featured-launch");
const launchesGrid = document.getElementById("launches-grid");
//===============================================Planets section===============================================
let apiDataPlanets = {};
const tbody = document.getElementById("planet-comparison-tbody");
const gridPlanets = document.getElementById("planets-grid");
const planets = document.querySelectorAll("[data-planet-id]");
const planetName = document.querySelectorAll("[data-planet-id] h4");
const planetAU = document.querySelectorAll("[data-planet-id] p");
const detailImagePlanet = document.getElementById("planet-detail-image");
const detailNamePlanet = document.getElementById("planet-detail-name");
const detailDescPlanet = document.getElementById("planet-detail-description");
const semimajorAxis = document.getElementById("planet-distance");
const meanRadius = document.getElementById("planet-radius");
const mass = document.getElementById("planet-mass");
const density = document.getElementById("planet-density");
const orbitalPeriod = document.getElementById("planet-orbital-period");
const rotationPeriod = document.getElementById("planet-rotation");
const moons = document.getElementById("planet-moons");
const gravity = document.getElementById("planet-gravity");
const planetsDiscoverer = document.getElementById("planet-discoverer");
const planetsDiscoveryDate = document.getElementById("planet-discovery-date");
const planetBodyType = document.getElementById("planet-body-type");
const planetVolume = document.getElementById("planet-volume");
/* <li class="flex items-start"><i class="fas fa-check text-green-400 mt-1 mr-2"></i>
    <span class="text-slate-300">Magnetic field protects from solar wind</span></li>*/
const planetFactsList = document.getElementById("planet-facts");
const perihelion = document.getElementById("planet-perihelion");
const aphelion = document.getElementById("planet-aphelion");
const eccentricity = document.getElementById("planet-eccentricity");
const inclination = document.getElementById("planet-inclination");
const axialTilt = document.getElementById("planet-axial-tilt");
const temp = document.getElementById("planet-temp");
const escapePlanet = document.getElementById("planet-escape");
const earthMass = 5.97237 * Math.pow(10, 24);
//===============================================navigation===============================================
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const activeSec = link.getAttribute("data-section");
    navLinks.forEach((l) => {
      l.classList.remove("bg-blue-500/10", "text-blue-400");
      l.classList.add("text-slate-300", "hover:bg-slate-800");
    });
    link.classList.add("bg-blue-500/10", "text-blue-400");
    link.classList.remove("text-slate-300", "hover:bg-slate-800");

    sections.forEach((sec) => {
      sec.classList.add("hidden");
    });
    document.getElementById(activeSec).classList.remove("hidden");
  });
});
//===============================================apod section===============================================
getData(tod());
//===============================================launch section===============================================
getLaunches();
//===============================================Planets section===============================================
getDataPlanets();
//===============================================apod section===============================================
async function getData(date = "") {
  if (isFetch) return;
  isFetch = true;
  let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  loadBtn.disabled = true;
  loadBtn.style.opacity = "0.5";
  loadBtn.innerText = "Loading...";
  imageTitle.innerText = "Loading...";
  imageExplain_.innerText = "Please wait, fetching apod data...";
  imagedate.innerText = "Loading...";
  imageCopyRight.innerText = "";
  mediaType.innerText = "Loading...";
  if (date) url += `&date=${date}`;
  errorMsg.classList.add("hidden");
  loading.classList.remove("hidden");
  displayedImage.classList.add("hidden");
  displayedVideo.classList.add("hidden");
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("error");
    const data = await response.json();
    displayAPOD(data);
  } catch (err) {
    displayedImage.classList.add("hidden");
    displayedVideo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
    imageTitle.innerText = "failed";
    imageExplain_.innerText = "fetching apod data is failed";
    imagedate.innerText = "";
    imageCopyRight.innerText = "";
    mediaType.innerText = "";
  } finally {
    isFetch = false;
    loading.classList.add("hidden");
    loadBtn.disabled = false;
    loadBtn.style.opacity = "1";
    loadBtn.innerText = "Load";
  }
}
function displayAPOD({
  title,
  date,
  explanation,
  url,
  hdurl,
  copyright,
  media_type,
}) {
  imageTitle.innerText = title;
  imagedate.innerText = date;
  let disDate = formattedDate(date);
  astronomyPictureDate.innerText = `Astronomy Picture of the Day -${disDate}`;
  imageExplain_.innerText = explanation;
  if (copyright) {
    // imageCopyRight.innerHTML=`&copy;${copyright}`;
    imageCopyRight.innerText = `© ${copyright}`;
  } else imageCopyRight.innerText = "";
  if (media_type === "image") {
    opac.classList.remove("hidden");
    displayedImage.src = url;
    displayedImage.alt = title;
    displayedImage.classList.remove("hidden");
    displayedVideo.classList.add("hidden");
    displayedVideo.src = "";
    fullResolution.classList.remove("hidden");
    //we want to replace the old by new
    fullResolution.onclick = () => {
      open(hdurl || url, "_blank");
    };
  } else {
    opac.classList.add("hidden");
    displayedImage.classList.add("hidden");
    displayedVideo.classList.remove("hidden");
    displayedVideo.src = url;
    fullResolution.classList.add("hidden");
  }
  imagedateDetails.innerText = date;
  mediaType.innerText = media_type;
}
loadBtn.addEventListener("click", () => {
  getData(dateInput.value);
});
todayBtn.addEventListener("click", () => {
  getData(tod());
});
dateInput.addEventListener("input", (e) => {
  e.target.value === ""
    ? (dateInputDisplayed.innerText = "Select Date")
    : (dateInputDisplayed.innerText = formattedDate(e.target.value));
});
function formattedDate(Yourdate) {
  //we parse our string to object that we will format its info
  const dateObject = new Date(Yourdate);
  return formatting.format(dateObject);
}
function tod() {
  const now = new Date();
  const todayString = now.toISOString().split("T")[0];
  dateInput.value = todayString;
  dateInput.max = todayString;
  dateInputDisplayed.innerText = formattedDate(todayString);
  return todayString;
}
//===============================================launch section===============================================
async function getLaunches() {
  const url = "https://ll.thespacedevs.com/2.3.0/launches/upcoming?limit=10";
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error("Failed to fetch launchesUpcoming data");
    const data = await response.json();
    const specData = data.results;
    console.log(data);
    console.log(specData);
    featured(specData[0]);
    const others = specData.slice(1);
    gridLaunch(others);
  } catch (err) {
    console.log("Error is: ", err);
  }
}

function featured(launch) {
  const dateObj = new Date(launch.net);
  const launchTime = new Date(launch.net).getTime();
  const now = new Date().getTime();
  const duration = launchTime - now;
  const durationDay = Math.floor(duration / (1000 * 60 * 60 * 24));
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  featuredLaunch.innerHTML = `
    <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${launch.status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launch.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launch.launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${launch.rocket.configuration.full_name || launch.rocket.configuration.name} </span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-xl font-bold text-blue-400">${durationDay > 0 ? durationDay + " Day" : "Launched"}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                         Launch Date
                        </p>
                        <p class="font-semibold">${dayName}, ${formatting.format(dateObj)}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                           Launch Time 
                        </p>
                        <p class="font-semibold">${timeFormatter.format(dateObj)}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                       Location
                        </p>
                        <p class="font-semibold text-sm"> ${launch.pad.location?.name || "TBD"}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${launch.pad.country?.name || "Not Found"}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${launch.mission ? launch.mission.description : "No description available for this mission."}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >${
                      launch.image?.image_url
                        ? `<img src="${launch.image?.image_url}" class="w-full h-full object-cover" alt="Rocket">`
                        : `<i class="fas fa-rocket text-9xl text-slate-700/50"></i>`
                    }
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
  `;
}

function gridLaunch(cards) {
  const arrHtml = cards.map((card) => {
    const dateObj = new Date(card.net);
    return `
   <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                ${
                  card.image?.image_url
                    ? `<img src="${card.image.image_url}" class="w-full h-full object-cover" alt="Rocket">`
                    : `<i class="fas fa-space-shuttle text-5xl text-slate-700"></i>`
                }
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${card.status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${card.name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                   ${card.launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formatting.format(dateObj)}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${timeFormatter.format(dateObj)}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${card.rocket.configuration.full_name || card.rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${card.pad.location?.name || "TBD"}
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
  `;
  });
  launchesGrid.innerHTML = arrHtml.join("");
}
//===============================================Planets section===============================================
async function getDataPlanets() {
  const url = "https://solar-system-opendata-proxy.vercel.app/api/planets";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch all planets");
    //obj("bodies"):array of obj
    const data = await response.json();
    console.log(data);
    //we make id the key of obj of planet
    data.bodies.forEach((planet) => {
      const engId = planet.englishName.toLowerCase();
      apiDataPlanets[engId] = planet;
    });
    console.log(apiDataPlanets);
    //info cards!
    planets.forEach((card, index) => {
      const planetId = card.getAttribute("data-planet-id");
      const selectedPlanet = apiDataPlanets[planetId];
      //check
      if (selectedPlanet) {
        const auValue = (selectedPlanet.semimajorAxis / 149597870.7).toFixed(2);
        if (planetAU[index]) planetAU[index].innerText = `${auValue} AU`;
        console.log(selectedPlanet);
        card.addEventListener("click", () => {
          displayPlanetDetails(selectedPlanet);
          //for highlight the target that we click on
          tbody.querySelectorAll("tr").forEach((row) => {
            row.classList.remove("bg-blue-500/5");
          });
          const targetRow = document.getElementById(`id-${planetId}`);
          if (targetRow) targetRow.classList.add("bg-blue-500/5");
        });
      }
    });
    //display it first
    if (apiDataPlanets["earth"]) {
      displayPlanetDetails(apiDataPlanets["earth"]);
    }
    //create rows and columns of the comparison table
    tbody.innerHTML = "";
    for (let planetKey in apiDataPlanets) {
      const planetValue = apiDataPlanets[planetKey];
      const planetMassValue =
        planetValue.mass.massValue *
        Math.pow(10, planetValue.mass.massExponent);
      const orbitalDays = planetValue.sideralOrbit;
      const tr = document.createElement("tr");
      tr.className = "hover:bg-slate-800/30 transition-colors";
      tr.id = `id-${planetKey}`;
      tr.innerHTML = `  <!-- planet -->
                    <td
                      class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10"
                      >
                        <div class="flex items-center space-x-2 md:space-x-3">
                          <div
                            class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
                            style="background-color: ${getPlanetColor(planetKey).color}"
                          ></div>
                          <span
                            class="font-semibold text-sm md:text-base whitespace-nowrap"
                            >${planetValue.englishName}</span
                          >
                        </div>
                      </td>
                      <!-- Distance(AU)==>astronomical unit 149,597,870.7Km=1AU -->
                      <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                      ${(planetValue.semimajorAxis / 149597870.7).toFixed(2)}
                    </td>
                    <!-- Diameter(Km) -->
                    <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${(planetValue.meanRadius * 2).toLocaleString()}
                    </td>
                    <!--Mass(Earth=1)::planetMass/EarthMass 5.97237x10^24 -->
                    <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${(planetMassValue / earthMass).toFixed(2)} 
                    </td>
                    <!-- Orbital Period===Sideral Orbit(earth day in api) 365.25-->
                    <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${orbitalDays < 365 ? orbitalDays + " Days" : (orbitalDays / 365.25).toFixed(1) + " Years"}
                    </td>
                    <!-- Moons-->
                    <td
                        class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap"
                      >
                        ${planetValue.moons ? planetValue.moons.length : "0"}
                    </td>
                    <!-- type-->
                    <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <span
                          style="background-color: ${getPlanetStyles(planetValue.type).bg};border-color: ${getPlanetStyles(planetValue.type).border};color: ${getPlanetStyles(planetValue.type).text}"
                          class="px-2 py-1 rounded text-xs"
                          >${planetValue.type}</span
                        >
                    </td>
  `;
      tbody.appendChild(tr);
    }
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}
function displayPlanetDetails(planet) {
  planetFactsList.innerHTML = "";
  const facts = [
    {
      factName: "Mass",
      value: `${planet.mass.massValue.toFixed(2)} × 10^${planet.mass.massExponent} kg`,
    },
    { factName: "Surface gravity", value: `${planet.gravity.toFixed(2)} m/s²` },
    { factName: "Density", value: `${planet.density.toFixed(2)} g/cm³` },
    { factName: "Axial tilt", value: `${planet.axialTilt.toFixed(2)}°` },
  ];
  if (planet.image) {
    detailImagePlanet.src = planet.image;
    detailImagePlanet.alt = planet.englishName;
  }
  planetBodyType.innerText = planet.type || planet.bodyType;
  detailNamePlanet.innerText = planet.englishName;
  detailDescPlanet.innerText = planet.description;
  semimajorAxis.innerText = planet.semimajorAxis.toLocaleString() + " km";
  meanRadius.innerText = planet.meanRadius.toLocaleString() + " km";
  if (planet.mass)
    mass.innerText = `${planet.mass.massValue.toFixed(2)} x 10^${planet.mass.massExponent} kg`;
  gravity.innerText = planet.gravity + " m/s²";
  density.innerText = planet.density + " g/cm³";
  escapePlanet.innerText = (planet.escape / 1000).toFixed(2) + " km/s";
  orbitalPeriod.innerText = planet.sideralOrbit.toLocaleString() + " days";
  const rotation = planet.sideralRotation;
  rotationPeriod.innerText = `${Math.abs(rotation).toFixed(2)} hours ${rotation < 0 ? "(Retrograde)" : ""}`;
  moons.innerText = planet.moons ? planet.moons.length : "0";
  //k-->C+273.15
  //C=K-273.15-->
  temp.innerText = (planet.avgTemp - 273.15).toFixed(1) + " °C";
  perihelion.innerText = planet.perihelion.toLocaleString() + " km";
  aphelion.innerText = planet.aphelion.toLocaleString() + " km";
  // (Orbital Inclination) Not Ecliptic Plane(!!!مبيخبطوش فى بعض بسببه ==> كل فى فلكه حرفيا)
  inclination.innerText = planet.inclination + "°";
  axialTilt.innerText = planet.axialTilt + "°";
  planetsDiscoverer.innerText = planet.discoveredBy || "Ancient Discovery";
  planetsDiscoveryDate.innerText = planet.discoveryDate || "Unknown";
  if (planet.vol)
    planetVolume.innerText = `${planet.vol.volValue.toFixed(2)} x 10^${planet.vol.volExponent} km³`;

  facts.forEach((fact) => {
    const li = document.createElement("li");
    li.className = "flex items-start";
    li.innerHTML = `<i class="fas fa-check text-green-400 mt-1 mr-2"></i>
    <span class="text-slate-300">${fact.factName}: ${fact.value}</span>`;
    planetFactsList.appendChild(li);
  });
}
function getPlanetColor(id) {
  const planetColors = {
    mercury: { color: "#6B7280" },
    venus: { color: "#FB923C" },
    earth: { color: "#3B82F6" },
    mars: { color: "#EF4444" },
    jupiter: { color: "#FDBA74" },
    saturn: { color: "#facc15" },
    uranus: { color: "#06b6d4" },
    neptune: { color: "#2563eb" },
  };
  return (
    planetColors[id.toLowerCase()] || {
      color: "#29367C",
    }
  );
}
function getPlanetStyles(type) {
  const t = type?.toLowerCase().trim() || "";

  if (t.includes("terrestrial")) {
    return {
      bg: "#8B4F32",
      border: "#FB923C",
      text: "#FB923C",
    };
  }
  if (t.includes("gas")) {
    return {
      bg: "#6240A3",
      border: "#C084FC",
      text: "#C084FC",
    };
  }
  if (t.includes("ice")) {
    return {
      bg: "#2B56A1",
      border: "#60A5FA",
      text: "#60A5FA",
    };
  }
  return {
    bg: "rgba(148, 163, 184, 0.1)",
    border: "rgba(148, 163, 184, 0.2)",
    text: "white",
  };
}
