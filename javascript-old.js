(function(){
    //global variables - need to find another way?
    let commentDisplay = document.getElementById("comment");
    //impossible and ollie north 180/360 boxes
    let impossibleFlip = document.getElementById("impossible");
    let ollieNorthFlip = document.getElementById("ollieNorth");
    let halfImpossible = document.getElementById("impossibleHalf");
    let fullImpossible = document.getElementById("impossibleFull");
    let halfOllieNorth = document.getElementById("ollieNorthHalf");
    let fullOllieNorth = document.getElementById("ollieNorthFull");
    //for game of skate mode
    const skate = ["S","K","A","T","E"];
    let playYou = [];
    let playAi = [];
    const questionDisplay = document.getElementById("question");
    //for no repeat mode
    let nrCommentDisplay = document.getElementById("thatsAll");
    let nrSeeListDisplay = document.getElementById("seeList");
    let nrLandedDisplay = document.getElementById("nrLanded");
    let landedListDisplay = document.getElementById("landedList");
    let noRepeatTricks = [];
    let noRepeatLanded = 0;
    let noRepeatTried = 0;
    let nrList = '';
    //for marathon mode
    let marathonStreak = document.getElementById("streak");
    let marathonEnding = document.getElementById("marathonEnd");
    let marathonSeeList = document.getElementById("seeMList");
    let marathonStreakNum = 0;
    let marathonList = '';
      
    let checkAll = document.getElementById("selectAll");
    let run = document.getElementById("getTrick");
    let startButton = document.getElementById('startButton');
    let standardMode = document.getElementById("standard");
    let gosMode = document.getElementById("gos");
    let noRepeatMode = document.getElementById("nrMode");
    let marathonMode = document.getElementById("marathon");
      
    //trick library
      function trickLib(trickArr){
      const trickPick = {
        "Regular": {
        "Frontside": {
          "halfBoard": {
            "halfBody": {
              "Kickflip": "Frontside Flip",
              "Heelflip": "Frontside Heelflip",
              "Impossible": "Frontside 180 Impossible",
              "ollieNorth": "Fronstide 180 Ollie North",
              "None": "Frontside 180"
            },
            "noBody": {
              "Kickflip": "Hardflip",
              "Heelflip": "Varial Heelflip",
              "None": "Frontside Shuvit"
            },
          },
          "fullBoard": {
             "halfBody": {
               "Kickflip": "Big Hardflip",
               "Heelflip": "Big Heelflip",
               "None": "Frontside Bigspin"
             },
             "fullBody": {
               "Kickflip": "Frontside 360 Kickflip",
               "Heelflip": "Frontside 360 Heelflip",
               "Impossible": "Frontside 360 Impossible",
               "ollieNorth": "Fronstide 360 Ollie North",
               "None": "Frontside 360"
             },
             "noBody": {
               "Kickflip": "360 Hardflip",
               "Heelflip": "Laserflip",
               "None": "Frontside 360 Shuvit"
             },
          },
        },
        "Backside": {
          "halfBoard": {
            "halfBody": {
              "Kickflip": "Backside Flip",
              "Heelflip": "Backside Heelflip",
              "Impossible": "Backside 180 Impossible",
              "ollieNorth": "Backside 180 Ollie North",
              "None": "Backside 180"
            },
            "noBody": {
              "Kickflip": "Varial Kickflip",
              "Heelflip": "Inward Heelflip",
              "None": "Backside Shuvit"
            },
          },
          "fullBoard": {
             "halfBody": {
               "Kickflip": "Bigflip",
               "Heelflip": "Big Inward Heelflip",
               "None": "Backside Bigspin"
             },
             "fullBody": {
               "Kickflip": "Backside 360 Kickflip",
               "Heelflip": "Backside 360 Heelflip",
               "Impossible": "Backside 360 Impossible",
               "ollieNorth": "Backside 360 Ollie North",
               "None": "Backside 360"
             },
             "noBody": {
               "Kickflip": "360 Flip",
               "Heelflip": "360 Inward Heelflip",
               "None": "Backside 360 Shuvit"
             },
          },
        },
        "nofsbs":{
          "noBoard":{
            "noBody":{
              "Kickflip": "Kickflip",
              "Heelflip": "Heelflip",
              "Impossible": "Impossible",
              "ollieNorth": "Ollie North",
              "None": "Ollie, Seriously?"
            },
          },
        },
      },
        "Nollie": {
          "Frontside": {
          "halfBoard": {
            "halfBody": {
              "Kickflip": "Nollie Frontside Flip",
              "Heelflip": "Nollie Frontside Heelflip",
              "Impossible": "Nollie Frontside 180 Impossible",
              "ollieNorth": "Nollie Fronstide 180 Ollie North",
              "None": "Nollie Frontside 180"
            },
            "noBody": {
              "Kickflip": "Nollie Hardflip",
              "Heelflip": "Nollie Varial Heelflip",
              "None": "Nollie Frontside Shuvit"
            },
          },
          "fullBoard": {
             "halfBody": {
               "Kickflip": "Nollie Big Hardflip",
               "Heelflip": "Nollie Big Heelflip",
               "None": "Nollie Frontside Bigspin"
             },
             "fullBody": {
               "Kickflip": "Nollie Frontside 360 Kickflip",
               "Heelflip": "Nollie Frontside 360 Heelflip",
               "Impossible": "Nollie Frontside 360 Impossible",
               "ollieNorth": "Nollie Fronstide 360 Ollie North",
               "None": "Nollie Frontside 360"
             },
             "noBody": {
               "Kickflip": "Nollie 360 Hardflip",
               "Heelflip": "Nollie Laserflip",
               "None": "Nollie Frontside 360 Shuvit"
             },
          },
        },
        "Backside": {
          "halfBoard": {
            "halfBody": {
              "Kickflip": "Nollie Backside Flip",
              "Heelflip": "Nollie Backside Heelflip",
              "Impossible": "Nollie Backside 180 Impossible",
              "ollieNorth": "Nollie Backside 180 Ollie North",
              "None": "Nollie Backside 180"
            },
            "noBody": {
              "Kickflip": "Nollie Varial Kickflip",
              "Heelflip": "Nollie Inward Heelflip",
              "None": "Nollie Backside Shuvit"
            },
          },
          "fullBoard": {
             "halfBody": {
               "Kickflip": "Nollie Bigflip",
               "Heelflip": "Nollie Big Inward Heelflip",
               "None": "Nollie Backside Bigspin"
             },
             "fullBody": {
               "Kickflip": "Nollie Backside 360 Kickflip",
               "Heelflip": "Nollie Backside 360 Heelflip",
               "Impossible": "Nollie Backside 360 Impossible",
               "ollieNorth": "Nollie Backside 360 Ollie North",
               "None": "Nollie Backside 360"
             },
             "noBody": {
               "Kickflip": "Nollie 360 Flip",
               "Heelflip": "Nollie 360 Inward Heelflip",
               "None": "Nollie Backside 360 Shuvit"
             },
          },
        },
        "nofsbs":{
          "noBoard":{
            "noBody":{
              "Kickflip": "Nollieflip",
              "Heelflip": "Nollie Heelflip",
              "Impossible": "Nollie Impossible",
              "ollieNorth": "Nollie Ollie North",
              "None": "Nollie, Seriously?"
            },
          },
      },
        },
        "Switch": {
          "Frontside": {
          "halfBoard": {
            "halfBody": {
              "Kickflip": "Switch Frontside Flip",
              "Heelflip": "Switch Frontside Heelflip",
              "Impossible": "Switch Frontside 180 Impossible",
              "ollieNorth": "Switch Fronstide 180 Ollie North",
              "None": "Switch Frontside 180"
            },
            "noBody": {
              "Kickflip": "Switch Hardflip",
              "Heelflip": "Switch Varial Heelflip",
              "None": "Switch Frontside Shuvit"
            },
          },
          "fullBoard": {
             "halfBody": {
               "Kickflip": "Switch Big Hardflip",
               "Heelflip": "Switch Big Heelflip",
               "None": "Switch Frontside Bigspin"
             },
             "fullBody": {
               "Kickflip": "Switch Frontside 360 Kickflip",
               "Heelflip": "Switch Frontside 360 Heelflip",
               "Impossible": "Switch Frontside 360 Impossible",
               "ollieNorth": "Switch Fronstide 360 Ollie North",
               "None": "Switch Frontside 360"
             },
             "noBody": {
               "Kickflip": "Switch 360 Hardflip",
               "Heelflip": "Switch Laserflip",
               "None": "Switch Frontside 360 Shuvit"
             },
          },
        },
        "Backside": {
          "halfBoard": {
            "halfBody": {
              "Kickflip": "Switch Backside Flip",
              "Heelflip": "Switch Backside Heelflip",
              "Impossible": "Switch Backside 180 Impossible",
              "ollieNorth": "Switch Backside 180 Ollie North",
              "None": "Switch Backside 180"
            },
            "noBody": {
              "Kickflip": "Switch Varial Kickflip",
              "Heelflip": "Switch Inward Heelflip",
              "None": "Switch Backside Shuvit"
            },
          },
          "fullBoard": {
             "halfBody": {
               "Kickflip": "Switch Bigflip",
               "Heelflip": "Switch Big Inward Heelflip",
               "None": "Switch Backside Bigspin"
             },
             "fullBody": {
               "Kickflip": "Switch Backside 360 Kickflip",
               "Heelflip": "Switch Backside 360 Heelflip",
               "Impossible": "Switch Backside 360 Impossible",
               "ollieNorth": "Switch Backside 360 Ollie North",
               "None": "Switch Backside 360"
             },
             "noBody": {
               "Kickflip": "Switch 360 Flip",
               "Heelflip": "Switch 360 Inward Heelflip",
               "None": "Switch Backside 360 Shuvit"
             },
          },
        },
        "nofsbs":{
          "noBoard":{
            "noBody":{
              "Kickflip": "Switchflip",
              "Heelflip": "Switch Heelflip",
              "Impossible": "Switch Impossible",
              "ollieNorth": "Switch Ollie North",
              "None": "Switch Ollie, Seriously?"
            },
          },
        },
      },
          "Fakie": {
          "Frontside": {
          "halfBoard": {
            "halfBody": {
              "Kickflip": "Fakie Frontside Flip",
              "Heelflip": "Fakie Frontside Heelflip",
              "Impossible": "Fakie Frontside 180 Impossible",
              "ollieNorth": "Fakie Fronstide 180 Ollie North",
              "None": "Fakie Frontside 180"
            },
            "noBody": {
              "Kickflip": "Fakie Hardflip",
              "Heelflip": "Fakie Varial Heelflip",
              "None": "Fakie Frontside Shuvit"
            },
          },
          "fullBoard": {
             "halfBody": {
               "Kickflip": "Fakie Big Hardflip",
               "Heelflip": "Fakie Big Heelflip",
               "None": "Fakie Frontside Bigspin"
             },
             "fullBody": {
               "Kickflip": "Fakie Frontside 360 Kickflip",
               "Heelflip": "Fakie Frontside 360 Heelflip",
               "Impossible": "Fakie Frontside 360 Impossible",
               "ollieNorth": "Fakie Fronstide 360 Ollie North",
               "None": "Fakie Frontside 360"
             },
             "noBody": {
               "Kickflip": "Fakie 360 Hardflip",
               "Heelflip": "Fakie Laserflip",
               "None": "Fakie Frontside 360 Shuvit"
             },
          },
        },
        "Backside": {
          "halfBoard": {
            "halfBody": {
              "Kickflip": "Fakie Backside Flip",
              "Heelflip": "Fakie Backside Heelflip",
              "Impossible": "Fakie Backside 180 Impossible",
              "ollieNorth": "Fakie Backside 180 Ollie North",
              "None": "Fakie Backside 180"
            },
            "noBody": {
              "Kickflip": "Fakie Varial Kickflip",
              "Heelflip": "Fakie Inward Heelflip",
              "None": "Fakie Backside Shuvit"
            },
          },
          "fullBoard": {
             "halfBody": {
               "Kickflip": "Fakie Bigflip",
               "Heelflip": "Fakie Big Inward Heelflip",
               "None": "Fakie Backside Bigspin"
             },
             "fullBody": {
               "Kickflip": "Fakie Backside 360 Kickflip",
               "Heelflip": "Fakie Backside 360 Heelflip",
               "Impossible": "Fakie Backside 360 Impossible",
               "ollieNorth": "Fakie Backside 360 Ollie North",
               "None": "Fakie Backside 360"
             },
             "noBody": {
               "Kickflip": "Fakie 360 Flip",
               "Heelflip": "Fakie 360 Inward Heelflip",
               "None": "Fakie Backside 360 Shuvit"
             },
          },
        },
        "nofsbs":{
          "noBoard":{
            "noBody":{
              "Kickflip": "Fakieflip",
              "Heelflip": "Fakie Heelflip",
              "Impossible": "Fakie Impossible",
              "ollieNorth": "Fakie Ollie North",
              "None": "Fakie Ollie, Seriously?"
            },
          },
        },
       },
      };
        return trickPick[trickArr[0]][trickArr[1]][trickArr[2]][trickArr[3]][trickArr[4]];
      }

    //displays or hides start button
    function startButtonDisplay(x){
        startButton.style.display = x;
    }
  
    //clears the game of skate mode
    function cleargos(){
        let gosDisplayYou = document.getElementById("you");
        let gosDisplayAi = document.getElementById("ai");
        let gosDisplayResults = document.getElementById("results");
        
        while(commentDisplay.firstChild){
          commentDisplay.removeChild(commentDisplay.firstChild);
        }
        while(gosDisplayResults.firstChild){
          gosDisplayResults.removeChild(gosDisplayResults.firstChild);
        }
        while(gosDisplayYou.firstChild){
          gosDisplayYou.removeChild(gosDisplayYou.firstChild);
        }
        while(gosDisplayAi.firstChild){
          gosDisplayAi.removeChild(gosDisplayAi.firstChild);
        } 
        playYou = [];
        playAi = [];
    }
    //clears no repeat mode
    function clearNoRepeatMode(){
      let nrRemainingDisplay = document.getElementById("nrLeft");
      while(nrCommentDisplay.firstChild){
        nrCommentDisplay.removeChild(nrCommentDisplay.firstChild);
      }
      while(nrSeeListDisplay.firstChild){
        nrSeeListDisplay.removeChild(nrSeeListDisplay.firstChild);
      }
      while(nrLandedDisplay.firstChild){
        nrLandedDisplay.removeChild(nrLandedDisplay.firstChild);
      }
      while(nrRemainingDisplay.firstChild){
        nrRemainingDisplay.removeChild(nrRemainingDisplay.firstChild);
      }
      while(landedListDisplay.firstChild){
        landedListDisplay.removeChild(landedListDisplay.firstChild);
      }
      noRepeatTricks = [];
      noRepeatLanded = 0;
      noRepeatTried = 0;
      nrList = '';
    }
    function clearMarathonMode(){
      while(marathonStreak.firstChild){
        marathonStreak.removeChild(marathonStreak.firstChild);
      }
      while(marathonEnding.firstChild){
        marathonEnding.removeChild(marathonEnding.firstChild);
      }
      while(marathonSeeList.firstChild){
        marathonSeeList.removeChild(marathonSeeList.firstChild);
      }
      while(landedListDisplay.firstChild){
        landedListDisplay.removeChild(landedListDisplay.firstChild);
      }
      marathonStreakNum = 0;
      marathonList = '';
    }
    //clears/resets screen based on mode selected
    function showMode(){
     let yesNoDisplay = document.getElementById("question");
     let gosDisplay = document.getElementById("gosHud");
     let nrDisplay = document.getElementById("nrHud");
     let marathonDisplay = document.getElementById("marathonHud");

     run.style.display = standardMode.checked ? 'block' : 'none'
     gosDisplay.style.display = gosMode.checked ? "block" : "none"; 
     standardMode.checked ? startButtonDisplay('none') : startButtonDisplay('block');
     yesNoDisplay.style.display = 'none';
     nrDisplay.style.display = 'none';
     marathonDisplay.style.display = 'none';

     cleargos();
     clearNoRepeatMode();
     clearMarathonMode();
     }
    //checks which mode is selected  
    standardMode.addEventListener("click",function(){
      showMode();
    })
    gosMode.addEventListener("click",function(){
      showMode();
    })
    noRepeatMode.addEventListener("click",function(){
      showMode();
    })
    marathonMode.addEventListener("click",function(){
      showMode();
    })
    //check all boxes on click
    function selectAll(){
      let box = document.getElementsByName("cb");
      for(let a = 0; a < box.length; a++){
        box[a].checked = true;
      }
    //enables impossible/ollie north 180/360 boxes
      halfImpossible.disabled = false;
      fullImpossible.disabled = false;
      halfOllieNorth.disabled = false;
      fullOllieNorth.disabled = false;
    }
      
    checkAll.addEventListener("click",function(){
      selectAll()
    });
    //enable/disable 180/360 impossible/ollie north boxes
      function ableDisableBox(){  
        if(impossibleFlip.checked){
          halfImpossible.disabled = false;
          fullImpossible.disabled = false;
        }
        else{
          halfImpossible.checked = false;
          fullImpossible.checked = false;
          halfImpossible.disabled = true;
          fullImpossible.disabled = true;   
        } 
        if(ollieNorthFlip.checked){
          halfOllieNorth.disabled = false;
          fullOllieNorth.disabled = false;
        }
        else{
          halfOllieNorth.checked = false;
          fullOllieNorth.checked = false;
          halfOllieNorth.disabled = true;
          fullOllieNorth.disabled = true;
        }
      }
      
      impossibleFlip.addEventListener("click",function(){
        ableDisableBox();
      });
      
      ollieNorthFlip.addEventListener("click",function(){
        ableDisableBox();
      });
    //rng for anything using length as max number
      function rngLength(length){
        let rand = Math.floor(Math.random() * length);
        return rand;
      }
      
    //checking which boxes are checked and returning array with each in it
    //stance
      function stanceCheck(){
      let stances = [];
      if(document.getElementById("regular").checked){
        stances.push("Regular");
      }
      if(document.getElementById("nollie").checked){
        stances.push("Nollie");
      }
      if(document.getElementById("switch").checked){
        stances.push("Switch");
      }
      if(document.getElementById("fakie").checked){
        stances.push("Fakie");
      }
        //if nothing was checked
      if(stances.length === 0){
        stances.push("Regular");
      }
        return stances;
      }
    //fsbs
      function fsbsCheck(){
        let fsbss = [];
      if(document.getElementById("frontside").checked){
        fsbss.push("Frontside");
      }
      if(document.getElementById("backside").checked){
        fsbss.push("Backside");
      }
        //if nothing was checked
      if(fsbss.length === 0){
        fsbss.push("nofsbs");
      }
        return fsbss;
      }
    //board rotation
      function boardCheck(){
      let boards = [];
      if(document.getElementById("noBoard").checked){
        boards.push("noBoard");
      }
      if(document.getElementById("halfBoard").checked){
        boards.push("halfBoard");
      }
      if(document.getElementById("fullBoard").checked){
        boards.push("fullBoard");
      }
        //if nothing was checked
      if(boards.length === 0){
        boards.push("noBoard");
      }
        return boards;
      }
    //body rotation
      function bodyCheck(){
      let bodies = [];
      if(document.getElementById("noBody").checked){
        bodies.push("noBody");
      }
      if(document.getElementById("halfBody").checked){
        bodies.push("halfBody");
      }
      if(document.getElementById("fullBody").checked){
        bodies.push("fullBody");
      }
        //if nothing was checked
      if(bodies.length === 0){
        bodies.push("noBody");
      }
        return bodies;
      }
    //flip
      function flipCheck(){
      let flips = [];
      if(document.getElementById("noflip").checked){
        flips.push("None");
      }
      if(document.getElementById("kickflip").checked){
        flips.push("Kickflip");
      }
      if(document.getElementById("heelflip").checked){
        flips.push("Heelflip");
      }
      if(document.getElementById("impossible").checked){
         flips.push("Impossible");
        }
      if(document.getElementById("ollieNorth").checked){
         flips.push("ollieNorth");
       }
        //if nothing was checked
      if(flips.length === 0){
        flips.push("None");
      }
        return flips;
      }
      
    //checks the array input to make sure it can call a trick from trickLib
    //makes changes as needed
      function isItATrick(tricknq){
      let flipAgain = flipCheck();
    //nothing to check for stance
    //board
      if(tricknq[1] === "nofsbs"){
        tricknq[2] = "noBoard";
        tricknq[3] = "noBody";
      }
    //body
    //body cant rotate if board doesnt******for now
      if(tricknq[3] !== "noBody" && tricknq[2] === "noBoard"){
        tricknq[3] = "noBody";
      }
    //body cant rotate more then board******for now
      if(tricknq[3] === "fullBody" && tricknq[2] === "halfBoard"){
        tricknq[3] = "halfBody";
      }
    //fsbs
      if(tricknq[2] === "noBoard" && tricknq[3] === "noBody"){
        tricknq[1] = "nofsbs";
      }
    //flip
    //cant be impossible or ollie north if body and board are not the same
      if(tricknq[2][0] !== tricknq[3][0] && tricknq[4] === "Impossible" || tricknq[2][0] !== tricknq[3][0] && tricknq[4] === "ollieNorth"){
        if(!document.getElementById("noflip").checked){
          tricknq[1] = "nofsbs";
          tricknq[2] = "noBoard";
          tricknq[3] = "noBody";
        }
        else{
        if(flipAgain.length === 1){
          tricknq[4] = "None";
        }
        else{
          let flipNum = rngLength(flipAgain.length);
          tricknq[4] = flipAgain[flipNum];
      //run if trick comes up yet again
          if(tricknq[4] === "Impossible" || tricknq[4] === "ollieNorth"){
            flipAgain.splice(flipNum,1);
            flipNum = rngLength(flipAgain.length);
            tricknq[4] = flipAgain[flipNum];
      //run one last time if other trick comes up
            if(tricknq[4] === "Impossible" || tricknq[4] === "ollieNorth"){
            if(flipAgain.length === 1){
              tricknq[4] === "None";
            }
            else{
            flipAgain.splice(flipNum,1);
            flipNum = rngLength(flipAgain.length);
            tricknq[4] = flipAgain[flipNum];
            }
            }
          }
        }
      }
      }
    //check if impossible/ollie north 180/360 are enabled
      if(tricknq[4] === "Impossible"){
        if(!halfImpossible.checked && tricknq[3] === "halfBody" && tricknq[2] === "halfBoard"|| !fullImpossible.checked && tricknq[3] === "fullBody" && tricknq[2] === "fullBoard"){
          tricknq[3] = "noBody";
          tricknq[2] = "noBoard";
          tricknq[1] = "nofsbs";
        }
      } 
      if(tricknq[4] === "ollieNorth"){
        if(!halfOllieNorth.checked && tricknq[3] === "halfBody" && tricknq[2] === "halfBoard"|| !fullOllieNorth.checked && tricknq[3] === "fullBody" && tricknq[2] === "fullBoard"){
          tricknq[3] = "noBody";
          tricknq[2] = "noBoard";
          tricknq[1] = "nofsbs";
        }
      }
      return tricknq;
    }
      
    //display for trick descriptions and trick name
      function display(showIt){
        let stanceDisplay = document.getElementById("stance");
        let fsbsDisplay = document.getElementById("fsbs");
        let boardDisplay = document.getElementById("board");
        let bodyDisplay = document.getElementById("body");
        let flipDisplay = document.getElementById("flip");
        let trickDisplay = document.getElementById("trick");
     //stance
        stanceDisplay.innerHTML = showIt[0];
     //fsbs
        if(showIt[1] === "nofsbs"){
        fsbsDisplay.innerHTML = "---";
        }
         else{fsbsDisplay.innerHTML = showIt[1]}
     //board
        if(showIt[2] === "halfBoard"){
        boardDisplay.innerHTML = 180;
        }
        else if(showIt[2] === "fullBoard"){
        boardDisplay.innerHTML = 360;
        }
        else{boardDisplay.innerHTML = "No Rotation"}
     //body
        if(showIt[3] === "halfBody"){
        bodyDisplay.innerHTML = 180;
        }
        else if(showIt[3] === "fullBody"){
        bodyDisplay.innerHTML = 360;
        }
        else{bodyDisplay.innerHTML = "No Rotation"}
     //flip
        if(showIt[4] === "ollieNorth"){
        flipDisplay.innerHTML = "Ollie North";
        }
        else{flipDisplay.innerHTML = showIt[4]}
     //trick name
        trickDisplay.innerHTML = trickLib(showIt);
      }
    //********************MODES*****************************
    //creating yes no buttons and question 
      function ynButtons(){
      let buttonYes = document.createElement("button");
      let buttonNo = document.createElement("button");
      
      buttonYes.id = "byes";
      buttonNo.id = "bno";
      buttonYes.textContent = "Yes";
      buttonNo.textContent = "No";
      
    //shows the question div if it was hidden
      questionDisplay.style.display = "block";
      
      questionDisplay.innerHTML = "Did you land it?" + '<br>';
      questionDisplay.appendChild(buttonYes);
      questionDisplay.appendChild(buttonNo);
      }
    
    //*****************Game Of Skate************************
    //end game of skate
    function endgos(){
    //end game results
      if(playAi.length === 5 || playYou.length === 5){
        let resultsDisplay = document.getElementById("results");   
    //removes question and buttons
        questionDisplay.style.display = "none";
    //random win/lose comments - both have same number of comments
        let winComment = ["Cue fireworks and explosions","Congratulations!","All skill no luck, right?","Nice!","Too easy"];
        let loseComment = ["Bummer","They got lucky","They probably cheated","Better luck next time","Was the sun in your eyes?"];
        let randComNum = rngLength(winComment.length);
    //winner
        if(playAi.length === 5){
          resultsDisplay.style.color = "#006400";
          resultsDisplay.innerHTML = "You Win";
          commentDisplay.style.color = "#006400";
          commentDisplay.innerHTML = winComment[randComNum];
        }
    //loser
        else{
          resultsDisplay.style.color = "#8B0000";
          resultsDisplay.innerHTML = "You Lose";
          commentDisplay.style.color = "#8B0000";
          commentDisplay.innerHTML = loseComment[randComNum];
        }
      }   
    } 
    //trick landed 
    function gosYes(){
    //update and display results
      let aiDisplay = document.getElementById("ai");
      playAi.push(skate[playAi.length]);
      aiDisplay.innerHTML = playAi.join("");
      endgos();
    }
    //trick not landed 
    function gosNo(){
      //update and display results
      let youDisplay = document.getElementById("you");
      playYou.push(skate[playYou.length]);
      youDisplay.innerHTML = playYou.join("");
      endgos();
    }
      
    function gameOSkate(){
    //unhide you and them
      let showYou = document.getElementById("youText");
      let showAi = document.getElementById("aiText");
      showYou.style.display = "block";
      showAi.style.display = "block";
      
      let gosClickYes = document.getElementById("byes");
      let gosClickNo = document.getElementById("bno");
      
      gosClickYes.addEventListener("click",function(){
        gosYes()
      });
      gosClickNo.addEventListener("click",function(){
        gosNo()
      });
    }

    //*************************No Repeat**************************
    //global variable for no repeat mode* find a better way?
      let nrTrickName = [];
    //end of no repeat mode
      function endNoRepeat(){
        if (!noRepeatTricks.length){
    //hide yes/no buttons and question
        questionDisplay.style.display = "none";
    //display start button
        startButtonDisplay('block');
    //display no repeat end comment
        nrCommentDisplay.style.display = "block";
        nrSeeListDisplay.style.display = "block";
        nrCommentDisplay.innerHTML = "That's all of them";
        nrSeeListDisplay.innerHTML = "See list below";
    //reset everything
        noRepeatLanded = 0;
        noRepeatTried = 0;
        nrList = '';
        }
      }
    //trick landed
      function nrYes(){
        noRepeatLanded++;
        noRepeatTried++;
        nrLandedDisplay.innerHTML = noRepeatLanded + "/" + noRepeatTried;
    //display trick as landed
        let landedYesDisplay = nrList += '<span class="green">'+trickLib(nrTrickName)+'&nbsp - &nbsp </span>';
        landedListDisplay.innerHTML = landedYesDisplay;
      }
    //trick not landed
      function nrNo(){
        noRepeatTried++;
        nrLandedDisplay.innerHTML = noRepeatLanded + "/" + noRepeatTried;
    //display trick as not landed
        let landedNoDisplay = nrList += '<span class="red">'+trickLib(nrTrickName)+'&nbsp - &nbsp </span>';
        landedListDisplay.innerHTML = landedNoDisplay;
      }

      function noRepeat(){
    //hide end game comments if showing
        nrCommentDisplay.style.display = "none";
        nrSeeListDisplay.style.display = "none";
    //resets displays if a game just ended
        if(!noRepeatTried){
        nrLandedDisplay.innerHTML = noRepeatLanded + "/" + noRepeatTried;
        landedListDisplay.innerHTML = nrList;
        }
        //gathering all arrays from checked boxes and making one big array
        let stanceArr = stanceCheck();
        let fsbsArr = fsbsCheck();
        let boardArr = boardCheck();
        let bodyArr = bodyCheck();
        let flipArr = flipCheck();
        let trickArr = [stanceArr,fsbsArr,boardArr,bodyArr,flipArr];
    //only find trick combos if the trick array is empty
        if(noRepeatTricks.length === 0){
    //array of each trick name
        let trickNameArr = [];
    //finding every possible trick combination   
        for(let a = 0; a < stanceArr.length; a++){
          for(let b = 0; b < fsbsArr.length; b++){
            for(let c = 0; c < boardArr.length; c++){
              for(let d = 0; d < bodyArr.length; d++){
                for(let e = 0; e < flipArr.length; e++){
    //initial trick combination
                  let roughTrick = [trickArr[0][a],trickArr[1][b],trickArr[2][c],trickArr[3][d],trickArr[4][e]];
    //run through a check to make changes if needed            
                  let cleanTrick = isItATrick(roughTrick);
    //get trick name to add to the check list            
                  let trickName = trickLib(cleanTrick);
    //check if the trick is a repeat or not          
                  if(!trickNameArr.length || trickNameArr.every(x => x !== trickName)){
                    trickNameArr.push(trickName);
                    noRepeatTricks.push(cleanTrick);
                  }
                }
              }
            }
          }  
        }
        }

        let tricksLeftDisplay = document.getElementById("nrLeft");
        let nrHudDisplay = document.getElementById("nrHud");
    //unhide display
        nrHudDisplay.style.display = "block";
    //select and display random trick from array
        let nrNum = rngLength(noRepeatTricks.length);
        let nrRandomTrick = noRepeatTricks[nrNum];
        nrTrickName = nrRandomTrick;
        display(nrRandomTrick);
    //remove selected trick from array 
        noRepeatTricks.splice(nrNum,1);
    //display number of remaining tricks    
        tricksLeftDisplay.innerHTML = noRepeatTricks.length;
      }
      
    //*************************Marathon**************************
    //global variables for marathon mode
      let marathonTrick = [];
      let marathonBestStreakNum = 0;
      
      function marathonYes(){
        marathonStreakNum++;
        marathonStreak.innerHTML = marathonStreakNum;
        landedListDisplay.innerHTML = marathonList += '<span>'+trickLib(marathonTrick)+'&nbsp - &nbsp </span>'; 
      }
      
      function marathonNo(){
        let marathonBestStreak = document.getElementById("bestStreak");
        questionDisplay.style.display = "none";
        marathonSeeList.style.display = "block";
        marathonEnding.style.display = "block";
        marathonEnding.innerHTML = "The End";
        marathonSeeList.innerHTML = "See list below";
        if (marathonStreakNum > marathonBestStreakNum){
          marathonBestStreakNum = marathonStreakNum;
          marathonBestStreak.innerHTML = marathonBestStreakNum;
          marathonEnding.innerHTML = "New Best Streak!"
        }
        startButtonDisplay('block');
        marathonStreakNum = 0;
        marathonList = '';  
      }
      
      function marathon(){
    //display marthon hud
        let marathonDisplay = document.getElementById("marathonHud");
        marathonDisplay.style.display = 'block';
    //hide ending if it's showing
        marathonSeeList.style.display = "none";
        marathonEnding.style.display = "none";
        if(!marathonStreakNum){
         marathonStreak.innerHTML = marathonStreakNum;
         landedListDisplay.innerHTML = marathonList;
        } 
      }
      
    //*******************get a trick & standard game*********************************
    function getTrick(){
      //*********************STANCE**************************
      let stanceTag = "";
      let stanceArray = stanceCheck();
    //rng for stance
      let stanceNum = rngLength(stanceArray.length);
      stanceTag = stanceArray[stanceNum];
        
      //*******************FS/BS***************************
      let fsbsTag = "";
      let fsbsArray = fsbsCheck();
    //rng for fs or bs
      let fsbsNum = rngLength(fsbsArray.length);
      fsbsTag = fsbsArray[fsbsNum];
        
      //*****************Board Rotation*********************
      let boardTag = "";
      let boardArray = boardCheck();
    //rng for board rotation
      let boardNum = rngLength(boardArray.length);
      boardTag = boardArray[boardNum];
      
       //******************Body Rotation**********************
      let bodyTag = "";
      let bodyArray = bodyCheck();
    //rng for body rotation
      let bodyNum = rngLength(bodyArray.length);
      bodyTag = bodyArray[bodyNum];
    
      //*********************FLIP******************************
      let flipTag = "";
      let flipArray = flipCheck();
    //rng for flip
      let flipNum = rngLength(flipArray.length);
      flipTag = flipArray[flipNum];
     
      //****************Attempts************************
      let attemptsMax = document.getElementById("attempts").value;
      let attemptsDisplay = document.getElementById("tries");
      if(!/[^0-9]/.test(attemptsMax)){
        if(attemptsMax > 10){
          attemptsDisplay.innerHTML = "Max attempts is limited to 1-10";
        }
        else if(attemptsMax < 1){attemptsDisplay.innerHTML = "---"}
        else{attemptsDisplay.innerHTML = Math.floor(Math.random() * attemptsMax) + 1;}
        }
      else{attemptsDisplay.innerHTML = "---";}
      
      //**********************TRICK***********************
    //set and display trick
      let theTrick = [stanceTag,fsbsTag,boardTag,bodyTag,flipTag];
      isItATrick(theTrick);
      display(theTrick);
    //run game of skate mode
      if(document.getElementById("gos").checked){
        gameOSkate()
      }
    //run no repeat mode
      if(document.getElementById("nrMode").checked){
        noRepeat()
      } 
    //run marathon mode
      if(document.getElementById("marathon").checked){
        marathonTrick = theTrick;
        marathon()
      }
    }

    //checks mode and dictates what yes/no buttons will do
    function ynButtonsEvent(){
      let byes = document.getElementById('byes');
      let bno = document.getElementById('bno');
      //yes button
      byes.addEventListener('click',function(){
        if (document.getElementById('nrMode').checked){
          nrYes();
          noRepeatTricks.length ? getTrick() : endNoRepeat();
        }
        if (document.getElementById('marathon').checked){
          marathonYes();
          getTrick();
        }
      })
      //no button
      bno.addEventListener('click',function(){
        if (document.getElementById('nrMode').checked){
          nrNo();
          noRepeatTricks.length ? getTrick() : endNoRepeat();
        }
        if (document.getElementById('marathon').checked){
          marathonNo();
        }
      })
    }
    

    //start game/roll trick/display ynButtons/hide start button
    startButton.addEventListener('click',function(){
      startButtonDisplay('none');
      ynButtons();
      getTrick();
      ynButtonsEvent();
    })

    //run get trick function on click
    run.addEventListener("click",function(){
      getTrick();
    //clears game of skate score and results  
      if(playYou.length === 5 || playAi.length === 5){
        cleargos();
      }
    });
      
    })();//the end
    
    
    
    
