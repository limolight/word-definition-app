import './style.css'


let inputForm = document.getElementById('submit-form')
let wordToDefine = "hello"
let wordSpace = document.getElementById('the-word')
let wordPronounce = document.getElementById('word-pronounce')
let wordDefinition
let wordDefinitionContainer = document.getElementById('def-container')


var queryToApi = function() {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToDefine}`)
  .then(response => response.json())
  .then(function(json) {
    if(!Array.isArray(json)){
      wordPronounce.innerHTML = `${wordToDefine} is not a word in English language. Please try a different word.`
    }
    wordSpace.innerHTML = wordToDefine
    json[0].phonetics.forEach(function(item){
      if ('text' in item) {
        wordPronounce.innerHTML = item.text
      }
    })
    json[0].meanings.forEach(function(def){
      let wordDef = document.createElement('p')
      let line = document.createElement('hr')
      let partOfSpeech = def.partOfSpeech
      wordDef.className = "def-color def"
      wordDefinition = wordDefinitionContainer.appendChild(wordDef)
      wordDefinition.innerHTML = `<span class="part-of-speech">${partOfSpeech}: </span>`
      def.definitions.forEach(function(definition){
        let arr = def.definitions
        let lastItem = arr[arr.length - 1]
        if(arr.indexOf(definition) == arr.indexOf(lastItem)){
          wordDefinition.innerHTML += `${definition.definition}`
        }
        else {
        wordDefinition.innerHTML += `${definition.definition}<br/>`
      }
      })

    })
  })
  .catch(function(error){
    console.error(error)
  })
}

window.addEventListener('onbeforeunload', queryToApi())

inputForm.addEventListener('submit', e => {
  e.preventDefault()
  wordDefinitionContainer.innerHTML = ""
  wordToDefine = document.getElementById('word-search-input').value
  queryToApi()
  })
