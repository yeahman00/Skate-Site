(function(){

  //global variables - need to find another way?
  let commentDisplay = document.getElementById("comment");
  const questionDisplay = document.getElementById("question");

  //for game of skate mode
  const numPlayersSelect = document.getElementById('numPlayersSelect');
  const gosPlayers = document.getElementById('gosPlayers');
  const difficulty = document.getElementById('difficulty');
  const aiLandedComment = document.getElementById('aiLandedComment');
  const okButton = document.getElementById('okButton');
  const numPlayers = document.getElementById('numPlayers')
  let soloGame = true;
  let playerNamesArr = [];
  const skate = ["S","K","A","T","E"];
  let playYou = [];
  let playAi = [];
  let p1 = [];
  let p2 = [];
  let p3 = [];
  let p4 = [];
  let p5 = [];
  let p6 = [];
  const player1Score = document.getElementById('player1Score');
  const player2Score= document.getElementById('player2Score');
  const player3Score = document.getElementById('player3Score');
  const player4Score = document.getElementById('player4Score');
  const player5Score = document.getElementById('player5Score');
  const player6Score = document.getElementById('player6Score');
  const player1Button = document.getElementById('player1Button');
  const player2Button = document.getElementById('player2Button');
  const player3Button = document.getElementById('player3Button');
  const player4Button = document.getElementById('player4Button');
  const player5Button = document.getElementById('player5Button');
  const player6Button = document.getElementById('player6Button');

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
  let soloButton = document.getElementById('gosSolo');
  let multiPlayer = document.getElementById('gosMultiplayer');

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
            "ollieNorth": "Frontside 180 Ollie North",
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
             "ollieNorth": "Frontside 360 Ollie North",
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
            "ollieNorth": "Nollie Frontside 180 Ollie North",
            "None": "Nollie Frontside 180"
          },
          "noBody": {
            "Kickflip": "Nollie Varial Kickflip",
            "Heelflip": "Nollie Inward Heelflip",
            "None": "Nollie Frontside Shuvit"
          },
        },
        "fullBoard": {
           "halfBody": {
             "Kickflip": "Nollie Bigflip",
             "Heelflip": "Nollie Big Inward Heelflip",
             "None": "Nollie Frontside Bigspin"
           },
           "fullBody": {
             "Kickflip": "Nollie Frontside 360 Kickflip",
             "Heelflip": "Nollie Frontside 360 Heelflip",
             "Impossible": "Nollie Frontside 360 Impossible",
             "ollieNorth": "Nollie Frontside 360 Ollie North",
             "None": "Nollie Frontside 360"
           },
           "noBody": {
             "Kickflip": "Nollie 360 Flip",
             "Heelflip": "Nollie 360 Inward Heelflip",
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
            "Kickflip": "Nollie Hardflip",
            "Heelflip": "Nollie Varial Heelflip",
            "None": "Nollie Backside Shuvit"
          },
        },
        "fullBoard": {
           "halfBody": {
             "Kickflip": "Nollie Big Hardflip",
             "Heelflip": "Nollie Big Heelflip",
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
             "Kickflip": "Nollie 360 Hardflip",
             "Heelflip": "Nollie Laserflip",
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
            "ollieNorth": "Switch Frontside 180 Ollie North",
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
             "ollieNorth": "Switch Frontside 360 Ollie North",
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
            "ollieNorth": "Fakie Frontside 180 Ollie North",
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
             "ollieNorth": "Fakie Frontside 360 Ollie North",
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
  //set odds of ai landing trick
    function difficultySettings(arr){
  //0-99 0 being 1% chance and 99 being 100%
     const trickOdds = {
      //regular
      'Ollie, Seriously?': {
          'Easy': 99,
          'Medium': 99,
          'Hard': 99,
          'Pro': 99
      },
      'Backside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98
      },
      'Frontside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98
      },
      'Backside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Frontside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Backside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98
      },
      'Frontside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98
      },
      'Backside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Frontside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Backside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Frontside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Kickflip': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 84,
          'Pro': 94
      },
      'Heelflip': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 84,
          'Pro': 94
      },
      'Varial Kickflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Varial Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Hardflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89
      },
      'Inward Heelflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89
      },
      '360 Flip': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      '360 Hardflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      '360 Inward Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Laserflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 79
      },
      'Bigflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Big Heelflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Big Hardflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Big Inward Heelflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Backside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Backside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Frontside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Frontside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Backside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Backside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Frontside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Frontside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Ollie North': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 79,
          'Pro': 89
      },
      'Backside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Frontside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Backside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Frontside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Impossible': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Backside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Frontside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Backside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Frontside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      //nollie
      'Nollie, Seriously?': {
          'Easy': 99,
          'Medium': 99,
          'Hard': 99,
          'Pro': 99
      },
      'Nollie Backside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98
      },
      'Nollie Frontside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98
      },
      'Nollie Backside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie Frontside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie Backside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98
      },
      'Nollie Frontside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98
      },
      'Nollie Backside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie Frontside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie Backside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie Frontside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollieflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94
      },
      'Nollie Heelflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94
      },
      'Nollie Varial Kickflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie Varial Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie Hardflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie Inward Heelflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie 360 Flip': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie 360 Hardflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie 360 Inward Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Laserflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 79
      },
      'Nollie Bigflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie Big Heelflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie Big Hardflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Big Inward Heelflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Backside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie Backside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie Frontside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie Frontside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie Backside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Backside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Frontside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Frontside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Ollie North': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 79,
          'Pro': 89
      },
      'Nollie Backside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Frontside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Backside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Nollie Frontside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Nollie Impossible': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Nollie Backside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Frontside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Nollie Backside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Nollie Frontside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      //switch
      'Switch Ollie, Seriously?': {
          'Easy': 99,
          'Medium': 99,
          'Hard': 99,
          'Pro': 99
      },
      'Switch Backside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98
      },
      'Switch Frontside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98
      },
      'Switch Backside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Switch Frontside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Switch Backside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98
      },
      'Switch Frontside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98
      },
      'Switch Backside 360': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89
      },
      'Switch Frontside 360': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89
      },
      'Switch Backside Bigspin': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 79,
          'Pro': 89
      },
      'Switch Frontside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Switchflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94
      },
      'Switch Heelflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94
      },
      'Switch Varial Kickflip': {
          'Easy': 4,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89
      },
      'Switch Varial Heelflip': {
          'Easy': 4,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89
      },
      'Switch Hardflip': {
          'Easy': 1,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Switch Inward Heelflip': {
          'Easy': 1,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Switch 360 Flip': {
          'Easy': 1,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89
      },
      'Switch 360 Hardflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Switch 360 Inward Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Laserflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 79
      },
      'Switch Bigflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Switch Big Heelflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Switch Big Hardflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Big Inward Heelflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Backside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Switch Backside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Switch Frontside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Switch Frontside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Switch Backside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Backside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Frontside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Frontside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Ollie North': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 79,
          'Pro': 89
      },
      'Switch Backside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Frontside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Backside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Switch Frontside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Switch Impossible': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Switch Backside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Frontside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Switch Backside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Switch Frontside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      //fakie
      'Fakie Ollie, Seriously?': {
          'Easy': 99,
          'Medium': 99,
          'Hard': 99,
          'Pro': 99
      },
      'Fakie Backside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98
      },
      'Fakie Frontside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98
      },
      'Fakie Backside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie Frontside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie Backside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98
      },
      'Fakie Frontside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98
      },
      'Fakie Backside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie Frontside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie Backside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie Frontside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakieflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94
      },
      'Fakie Heelflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94
      },
      'Fakie Varial Kickflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie Varial Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie Hardflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie Inward Heelflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie 360 Flip': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie 360 Hardflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie 360 Inward Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Laserflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 79
      },
      'Fakie Bigflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie Big Heelflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie Big Hardflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Big Inward Heelflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Backside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie Backside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie Frontside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie Frontside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie Backside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Backside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Frontside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Frontside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Ollie North': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 79,
          'Pro': 89
      },
      'Fakie Backside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Frontside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Backside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Fakie Frontside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Fakie Impossible': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89
      },
      'Fakie Backside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Frontside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69
      },
      'Fakie Backside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
      'Fakie Frontside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49
      },
  }
  return trickOdds[arr[0]][arr[1]];
    }

  //display/hide functions
  function startButtonDisplay(x){
      startButton.style.display = x;
  }

  function gosPlayersDisplay(x){
    gosPlayers.style.display = x;
  };
  
  function difficultyDisplay(x){
    difficulty.style.display = x;
  };

//reset gos multiplayer scores
function resetgosMultiScores(){
  for (let a = 1; a <= 6; a++){
    $('#player' + a + 'Score').text('-');
  }
   p1 = [];
   p2 = [];
   p3 = [];
   p4 = [];
   p5 = [];
   p6 = [];
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
      while(aiLandedComment.firstChild){
        aiLandedComment.removeChild(aiLandedComment.firstChild);
      }
      playYou = [];
      playAi = [];

      resetgosMultiScores();
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

  //clears marathon mode
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

  //clears/resets gos multiplayer inputs and buttons
  function clearMultigos(){
    for (let a = 1; a < 7; a++){
      $('#player' + a + 'Input').val('Player ' + a + ':')
      $('#player' + a).hide();
      $('#player' + a + 'Button').hide();
      $('#player' + a + 'Score').hide();
    }
  }
  
  //clears/resets screen based on mode selected
  function showMode(){
   let gosDisplay = document.getElementById("gosHud");
   let nrDisplay = document.getElementById("nrHud");
   let marathonDisplay = document.getElementById("marathonHud");
   let mode = $('#mode-select').val();

   run.style.display = $('#mode-select').val() === 'Standard' ? 'block' : 'none'
   mode === 'Standard' ? startButtonDisplay('none') : mode === 'Game of Skate' ? startButtonDisplay('none') : startButtonDisplay('block');
   mode === 'Game of Skate' ? gosPlayersDisplay('block') : gosPlayersDisplay('none');
   questionDisplay.style.display = 'none';
   nrDisplay.style.display = 'none';
   marathonDisplay.style.display = 'none';
   gosDisplay.style.display = 'none';
   $('#numPlayersSelect').hide();
   $('#okButton').hide();
   $('#endMultigos').hide();

   $('#bno').remove();
   $('#byes').remove();
   
   difficultyDisplay('none');
   clearMultigos();
   cleargos();
   clearNoRepeatMode();
   clearMarathonMode();
   }

   let modeSelect = document.getElementById('mode-select');
   modeSelect.addEventListener('change',function(){
     showMode();
   })

  /*
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
  */
  

  //rng 
    function rngLength(length){
      let rand = Math.floor(Math.random() * length);
      return rand;
    }
    
    
  
  //checks the array input to make sure it can call a trick from trickLib
  //makes changes as needed
    function isItATrick(tricknq){
    let flipAgain = $('#flip-select').val();
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
  //comparing first letter
  if((tricknq[2][0] !== tricknq[3][0] && tricknq[4] === "Impossible") || (tricknq[2][0] !== tricknq[3][0] && tricknq[4] === "ollieNorth")){
       if(!flipAgain.some(flip => flip === 'None')){
       tricknq[3] === 'noBody' ? tricknq[2] = 'noBoard' : tricknq[3] === 'halfBody' ? tricknq[2] = 'halfBoard' : tricknq[2] = 'fullBoard';
       if (tricknq[2] === 'noBoard'){
         tricknq[1] = 'nofsbs';
       }
     }
     else{
        let finalArr = flipAgain.filter(flip => flip !== 'Impossible' && flip !== 'ollieNorth');
     if(finalArr.length === 1){
       tricknq[4] = "None";
     }
     else{
       tricknq[4] = finalArr[rngLength(finalArr.length)];
     }
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
  //******************** MODES *****************************
  //creating yes no buttons and displaying question 
    function ynButtons(){
    
      let buttonYes = document.createElement("button");
      let buttonNo = document.createElement("button");
    
      buttonYes.id = "byes";
      buttonNo.id = "bno";
      buttonYes.textContent = "Yes";
      buttonNo.textContent = "No";
      buttonYes.className = 'btn btn-success w-50';;
      buttonNo.className = 'btn btn-danger w-50';

      document.getElementById('left-buttons').appendChild(buttonYes);
      document.getElementById('left-buttons').appendChild(buttonNo);
  //shows the question div if it was hidden
      if ($('#mode-select').val() !== 'Game of Skate' && soloGame !== false){
        questionDisplay.style.display = "block";
      }
    }

  //************************* No Repeat ***********************************/
  //global variable for no repeat mode* find a better way?
    let nrTrickName = [];
  //end of no repeat mode
    function endNoRepeat(){
      if (!noRepeatTricks.length){
  //hide yes/no buttons and question
      questionDisplay.style.display = "none";
      $('#bno').remove();
      $('#byes').remove();
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
      let landedYesDisplay = nrList += '<span style="color:#006400">'+trickLib(nrTrickName)+'&nbsp - &nbsp </span>';
      landedListDisplay.innerHTML = landedYesDisplay;
    }
  //trick not landed
    function nrNo(){
      noRepeatTried++;
      nrLandedDisplay.innerHTML = noRepeatLanded + "/" + noRepeatTried;
  //display trick as not landed
      let landedNoDisplay = nrList += '<span style="color:#8B0000">'+trickLib(nrTrickName)+'&nbsp - &nbsp </span>';
      landedListDisplay.innerHTML = landedNoDisplay;
    }
  //create nr trick array, select from list, and update array
    function nrTrickArray(){
  //gathering all arrays from checked boxes and making one big array
      let stanceArr = $('#stance-select').val();
      let fsbsArr = $('#orientation-select').val();
      let boardArr = $('#board-rotation-select').val();
      let bodyArr = $('#body-rotation-select').val();
      let flipArr = $('#flip-select').val();

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
  //select and display random trick from array
      let nrNum = rngLength(noRepeatTricks.length);
      let nrRandomTrick = noRepeatTricks[nrNum];
      nrTrickName = nrRandomTrick;
      display(nrRandomTrick);
  //remove selected trick from array 
      noRepeatTricks.splice(nrNum,1);
    }

    function noRepeat(){
      nrTrickArray();
  //hide end game comments if showing
      nrCommentDisplay.style.display = "none";
      nrSeeListDisplay.style.display = "none";
  //resets displays if a game just ended
      if(!noRepeatTried){
      nrLandedDisplay.innerHTML = noRepeatLanded + "/" + noRepeatTried;
      landedListDisplay.innerHTML = nrList;
      }
      
      let tricksLeftDisplay = document.getElementById("nrLeft");
      let nrHudDisplay = document.getElementById("nrHud");
  //unhide display
      nrHudDisplay.style.display = "block";
  
  //display number of remaining tricks    
      tricksLeftDisplay.innerHTML = noRepeatTricks.length;
    }
    
  //************************* Marathon **************************************/
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
      $('#bno').remove();
      $('#byes').remove();
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
  /********************************** Game of Skate *************************************/
  
  /////////// MULTIPLAYER ////////////

  multiPlayer.addEventListener('click',function(){
    gosPlayersDisplay('none');
    numPlayersSelect.style.display = 'block';
    okButton.style.display = 'block';
    soloGame = false;
  });

  //disables OK button unless an accepeted number is entered
  numPlayers.addEventListener('change',function(){
    if ($('#numPlayers').val() > 1 && $('#numPlayers').val() < 7){
      okButton.disabled = false;
    }
    else{ okButton.disabled = true; }
  });

  okButton.addEventListener('click',function(){
    for (let a = 1; a <= $('#numPlayers').val(); a++){
      $('#player' + a).show();
    }
    playersLeft = $('#numPlayers').val();;
    numPlayersSelect.style.display = 'none';
    okButton.style.display = 'none';
    startButtonDisplay('block');
  });

  //set player names onto buttons and create array of player names
  function playerNames(){
    //reset arr if any names were in it
    playerNamesArr = [];
    for (let a = 1; a <= $('#numPlayers').val(); a++){
      //display player buttons and scores
      $('#player' + a + 'Button').show();
      $('#player' + a + 'Score').show();
      //default name given if left blank
      if (!$('#player' + a + 'Input').val()){
        $('#player' + a + 'Button').text('Player ' + a + ':');
        playerNamesArr.push('Player ' + a + ':');
      }
      //players name put in button
      else{
        $('#player' + a + 'Button').text($('#player' + a + 'Input').val());
        playerNamesArr.push($('#player' + a + 'Input').val());
      }
      //hide name input
      $('#player' + a).hide();
    }
  };

//enables gos multiplayer buttons if disabled
function enableMultigosButtons(){
  let arr = [p1,p2,p3,p4,p5,p6];
  for (let a = 1; a <= 6; a++){
    if (arr[a-1].length < 5){
      $('#player' + a + 'Button').prop('disabled',false);
    }
  }
}

//removes players and checks for a winner
function remainingPlayers(p,text){
  if (p.length === 5){
    let n = playerNamesArr.indexOf(playerNamesArr.find((a) => a === text));
    playerNamesArr.splice(n,1);
  }
  if (playerNamesArr.length === 1){
    $('#endMultigos').show();
    $('#endMultigos').text(playerNamesArr[0] + ' Wins!');
    $('#startButton').show();
    run.style.display = 'none';
  }
}

//click events for player buttons in multiplayer gos
function playerButtonClickEvents(p_,pScore,pnum,text){
  p_.push(skate[p_.length]);
  pScore.innerHTML = p_.join('');
  $('#player' + pnum + 'Button').prop('disabled',true);
  remainingPlayers(p_,text);
}
  
//multiplayer gos buttons 
player1Button.addEventListener('click',function(){
  playerButtonClickEvents(p1,player1Score,1,this.textContent);
});

player2Button.addEventListener('click',function(){
  playerButtonClickEvents(p2,player2Score,2,this.textContent);
});

player3Button.addEventListener('click',function(){
  playerButtonClickEvents(p3,player3Score,3,this.textContent);
});

player4Button.addEventListener('click',function(){
  playerButtonClickEvents(p4,player4Score,4,this.textContent);
});

player5Button.addEventListener('click',function(){
  playerButtonClickEvents(p5,player5Score,5,this.textContent);
});

player6Button.addEventListener('click',function(){
  playerButtonClickEvents(p6,player6Score,6,this.textContent);
});

///////////////// SOLO ////////////////////

soloButton.addEventListener('click',function(){
  difficultyDisplay('block');
  gosPlayersDisplay('none');
  startButtonDisplay('block');
  soloGame = true;
});

    //determines if ai landed it or not and displays it
    function didTheyLand(){
      let selectedDifficulty = $('#difficulty-select').val();
      let num = rngLength(100);
      let landed = 'They landed it';
      let missed = 'They missed it';
      
      if (selectedDifficulty === 'Insane YouTuber'){
        aiLandedComment.innerHTML = num > 95 ? missed : landed;
      }
      else{
      let trickDisplay = document.getElementById('trick');
      let difficultyNum = difficultySettings([trickDisplay.innerHTML,selectedDifficulty]);

      aiLandedComment.innerHTML = num > difficultyNum ? missed : landed;
      }
    }
    //end game of skate
    function endgos(){
    //end game results
      if(playAi.length === 5 || playYou.length === 5){
        let resultsDisplay = document.getElementById("results");   
    //removes question, buttons, and comment
        questionDisplay.style.display = "none";
        $('#bno').remove();
        $('#byes').remove();
        aiLandedComment.innerHTML = '';
        startButtonDisplay('block');
    //resets trick array for new game
        noRepeatTricks = [];
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
      if (aiLandedComment.innerHTML === 'They missed it'){
        playAi.push(skate[playAi.length]);
        aiDisplay.innerHTML = playAi.join("");
        endgos();
      }
    }
    //trick not landed 
    function gosNo(){
      //update and display results
      let youDisplay = document.getElementById("you");
      if (aiLandedComment.innerHTML === 'They landed it'){
        playYou.push(skate[playYou.length]);
        youDisplay.innerHTML = playYou.join("");
        endgos();
      }
    }

    //gos function  
    function gameOfSkate(){
      //display game of skate hud
      if (soloGame){
        let gosHud = document.getElementById('gosHud');
        gosHud.style.display = 'block';
        nrTrickArray();
        didTheyLand();
      }
      else{
        nrTrickArray();
      }
    }

  //******************* Get a Trick and Standard Game *********************************
  function getTrick(){
    //*********************STANCE**************************
    let stanceTag = "";
    let stanceArray = $('#stance-select').val();
    // check if empty
    if (stanceArray.length === 0)
    {
      stanceArray.push('Regular');
    }
  //rng for stance
    let stanceNum = rngLength(stanceArray.length);
    stanceTag = stanceArray[stanceNum];
      
    //*******************FS/BS***************************
    let fsbsTag = "";
    let fsbsArray = $('#orientation-select').val();
    // Check if empty
    if (fsbsArray.length === 0)
    {
      fsbsArray.push('nofsbs');
    }
  //rng for fs or bs
    let fsbsNum = rngLength(fsbsArray.length);
    fsbsTag = fsbsArray[fsbsNum];
      
    //*****************Board Rotation*********************
    let boardTag = "";
    let boardArray = $('#board-rotation-select').val();
    // Check if empty
    if (boardArray.length === 0)
    {
      boardArray.push('noBoard');
    }
  //rng for board rotation
    let boardNum = rngLength(boardArray.length);
    boardTag = boardArray[boardNum];
    
     //******************Body Rotation**********************
    let bodyTag = "";
    let bodyArray = $('#body-rotation-select').val();
    // Check if empty
    if (bodyArray.length === 0)
    {
      bodyArray.push('noBody');
    }
  //rng for body rotation
    let bodyNum = rngLength(bodyArray.length);
    bodyTag = bodyArray[bodyNum];
  
    //*********************FLIP******************************
    let flipTag = "";
    let flipArray = $('#flip-select').val();
    if (flipArray.length === 0)
    {
      flipArray.push('None');
    }
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
    if ($('#mode-select').val() === 'No-Repeat'){
      noRepeat();
    }
    if ($('#mode-select').val() === 'Marathon'){
      marathonTrick = theTrick;
      marathon();
    }
    if ($('#mode-select').val() === 'Game of Skate'){
      gameOfSkate();
    }
  }

  //checks mode and dictates what yes/no buttons will do
  function ynButtonsEvent(){

    let byes = document.getElementById('byes');
    let bno = document.getElementById('bno');

    //yes button
    byes.addEventListener('click',function(){
      if ($('#mode-select').val() === 'No-Repeat'){
        nrYes();
        noRepeatTricks.length ? getTrick() : endNoRepeat();
      }
      if ($('#mode-select').val() === 'Marathon'){
        marathonYes();
        getTrick();
      }
      if ($('#mode-select').val() === 'Game of Skate'){
        gosYes();
        if (playAi.length !== 5){
          getTrick();
        }
      }
    })
    //no button
    bno.addEventListener('click',function(){
      if ($('#mode-select').val() === 'No-Repeat'){
        nrNo();
        noRepeatTricks.length ? getTrick() : endNoRepeat();
      }
      if ($('#mode-select').val() === 'Marathon'){
        marathonNo();
      }
      if ($('#mode-select').val() === 'Game of Skate'){
        gosNo();
        if (playYou.length !== 5){
          getTrick();
        }
      }
    })
  }
  
  //start game/roll trick/display ynButtons/hide start button
  startButton.addEventListener('click',function(){
    if ($('#mode-select').val() === 'Game of Skate' && soloGame === false){
      playerNames();
      resetgosMultiScores();
      enableMultigosButtons();
      $('#endMultigos').hide();
      run.style.display = 'block';
    }
    else{
      difficultyDisplay('none');
      cleargos();
      ynButtons();
      ynButtonsEvent();
    }
    startButtonDisplay('none');
    getTrick();
  })
  
  //run get trick function on click
  run.addEventListener("click",function(){
    getTrick();
    enableMultigosButtons();
  });
    
  })();//the end
  
  
  
  
