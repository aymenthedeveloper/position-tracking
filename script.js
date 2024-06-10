const start = document.querySelector('button.start');
const end = document.querySelector('button.end');
const path = [];


function toRadians (degrees) {degrees * (Math.PI / 180);};
function getCoordinates (position) {
  const {longitude, latitude} = position.coords;
  path.push({longitude, latitude})
};

function calculateDistance(p1, p2) {
  const R = 6371000 // m
  const deltaPhi = toRadians(p2.latitude - p1.latitude);
  const deltaLan = toRadians(p2.longitude - p1.longitude);
  const a = Math.sin(deltaPhi / 2) ** 2 + Math.cos(toRadians(p1.latitude)) * Math.cos(
    toRadians(p2.latitude)) * Math.sin(deltaLan / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(R * c).toFixed(4) || 0;
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
    console.log(path[path.length - 1]);
    getPosition()
    if (endTracking){
      clearInterval(tracking)
      const distance = path.slice().reduce((a,b,i,arr) => {
        if (arr[i+1] === undefined) return 0;
        return calculateDistance(arr[i],arr[i+1])
      });
      console.log(distance);
    };
  }, 3000)
  return path
};
start.addEventListener('click', () => {
  start.style.backgroundColor = '#222';
  end.style.backgroundColor = 'red';
  startTracking();
})
end.addEventListener('click', () => {
  start.style.backgroundColor = 'green';
  end.style.backgroundColor = '#222';
  endTracking = true;
})