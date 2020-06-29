function hetWeer() {

	// construct request
	var request = "https://api.openweathermap.org/data/2.5/weather?appid=a65629fe7ca2366b1bf9284c35d6a0b2&q=Dordrecht,nl";

	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		//console.log(response);

		var plaats = response.name; //plaats ophalen
		var tempratuur = Math.floor(response.main.temp - 273.15); // tempratuur in graden celcius ophalen
		var wind = response.wind.speed; // windsnelheid ophalen
		var melding = document.getElementById('melding'); // pak het id 'melding' uit de html code
		
		var toonPlaats = document.getElementById('plaats'); // haal het id 'plaats' op
		toonPlaats.innerHTML = plaats; // en zet daar de plaatsnaam in (dordrecht, staat in de request)

		var toonGraden = document.getElementById('graden'); // haal het id 'tempratuur' op
		toonGraden.innerHTML = tempratuur + "&#176;C"; // en zet daar de tempratuur in graden celcius in

		var toonWind = document.getElementById('wind'); // haal het id 'wind' op
		toonWind.innerHTML = "Windsnelheid: " + wind + " m/s"; // en zet daar de windsnelehid in met m/s erachter

		if (wind >= 7) { 
			document.getElementById('melding').innerHTML = "Op dit moment is het niet veilig om te landen en raden wij fietstochtjes af."; // laat dan deze melding zien dat je niet mag landen
		}

		else {  
			document.getElementById('melding').innerHTML = "Met een windsnelheid van " + wind + " m/s gaan jullie landen en kunnen de fietstochtjes beginnen!"; // laat dan deze melding zien dat het veilig is om te landen
		}
	})
	
	// catch error
	.catch(function (error) {
		console.error('Request failed', error);
	});
}

function fietsenHuur() {

	// construct request
	var request = "https://api.citybik.es/v2/networks/nextbike-dordrecht"; 

	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render free city bikes
	.then(function(response) {
		// console.log(response);

		var plaats = response.network.stations[4].name; // haal de plaatsnaam op
		var aantal = response.network.stations[4].free_bikes; // haal het aantal vrije fietsen op
	 

		if (aantal > 0) { 
			document.getElementById('aantal').innerHTML = "Op " + plaats + " zijn er op dit moment " + aantal + " fietsen te huur."; 
		}

		else { 
			document.getElementById('aantal').innerHTML = "Op dit moment zijn er helaas geen fietsen te huur in"; // laat dan deze melding zien
		}
	})

	.catch(function (error) {
		console.error('Request failed', error);
	}); 

};


// functies uitvoeren
hetWeer();
fietsenHuur();

