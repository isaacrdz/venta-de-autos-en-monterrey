$(document).on("ready",begin)
	function begin()
{ 
	$("#mini-menu").on("click", showMenu)
}

function showMenu()
{
	$("nav").toggle();
}