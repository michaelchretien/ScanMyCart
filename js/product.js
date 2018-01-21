/*  Hackatown 2018 - ScanMyCart
*	Authors : Michael Chretien, Antoine Gaulin, Jean-Sebastien Lemaire
*	Brief : Get product information from a codebar picture 
*/

/* File input 	#barcodeFile
*  State		#queryState
*  Picture		#picture
*  Data			#productData
*
*
*
*/ 

document.getElementById('barcodeFile').onchange = processBarcode;

/////////////////////////////////////////////////
/// Extract bar code from picture
/////////////////////////////////////////////////
function processBarcode()
{
	document.getElementById('queryState').innerHTML = 'Decoding in process...';
	
	var image = new Image();

    image.onload = function () {

        var canvas = document.getElementById('canvas');
        var width = canvas.width;
        var height = canvas.height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);

        var barcode = new Barcode(context, width, height);
        var line = barcode.scan();

        if (line) {

            getProductInformation(line.isbn);
			document.getElementById('queryState').innerHTML = 'Decoded : ' + line.isbn;

        } else {
            document.getElementById('queryState').innerHTML = 'Sorry, could not find barcode… please try again';
        }
    };

    image.src = window.URL.createObjectURL(this.files[0]);
}

function getBarcode()
{
	document.getElementById('queryState').innerHTML = 'Decoding in process...';
	
	var image = new Image();

    image.onload = function () {

        var canvas = document.getElementById('canvas');
        var width = canvas.width;
        var height = canvas.height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, width, height);

        var barcode = new Barcode(context, width, height);
        var line = barcode.scan();

        if (line) {

            getProductInformation(line.isbn);
			document.getElementById('queryState').innerHTML = 'Decoded : ' + line.isbn;

        } else {
            document.getElementById('queryState').innerHTML = 'Sorry, could not find barcode… please try again';
        }
    };

    image.src = window.URL.createObjectURL(this.files[0]);
	
	
	
}

/////////////////////////////////////////////////
/// Get information from OpenFoodFact db
/////////////////////////////////////////////////
function getProductInformation(code)
{
	console.log("https://world.openfoodfacts.org/api/v0/product/" + code + ".json");
	$.getJSON( "https://world.openfoodfacts.org/api/v0/product/" + code + ".json", function( json ) {
		//console.log(json );
		
		if(json.status_verbose == "product not found")
		{
			document.getElementById('queryState').innerHTML = 'Product not found';
		}
		else
		{
			var product = {
				name : json.product.product_name,
				code : code,
				carbon : json.product.carbon_footprint_value,
				country : json.product.countries
			};
			
			fillInfos();
			//console.log(product);
			//document.getElementById("productData").innerHTML = product.name + "\n" + product.code + "\n" + product.carbon + "\n" + product.country;			
		}
 });
	
}

/////////////////////////////////////////////////
/// Fill infos on page
/////////////////////////////////////////////////
function fillInfos(product)
{
	
}
