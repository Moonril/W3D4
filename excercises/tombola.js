

// creare una funzione che estragga un numero a caso tra 1 e 90

const generateRandomNumber = function () {
    const randomNumber = Math.floor(Math.random() * 90 + 1)
    console.log(randomNumber)
    return randomNumber // perchè non riesco ad usare questa const fuori?
}
// generateRandomNumber() // - funziona

// e collegarla al tasto 'estrai' id="generateRandomNumberButton"


// creare le card per ogni numero del tabellone

// <div class="number-card selected" >
//        <h3>90</h3>
// </div>
//  <div class="number-card" >
//          <h3>90</h3>
// </div>


// quando un numero è uscito, la card deve ricevere la class .selected
// devono rimanere selezionate fino alla fine del gioco (maybe stop refresh?)

const createNumberCards = function() {


    //creata la card, mettere in for loop per creare 90 cards

    for (let i = 0; i < 90; i++) {
        //prima card creata, questo loop dovrebbe girare 90 volte
        const numberCard = document.createElement('div')
        numberCard.classList.add('number-card')
        //contenuto della card
        const cardValue = document.createElement('h3')
        cardValue.innerText = i + 1

        
        //creo un if per aggiungere la classe selected se necessario, però forse va inserito da qualche altra parte

       /*  const alreadySelected = document.querySelector('.selected')

        if (alreadySelected !== null) {
            // vado a togliere la classe "selected" dalla cella alreadySelected
            alreadySelected.classList.remove('selected')
        }
        cardValue.classList.add('selected') */



        //append contenuto
        numberCard.appendChild(cardValue)

        // troviamo il container di number card
        const tabellone = document.getElementById('tabellone')
        tabellone.appendChild(numberCard)

    }


}




// chiamiamo le funzioni in ordine corretto:
// 1) generiamo le carte
createNumberCards()
// 2) poi generiamo il numero che assegnerà la classe .selected
generateRandomNumber()