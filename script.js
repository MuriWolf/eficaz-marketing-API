// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '54a8813819msh2b80e70b290d77ep10fcfdjsn538c63a37ef4',
// 		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
// 	}
// };

fetch('https://api.dictionaryapi.dev/api/v2/entries/en/rice')
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));