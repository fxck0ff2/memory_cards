import { useState } from "react"

function App() {
  
  const [startGame, setStartGame] = useState(false)
  const [cards, setCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const number = [1, 2, 3, 4, 5, 6];
  var openCard = [];

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  function newGame() {
    if (document.querySelector('section').children.length > 1 ) {
      setStartGame(false)
      document.querySelectorAll('.cardDiv').forEach((currentValue) => currentValue.setAttribute('state', 'close'));
    }
    const initialCards = number.concat(number).sort(() => 0.5 - Math.random);
    var initialSolved = {};
    for (let i = 1; i < number.length + 1; i++) {
      initialSolved[i] = false;
    }
    setSolved(initialSolved);
    setCards(shuffle(initialCards));
    setTimeout(() => {
      setStartGame(true)
    }, 300);
  }

  const flipCard = (card) => {
    card.setAttribute('state', 'open');
    openCard.push(card);
    if (openCard.length > 1) {
      const value = [openCard[0].querySelector('span').innerHTML, openCard[1].querySelector('span').innerHTML];
      if (value[0] == value[1]) {
        const updatedSolved = { ...solved };
        updatedSolved[value[1]] = true;
        setSolved(updatedSolved);
        openCard = [];
      } else {
        document.querySelector('section').style.pointerEvents = 'none';
        setTimeout(() => {
          openCard.forEach(element => element.setAttribute('state', 'close'));
          openCard = [];
          document.querySelector('section').removeAttribute('style');
        }, 300);
      }
      console.log(openCard);
    }
  }
  
  return (
    <>
      <button game={`${startGame}`} onClick={() => newGame()}>New game</button>
      <section game={`${startGame}`}>
      {
      cards.map((card, index) => {
        console.log(solved);
        return(
          <div className={`cardDiv`} solved={`${solved[card]}`} state={'close'} onClick={(e) => flipCard(e.target)}>
            <span key={index} className={`card card_front`}>{card}</span>
            <div className="card card_back"></div>
          </div>
        )
      })}
      </section>
    </>
  )
}

export default App

