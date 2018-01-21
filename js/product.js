/*  Hackatown 2018 - ScanMyCart
*	Authors : Michael Chretien, Antoine Gaulin, Jean-Sebastien Lemaire
*	Brief : Get product information from a codebar picture 
*	Uses : OpenFoodFacts database and https://github.com/liip/barcode.js
*/

/* File input 	#barcodeFile
*  State		#queryState
*  Picture		#picture
*  Data			#productData
*/ 

document.getElementById('barcodeFile').onchange = processBarcode;

/////////////////////////////////////////////////
/// Extract bar code from picture
/////////////////////////////////////////////////
function processBarcode()
{
	document.getElementById('queryState').innerHTML = 'Decodage en cours...';
	
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
			document.getElementById('queryState').innerHTML = 'Code decode : ' + line.isbn;

        } else {
            document.getElementById('queryState').innerHTML = 'Desole, nous ne sommes pas en mesure de le decoder...veuillez reessayer';
        }
    };
	
	image.src = window.URL.createObjectURL(this.files[0]);

}

function getBarcode()
{

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
			document.getElementById('queryState').innerHTML = 'Produit non trouve';
		}
		else
		{
			var product = {
				name : json.product.product_name,
				code : code,
				carbon : json.product.carbon_footprint_value,
				country : json.product.countries
			};
			
			fillInfos(product);
		}
 });
	
}

/////////////////////////////////////////////////
/// Fill infos on page
/////////////////////////////////////////////////
function fillInfos(product)
{
    $scope.name = product.name;
    $scope.code = product.code;
    $scope.carbon = product.carbon;
    $scope.country = product.country;
}
