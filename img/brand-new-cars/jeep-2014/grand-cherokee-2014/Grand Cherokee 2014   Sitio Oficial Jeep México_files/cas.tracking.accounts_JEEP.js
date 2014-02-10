
(function(){
	cas.trackObj.account = {
		/*	This structure will accommodate if this file has multiple sites to account for. */

		international:{
		jeepar:"100371",
		jeepau:"100376",
		jeepat:"100385",
		jeepbe:"100391",
		jeepbr:"100750",
		jeepcl:"100397",
		jeepcn:"100403",
		jeepco:"100409",
		jeepcz:"100415",
		jeepdk:"100421",
		jeepfr:"100427",
		jeepde:"100433",
		jeepofficialit:"100439",
		jeepjapan:"100445",
		jeepofficialkz:"100451",
		jeeplv:"100457",
		jeeplt:"100463",
		jeeplu:"100469",
		jeepnl:"100475",
		jeeppe:"100481",
		jeepph:"100487",
		jeeppl:"100493",
		jeeppt:"100499",
		jeeppr:"100505",
		jeepro:"100511",
		jeeprussiaru:"100517",
		jeepsg:"100523",
		jeepcoza:"100529",
		jeepcokr:"100537",
		jeepes:"100543",
		jeepse:"100549",
		jeepch:"100555",
		mideastjeep:"100561",
		jeepcouk:"100567",
		jeepve:"100573",
		jeepmx:"100775"
		},
		test:{
			inttest:"100370"
		}
	}

	cas.scriptCounter = parseFloat(cas.scriptCounter)+1;
	
	//console.log('[addons | cas.scriptCounter : '+cas.scriptCounter+' ]');
	//console.log('[addons | count test : '+(parseFloat(cas.scriptCounter) >= parseFloat(cas.scriptCount))+' ]');
	if(parseFloat(cas.scriptCounter) >= parseFloat(cas.scriptCount)){
		cas.trackObj.init();
	}

})();