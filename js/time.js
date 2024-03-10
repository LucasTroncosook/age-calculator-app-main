const inputElemnts = document.querySelectorAll("input[type='text']");
const messengerDate = document.querySelectorAll('.messenger-date');
const colorError = document.querySelectorAll('.time-day div span')
const yearResult = document.getElementById('year-result');
const monthsResult = document.getElementById('months-result');
const daysResult = document.getElementById('days-result');
const date = {};
const meses = [
    {
        '01': 31
    },
    {
        '02': 28
    },
    {
        '03': 31
    },
    {
        '04': 30
    },
    {
        '05': 31
    },
    {
        '06': 30
    },
    {
        '07': 31
    },
    {
        '08': 31
    },
    {
        '09': 30
    },
    {
        '10': 31
    },
    {
        '11': 30
    },
    {
        '12': 31
    }
];

console.log(colorError, inputElemnts)

inputElemnts.forEach(item => {
    item.addEventListener('input', (event)=>{
        const valorActual = event.target.value;
        if(isNaN(valorActual)){
            event.target.value = "";
        }
    })
})


const addErrorColor = ()=>{
    inputElemnts.forEach(input => {
        input.classList.add('error-color-input');
    })

    colorError.forEach(error => {
        error.classList.add('error-color')
    })
}

const removeErrorColor = ()=>{
    inputElemnts.forEach(input => {
        input.classList.remove('error-color-input');
    })

    colorError.forEach(error => {
        error.classList.remove('error-color')
    })
}

const resultDate = (e) => {
    e.preventDefault();
    let indiceDate = 0;
    inputElemnts.forEach(item => {
        date[item.placeholder] = +item.value
    })

    const {DD, MM, YYYY} = date;
    const fecha = new Date();

    validarYear = YYYY => YYYY >= 1900 && YYYY <= fecha.getFullYear();
    validarMonth = MM => MM >= 1 && MM <= 12;
    validarDay = (DD, MM) => {
        const dayMonth = meses[MM - 1];
        for (maxDay in dayMonth){
            return DD >= 1 && DD <= dayMonth[maxDay]
        }
    };    

    // Primer solucion, si los input donde no se agrega un valor aparecen el mensaje 
    for(DMY in date){
        if(!date[DMY]){
            messengerDate[indiceDate].textContent = "This field is required";
            addErrorColor();
        } else if(!validarDay(DD,MM) && !validarMonth(MM) && !validarYear(YYYY)){
            messengerDate[0].textContent = "Must be a valid day";
            messengerDate[1].textContent = "Must be a valid month";
            messengerDate[2].textContent = "Must be in the post";
            addErrorColor();
        } else if(!validarDay(DD,MM)){
            messengerDate[0].textContent= "Must be a valid date";
            messengerDate[1].textContent= "";
            messengerDate[2].textContent= "";
            addErrorColor();
        } else {
            messengerDate[indiceDate].textContent = "";
            removeErrorColor();

            let añosDiferencia = fecha.getFullYear() - YYYY;
            let mesesTranscurridos = fecha.getMonth() + 1 - MM;
            let sumaDias = fecha.getDate() - DD;
            console.log(mesesTranscurridos)

            if (sumaDias < 0) {
                mesesTranscurridos--;
                console.log(mesesTranscurridos)
                sumaDias += meses[MM - 1][('0' + MM).slice(-2)];
                console.log(meses[MM - 1][('0' + MM).slice(-2)])
            }

            // Ajustar los meses si han pasado más de 30 días
            if (sumaDias >= 30) {
                mesesTranscurridos++;
            }

            // Mostrar los resultados
            yearResult.textContent = `${añosDiferencia}`;
            monthsResult.textContent = `${mesesTranscurridos}`;
            daysResult.textContent = `${sumaDias}`;
        }
        indiceDate ++;
    }
}

const buttonResult = document.getElementById('button-result');
buttonResult.addEventListener('click', resultDate);
