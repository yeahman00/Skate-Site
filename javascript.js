(function(){
  const commentDisplay = document.getElementById("comment");
  const questionDisplay = document.getElementById("question");
  const modeSelect = document.getElementById('mode-select');
  
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
  let soloMissedList = '';
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
            "None": "Ollie"
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
            "ollieNorth": "Nollie Frontside 180 Nollie North",
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
             "ollieNorth": "Nollie Frontside 360 Nollie North",
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
            "ollieNorth": "Nollie Backside 180 Nollie North",
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
             "ollieNorth": "Nollie Backside 360 Nollie North",
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
            "ollieNorth": "Nollie North",
            "None": "Nollie"
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
            "None": "Switch Ollie"
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
            "None": "Fakie Ollie"
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
          'Pro': 99,
          'Insane YouTuber': 99
      },
      'Backside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Frontside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Backside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Frontside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Backside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Frontside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Backside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Frontside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Backside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Frontside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Kickflip': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 84,
          'Pro': 94,
          'Insane YouTuber': 98
      },
      'Heelflip': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 84,
          'Pro': 94,
          'Insane YouTuber': 98
      },
      'Varial Kickflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Varial Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Hardflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Inward Heelflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      '360 Flip': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      '360 Hardflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      '360 Inward Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Laserflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 79,
          'Insane YouTuber': 94
      },
      'Bigflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Big Heelflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Big Hardflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Big Inward Heelflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Backside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Backside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Frontside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Frontside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Backside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Backside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Frontside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Frontside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Ollie North': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 98
      },
      'Backside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Frontside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Backside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Frontside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Impossible': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Backside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Frontside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Backside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Frontside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      //nollie
      'Nollie, Seriously?': {
          'Easy': 99,
          'Medium': 99,
          'Hard': 99,
          'Pro': 99,
          'Insane YouTuber': 99
      },
      'Nollie Backside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Nollie Frontside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Nollie Backside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 98
      },
      'Nollie Frontside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Backside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Nollie Frontside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Nollie Backside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Frontside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Backside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Frontside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollieflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94,
          'Insane YouTuber': 98
      },
      'Nollie Heelflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94,
          'Insane YouTuber': 98
      },
      'Nollie Varial Kickflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Varial Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Hardflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Inward Heelflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie 360 Flip': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie 360 Hardflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Nollie 360 Inward Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Nollie Laserflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 79,
          'Insane YouTuber': 94
      },
      'Nollie Bigflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Big Heelflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Big Hardflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Nollie Big Inward Heelflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Nollie Backside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Backside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Frontside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Frontside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Backside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Nollie Backside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Nollie Frontside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Nollie Frontside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Nollie North': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 98
      },
      'Nollie Backside 180 Nollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Nollie Frontside 180 Nollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Nollie Backside 360 Nollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Nollie Frontside 360 Nollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Nollie Impossible': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Nollie Backside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Nollie Frontside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Nollie Backside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Nollie Frontside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      //switch
      'Switch Ollie, Seriously?': {
          'Easy': 99,
          'Medium': 99,
          'Hard': 99,
          'Pro': 99,
          'Insane YouTuber': 99
      },
      'Switch Backside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Switch Frontside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Switch Backside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Frontside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Backside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Switch Frontside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Switch Backside 360': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Frontside 360': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Backside Bigspin': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Frontside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switchflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94,
          'Insane YouTuber': 98
      },
      'Switch Heelflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94,
          'Insane YouTuber': 98
      },
      'Switch Varial Kickflip': {
          'Easy': 4,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Varial Heelflip': {
          'Easy': 4,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Hardflip': {
          'Easy': 1,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Inward Heelflip': {
          'Easy': 1,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch 360 Flip': {
          'Easy': 1,
          'Medium': 9,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch 360 Hardflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Switch 360 Inward Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Switch Laserflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 79,
          'Insane YouTuber': 94
      },
      'Switch Bigflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Big Heelflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Big Hardflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Switch Big Inward Heelflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Switch Backside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Backside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Frontside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Frontside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Backside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Switch Backside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Switch Frontside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Switch Frontside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Switch Ollie North': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 98
      },
      'Switch Backside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Switch Frontside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Switch Backside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Switch Frontside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Switch Impossible': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Switch Backside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Switch Frontside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Switch Backside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Switch Frontside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      //fakie
      'Fakie Ollie, Seriously?': {
          'Easy': 99,
          'Medium': 99,
          'Hard': 99,
          'Pro': 99,
          'Insane YouTuber': 99
      },
      'Fakie Backside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Fakie Frontside Shuvit': {
          'Easy': 29,
          'Medium': 59,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Fakie Backside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Frontside 360 Shuvit': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Backside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Fakie Frontside 180': {
          'Easy': 29,
          'Medium': 69,
          'Hard': 94,
          'Pro': 98,
          'Insane YouTuber': 98
      },
      'Fakie Backside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Frontside 360': {
          'Easy': 0,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Backside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Frontside Bigspin': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakieflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94,
          'Insane YouTuber': 98
      },
      'Fakie Heelflip': {
          'Easy': 19,
          'Medium': 29,
          'Hard': 84,
          'Pro': 94,
          'Insane YouTuber': 98
      },
      'Fakie Varial Kickflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Varial Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Hardflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Inward Heelflip': {
          'Easy': 4,
          'Medium': 19,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie 360 Flip': {
          'Easy': 4,
          'Medium': 29,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie 360 Hardflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Fakie 360 Inward Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Fakie Laserflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 79,
          'Insane YouTuber': 94
      },
      'Fakie Bigflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Big Heelflip': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Big Hardflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Fakie Big Inward Heelflip': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Fakie Backside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Backside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Frontside Flip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Frontside Heelflip': {
          'Easy': 9,
          'Medium': 29,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Backside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Fakie Backside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Fakie Frontside 360 Kickflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Fakie Frontside 360 Heelflip': {
          'Easy': 0,
          'Medium': 4,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 89
      },
      'Fakie Ollie North': {
          'Easy': 29,
          'Medium': 49,
          'Hard': 79,
          'Pro': 89,
          'Insane YouTuber': 98
      },
      'Fakie Backside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Fakie Frontside 180 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Fakie Backside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Fakie Frontside 360 Ollie North': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Fakie Impossible': {
          'Easy': 0,
          'Medium': 9,
          'Hard': 69,
          'Pro': 89,
          'Insane YouTuber': 94
      },
      'Fakie Backside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Fakie Frontside 180 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 49,
          'Pro': 69,
          'Insane YouTuber': 94
      },
      'Fakie Backside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
      'Fakie Frontside 360 Impossible': {
          'Easy': 0,
          'Medium': 0,
          'Hard': 9,
          'Pro': 49,
          'Insane YouTuber': 89
      },
  }
  return trickOdds[arr[0]][arr[1]];
    }
  //array containing every trick from trick library
    const allTricksArr = [
    "Ollie, Seriously?",
    "Frontside 180",
    "Backside 180",
    "Frontside Shuvit",
    "Backside Shuvit",
    "Kickflip",
    "Heelflip",
    "Hardflip",
    "Varial Kickflip",
    "Varial Heelflip",
    "Inward Heelflip",
    "Frontside Flip",
    "Backside Flip",
    "Frontside Heelflip",
    "Backside Heelflip",
    "Frontside 360 Shuvit",
    "Backside 360 Shuvit",
    "Frontside Bigspin",
    "Backside Bigspin",
    "360 Flip",
    "360 Hardflip",
    "Laserflip",
    "360 Inward Heelflip",
    "Big Hardflip",
    "Bigflip",
    "Big Heelflip",
    "Big Inward Heelflip",
    "Frontside 360",
    "Backside 360",
    "Frontside 360 Kickflip",
    "Backside 360 Kickflip",
    "Frontside 360 Heelflip",
    "Backside 360 Heelflip",
    "Impossible",
    "Ollie North",
    "Frontside 180 Impossible",
    "Frontside 180 Ollie North",
    "Backside 180 Impossible",
    "Backside 180 Ollie North",
    "Frontside 360 Impossible",
    "Frontside 360 Ollie North",
    "Backside 360 Impossible",
    "Backside 360 Ollie North",
    "Nollie, Seriously?",
    "Nollie Frontside 180",
    "Nollie Backside 180",
    "Nollie Frontside Shuvit",
    "Nollie Backside Shuvit",
    "Nollieflip",
    "Nollie Heelflip",
    "Nollie Hardflip",
    "Nollie Varial Kickflip",
    "Nollie Varial Heelflip",
    "Nollie Inward Heelflip",
    "Nollie Frontside Flip",
    "Nollie Backside Flip",
    "Nollie Frontside Heelflip",
    "Nollie Backside Heelflip",
    "Nollie Frontside 360 Shuvit",
    "Nollie Backside 360 Shuvit",
    "Nollie Frontside Bigspin",
    "Nollie Backside Bigspin",
    "Nollie 360 Flip",
    "Nollie 360 Hardflip",
    "Nollie Laserflip",
    "Nollie 360 Inward Heelflip",
    "Nollie Big Hardflip",
    "Nollie Bigflip",
    "Nollie Big Heelflip",
    "Nollie Big Inward Heelflip",
    "Nollie Frontside 360",
    "Nollie Backside 360",
    "Nollie Frontside 360 Kickflip",
    "Nollie Backside 360 Kickflip",
    "Nollie Frontside 360 Heelflip",
    "Nollie Backside 360 Heelflip",
    "Nollie Impossible",
    "Nollie North",
    "Nollie Frontside 180 Impossible",
    "Nollie Frontside 180 Nollie North",
    "Nollie Backside 180 Impossible",
    "Nollie Backside 180 Nollie North",
    "Nollie Frontside 360 Impossible",
    "Nollie Frontside 360 Nollie North",
    "Nollie Backside 360 Impossible",
    "Nollie Backside 360 Nollie North",
    "Switch Ollie, Seriously?",
    "Switch Frontside 180",
    "Switch Backside 180",
    "Switch Frontside Shuvit",
    "Switch Backside Shuvit",
    "Switchflip",
    "Switch Heelflip",
    "Switch Hardflip",
    "Switch Varial Kickflip",
    "Switch Varial Heelflip",
    "Switch Inward Heelflip",
    "Switch Frontside Flip",
    "Switch Backside Flip",
    "Switch Frontside Heelflip",
    "Switch Backside Heelflip",
    "Switch Frontside 360 Shuvit",
    "Switch Backside 360 Shuvit",
    "Switch Frontside Bigspin",
    "Switch Backside Bigspin",
    "Switch 360 Flip",
    "Switch 360 Hardflip",
    "Switch Laserflip",
    "Switch 360 Inward Heelflip",
    "Switch Big Hardflip",
    "Switch Bigflip",
    "Switch Big Heelflip",
    "Switch Big Inward Heelflip",
    "Switch Frontside 360",
    "Switch Backside 360",
    "Switch Frontside 360 Kickflip",
    "Switch Backside 360 Kickflip",
    "Switch Frontside 360 Heelflip",
    "Switch Backside 360 Heelflip",
    "Switch Impossible",
    "Switch Ollie North",
    "Switch Frontside 180 Impossible",
    "Switch Frontside 180 Ollie North",
    "Switch Backside 180 Impossible",
    "Switch Backside 180 Ollie North",
    "Switch Frontside 360 Impossible",
    "Switch Frontside 360 Ollie North",
    "Switch Backside 360 Impossible",
    "Switch Backside 360 Ollie North",
    "Fakie Ollie, Seriously?",
    "Fakie Frontside 180",
    "Fakie Backside 180",
    "Fakie Frontside Shuvit",
    "Fakie Backside Shuvit",
    "Fakieflip",
    "Fakie Heelflip",
    "Fakie Hardflip",
    "Fakie Varial Kickflip",
    "Fakie Varial Heelflip",
    "Fakie Inward Heelflip",
    "Fakie Frontside Flip",
    "Fakie Backside Flip",
    "Fakie Frontside Heelflip",
    "Fakie Backside Heelflip",
    "Fakie Frontside 360 Shuvit",
    "Fakie Backside 360 Shuvit",
    "Fakie Frontside Bigspin",
    "Fakie Backside Bigspin",
    "Fakie 360 Flip",
    "Fakie 360 Hardflip",
    "Fakie Laserflip",
    "Fakie 360 Inward Heelflip",
    "Fakie Big Hardflip",
    "Fakie Bigflip",
    "Fakie Big Heelflip",
    "Fakie Big Inward Heelflip",
    "Fakie Frontside 360",
    "Fakie Backside 360",
    "Fakie Frontside 360 Kickflip",
    "Fakie Backside 360 Kickflip",
    "Fakie Frontside 360 Heelflip",
    "Fakie Backside 360 Heelflip",
    "Fakie Impossible",
    "Fakie Ollie North",
    "Fakie Frontside 180 Impossible",
    "Fakie Frontside 180 Ollie North",
    "Fakie Backside 180 Impossible",
    "Fakie Backside 180 Ollie North",
    "Fakie Frontside 360 Impossible",
    "Fakie Frontside 360 Ollie North",
    "Fakie Backside 360 Impossible",
    "Fakie Backside 360 Ollie North"
    ];
  
  //array of non trick specific stats *includes most landed/missed/rolled
    const nonTrickArr = [
      'nrPlayed','nrMostTricksLanded','marathonPlayed','marathonHighScore','gosMultiPlayed','gosSoloPlayed',
      'easyWins','easyActiveWinStreak','easyWinStreak','easyLosses','mediumWins','mediumActiveWinStreak','mediumWinStreak','mediumLosses',
      'hardWins','hardActiveWinStreak','hardWinStreak','hardLosses','proWins','proActiveWinStreak','proWinStreak','proLosses','insaneYouTuberWins',
      'insaneYouTuberActiveWinStreak','insaneYouTuberWinStreak','insaneYouTuberLosses','rolledMostNum','missedMostNum','landedMostNum','trickStreakNum'
    ];

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
    $('#player' + a + 'Missed').text('');
  }
   p1 = [];
   p2 = [];
   p3 = [];
   p4 = [];
   p5 = [];
   p6 = [];
}

//clear gos multiplayer missed list
function cleargosMultiMissedList(){
  for (let a = 1; a <= 6; a++){
    $('#player' + a + 'Name').text('');
    $('#player' + a + 'Missed').text('');
  }
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
      soloMissedList = '';

      $('#youMissed').text('');
    
      $('#gosMultiMissedList').hide();
      $('#gosSoloMissedList').hide();

      resetgosMultiScores();
      cleargosMultiMissedList();
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
      $('#player' + a + 'Input').val('Player ' + a)
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
   $('#gosMultiNote').hide();
   $('#landedList').hide();

   $('#bno').remove();
   $('#byes').remove();
   
   difficultyDisplay('none');
   clearMultigos();
   cleargos();
   clearNoRepeatMode();
   clearMarathonMode();
   }

   modeSelect.addEventListener('change',function(){
     showMode();
   })

   //resets marathon best streak
   $('#resetBestStreak').on('click',function(){
    if (confirm('Are you sure you want to reset Marathon Best Streak to 0?')){
      localStorage.marathonHighScore = 0;
    }
  })

   //closes settings modal when remove modal is closed
   $('#removeTricks-modal').on('hide.bs.modal', function(){
     $('#settings-modal').modal('hide');
  })

  //closes stats modal when trickStats modal is closed
   $('#trickStats-modal').on('hide.bs.modal', function(){
     $('#stats-modal').modal('hide');
   })

   //select all
   $('#selectAll').click(function(){
     let arr = ['stance','orientation','body-rotation','board-rotation','flip'];
     for (let a of arr){
       $('#' + a + '-select option').prop('selected', true);
     }
     //refresh selectpicker so it updates the text field with the newly selected options
     $('.selectpicker').selectpicker('refresh');
   })

   //select all common picks
   $('#commonPicks').click(function(){
     $('#commonPicks-select option').prop('selected', true);
     $('.selectpicker').selectpicker('refresh');
   });

   //checks if a trick is on the removed list or not
   function removedOrNot(trickName){
      let arr = ['noFlip','kickflip','heelflip','impossible','ollieNorth','commonPicks'];
      for (let a of arr){
        if ($('#' + a + '-select').val().some((trick) => trick === trickName)){
          return true;
        }
      }  
      return false;
   }

   //tracks number of games played for each mode
   function gamesPlayed(gameMode){
    if (gameMode === 'Game of Skate'){
      if (soloGame){
        !localStorage.gosSoloPlayed ? localStorage.gosSoloPlayed = 1 : localStorage.gosSoloPlayed++;
      }
      else{
        !localStorage.gosMultiPlayed ? localStorage.gosMultiPlayed = 1 : localStorage.gosMultiPlayed++;
      }
    }
    if (gameMode === 'No-Repeat'){
      !localStorage.nrPlayed ? localStorage.nrPlayed = 1 : localStorage.nrPlayed++;
    }
    if (gameMode === 'Marathon'){
      !localStorage.marathonPlayed ? localStorage.marathonPlayed = 1 : localStorage.marathonPlayed++;
    }
   }

   //updates all stats on stats page
   function updateStats(){
    if (localStorage.trickStreakTrick === 'Ollie, Seriously?'){
      $('#trickStreakTrickDisplay').text('Ollie');
    }
    else if (localStorage.trickStreakTrick === 'Nollie, Seriously?'){
      $('#trickStreakTrickDisplay').text('Nollie');
    }
    else if (localStorage.trickStreakTrick === 'Switch Ollie, Seriously?'){
      $('#trickStreakTrickDisplay').text('Switch Ollie');
    }
    else if (localStorage.trickStreakTrick === 'Fakie Ollie, Seriously?'){
      $('#trickStreakTrickDisplay').text('Fakie Ollie');
    }
    else{ $('#trickStreakTrickDisplay').text(localStorage.trickStreakTrick); }


    if (localStorage.rolledMostTrick === 'Ollie, Seriously?'){
      $('#mostRolledDisplay').text('Ollie');
    }
    else if (localStorage.rolledMostTrick === 'Nollie, Seriously?'){
      $('#mostRolledDisplay').text('Nollie');
    }
    else if (localStorage.rolledMostTrick === 'Switch Ollie, Seriously?'){
      $('#mostRolledDisplay').text('Switch Ollie');
    }
    else if (localStorage.rolledMostTrick === 'Fakie Ollie, Seriously?'){
      $('#mostRolledDisplay').text('Fakie Ollie');
    }
    else{ $('#mostRolledDisplay').text(localStorage.rolledMostTrick); }


    if (localStorage.landedMostTrick === 'Ollie, Seriously?'){
      $('#mostLandedDisplay').text('Ollie');
    }
    else if (localStorage.landedMostTrick === 'Nollie, Seriously?'){
      $('#mostLandedDisplay').text('Nollie');
    }
    else if (localStorage.landedMostTrick === 'Switch Ollie, Seriously?'){
      $('#mostLandedDisplay').text('Switch Ollie');
    }
    else if (localStorage.landedMostTrick === 'Fakie Ollie, Seriously?'){
      $('#mostLandedDisplay').text('Fakie Ollie');
    }
    else{ $('#mostLandedDisplay').text(localStorage.landedMostTrick); }
    
    $('#mostMissedDisplay').text(localStorage.missedMostTrick);

    for (let a of nonTrickArr){
      if (localStorage[a]){
        $('#' + a).text(localStorage[a]);
      }
    }
   }

   //updates stats when stats page is opened
   $('#statsLink').click(function(){
    updateStats();
  });


  //updates stats on every trick that comes up with yes and no buttons present
  function trickStats(landed){
    let trick = $('#trick').text();

    localStorage['rolled' + trick] ? localStorage['rolled' + trick]++ : localStorage['rolled' + trick] = 1;
    if (!localStorage.rolledMostNum || parseInt(localStorage['rolled' + trick],10) > parseInt(localStorage.rolledMostNum,10)){
      localStorage.rolledMostNum = localStorage['rolled' + trick];
      localStorage.rolledMostTrick = trick;
    }

    if (landed === 'yes'){
      localStorage['landed' + trick] ? localStorage['landed' + trick]++ : localStorage['landed' + trick] = 1;
      if (!localStorage.landedMostNum || parseInt(localStorage['landed' + trick],10) > parseInt(localStorage.landedMostNum,10)){
        localStorage.landedMostNum = localStorage['landed' + trick];
        localStorage.landedMostTrick = trick;
      }
      localStorage['trickStreak' + trick] ? localStorage['trickStreak' + trick]++ : localStorage['trickStreak' + trick] = 1; 
      if (!localStorage.trickStreakNum || parseInt(localStorage['trickStreak' + trick],10) > parseInt(localStorage.trickStreakNum,10)){
        localStorage.trickStreakNum = localStorage['trickStreak' + trick];
        localStorage.trickStreakTrick = trick;
      }
      if (!localStorage['trickStreakBest' + trick] || parseInt(localStorage['trickStreak' + trick],10) > parseInt(localStorage['trickStreakBest' + trick],10)){
        localStorage['trickStreakBest' + trick] = localStorage['trickStreak' + trick];
      }
    }
    
    if (landed === 'no'){ 
      localStorage['missed' + trick] ? localStorage['missed' + trick]++ : localStorage['missed' + trick] = 1;
      if (!localStorage.missedMostNum || parseInt(localStorage['missed' + trick],10) > parseInt(localStorage.missedMostNum,10)){
        localStorage.missedMostNum = localStorage['missed' + trick];
        localStorage.missedMostTrick = trick;
      }
      if (localStorage['trickStreak' + trick]){
        localStorage['trickStreak' + trick] = 0;
      }
    }
  }

  //displays trick stats on trickStats page
  function displayTrickStats(){
    for (let trick of allTricksArr){
      if (localStorage['rolled' + trick]){
        if (trick === 'Ollie, Seriously?'){
          $('#OllieRolledDisplay').text(localStorage['rolled' + trick]);
          $('#OllieLandedDisplay').text(localStorage['landed' + trick]);
          $('#OllieTrickStreakDisplay').text(localStorage['trickStreakBest' + trick]);
        }
        else if (trick === 'Nollie, Seriously?'){
          $('#NollieRolledDisplay').text(localStorage['rolled' + trick]);
          $('#NollieLandedDisplay').text(localStorage['landed' + trick]);
          $('#NollieTrickStreakDisplay').text(localStorage['trickStreakBest' + trick]);
          }
        else if (trick === 'Fakie Ollie, Seriously?'){
          $('#FakieOllieRolledDisplay').text(localStorage['rolled' + trick]);
          $('#FakieOllieLandedDisplay').text(localStorage['landed' + trick]);
          $('#FakieOllieTrickStreakDisplay').text(localStorage['trickStreakBest' + trick]);
        }
        else if (trick === 'Switch Ollie, Seriously?'){
          $('#SwitchOllieRolledDisplay').text(localStorage['rolled' + trick]);
          $('#SwitchOllieLandedDisplay').text(localStorage['landed' + trick]);
          $('#SwitchOllieTrickStreakDisplay').text(localStorage['trickStreakBest' + trick]);
        }
        else{
          let trickJoined = trick.split(' ').join('');
          $('#' + trickJoined + 'RolledDisplay').text(localStorage['rolled' + trick]);
          $('#' + trickJoined + 'LandedDisplay').text(localStorage['landed' + trick]);
          $('#' + trickJoined + 'TrickStreakDisplay').text(localStorage['trickStreakBest' + trick]);
        }
      }
    }
  }

  $('#viewTrickStats').click(function(){
    displayTrickStats();
  })

  //resets all stats
  $('#resetAllStats').click(function(){

    let postedTricks = ['rolledMostTrick','missedMostTrick','landedMostTrick','trickStreakTrick'];

    let arr = ['rolled','missed','landed','trickStreak','trickStreakBest']
    if (confirm('Are you sure you want to reset ALL stats to 0? This includes Marathon Mode and ALL individual trick stats')){
      for (let nonTrick of nonTrickArr){
        if (localStorage[nonTrick]){
          localStorage[nonTrick] = 0;
        }
      }
      for (let posted of postedTricks){
        if (localStorage[posted]){
          localStorage[posted] = '-';
        }
      }
      for (let trick of allTricksArr){
        for (let a of arr){
          if (localStorage[a + trick]){
            localStorage[a + trick] = 0;
          }
        }
      }
      updateStats();
    }
  })

  //sort stats tables
  function sortTable(n,id){
    let table = document.getElementById([id]);
    let checkForSwap = true;
    let swap;
    let rows;
    let i;
    let order = 'HL'
    let swapped = false;
    //check if a swap is needed
    while (checkForSwap){
      checkForSwap = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++){
        swap = false;
        let x = rows[i].getElementsByTagName('td')[n];
        let y = rows[i + 1].getElementsByTagName('td')[n];
        //sort high to low
        if (order === 'HL'){
          if (Number(x.innerHTML) < Number(y.innerHTML)){
            swap = true;
            swapped = true;
            break;
          }
        }
        //sort low to high
        else{
          if (Number(x.innerHTML) > Number(y.innerHTML)){
            swap = true;
            swapped = true;
            break;
          }
        }
      }
      //swap being made
      if (swap){
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        checkForSwap = true;
      }
      //if no swaps were made switch to low to high order
      if (!swapped){
        order = 'LH';
        swapped = true;
        checkForSwap = true; 
      }
    }
  }
  //stats table header click functions
  //regular
  $('#regularLandedHeader').click(function(){
    sortTable(1,'regularTable');
  })

  $('#regularRolledHeader').click(function(){
    sortTable(2,'regularTable');
  })

  $('#regularStreakHeader').click(function(){
    sortTable(3,'regularTable');
  })
  //nollie
  $('#nollieLandedHeader').click(function(){
    sortTable(1,'nollieTable');
  })

  $('#nollieRolledHeader').click(function(){
    sortTable(2,'nollieTable');
  })

  $('#nollieStreakHeader').click(function(){
    sortTable(3,'nollieTable');
  })
  //switch
  $('#switchLandedHeader').click(function(){
    sortTable(1,'switchTable');
  })

  $('#switchRolledHeader').click(function(){
    sortTable(2,'switchTable');
  })

  $('#switchStreakHeader').click(function(){
    sortTable(3,'switchTable');
  })
  //fakie
  $('#fakieLandedHeader').click(function(){
    sortTable(1,'fakieTable');
  })

  $('#fakieRolledHeader').click(function(){
    sortTable(2,'fakieTable');
  })

  $('#fakieStreakHeader').click(function(){
    sortTable(3,'fakieTable');
  })


  //sets attempts number 
  function getAttempts(){
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
  }

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
      if (trickLib(showIt) === 'Ollie'){
        trickDisplay.innerHTML = 'Ollie, Seriously?'
      }
      else if (trickLib(showIt) === 'Nollie'){
        trickDisplay.innerHTML = 'Nollie, Seriously?'
      }
      else if (trickLib(showIt) === 'Fakie Ollie'){
        trickDisplay.innerHTML = 'Fakie Ollie, Seriously?'
      }
      else if (trickLib(showIt) === 'Switch Ollie'){
        trickDisplay.innerHTML = 'Switch Ollie, Seriously?'
      }
      else{
        trickDisplay.innerHTML = trickLib(showIt);
      }
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
      buttonYes.className = 'btn btn-success mr-2';;
      buttonNo.className = 'btn btn-danger';
      buttonYes.style.width = '45%';
      buttonNo.style.width = '45%';

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
      nrCommentDisplay.className = 'endText';
      nrCommentDisplay.innerHTML = "That's all of them";
      nrSeeListDisplay.innerHTML = "See list below";
  //tracking nrMostTricksLanded stat
      if (!localStorage.nrMostTricksLanded){
        localStorage.nrMostTricksLanded = noRepeatLanded;
      }
      else{
        if (noRepeatLanded > localStorage.nrMostTricksLanded)
          localStorage.nrMostTricksLanded = noRepeatLanded;
      }
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
                
  //check if the trick is on the removed trick list              
               // if (!$('#kickflip-select').val().some((trick) => trick === trickName)){
              if (!removedOrNot(trickName)){ 
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
      getAttempts();
      nrTrickArray();
      $('#landedList').show();
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

    function marathonYes(){
      marathonStreakNum++;
      marathonStreak.innerHTML = marathonStreakNum;
      if (!$('#kickflip-select').val().some((trick) => trick === trickLib(marathonTrick))){
        landedListDisplay.innerHTML = marathonList += '<span>'+trickLib(marathonTrick)+'&nbsp - &nbsp </span>';} 
    }
    
    function marathonNo(){
      questionDisplay.style.display = "none";
      marathonSeeList.style.display = "block";
      marathonEnding.style.display = "block";
      marathonEnding.className = 'endText';
      marathonEnding.innerHTML = "The End";
      marathonSeeList.innerHTML = "See list below";
      if (marathonStreakNum > localStorage.marathonHighScore){
        localStorage.marathonHighScore = marathonStreakNum;
        marathonEnding.className = 'winText';
        marathonEnding.innerHTML = 'New Best Streak!';
      }
     
      $('#bno').remove();
      $('#byes').remove();
      startButtonDisplay('block');
      marathonStreakNum = 0;
      marathonList = '';  
    }
    
    function marathon(){
      getAttempts();
  //display marthon hud
      $('#landedList').show();
      let marathonDisplay = document.getElementById("marathonHud");
      marathonDisplay.style.display = 'block';
  //hide ending if it's showing
      marathonSeeList.style.display = "none";
      marathonEnding.style.display = "none";
      if(!marathonStreakNum){
       marathonStreak.innerHTML = marathonStreakNum;
       landedListDisplay.innerHTML = marathonList;
      } 
  //set up local storage for highscore if it doesn't already exist
      if (!localStorage.marathonHighScore){
        localStorage.marathonHighScore = 0;
      }
      $('#bestStreak').text(localStorage.marathonHighScore);
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
    $('#gosMultiMissedList').show();
    for (let a = 1; a <= $('#numPlayers').val(); a++){
      //display player buttons and scores
      $('#player' + a + 'Button').show();
      $('#player' + a + 'Score').show();
      $('#player' + a + 'Scroll').show();
      //default name given and put in button if left blank
      if (!$('#player' + a + 'Input').val()){
        $('#player' + a + 'Button').text('Player ' + a);
        playerNamesArr.push('Player ' + a);
        $('#player' + a + 'Name').text('Player ' + a + ' Missed: ');
      }
      //players name put in button
      else{
        $('#player' + a + 'Button').text($('#player' + a + 'Input').val());
        playerNamesArr.push($('#player' + a + 'Input').val());
        $('#player' + a + 'Name').text($('#player' + a + 'Input').val() + ' Missed: ');
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
    $('#endMultigos').text(playerNamesArr[0] + ' Wins!').addClass('winText');
    $('#startButton').show();
    $('#gosMultiNote').hide();
    run.style.display = 'none';
  }
}

//click events for player buttons in multiplayer gos
function playerButtonClickEvents(p_,pScore,pnum,text){
  let missedTrick = $('#trick').text();
  p_.push(skate[p_.length]);
  pScore.innerHTML = p_.join('');
  $('#player' + pnum + 'Button').prop('disabled',true);
  remainingPlayers(p_,text);
  $('#player' + pnum + 'Missed').text($('#player' + pnum + 'Missed').text() + ' ' + missedTrick + ' - ');
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
let gosSoloLanded = true;

soloButton.addEventListener('click',function(){
  difficultyDisplay('block');
  gosPlayersDisplay('none');
  startButtonDisplay('block');
  soloGame = true;
});

    //determines if ai landed it or not and displays it
    function didTheyLand(){
      questionDisplay.style.display = 'block';
      let selectedDifficulty = $('#difficulty-select').val();
      let num = rngLength(100);
      let thumbsUp = '<i class="fas fa-thumbs-up" style="color: green"></i>';
      let thumbsDown = '<i class="fas fa-thumbs-down" style="color: red"></i>'
      let landed = 'They landed it  ' + thumbsUp;
      let missed = 'They missed it  ' + thumbsDown;
      
      let trickDisplay = document.getElementById('trick');
      let difficultyNum = difficultySettings([trickDisplay.innerHTML,selectedDifficulty]);
      num > difficultyNum ? gosSoloLanded = false : gosSoloLanded = true;
      aiLandedComment.innerHTML = num > difficultyNum ? missed : landed;
    }

    //updating stats for wins, current win streak, and longest win streak
    function gosSoloWinStats(soloDifficulty){
      if (soloDifficulty === 'Easy'){
        !localStorage.easyWins ? localStorage.easyWins = 1 : localStorage.easyWins++;
        !localStorage.easyActiveWinStreak ? localStorage.easyActiveWinStreak = 1 : localStorage.easyActiveWinStreak++;
        if (!localStorage.easyWinStreak){
          localStorage.easyWinStreak = 1;
        }
        else{
          if (parseInt(localStorage.easyActiveWinStreak,10) > parseInt(localStorage.easyWinStreak,10)){
            localStorage.easyWinStreak = localStorage.easyActiveWinStreak;
          }
        }
      }

      if (soloDifficulty === 'Medium'){
        !localStorage.mediumWins ? localStorage.mediumWins = 1 : localStorage.mediumWins++;
        !localStorage.mediumActiveWinStreak ? localStorage.mediumActiveWinStreak = 1 : localStorage.mediumActiveWinStreak++;
        if (!localStorage.mediumWinStreak){
          localStorage.mediumWinStreak = 1;
        }
        else{
          if (parseInt(localStorage.mediumActiveWinStreak,10) > parseInt(localStorage.mediumWinStreak,10)){
            localStorage.mediumWinStreak = localStorage.mediumActiveWinStreak;
          }
        }
      }

      if (soloDifficulty === 'Hard'){
        !localStorage.hardWins ? localStorage.hardWins = 1 : localStorage.hardWins++;
        !localStorage.hardActiveWinStreak ? localStorage.hardActiveWinStreak = 1 : localStorage.hardActiveWinStreak++;
        if (!localStorage.hardWinStreak){
          localStorage.hardWinStreak = 1;
        }
        else{
          if (parseInt(localStorage.hardActiveWinStreak,10) > parseInt(localStorage.hardWinStreak,10)){
            localStorage.hardWinStreak = localStorage.hardActiveWinStreak;
          }
        }
      }

      if (soloDifficulty === 'Pro'){
        !localStorage.proWins ? localStorage.proWins = 1 : localStorage.proWins++;
        !localStorage.proActiveWinStreak ? localStorage.proActiveWinStreak = 1 : localStorage.proActiveWinStreak++;
        if (!localStorage.proWinStreak){
          localStorage.proWinStreak = 1;
        }
        else{
          if (parseInt(localStorage.proActiveWinStreak,10) > parseInt(localStorage.proWinStreak,10)){
            localStorage.proWinStreak = localStorage.proActiveWinStreak;
          }
        }
      }

      if (soloDifficulty === 'Insane YouTuber'){
        !localStorage.insaneYouTuberWins ? localStorage.insaneYouTuberWins = 1 : localStorage.insaneYouTuberWins++;
        !localStorage.insaneYouTuberActiveWinStreak ? localStorage.insaneYouTuberActiveWinStreak = 1 : localStorage.insaneYouTuberActiveWinStreak++;
        if (!localStorage.insaneYouTuberWinStreak){
          localStorage.insaneYouTuberWinStreak = 1;
        }
        else{
          if (parseInt(localStorage.insaneYouTuberActiveWinStreak,10) > parseInt(localStorage.insaneYouTuberWinStreak,10)){
            localStorage.insaneYouTuberWinStreak = localStorage.insaneYouTuberActiveWinStreak;
          }
        }
      }
    }

    //updating stats for losses and ends current win streak
    function gosSoloLoseStats(soloDifficulty){
      if (soloDifficulty === 'Easy'){
        !localStorage.easyLosses ? localStorage.easyLosses = 1 : localStorage.easyLosses++;
        if (localStorage.easyActiveWinStreak){
          localStorage.easyActiveWinStreak = 0;
        }
      }

      if (soloDifficulty === 'Medium'){
        !localStorage.mediumLosses ? localStorage.mediumLosses = 1 : localStorage.mediumLosses++;
        if (localStorage.mediumActiveWinStreak){
          localStorage.mediumActiveWinStreak = 0;
        }
      }

      if (soloDifficulty === 'Hard'){
        !localStorage.hardLosses ? localStorage.hardLosses = 1 : localStorage.hardLosses++;
        if (localStorage.hardActiveWinStreak){
          localStorage.hardActiveWinStreak = 0;
        }
      }

      if (soloDifficulty === 'Pro'){
        !localStorage.proLosses ? localStorage.proLosses = 1 : localStorage.proLosses++;
        if (localStorage.proActiveWinStreak){
          localStorage.proActiveWinStreak = 0;
        }
      }

      if (soloDifficulty === 'Insane YouTuber'){
        !localStorage.insaneYouTuberLosses ? localStorage.insaneYouTuberLosses = 1 : localStorage.insaneYouTuberLosses++;
        if (localStorage.insaneYouTuberActiveWinStreak){
          localStorage.insaneYouTuberActiveWinStreak = 0;
        }
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
    //adjust text style for you win/lose
        resultsDisplay.className = 'winText';
    //winner
        if(playAi.length === 5){
          resultsDisplay.style.color = "#006400";
          resultsDisplay.innerHTML = "You Win!";
          commentDisplay.style.color = "#006400";
          commentDisplay.innerHTML = winComment[randComNum];
          gosSoloWinStats($('#difficulty-select').val());  
        }

    //loser
        else{
          resultsDisplay.style.color = "#8B0000";
          resultsDisplay.innerHTML = "You Lose";
          commentDisplay.style.color = "#8B0000";
          commentDisplay.innerHTML = loseComment[randComNum];
          gosSoloLoseStats($('#difficulty-select').val());
        }
      }   
    } 

    //trick landed 
    function gosYes(){
    //update and display results
      let aiDisplay = document.getElementById("ai");
      if (gosSoloLanded === false){
        playAi.push(skate[playAi.length]);
        aiDisplay.innerHTML = playAi.join("");
        endgos();
      }
    }
    
    //trick not landed 
    function gosNo(){
      //update and display results
      let youMissed = document.getElementById('youMissed');
      let youDisplay = document.getElementById("you");
      if (gosSoloLanded === true){
        playYou.push(skate[playYou.length]);
        youDisplay.innerHTML = playYou.join("");
      //displays missed trick in red so you can see which ones were letters
        youMissed.innerHTML = soloMissedList += '<span style="color: #8B0000">'+$('#trick').text()+'&nbsp - &nbsp </span>'; 
        endgos();
      }
      //displays missed trick in black
      else{
        youMissed.innerHTML = soloMissedList += $('#trick').text() + '&nbsp - &nbsp';
      }
    }

    //gos function  
    function gameOfSkate(){
      getAttempts();
      //display game of skate hud
      if (soloGame){
        let gosHud = document.getElementById('gosHud');
        gosHud.style.display = 'block';
        $('#gosSoloMissedList').show();
        nrTrickArray();
        didTheyLand();
      }
      else{
        nrTrickArray();
      }
    }

  //******************* Get a Trick and Standard Game *********************************
  function getTrick(){
    getAttempts();
    //check if standard or marathon
    if ($('#mode-select').val() === 'Standard' || $('#mode-select').val() === 'Marathon'){
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
   
    //**********************TRICK***********************
  //set and display trick
    let theTrick = [stanceTag,fsbsTag,boardTag,bodyTag,flipTag];
    
    isItATrick(theTrick);

    if (removedOrNot(trickLib(theTrick))){
      getTrick();
    }
    else{
    display(theTrick);
      if ($('#mode-select').val() === 'Marathon'){
        marathonTrick = theTrick;
        marathon();
      }
    }
  }
    if ($('#mode-select').val() === 'No-Repeat'){
      noRepeat();
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
      trickStats('yes');
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
      trickStats('no');
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
      $('#gosMultiNote').show();
    }
    else{
      difficultyDisplay('none');
      cleargos();
      ynButtons();
      ynButtonsEvent();
    }
    gamesPlayed($('#mode-select').val());
    startButtonDisplay('none');
    getTrick();
  })
  
  //run get trick function on click
  run.addEventListener("click",function(){
    getTrick();
    enableMultigosButtons();
  });
    
  })();//the end
  
  