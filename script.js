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

function addEpisodes(episode){

  // rootElem.innerHTML += `
  //   <div class="card">
  //     <span class="cardTitle">${episode.name} - ${titleCodeGenerator(episode)}</span>
  //     <img class="cardImg" src=${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}>
  //     <div class="cardSummary"><br>${episode.summary}</div>
  //   </div>`

  // SAFER WAY TO PARSE DATA

    let divCard = document.createElement('div')
    divCard.classList.add('card')
    let span = document.createElement('span')
    span.classList.add('cardTitle')
    span.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
    let imgCard = document.createElement('img')
    imgCard.classList.add("cardImg")
    imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`
    let divCardSummery = document.createElement('div')
    divCardSummery.classList.add('cardSummary')
    divCardSummery.innerText=`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}`

    let mainDiv = document.createElement('div')
    mainDiv.classList.add('mainDiv')

    let genres = document.createElement('div')
    genres.classList.add('genres')
    genres.innerText = "Genres: " + episode.genres.join('; ')

    let status = document.createElement('div')
    status.classList.add('status')
    status.innerText = "status: " + episode.status

    let rating = document.createElement('div')
    rating.classList.add('rating')
    rating.innerText = "rating: " + episode.rating.average

    let runtime = document.createElement('div')
    runtime.classList.add('runtime')
    runtime.innerText = "runtime: " + episode.runtime



    
    span.addEventListener('click', ()=> {

      let i = episode.id
      rootElem.innerHTML =""
      async function load1() {
        let url = `https://api.tvmaze.com/shows/${i}/episodes`;
        let obj = await (await fetch(url)).json();
        arr = obj
        console.log(arr);
        
        console.log(arr);
        
        obj.forEach(episode => {
          let divCard = document.createElement('div')
            divCard.classList.add('card')
            let span = document.createElement('span')
            span.classList.add('cardTitle')
            span.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
            let imgCard = document.createElement('img')
            imgCard.classList.add("cardImg")
            imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`
            let divCardSummery = document.createElement('div')
            divCardSummery.classList.add('cardSummary')
            divCardSummery.innerText=`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}`
            let runtime = document.createElement('div')
            runtime.classList.add('runtime')
            runtime.innerText = "runtime: " + episode.runtime
                
            divCard.appendChild(span)
            divCard.appendChild(imgCard)
            divCard.appendChild(divCardSummery)
            divCard.appendChild(runtime)
            rootElem.appendChild(divCard)

            pCount.innerText =`${obj.length}/${obj.length} episodes`

        })
        console.log(obj);
        
        pCount.innerText =`${obj.length}/${obj.length} episodes`
      }

      load1();

    })


    
    divCard.appendChild(span)
    mainDiv.appendChild(imgCard)
    mainDiv.appendChild(divCardSummery)
    divCard.appendChild(mainDiv)
    divCard.appendChild(genres)
    divCard.appendChild(status)
    divCard.appendChild(rating)
    divCard.appendChild(runtime)
    rootElem.appendChild(divCard)
}

//   select values
async function getShowsTitles() 
{
  let response = await fetch("http://api.tvmaze.com/shows");
  let data = await response.json()
  return data;
}
getShowsTitles()
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


//Select field changing options
  
select.addEventListener('change', () => {
  let i = select.value
  rootElem.innerHTML =""
async function load1() {
  let url = `https://api.tvmaze.com/shows/${i}/episodes`;
  let obj = await (await fetch(url)).json();
  obj.forEach(episode => {
    let divCard = document.createElement('div')
      divCard.classList.add('card')
      let span = document.createElement('span')
      span.classList.add('cardTitle')
      span.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
      let imgCard = document.createElement('img')
      imgCard.classList.add("cardImg")
      imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`
      let divCardSummery = document.createElement('div')
      divCardSummery.classList.add('cardSummary')
      divCardSummery.innerText=`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}`
          
      divCard.appendChild(span)
      divCard.appendChild(imgCard)
      divCard.appendChild(divCardSummery)
      rootElem.appendChild(divCard)
      pCount.innerText =`${obj.length}/${obj.length} episodes`

  })
  arr = obj
  
  pCount.innerText =`${obj.length}/${obj.length} episodes`
  }
load1();

})


// SEARCH FIELD 

input.addEventListener("change", () => {
  rootElem.innerHTML = ''
  // async function load() {
  //   let url = `https://api.tvmaze.com/shows/${i}/episodes`;
  //   let obj = await (await fetch(url)).json();
  //   Object.values(obj).filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).forEach(addEpisodes)
  //   pCount.innerText =`${obj.length}/${obj.length} episodes`
  // }
  
  // load();

  arr.filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).forEach(addEpisodes)
  
  pCount.innerText =`${arr.filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).length}/${arr.filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).length} episodes`
  
})



// default movie
let arr = []

async function load() {
  let url = `http://api.tvmaze.com/shows`;
  let obj = await (await fetch(url)).json();
  arr = Array.from(obj) 
  arr.forEach(addEpisodes)
  pCount.innerText =`${obj.length}/${obj.length} episodes`
}

 await load();

console.log(arr);




}
















window.onload = setup;
