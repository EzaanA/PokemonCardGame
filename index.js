let cardsArray = [
  {
  'name': 'gola',
  'img': 'gola.png'
}, {
  'name': 'mewt',
  'img': 'mewt.png'
}, {
  'name': 'charm',
  'img': 'charm.png'
}, {
  'name': 'meow',
  'img': 'meow.png'
}, {
  'name': 'snor',
  'img': 'snor.png'
}, 
{
  'name': 'unq',
  'img': 'unq.png'
}, {
  'name': 'ditto',
  'img': 'ditto.png'
}, {
  'name': 'grn',
  'img': 'grn.png'
}, {
  'name': 'singer',
  'img': 'singer.png'
}, {
  'name': 'psy',
  'img': 'psy.png'
},
 {
  'name': 'keeda',
  'img': 'keeda.png'
}, {
  'name': 'squirt',
  'img': 'squirt.png'
}];

let score = 0;
let lives=6; 
let ct=0,res=0;


  
  // console.log(cardsArray);

  let gameGrid = cardsArray.concat(cardsArray).sort(function () {
    return 0.5 - Math.random();
  });
  
  let firstGuess = '';
  let secondGuess = '';
  let count = 0;
  let previousTarget = null;
  let delay = 1200;
  
  let game = document.getElementById('game');
  let grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  game.appendChild(grid);
  
  gameGrid.forEach(function (item) {
    let name = item.name,
        img = item.img;
  
  
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
  
    let front = document.createElement('div');
    front.classList.add('front');
  
    let back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';
  
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
  
  let match = function match() {
    let selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
      card.classList.add('match');
    });
  };
  
  let resetGuesses = function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
  
    let selected = document.querySelectorAll('.selected');
    selected.forEach(function (card) {
      card.classList.remove('selected');
    });
  };

  grid.addEventListener('click', function (event) {
  
    let clicked = event.target;
  
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
      return;
    }
  
    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        console.log(firstGuess);
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        console.log(secondGuess);
        clicked.parentNode.classList.add('selected');
      }
  
      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
            score++;
            document.querySelector('.rscore').innerHTML = `Score : ${score}`
            if(score==12){
              document.querySelector('.grid').classList.add('removeEv')
              setTimeout(()=>{
                document.querySelector('.youwin').classList.add('visibil');
                document.querySelector('.youwin').classList.remove('youwin');
                document.querySelector('.visibil').innerHTML =`YOU WIN!`
              },1000)
            }
          setTimeout(match, delay);
        }
        setTimeout(resetGuesses, delay);
      }
      previousTarget = clicked;
    }

    if(firstGuess != secondGuess && secondGuess!=''){
      ct++;
      if(ct%2==0){
        lives-=1;
          document.querySelector('.lives').innerHTML = `LIVES : ${lives}`;
      }
      if(lives==0){
        endGame();
      }
    }

  });



  function endGame(){
    setTimeout(()=>{
      document.querySelector('#game').classList.add('endgame');
      document.querySelector('.lose').classList.add('lvis');
      document.querySelector('.lose').innerHTML = 'YOU LOSE!'
    },1000)
  }


