const CONFIG = {

DATA_URL: "https://your-github-pages/data.json",

AUTO_PLAY: true,

SPEED: 100,

DEFAULT_YEAR: "2024"

};
async function loadRemoteData(){

let res = await fetch(CONFIG.DATA_URL);
return await res.json();

}
