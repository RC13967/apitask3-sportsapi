//creates page number buttons
function pagination (startidx){
  const pagediv =  document.createElement("div");
  pagediv.className = "page-div";
  const firstpage = document.createElement("button");
  firstpage.innerHTML = "first";
  pagediv.append(firstpage);
  firstpage.onclick = function(){
     document.querySelector(".page-div").remove();  //removes existing page number buttons
       document.querySelector(".sport-list").remove() //removes existing data in the page
    pagination(0); 
    getsports(); //loads data of first page
  }
  //creating button numbers
  for (let i = +startidx;i< +startidx +10;i++){
    const pagebutton = document.createElement("button");
    pagebutton.className= "page-button"
    pagebutton.innerHTML = i;
   if(i==startidx){
     pagebutton.setAttribute("class","clickedpagebutton"); /*making the first button of every page actives
     (this loads data of first button in each page)*/
   }
    pagediv.append(pagebutton);
    pagebutton.onclick = function (){
      //removes class for previously clicked button
       document.querySelector(".clickedpagebutton").removeAttribute("class"); 
       //assigns class for newly clicked button(this changes button color whenever it is clicked)
      pagebutton.setAttribute("class","clickedpagebutton");
      document.querySelector(".sport-list").remove(); //removes existing data in the page
      localStorage.setItem("clickedpage",i)
      getsports(); //gets data from api
    }
    
  }
  const nextbutton = document.createElement("button");
  //creates label for the button as numbers ranging from first button to last button
  nextbutton.innerHTML = `${+startidx + 10}-${+startidx + 19}`; 
  pagediv.append(nextbutton);
  nextbutton.onclick = function () {
    localStorage.setItem("currentindex",startidx); //stores the number of first button in local storage()
    nextitems();   //changes button numbers(increases by 10)
  }
 document.body.append(pagediv);
 }

 function nextitems(){
  var currentindex = localStorage.getItem("currentindex");  
    document.querySelector(".page-div").remove();  //removes existing buttons
      document.querySelector(".sport-list").remove(); //removes existing data in the page
  pagination(+currentindex + 10); //creating new buttons with numbers increased by 10
    getsports(); //gets new data from api
}

 //gets the data from api
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
    startidx = localStorage.getItem("clickedpage");  //gets the index of first button from local storage
    // sets the first button value to zero if it is run for the first time(else, data cant be loaded without start index)
    if(startidx ==null){startidx = 0}  
    for(let i=startidx;i< +startidx + 10;i++){
        arr.push(sportjson[i]) ;      //stores the first 10 data values in an array(with the help of start index)
 }
 loadsports(arr);  //loads data in the page

  }

  catch{
    alert("check your internet");  //alerts the user if fetch fails
  }
  
}
//loading the data in the page         
  function loadsports(sports) {
      const sportList = document.createElement("div");
      sportList.className = "sport-list";
      sports.forEach((sport) => {
        //loads the required data for each match
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

 
  
