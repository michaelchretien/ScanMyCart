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
	
	$("#data").hide();
	$("#analyse").hide();
	$("#wait").show();
	
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
			$("#warning").hide();
            getProductInformation(line.isbn);

        } else {
			$("#wait").hide();
			$("#warning").show();
        }
		
    };
	
	image.src = window.URL.createObjectURL(this.files[0]);

}

function getBarcode()
{
	$("#notValid").hide();
	var code = document.getElementById("code").value;
	
	if(code.toString().length == 12)
	{	
		$("#wait").show();
		getProductInformation(code);
	}
	else
		$("#notValid").show();
}

/////////////////////////////////////////////////
/// Get information from OpenFoodFact db
/////////////////////////////////////////////////
function getProductInformation(code)
{
	$.getJSON( "https://world.openfoodfacts.org/api/v0/product/" + code + ".json", function( json ) {
		
		if(json.status_verbose == "product not found")
		{
			$("#error").show();
			$("#wait").hide();
			$("#data").hide();
		}
		else
		{
			var product = {
				name : json.product.product_name,
				code : code,
				carbon : json.product.carbon_footprint_value,
				country : json.product.countries
			};
			
			$("#warning").hide();
			fillProductInfos(product);
			computeScore(product);
		}
 });
	
}

/////////////////////////////////////////////////
/// Fill infos on page
/////////////////////////////////////////////////
function fillProductInfos(product)
{
    $('#nom').html(product.name);
    $('#codeProduit').html(product.code);
	
	console.log(product.carbon);
	if(typeof product.carbon == "undefined")
	{
		$('#carboneEstimated').show();
		product.carbon = estimateCarbonFootPrint();
		
	}
	else
		$('#carboneEstimated').hide();
	
    $('#carbone').html(product.carbon);
    
	$('#pays').html(product.country);	
	$("#data").show();
	$("#analyse").show();
	$("#wait").hide();
	window.location.hash = '#data';
}

/////////////////////////////////////////////////
/// Fill infos on page
/////////////////////////////////////////////////
function estimateCarbonFootPrint(product)
{
	return Math.floor((Math.random() * 100) + 1);
}
