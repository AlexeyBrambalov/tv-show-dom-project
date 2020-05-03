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

  // SAFER WAY TO PARSE DATA

    let divCard = document.createElement('div')
    divCard.classList.add('card')
    let div = document.createElement('div')
    div.classList.add('cardTitle')
    div.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
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

      let i = episode.id
      rootElem.innerHTML =""
      async function load1() {
        let url = `https://api.tvmaze.com/shows/${i}/episodes`;
        let obj = await (await fetch(url)).json();
        arr = obj
        
        arr.forEach(episode => {
          let divCard = document.createElement('div')
            divCard.classList.add('card')
            let div = document.createElement('div')
            div.classList.add('cardTitle')
            div.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
            let imgCard = document.createElement('img')
            imgCard.classList.add("cardImg")
            imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`
            let divCardSummery = document.createElement('div')
            divCardSummery.classList.add('cardSummary')
            divCardSummery.innerText=`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}`
            let runtime = document.createElement('div')
            runtime.classList.add('runtime')
            runtime.innerText = "runtime: " + episode.runtime
          
            
                
            divCard.appendChild(div)
            divCard.appendChild(imgCard)
            divCard.appendChild(divCardSummery)
            divCard.appendChild(runtime)
            rootElem.appendChild(divCard)

            pCount.innerText =`${obj.length}/${obj.length} episodes`

        })
        
        pCount.innerText =`${obj.length}/${obj.length} episodes`
      }

      load1();

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

  async function loadSelected() {

    let url = `https://api.tvmaze.com/shows/${i}/episodes`;
    let obj = await (await fetch(url)).json();

    obj.forEach(episode => {
      let divCard = document.createElement('div')
        divCard.classList.add('card')
        let div = document.createElement('div')
        div.classList.add('cardTitle')
        div.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
        let imgCard = document.createElement('img')
        imgCard.classList.add("cardImg")
        imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`
        let divCardSummery = document.createElement('div')
        divCardSummery.classList.add('cardSummary')
        divCardSummery.innerText=`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}`
        let runtime = document.createElement('div')
        runtime.classList.add('runtime')
        runtime.innerText = "runtime: " + episode.runtime
            
        divCard.appendChild(div)
        divCard.appendChild(imgCard)
        divCard.appendChild(divCardSummery)
        divCard.appendChild(runtime)
        rootElem.appendChild(divCard)
        pCount.innerText =`${obj.length}/${obj.length} episodes`

  })
  arr = obj
  
  pCount.innerText =`${obj.length}/${obj.length} episodes`
  }
loadSelected();

})


// SEARCH FIELD 

input.addEventListener("change", () => {
  rootElem.innerHTML = ''


  arr.filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).forEach(episode => {

    if (!episode.genres){
    let divCard = document.createElement('div')
      divCard.classList.add('card')
      let div = document.createElement('div')
      div.classList.add('cardTitle')
      div.innerText = `${episode.name} - ${titleCodeGenerator(episode)}`
      let imgCard = document.createElement('img')
      imgCard.classList.add("cardImg")
      imgCard.src=`${episode.image !== null ? episode.image.medium : "https://www.facultatieve-technologies.com/wp-content/uploads/No-image-200px.png"}`
      let divCardSummery = document.createElement('div')
      divCardSummery.classList.add('cardSummary')
      divCardSummery.innerText=`${episode.summary.replace(/<\/?[^>]+(>|$)/g, "")}`
      let runtime = document.createElement('div')
      runtime.classList.add('runtime')
      runtime.innerText = "runtime: " + episode.runtime
          
      divCard.appendChild(div)
      divCard.appendChild(imgCard)
      divCard.appendChild(divCardSummery)
      divCard.appendChild(runtime)
      rootElem.appendChild(divCard)
      pCount.innerText =`${arr.length}/${arr.length} episodes`
    } else {
      addEpisodes(episode)
    }

  })

 document.querySelectorAll('.cardSummary').forEach( episode => {
  let index = episode.innerHTML.toLowerCase().indexOf(input.value);
  let text = input.value
    if(index >= 0 ){
      let re = new RegExp(text,"gi");
      episode.innerHTML = episode.innerHTML.replace(re, function(match) {
        return `<span>${match}</span>`
    });
    } 
  })

 document.querySelectorAll('.cardTitle').forEach( episode => {
  let html = episode.innerHTML 
  let index = html.toLowerCase().indexOf(input.value);
  let text = input.value
  if(index >= 0){
    let re = new RegExp(text,"gi");
    episode.innerHTML = episode.innerHTML.replace(re, function(match) {
      return `<span>${match}</span>`
  });

    
  }
 })
  
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

}






window.onload = setup;




  // async function load() {
  //   let url = `https://api.tvmaze.com/shows/${i}/episodes`;
  //   let obj = await (await fetch(url)).json();
  //   Object.values(obj).filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).forEach(addEpisodes)
  //   pCount.innerText =`${obj.length}/${obj.length} episodes`
  // }
  
  // load();