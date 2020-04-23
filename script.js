//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  const rootElem = document.getElementById("root");
  const navBar = document.getElementById("navbar")

  
  const input = document.createElement("input")
  navBar.appendChild(input)

  const pCount = document.createElement("p")
  navBar.appendChild(pCount)
  pCount.innerText=`${allEpisodes.length}/73 episodes`

  const select = document.getElementById("select")
 
 

  let episodeTitles = allEpisodes.map(episode => episode = `${episode.name} - ${titleCodeGenerator(episode)}` )

  for (let i=0 ; i < episodeTitles.length; i++) {
    option = document.createElement('option');
    option.setAttribute('value', episodeTitles[i]);
    option.appendChild(document.createTextNode(episodeTitles[i]));
    select.appendChild(option);
  }



 console.log(select.value);
 
select.addEventListener('change', () => {
  allEpisodes.filter(episode => `${episode.name} - ${titleCodeGenerator(episode)}` == select.value ).forEach(episode => {
        
    rootElem.innerHTML = `
    <div class="card">
      <span class="cardTitle">${episode.name} - ${titleCodeGenerator(episode)}</span>
      <img class="cardImg" src=${episode.image.medium}>
      <div class="cardSummary"><br>${episode.summary}</div>
    </div>`    
  });

  pCount.innerText =`1/73 episodes`
  
})
  
  function titleCodeGenerator(episode){
    let seasonCode = (episode.season < 10) ? '0' + episode.season : episode.season;
    let episodeCode = (episode.number < 10) ? '0' + episode.number : episode.number;
    return `S${seasonCode}E${episodeCode}`;
  }

 

  input.addEventListener("change", () => {
    rootElem.innerHTML = ''

    allEpisodes.filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).forEach(episode => {
      
        rootElem.innerHTML += `
        <div class="card">
          <span class="cardTitle">${episode.name} - ${titleCodeGenerator(episode)}</span>
          <img class="cardImg" src=${episode.image.medium}>
          <div class="cardSummary"><br>${episode.summary}</div>
        </div>`    
      });
      pCount.innerText = `${allEpisodes.filter(episode => episode.name.toLowerCase().includes(input.value) ||  episode.summary.toLowerCase().includes(input.value)).length}/73 episodes`
      
  })



  allEpisodes.forEach(episode => { 
    rootElem.innerHTML += `
    <div class="card">
      <span class="cardTitle">${episode.name} - ${titleCodeGenerator(episode)}</span>
      <img class="cardImg" src=${episode.image.medium}>
      <div class="cardSummary"><br>${episode.summary}</div>
    </div>`    
  });
}
















window.onload = setup;
