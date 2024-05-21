import { useState } from "react"

function App() {
  
  const [startGame, setStartGame] = useState(false);
  const [endModal, setEndModal] = useState(false)
  const [cards, setCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const [guessed, setGuessed] = useState(0);
  const [attempts, setAttempts] = useState(0);
  
  const number = [1, 2, 3,4,5,6];
  var openCard = [];

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  }

  function newGame() {
    if (document.querySelector('section').children.length > 1 ) {
      setEndModal(false);
      setGuessed(0);
      setAttempts(0);
      setStartGame(false);
      document.querySelectorAll('.cardDiv').forEach((currentValue) => currentValue.setAttribute('state', 'close'));
    }
    const initialCards = number.concat(number).sort(() => 0.5 - Math.random);
    var initialSolved = {};
    for (let i = 1; i < number.length + 1; i++) {
      initialSolved[i] = false;
    }
    setSolved(initialSolved);
    setCards(shuffle(initialCards));
    setStartGame(true);
  }

  const flipCard = (card) => {
    card.setAttribute('state', 'open');
    openCard.push(card);
    if (openCard.length > 1) {
      setAttempts(attempts + 1)
      const value = [openCard[0].querySelector('span').innerHTML, openCard[1].querySelector('span').innerHTML];
      if (value[0] == value[1]) {
        const updatedSolved = { ...solved };
        updatedSolved[value[1]] = true;
        openCard = [];
        setSolved(updatedSolved);
        setGuessed(guessed + 1);
        if (guessed == number.length - 1) {
          console.log('123');
          endGame();
        }
      } else {
        document.querySelector('section').style.pointerEvents = 'none';
        setTimeout(() => {
          openCard.forEach(element => element.setAttribute('state', 'close'));
          openCard = [];
          document.querySelector('section').removeAttribute('style');
        }, 400);
      }
    }
  }

  const endGame = () => { // підрахунку вгаданих пар,
    setEndModal(true);
  }
  
  return (
    <>
      {(startGame) ? '' : <button onClick={() => newGame()}>Почати гру</button>}
      <section game={`${startGame}`}>
      {
      cards.map((card, index) => {
        return(
          <div key={`${index}`} data-key={`${index}`} className={`cardDiv`} solved={`${solved[card]}`} state={'close'} onClick={(e) => {flipCard(e.target)}}>
            <span className={`card card_front`}>{card}</span>
            <div className="card card_back"></div>
          </div>
        )
      })}
      {(endModal) ? 
      <div id="endGame">
          <div id="infoNew">
            <h1>Всі карточки вгадані</h1>
            <div>
              <p><h3>Вгадано пар:</h3><br /><strong>{guessed}</strong></p>
              <p><h3>Кількість спроб:</h3><br /><strong>{attempts}</strong></p>
            </div>
            <button onClick={() => newGame()}>Почати нову гру?</button>
          </div>
          <div id="cover"></div>
      </div> : ''}
      </section>
    </>
  )
}

export default App

