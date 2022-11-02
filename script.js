function getEl(el) {
	return document.querySelector(el);
}

const wordToSearch = getEl("#word")
const searchedWord = getEl("#searched-word");
const errorMessage = getEl("#error-message")
const phoneticText = getEl("#phonetic-text")
const phoneticAudio = getEl("#phonetic-audio")
const definitions = getEl("#definitions")
const antonyms = getEl("#antonyms")
const synonyms = getEl("#synonyms")
const wordInfo = getEl(".word-info")
const searchWordBtn = getEl(".search-word-btn")

searchWordBtn.addEventListener("click", () => {
	searchWord(wordToSearch.value); 
})

async function searchWord(word) {
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
	.then(response => response.json())
	.then(response => {
		handleError(false)
		clearDataList(synonyms, antonyms, definitions)
		const data = response[0]

		searchedWord.textContent = data.word 
		
		// add phonetic 
		phoneticText.textContent = data.phonetics[0].text
		data.phonetics.forEach((element, i) => {
			if(element.audio != "") {
				phoneticAudio.src = element.audio
			}
		});

		// add definitions
		data.meanings[0].definitions.forEach(data => {
			if (data.definition && data.example) {
				definitions.parentElement.classList.remove("d-none")
				let newEl = createEl(definitions, "li")
				newEl.textContent = data.definition + ` Ex: (${data.example})`
			}
		});

		// add antonyms
		data.meanings[0].antonyms.forEach(data => {
			antonyms.parentElement.classList.remove("d-none")
			let newEl = createEl(antonyms, "li")
			newEl.textContent = data	
		});

		// add synonyms
		data.meanings[0].synonyms.forEach(data => {
			synonyms.parentElement.classList.remove("d-none")
			let newEl = createEl(synonyms, "li")
			newEl.textContent = data	
		});

	})
	.catch(err => {
		console.log(err);
		handleError(true)
		errorMessage.textContent = "Word not finded! Try type again.";
	});
}

function handleError(bool) {
	if (bool === true) {
		errorMessage.classList.remove("d-none")
		wordInfo.classList.add("d-none")
	} else {
		errorMessage.classList.add("d-none")
		wordInfo.classList.remove("d-none")
	}
}
 
function createEl(parent, el) {
	let newEl = document.createElement(el)
	parent.appendChild(newEl)
	return newEl
}

function clearDataList(...elements) {
	// Redefine todas as listas para branco, dessa maneira, quando uma nova palavra é pesquisada não há complito de dados.
	for (const el of elements) {
		while (el.hasChildNodes()) {
			el.parentElement.classList.add("d-none")
			el.removeChild(el.firstChild);
		}
	}
}