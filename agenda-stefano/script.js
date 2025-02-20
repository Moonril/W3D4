//prima dobbiamo capire in che mese siamo e disegnare un numero di celle adeguato

const now = new Date() //costruttore, 'now' è un oggetto di tipo 'data'

const monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']



//dividiamo il codice in blocchi



// per poter salvare dei giorni di meeting abbiamo creato un array di stringhe, nel ciclo for che crea celle abbiamo aggiunto un .push che aggiunge un array di stringhe per ogni giorno
const memory = []




// otteniamo il mese corrente da inserire nell'h1

const showMonthInHeader = function(){
    

    const monthIndex = now.getMonth() // questo ci rende un numero, gennario è 0
    console.log('Indice mese corrente', monthIndex) // 1
    const currentMonth = monthNames[monthIndex] // mi ritorna febbraio
    console.log('Mese corrente', currentMonth) // Febbraio

    // mettiamo il mese corrente in h1 lasciato vuoto
    const h1Title = document.getElementById('current-month')
    // manipoliamolo

    h1Title.innerText = currentMonth // adesso l'h1 mostrerà il mese corrente
}



// vado a capire quanti giorni ha il mese corrente
const daysInThisMonth = function(){
    // il ragionamento è: dato il giorno corrente, vado a ricercare il primo giorno del mese successivo. dalla data che ottengo sottraggo 1 giorno.
    //il cui numero rappresenta anche il numero totale dei giorni del mese corrente. YES BUT WHY

    // calcoliamo la data per atrovare il primo giorno del prossimo mese
    const year = now.getFullYear()
    const month = now.getMonth()

    const lastDayOfCurrentMonth = new Date(year, month + 1, 0) //non ho capito, il primo giorno del prossimo mese

    // questa è la data dell'ultimo giorno del mese corrente

    console.log()
    const numberOfDays = lastDayOfCurrentMonth.getDate() //28
    console.log('da questa data estrapoliamo il numero del giorno', numberOfDays)
    return numberOfDays


    // JS sa già quanti giorni ha un mese, per questo non vanno calcolati singolarmente, ma non ha un metodo per darci questo numero. un getDays non esiste, bisogna fare tutta questa trafila per ottenre il numero di giorni del mese corrente
}


//creo la funzione showAppointments, che mostrerà la sezione degli appuntamenti e creerà la lista sulla base del giorno selezionato

const showAppointments = function(i){
    //tolgo il display none sulla section degli appuntamenti
    const appointmentsSection = document.getElementById('appointments')
    appointmentsSection.style.display = 'block'


    // ora la sezione è visibile ma vuota
    // dobbiamo recuperare gli appuntamenti della giornata
    // e mostrarli

    const appointmentsToShow = memory[i]
    const appointmentsList = document.querySelector('#appointments ul')

    //svuoto la lista, per evitare di appendere li su li già esistenti
    appointmentsList.innerHTML= ''


    for(let i = 0; i < appointmentsToShow.length; i++){
        const newLi = document.createElement('li')
        newLi.innerText = appointmentsToShow[i]


        appointmentsToShow[i]
    }
}



// creiamo le celle del calendario

const createCalendarCells = function (numberOfDays) {


    //aggiungo alla memoria calendario una sottosezione per questa giornata
    memory.push([])

    // numberOfDays rappresenta il numero delle celle  che devono essere create
    // devo eseguire la creazione di UNA cella NUMBEROFDAYS volte


    for(let i = 0; i < numberOfDays; i++){

        // prima cella
    const cell = document.createElement('div') //creiamo div
    cell.classList.add('day')  //aggiungimole  una classe


    //rendiamo cliccabile la cella appena creata!
    cell.addEventListener('click', ()=> {

        const alreadySelected = document.querySelector('.selected') //qui ci va il punto: .selected perchè la sto cercando nel file conq query selector
        if(alreadySelected !== null){
            alreadySelected.classList.remove('selected')
        }


        cell.classList.add('selected') // .toggle invece di .add assegna/rimuove la classe ad ogni click, però al momento si possono selzionare tutte le celle, non si deseleziona quando clicchi un'altra cella, controlla riga 66 per la soluzione


        //oltre a colorare la cella dobbiamo trasportarne il valore in basso a sinistra nella sezione newMeetingDay

        const spanToReplace = document.getElementById('newMeetingDay')
        spanToReplace.innerText = i + 1
        spanToReplace.classList.add('hasDay')


        // quando clicco su un cella verifico se quella cella ha degli appuntamenti

        if (memory[i].length > 0){
            //devo fare vedere gli appuntamenti
            showAppointments(i) //la creo da un'altra parte
        } else {
            //per questa giornata non ci sono appuntamenti da mostrare
            document.getElementById('appointemnts').style.display = 'none'
        }
    })

    // creiamo il contenuto della cell
    const cellValue = document.createElement('h3')
    cellValue.innerText = i + 1



    // calcoliamo il giorno di oggi, per poi far si che il giorno corrente sia in rilievo, si fa con un iff
    const today = now.getDate() //20
    if( i + 1 === today){   // se l'i+1 (giorno) è oggi allora ...
        cellValue.classList.add('color-epic')
    }

    // appendiamo il contenuto della cella(h3) alla cella(div)
    cell.appendChild(cellValue)

    //troviamo la section alla quale appender la cella

    const calendarSection = document.getElementById('calendar')
    calendarSection.appendChild(cell)

    //questo ciclio in febbraio si ripete 28 volte
    //fine ciclo
    }
        
}

const handleSubmit = function (e) {
    e.preventDefault()
    console.log('SALVIAMO APPUNTAMENTO')
  
    // su quale giorno ho cliccato? lo prendo dallo span in basso a sx
    const spanToReplace = document.getElementById('newMeetingDay') // lo span
    const selectedDay = parseInt(spanToReplace.innerText) // il valore dello span
    // '22' -> 22
    const timeInput = document.getElementById('newMeetingTime') // <input />
    const selectedTime = timeInput.value
    const meetingInput = document.getElementById('newMeetingName')
    const selectedName = meetingInput.value
  
    const appointment = `${selectedTime} - ${selectedName}` // "18:00 - Dentista"
  
    // ora dobbiamo "solamente" individuare il "cassetto" corretto dentro memory
    // e pusharci dentro la stringa appointment!
    memory[selectedDay - 1].push(appointment)
  
    console.log('APPUNTAMENTO SALVATO! ECCO MEMORY', memory)
  
    // andiamo a cercare la cella sul calendario corrispondente al giorno del nostro evento
    // e assegniamole la classe "dot"
    const cellWithAppointment = document.querySelector('.selected')
    // creo il pallino viola
    const dotElement = document.createElement('span')
    dotElement.classList.add('dot')
    // appendo il pallino viola alla cella "selected"
    cellWithAppointment.appendChild(dotElement)
  
    // mostriamo la sezione appointments
    showAppointments(selectedDay - 1) // selectedDay - 1 è l'indice giusto di memory
  
    // svuotiamo ora e nome
    timeInput.value = ''
    meetingInput.value = ''
  }



showMonthInHeader()

// popoliamo il calendario
const numberOfDays = daysInThisMonth()  //dovrebbe calcolare il numero dei giorni del mese corrente
// per febbraio ritorna 28!
createCalendarCells(numberOfDays)


const meetingForm = document.getElementById('newMeetingForm')
meetingForm.addEventListener('submit', (e) => {
  handleSubmit(e)
})


// gestiamo la logica del form per salvare gli appuntamenti
/* const meetingForm = document.getElementById('newMeetingForm')
meetingForm.addEventListener('submit', (e) => {
    e.preventDefault() //blocchiamo il refresh della pagina


    const spanToReplace = document.getElementById('newMeetingDay') // lo span
    const selectedDay = parseInt(spanToReplace.innerText) //valore dello span. '22' -> 22


    const timeInput = document.getElementById('newMeetingTime') //<input>
    const selectedTime = timeInput.value
    const meetingInput = document.getElementById('newMeetingName')
    const selectedName = meetingInput.value

    const appointment = `${selectedTime} - ${selectedName}`


    //ora dobbiamo slezionare il cassetto corretto dove mettere queste informazioni
    memory[selectedDay -1].push(appointment)

    console.log('appuntamento salvato', memory)

    //agiungiamo un dot ai giorni con un evento

    let cellWithAppointment = document.querySelector('.selected')

    const dotElement = document.createElement('span')
    dotElement.classList.add('dot')

    cellWithAppointment.appendChild(dotElement)

    //devo rimostrare la sezione appuntamenti 
    showAppointments(selectedDay - 1)

    //svuotiamo
    timeInput.value = ''
    meetingInput.value = ''

}) */