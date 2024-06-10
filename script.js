const start = document.querySelector('button.start');
const end = document.querySelector('button.end');

const i = { 'lan': 3.109384, 'lat': 36.737495 };
const j = { 'lan': 3.104750, 'lat': 36.732378 };
const path = [];
const dist = 0;

const toRadians = degrees => degrees * (Math.PI / 180);
const getCoordinates = position => {
  const {longitude, latitude} = position.coords;
  path.push({longitude, latitude})
};

function calculateDistance(p1, p2) {
  const R = 6371000 // m
  const deltaPhi = toRadians(j.lat - i.lat);
  const deltaLan = toRadians(j.lan - i.lan);
  const a = Math.sin(deltaPhi / 2) ** 2 + Math.cos(toRadians(i.lat)) * Math.cos(
    toRadians(j.lat)) * Math.sin(deltaLan / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(4)
}

function getPosition() {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(getCoordinates);
  } else alert("Geolocation is not supported by this browser.");
};

let endTracking = false;

function startTracking() {
  getPosition(); // to get starting point
  const tracking = setInterval(() => {
    getPosition()
    endTracking++
    if (endTracking){
      clearInterval(tracking)
      const distance = path.reduce((a,b,i,arr) => {
        if (arr[i+1] === undefined) return 0;
        return calculateDistance(arr[i],arr[i+1])
      });
      dist = distance.reduce((a,b) => a+b);
      console.log(dist);
    };
  }, 4000)
  return path
};
start.addEventListener('click', () => {
  startTracking();
})
end.addEventListener('click', () => {
  endTracking = true;
})