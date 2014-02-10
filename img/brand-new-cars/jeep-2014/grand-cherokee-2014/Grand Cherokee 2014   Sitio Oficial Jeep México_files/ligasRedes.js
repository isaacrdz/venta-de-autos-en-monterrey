function A_LigasRedes(strClave) {
	switch (strClave) {
		case "FB": A_AbreVentana("http://www.facebook.com/JeepMexico"); break;
		case "TW": A_AbreVentana("http://www.twitter.com/jeepmx"); break;
		case "YT": A_AbreVentana("http://www.youtube.com/channel/UClj1gaXG4C_-UOHnJN1E3Eg"); break;
		case "GO": A_AbreVentana("https://plus.google.com/u/0/100511082494472082493/posts"); break;
		case "PI": A_AbreVentana("http://pinterest.com/jeepmexico/"); break;
	}
}


function A_AbreVentana(strLiga, intAncho, intAlto, strAttrs) {
    var strAtributos = "";
    if (intAncho != undefined) strAtributos += ("width=" + intAncho + ", height=" + intAlto);
    if (strAttrs != undefined) strAtributos += strAttrs;
    var intWndID = window.open(strLiga, "", strAtributos);
    if(intWndID!=null) intWndID.focus();
}
