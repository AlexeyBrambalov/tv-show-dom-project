//You can edit ALL of the code here
async function  setup() {
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


  function addEpisodes(episode) {

    let divCard = document.createElement('div')
    divCard.classList.add('cardEp')
    let div = document.createElement('div')
    div.classList.add('cardTitleEp')

    episode.season ? div.innerText = `${episode.name} - ${titleCodeGenerator(episode)}` : div.innerText = `${episode.name}`

    let imgCard = document.createElement('img')
    imgCard.classList.add("cardImgEp")

    imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`

    let divCardSummery = document.createElement('div')
    divCardSummery.classList.add('cardSummaryEp')
    episode.summary ? divCardSummery.innerText =`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}` : divCardSummery.innerText= "No Summary" 

    let runtime = document.createElement('div')
    runtime.classList.add('runtime')
    runtime.innerText = "runtime: " + episode.runtime + " min"
        
    divCard.appendChild(div)
    divCard.appendChild(imgCard)
    divCard.appendChild(divCardSummery)
    divCard.appendChild(runtime)

    rootElem.appendChild(divCard)

    pCount.innerText =`${arr.length}/${arr.length} episodes`
  }

  async function loadEpisodes(id) {
    let url = `https://api.tvmaze.com/shows/${id}/episodes`;
    let obj = await (await fetch(url)).json();
    episodes = obj
    
    episodes.forEach(addEpisodes)
    
    pCount.innerText =`${episodes.length}/${episodes.length} episodes`
  }




  
  //Select field changing options
    
  select.addEventListener('change', () => {

    if(select.value == "allepisodes"){
      rootElem.innerHTML =""
      arr.forEach(addShows)
      pCount.innerText =`${arr.length}/${arr.length} episodes`
    } else {

    let id = select.value
    rootElem.innerHTML =""

    loadEpisodes(id);
    }

  })


function addShows(episode){

  let divCard = document.createElement('div')
  divCard.classList.add('card')
  let div = document.createElement('div')
  div.classList.add('cardTitle')
  if(episode.season){
  div.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
  } else {div.innerText = `${episode.name}`}
  let imgCard = document.createElement('img')
  imgCard.classList.add("cardImg")
  imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`
  let divCardSummery = document.createElement('div')
  divCardSummery.classList.add('cardSummary')
  divCardSummery.innerText=`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}`

  let mainDiv = document.createElement('div')
  mainDiv.classList.add('mainDiv')

  let runtime = document.createElement('div')
  runtime.classList.add('runtime')
  runtime.innerText = "runtime: " + episode.runtime

  let genres = document.createElement('div')
  genres.classList.add('genres')
  genres.innerText = "Genres: " + episode.genres.join('; ')

  let status = document.createElement('div')
  status.classList.add('status')
  status.innerText = "status: " + episode.status

  let rating = document.createElement('div')
  rating.classList.add('rating')
  rating.innerText = "rating: " + episode.rating.average

  div.addEventListener('click', ()=> {

    let id = episode.id
    rootElem.innerHTML =""

    loadEpisodes(id);
    select.value = id

  })


    
    
    divCard.appendChild(div)
    mainDiv.appendChild(imgCard)
    mainDiv.appendChild(divCardSummery)
    divCard.appendChild(mainDiv)
    divCard.appendChild(genres)
    divCard.appendChild(status)
    divCard.appendChild(rating)
    divCard.appendChild(runtime)




    rootElem.appendChild(divCard)
}





// SEARCH FIELD 

input.addEventListener("change", () => {
  rootElem.innerHTML = ''

  arr.filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).forEach(episode => {

    if (!episode.genres){
      addEpisodes(episode)
    } else {
      addShows(episode)
    }

  })

  document.querySelectorAll('.cardSummary').forEach(highlight)

  document.querySelectorAll('.cardTitle').forEach(highlight)
  
  pCount.innerText =`${arr.filter(search).length}/${arr.filter(search).length} episodes`

  function search(episode){episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)}
  
})

function highlight(episode){
  let html = episode.innerHTML 
  let index = html.toLowerCase().indexOf(input.value);
  let text = input.value
    if(index >= 0){
      let re = new RegExp(text,"gi");
      episode.innerHTML = episode.innerHTML.replace(re, function(match) {
        return `<span>${match}</span>`
    });
  }
 }




// default movie
let arr = []

async function loadShowlist() {
  let url = `http://api.tvmaze.com/shows`;
  let obj = await (await fetch(url)).json();
  arr = Array.from(obj) 
  arr.forEach(addShows)
  pCount.innerText =`${arr.length}/${arr.length} episodes`
}
 await loadShowlist();

 //Select list


 let newArr = arr
 let sortedArr = [{id: "allepisodes", name: "All episodes"}, ...newArr.sort(SortByName)]
 
 sortedArr.map(fillSelectList)



function SortByName(a, b){
  if(a.name < b.name) { return -1; }
  if(a.name > b.name) { return 1; }
  return 0;
}

function fillSelectList (item){
  option = document.createElement('option');
  option.setAttribute('value', item.id);
  option.appendChild(document.createTextNode(item.name));
  select.appendChild(option)
}


}






window.onload = setup;

