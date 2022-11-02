const wordToSearch = document.querySelector("#word");
const searchedWord = document.querySelector("#searched-word");
const errorMessage = document.querySelector("#error-message")
const phoneticText = document.querySelector("#phonetic-text")
const phoneticAudio = document.querySelector("#phonetic-audio")
const definitions = document.querySelector("#definitions")
const wordInfo = document.querySelector(".word-info")
const searchWordBtn = document.querySelector(".search-word-btn")

searchWordBtn.addEventListener("click", () => {
	searchWord(wordToSearch.value); 
})

async function searchWord(word) {
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
	.then(response => response.json())
	.then(response => {
		handleError(false)
		console.log(response)
		searchedWord.textContent = response[0].word 
		phoneticText.textContent = response[0].phonetics[0].text

		response[0].phonetics.forEach((element, i) => {
			if(element.audio != "") {
				phoneticAudio.src = element.audio
			}
		});
		while (definitions.hasChildNodes()) {
			definitions.removeChild(definitions.firstChild);
		}
		response[0].meanings[0].definitions.forEach(element => {
			let newEl = createEl(definitions, "li")
			console.log(definitions);
			newEl.textContent = element.definition + ` (${element.example})`
			// console.log(element);
		});
	})
	// .catch(err => {
	// 	handleError(true)
	// 	errorMessage.textContent = "Word not finded! Try type again.";
	// });
}

// let newEl = createEl(wordInfo, "li")
// newEl.textContent = "aijdiuas"

function handleError(bool) {
	if (bool === true) {
		errorMessage.classList.remove("d-none")
		wordInfo.classList.add("d-none")
	} else {
		errorMessage.classList.add("d-none")
		wordInfo.classList.remove("d-none")
	}
}
 
function createEl(father, el) {
	console.log(father, el);
	let newEl = document.createElement(el)
	father.appendChild(newEl)
	return newEl
}