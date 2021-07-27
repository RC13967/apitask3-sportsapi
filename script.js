function pagination (startidx){
  const pagediv =  document.createElement("div");
  pagediv.className = "page-div";
  const firstpage = document.createElement("button");
  firstpage.innerHTML = "first";
  pagediv.append(firstpage);
  firstpage.onclick = function(){
     document.querySelector(".page-div").remove();
       document.querySelector(".sport-list").remove()
    pagination(0);
    getsports();
  }
  for (let i = +startidx;i< +startidx +10;i++){
    const pagebutton = document.createElement("button");
    pagebutton.className= "page-button"
    pagebutton.innerHTML = i;
   if(i==startidx){
     pagebutton.setAttribute("class","clickedpagebutton");
   }
    pagediv.append(pagebutton);
    pagebutton.onclick = function (){
       document.querySelector(".clickedpagebutton").removeAttribute("class");
      pagebutton.setAttribute("class","clickedpagebutton");
      document.querySelector(".sport-list").remove();
      localStorage.setItem("clickedpage",i)
      getsports();
    }
    
  }
  const nextbutton = document.createElement("button");
  nextbutton.innerHTML = `${+startidx + 10}-${+startidx + 19}`;
  pagediv.append(nextbutton);
  nextbutton.onclick = function () {
    localStorage.setItem("currentindex",startidx);
    nextitems();
    
  }
 
  
 document.body.append(pagediv);
 }

 function nextitems(){
  var currentindex = localStorage.getItem("currentindex");
    document.querySelector(".page-div").remove();
      document.querySelector(".sport-list").remove();
  pagination(+currentindex + 10);
    getsports();
  

}
  
  
            
  function loadsports(sports) {
      const sportList = document.createElement("div");
      sportList.className = "sport-list";
      sports.forEach((sport) => {
        const sportContainer = document.createElement("div");
        sportContainer.className = "sport-container";
        sportContainer.innerHTML = `
        <div class="sport-title">${sport.competition.name} </div>
        <a class="sport-side-url" href = "${sport.side1.url}">${sport.side1.name}</a> Vs
        <a class="sport-side-url" href = "${sport.side2.url}">${sport.side2.name}</a>
        <div class="sport-date" >${new Date(sport.date).toDateString()}</div>
        <a class="sport-scoreboard" href = "${sport.competition.url}">score board</a>
        <a class="sport-livestream" href = "${sport.url}">livestream</a>
        <div class="sport-status">status : ${sport.videos[0].title}</div>
        
        <div class="sport-video">${sport.embed}</div>
        `;
    
        sportList.append(sportContainer);
      });
    
      document.body.append(sportList);
    }
    
    
    
    async function getsports() {
      
      
        
      const data = await fetch(
        "https://www.scorebat.com/video-api/v1/",
        {
          method: "GET"
        }
      );
      try {
        const sportjson = await data.json();
        let arr =[];
        startidx = localStorage.getItem("clickedpage");
        if(startidx ==null){startidx = 0}
        for(let i=startidx;i< +startidx + 10;i++){
            arr.push(sportjson[i])
     }
     loadsports(arr);

      }

      catch{
        alert("check your internet");
      }
      
    }
  
