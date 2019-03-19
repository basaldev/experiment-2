const fetch = require("node-fetch");
const symptomsLookup = require("./symptoms");

exports.handler = async event => {
	const { BirthYear, Gender, Symptom } = event.currentIntent.slots;

	const cleanedSymptom = Symptom.toLowerCase().trim()
	const foundSymptom = symptomsLookup.find(el => el.Name.toLowerCase() === cleanedSymptom)

	const TOKEN = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imx1a2VAZXhvZGV2aHViLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMjA5OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMTktMDMtMTUiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE1NTI2NzEyNjEsIm5iZiI6MTU1MjY2NDA2MX0.GysQ1Qj-53R4fBVD4zKtJ-NAF17OzVZTGQ5zDWON5YU`;
	const LANGUAGE = "en-gb"
	const YEAR_OF_BIRTH = BirthYear
	const GENDER = Gender
	const SYMPTOMS = `[${foundSymptom.ID}]`

	const endpoint = "https://healthservice.priaid.ch/diagnosis"

	const url = `${endpoint}?language=${LANGUAGE}&gender=${GENDER}&year_of_birth=${YEAR_OF_BIRTH}&symptoms=${SYMPTOMS}&token=${TOKEN}`;


	const res = await fetch(url)
	const info = await res.json();

	const response = {
		dialogAction: {
			type: "Close",
			fulfillmentState: "Fulfilled",
			message: {
				contentType: "CustomPayload",
				content: JSON.stringify(dummyResponse)
			}
		}
	};

	return response;
};
