const searchButton= document.getElementById("search")
const resultContainer = document.getElementById("definicion")
const audioContainer = document.getElementById("audio")
const oraciones = document.getElementById("oraciones")
searchButton.addEventListener("click", async(e)=>{
    e.preventDefault()
    document.querySelector(".hero").classList.add("heroResult")
    document.querySelector(".heroTitle").classList.add("hidden")
    resultContainer.innerHTML= ""
    audioContainer.innerHTML = ""
    oraciones.innerHTML=""
    const word = document.getElementById("word").value
    const url = `./api/${word}`
    const response = await axios.get(url)
     const data = await response.data
     const definitionTitle = document.createElement("h2")
     definitionTitle.textContent="Definition"
     resultContainer.appendChild(definitionTitle)
    //  console.log(data)
     data.results[0].lexicalEntries[0].entries[0].senses[0].definitions.map(item => {
        const definition = document.createElement("p")
        definition.textContent = item
        resultContainer.appendChild(definition)
    })
    const audioCon = document.createElement("audio")
    const audioTitle = document.createElement("h2")
    audioTitle.textContent = "Pronunciation"
    audioContainer.appendChild(audioTitle)
    audioCon.setAttribute("src", data.results[0].lexicalEntries[0].entries[0].pronunciations[1].audioFile)
    audioCon.setAttribute("controls", "true")
    audioContainer.appendChild(audioCon)
    if(data.results[0].lexicalEntries[0].phrases){
        oraciones.innerHTML="<h2>Examples</h2>"
        data.results[0].lexicalEntries[0].phrases.map(item=> {
            oraciones.innerHTML += `<p>* ${item.text}</p>`
        })
    }else{
        oraciones.innerHTML="<h2>I'm Sorry, but we don't have examples</h2>"
    }
    
})