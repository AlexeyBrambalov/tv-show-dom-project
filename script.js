//You can edit ALL of the code here
function setup() {
  // const allEpisodes = getAllEpisodes();
  const rootElem = document.getElementById("root");
  const navBar = document.getElementById("navbar")
  const input = document.createElement("input")
  navBar.appendChild(input)
  const pCount = document.createElement("p")
  navBar.appendChild(pCount)
  const select = document.getElementById("select")
 

  
  function titleCodeGenerator(episode){
    let seasonCode = (episode.season < 10) ? '0' + episode.season : episode.season;
    let episodeCode = (episode.number < 10) ? '0' + episode.number : episode.number;
    return `S${seasonCode}E${episodeCode}`;
  }

function addEpisodes(episode){

  rootElem.innerHTML += `
    <div class="card">
      <span class="cardTitle">${episode.name} - ${titleCodeGenerator(episode)}</span>
      <img class="cardImg" src=${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}>
      <div class="cardSummary"><br>${episode.summary}</div>
    </div>`

}


async function getUserAsync() 
{
  let response = await fetch("http://api.tvmaze.com/shows");
  let data = await response.json()
  console.log(data);
  
  return data;
}

getUserAsync()
  .then(data => data.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
}).map(item => {
    option = document.createElement('option');
    option.setAttribute('value', item.id);
    option.appendChild(document.createTextNode(item.name));
    select.appendChild(option)
  })); 
 

  
select.addEventListener('change', () => {
  let i = select.value
  rootElem.innerHTML =""
async function load1() {
  let url = `https://api.tvmaze.com/shows/${i}/episodes`;
  let obj = await (await fetch(url)).json();
  obj.forEach(addEpisodes)
  pCount.innerText =`${obj.length}/${obj.length} episodes`
  }
load1();

})



input.addEventListener("change", () => {
  let i = select.value


  

  rootElem.innerHTML = ''
  async function load() {
    let url = `https://api.tvmaze.com/shows/${i}/episodes`;
    let obj = await (await fetch(url)).json();
    Object.values(obj).filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).forEach(addEpisodes)
    pCount.innerText =`${obj.length}/${obj.length} episodes`
  }
  
  load();
  
})



// default movie

let i = 1

async function load() {
  let url = `https://api.tvmaze.com/shows/${i}/episodes`;
  let obj = await (await fetch(url)).json();
  obj.forEach(addEpisodes)
  pCount.innerText =`${obj.length}/${obj.length} episodes`
}

load();




}
















window.onload = setup;
