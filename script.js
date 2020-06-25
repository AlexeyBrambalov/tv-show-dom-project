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

  function createElement(tagName, className, parentElement) {
    const element = document.createElement(tagName)
    element.className = className
    parentElement.appendChild(element)
    return element
}


  function addEpisodes(episode) {
    const divCard = createElement("div", "cardEp", rootElem)   
    const div = createElement("div", "cardTitleEp", divCard)  
    episode.season ? div.innerText = `${episode.name} - ${titleCodeGenerator(episode)}` : div.innerText = `${episode.name}` 

    const imgCard = createElement("img", "cardImgEp", divCard) 
    imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`

    const divCardSummery = createElement("div", "cardSummaryEp", divCard) 
    episode.summary ? divCardSummery.innerText =`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}` : divCardSummery.innerText= "No Summary" 

    const runtime = createElement("div", "runtime", divCard)
    runtime.innerText = "runtime: " + episode.runtime + " min"

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

  const divCard = createElement("div", "card", rootElem)   

  const div = createElement("div", "cardTitle", divCard)   

  if(episode.season){
  div.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
  } else {div.innerText = `${episode.name}`}

  const mainDiv = createElement("div", "mainDiv", divCard)  
  const imgCard = createElement("img", "cardImg", mainDiv)   
  imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`

  const divCardSummery = createElement("div", "cardSummary", mainDiv)  
  divCardSummery.innerText=`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}`

  const genres = createElement("div", "genres", divCard) 
  genres.innerText = "Genres: " + episode.genres.join('; ')

  const status = createElement("div", "status", divCard) 
  status.innerText = "status: " + episode.status

  const rating = createElement("div", "rating", divCard) 
  rating.innerText = "rating: " + episode.rating.average

  const runtime = createElement("div", "runtime", divCard)  


  runtime.innerText = "runtime: " + episode.runtime


    div.addEventListener('click', ()=> {

      let id = episode.id
      rootElem.innerHTML =""
  
      loadEpisodes(id);
      select.value = id
  
    })
}





// SEARCH FIELD 

  input.addEventListener("change", () => {
    rootElem.innerHTML = ''

    arr.filter(search).forEach(episode => {

      if (!episode.genres){
        addEpisodes(episode)
      } else {
        addShows(episode)
      }

    })

    document.querySelectorAll('.cardSummary').forEach(highlight)

    document.querySelectorAll('.cardTitle').forEach(highlight)
    
    pCount.innerText =`${arr.filter(search).length}/${arr.length} episodes`

    function search(episode){
      return episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)
    }
  
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

