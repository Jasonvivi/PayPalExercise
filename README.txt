node app:
1. url: localhost:8888
2. if the request.method is POST, which means it is from PayPage.js. its body has data json strucute. The serve will parse it and then do some operation e.g store in database or something, which I didn't do in my exercise.
{
	"request": {
		"listings": [{
			"title": "Ship to",
			"heading": "Kenneth Thomepson",
			"subheading": "8114 Grow Drive #9, Cape Neddick, ME 03902"
		}, {
			"title": "Pay with",
			"heading": "BANK OF AMERICA CHECKING x-5567",
			"subheading": "Visa x-4512(backup)"
		}],
		"total": "$28.98",
		"error": "200"
	}
}

3. if the request.method is GET, the node app will do nothing with request, just return json data as the response. Here, to make it simple, I also return the same json data if the request is POST.
 {
	"response": {
		"listings": [{
			"title": "Ship to",
			"heading": "Kenneth Thomepson",
			"subheading": "8114 Grow Drive #9, Cape Neddick, ME 03902"
		}, {
			"title": "Pay with",
			"heading": "BANK OF AMERICA CHECKING x-5567",
			"subheading": "Visa x-4512(backup)"
		}],
		"total": "$28.98",
		"error": "200"
	}
}

react native app(iOS):
1. index.ios.js : register the root component
2. StartPage.js: Start page simulate the page before Pay Page. When the button is pressed, it will send a get request and get json from node app, than pass the data to PayPage.js. If it gets error, it will print the error message, otherwise, it will jump to PayPage.
3. Paypage.js: using a listview to show first two rows and using listview footer to show the rest rows. When the 'pay now' button is pressed, it will send json data to node app and get return.
4. PayResult: If pay successfully, it will jump to PayResult.