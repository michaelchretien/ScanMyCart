/*  Hackatown 2018 - ScanMyCart
*	Authors : Michael Chretien, Antoine Gaulin, Jean-Sebastien Lemaire
*	Brief : Algorithm that computes a score from 1 to 10 according to data
*/

/////////////////////////////////////////////////
/// Algorithm
/////////////////////////////////////////////////
function computeScore(){
	fillInfos();
}


/////////////////////////////////////////////////
/// Get infos
/////////////////////////////////////////////////
function getUserCountry()
{
	
}


/////////////////////////////////////////////////
/// Fill infos
/////////////////////////////////////////////////
function fillInfos(algoData)
{
	resetClass("moyenneCarbone");
	resetClass("distanceParcourue");
	resetClass("eauConsommee");
	
	$("#moyenneCarbone").html("\u2212 Le produit se situe dans la moyenne des émissions de carbone.").addClass( "list-group-item-warning" );
	$("#distanceParcourue").html("\u00D7 La distance parcourue est très grande. Pensez à acheter localement !").addClass( "list-group-item-danger" );;
	$("#eauConsommee").html("\u2713 Le produit consomme peu d'eau pour sa production. Un bon choix !").addClass( "list-group-item-success" );;
	$("#scoreGlobal").html("5.2/10")
}



/////////////////////////////////////////////////
/// Class modifiers
/////////////////////////////////////////////////
function setClass(id, value)
{
	resetClass(id);
	$("#"+id).addClass( value );
	
}

function resetClass(id)
{
	$("#"+id).removeClass( "list-group-item-success list-group-item-warning list-group-item-danger" );
	
}

