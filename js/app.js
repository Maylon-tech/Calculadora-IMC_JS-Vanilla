// IMC data

const data = [
    {
        min: 0,
        max: 18.4,
        classification:"Menor que 18,5",
        info: "Magreza",
        obesity:"0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification:"Entre 18,5 e 24,9",
        info: "Nomral",
        obesity:"0",
    },
    {
        min:25,
        max: 29.9,
        classification:"Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity:"I",
    },
    {
        min: 30,
        max: 39.9,
        classification:"Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity:"II",
    },
    {
        min: 40.0,
        max: 49.9,
        classification:"Entre 40,0 e 49,9",
        info: "Obesidade Morbida",
        obesity:"III",
    },
    {
        min: 50,
        max: 99,
        classification:"O Ceu e o Limite!",
        info: "Obesidade da Morte - pe na cova.",
        obesity:"X",
    },
]
            // Selecao de Elementos

// Tabela de Resultados do IMC                    
const imcTable = document.querySelector("#imc-table")

// Campo principal dos inputs e botoes.
const heightInput = document.querySelector("#height")
const weightInput = document.querySelector("#weight")
const calcBtn = document.querySelector("#calc-btn")
const clearBtn = document.querySelector("#clear-btn")

const calcContainer = document.querySelector("#calc.container")
const resultContainer = document.querySelector("#result-container")

const imcNumber = document.querySelector("#imc-number span")
const imcInfo = document.querySelector("#imc-info")

const backBtn = document.querySelector("#back-btn")

        // Funcao
// Funcao para pegar os dados do array acima 'data' e organizar em uma tabela 'div'
function createTable(data) {
    data.forEach((item) => {
        const div = document.createElement("div")
        div.classList.add("table-data")

        const classification = document.createElement("p")
        classification.innerText = item.classification

        const info = document.createElement("p")
        info.innerText = item.info

        const obesity = document.createElement("p")
        obesity.innerText = item.obesity

        // Fazendo a div receber os dados coletados acima. colocando na div com appendChild().
        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)

        // Colocar na Table a div construido acima.
        imcTable.appendChild(div)

    })
}
//Funcao para Limpar os Eventos.
function cleanInputs() {
    heightInput.value = ""
    weightInput.value = ""
}

// Validacao do textos digitados no inputs.
function validDigits(text) {
    return text.replace(/[^0-9,]/g, "")  // expressao regualares
}


function calcImc(weight, height) {
    //Constante  que pega a formula do IMC.
    const imc = (weight / (height * height)).toFixed(1)
    return imc
}

// Essa funcao de mostart e esconder o calculo e reusltado ficara e, calcBtn evento.
function showOrHideResults() {
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
}

        // Inicializacao
createTable(data)


        // Eventos
// array para os Inputs - buscando os dois inputas para mesmo evento de Limpar.

[heightInput, weightInput].forEach((elem) => {
    // Eento de click no botao de LImpar
    elem.addEventListener("input", (e) => {   //Evento de input - quando digita algo ele vai Ativar.

        const updatedValue = validDigits(e.target.value)  // Pega o valor atual Digitado.
        // O valor ditital atual e atualizar o valor pra depois limpar o valor ditado NAO permitido.
        e.target.value = updatedValue

    }) 
})

// Evento de CLick para o botao Calcular.
calcBtn.addEventListener("click", (e) => {
    e.preventDefault()

    // Converter o texto do input para numeros.
    const height = +heightInput.value.replace(",", ".")
    const weight = +weightInput.value.replace(",", ".")
    
    // Validation - Se nao tiver peso OU nao tiver altura..!! entao retorna,..
    if (!weight || !height) return

    const imc = calcImc(weight, height)
   

    /* Percorrer todos os dados (data_array) usando o forEach()
    E criando uma variavel que recebe o dado vindo do forEach()*/
   let info 
   data.forEach((item) => {
    // O IF faz a verificacao para cada vez que o User for Calcular o IMC.
    if(imc >= item.min && imc <= item.max) {
        info = item.info
    }
   })
    
    // Se nao achou nenhum info entao Retorna.
    if(!info) return

    imcNumber.innerText =  imc
    imcInfo.innerText = info

    showOrHideResults()
})


// Evento responsavel por Limpar os Inputs.
clearBtn.addEventListener("click", (e) => {
    e.preventDefault()
    cleanInputs()
})