
/**
*	@name      	Track Object
*
*	For static sites that have little to no dynamic operations, the tracking is automatic in most cases.
* 	On page load the native page tracking will fire without any manual calls being made.
*
*
*	Track Object is made up of three parts. One additional and external part has been created for Goal Page Tracking.
*		1 - Initialized Variables & Initiating function.
*			Globally accessable but contained to this namespace.
*	@scope	cas.trackObj.init
*
*		2 - UTILITIES AND PROCESSING
*			Utility Methods only referenced by Action Methods.
*	@scope	cas.trackObj.utils
*
*		3 - ACTIONS AND REPORTING
*			Externally called Methods for processing and reporting.
*	@scope	cas.trackObj.actions
*
*		4 - GOAL PAGE ADD-ON UTILITY
*			Utility Methods, Variables and Goal Page Look-Up table .
*	@scope	cas.trackObj.goals
*	@file	cas.tracking.goals.js
*
*
*
*
*
*/

	nr_t.load([strRutaBase+"_dcn/anametrix/cas.tracking.accounts_"+strBrand+".js",strRutaBase+"_dcn/anametrix/cas.tracking.addons.js"]);


	cas.scriptCounter = parseFloat(cas.scriptCounter)+1;
	if(parseFloat(cas.scriptCounter) >= parseFloat(cas.scriptCount)){
		cas.trackObj.init();
	}

//(function(){
	cas.trackObj = {
		me:this,

		/*DOM vars*/
		path : document.location.pathname,
		hash : document.location.hash,
		dlh : document.location.hostname,
		fullURL : document.location.href,

		/*RegEx Vars*/
		protocolTestRegx : /(scoutlookweather\.)|(test\.)|(uat\.)|(stg\.)|(dev\.)|(miachrcms\.)|(automobility\.)|(67\.208\.40)/,
		blogBrandRegx : /blog[\.]?[\w][^\.]?\./,
		fileTypeRegx : /([\/\b]?(\w|-){1,20}[\.\b](asp|aspx|jsp|php|[\.do\b]+|html))/g,
		hostcPathRegx : /(summary)|(findDealers)|(inventorySearch)|(results)/,
		yearVehRegx : /\/[\d]+\/[\w\d]+\//,
		yearVehSubPageRegx : /\/[\d]+\/[\w\d]+\/[\w\d]+\//,
		hostcFileRegx : /[^\/]+[\w]+\.do\b/,
		cCodeRegx : /CU[\w]?[\d]{6}/,
		hostcAppRegx : /hostc\/[^\/]+/,
		goalHostcRegx : /hostc\//,
		goalGAQRegx : /\/gaq\/th\//gi,
		goalSATDRegx : /\/satd\/th\//gi,
		goalIncentivesRegx : /\/incentives\//,
		goalBHPRegx : '',
		goalVHPRegx : '',
		groupNVPRegx : '',

		/*String vars*/
		ak_cookie : '',
		ak_zip : '',
		ak_bandwidth : '',
		bandwidth : '',
		anametrixPN : '',
		tempANMTX : ' ',
		anametrixPath : '',
		brand : '',

		/*Object Vars*/
		pvvAttrInjection : {ai:{}},
		pageTrackVariables : {},
		nr_t : nr_t,
		pv : new Object(),
		nr_c : new Object(),

		init:function(){
			//
			$tOA = cas.trackObj;
			$tOA.anametrixPN = $tOA.utils.getFileName();
			$tOA.nr_t.domain = document.location.host;
			$tOA.nr_t.dataset = "100370";
			/*	This structure will accommodate if this file has multiple sites to account for. */

			$tOA.utils.setAccount();
			$tOA.utils.checkInBound();
			$tOA.anametrixPath = anametrixPath = $tOA.utils.defineAnametrixPath();
			$tOA.nr_t.gwlist = ["gw.anametrix.net"];
			$tOA.nr_t.link_tracking = 1;
			$tOA.nr_t.form_tracking = 1;
			$tOA.nr_t.init();
			$tOA.actions.setPageTrackVariables();
		},
		/** ***********************************
			UTILITIES AND PROCESSING FUNCTIONS
			cas.trackObj.utils
		*********************************** */
		utils : {

			/** *********************************************************************************************************
			*	@label	Get File Name:
			*	@description This utility is used to leverage the [file name]. html, jsp or php in first defining the $tOA.anametrixPN.
			*	If the $tOA.path ends in a slash and not file then it simply uses index.html.
			*
			*	@method cas.trackObj.utils.getFileName()
			********************************************************************************************************* */
			getFileName : function(){
				var pN = '';
				($tOA.fileTypeRegx.test($tOA.path))?pN = $tOA.path.match($tOA.fileTypeRegx)[0]:pN = 'index.html';
				return pN;
			},

			/** *********************************************************************************************************
			*	@label	Set Anametrix Environment Account
			*	@description This utility is used to establish was account level is being reported to in the Anametrix System.
			*	The first level is "testing" which means the suer is on iwov, test or uat.
			*	The second level is "www".
			*
			*	@method cas.trackObj.utils.setAccount()
			********************************************************************************************************* */
			setAccount : function(){

				//me = cas.trackObj;
				var accountBrand = '';
				var accountURL = '';

				/*replace(/www|com|\-|\./g, "");*/

				if ($tOA.protocolTestRegx.test($tOA.dlh)) {
					accountURL = 'test';
					accountBrand = 'inttest';
				}else{
					accountURL = 'international';
					accountBrand = $tOA.dlh.replace(/www|com|\-|\./g, "");
				}

				/** **************
				A vendor site can provide thier own Anametrix Data Suite Account Number. With the hundreds of dealer sites that may use these files, it is best not to fill this file with account numbers.
				var customDataSet = [data suite account number];
				************** */
				if(typeof customDataSet !== 'undefined'){
					$tOA.nr_t.dataset = customDataSet;
				}else if(/(\d){6}/.test($tOA.account[accountURL][accountBrand])){
					$tOA.nr_t.dataset = $tOA.account[accountURL][accountBrand];
				};

				$tOA.brand = accountBrand;

			},

			/** *********************************************************************************************************
			*	@label	Check Inbound Referrer
			*	@description This utility is used to create and or update the "inbound.referrer" cookie when the user lands on an AutoData page.
			*
			*	@method cas.trackObj.utils.checkInBound()
			********************************************************************************************************* */
			checkInBound: function(){

				var inbound_referrer = '';
				var ibrPath = '';

				if ($tOA.path.indexOf("htdocs") != -1) {
					var parts = $tOA.path.split("htdocs");
					ibrPath = parts[1];
				} else {
					var inReg = /hostc(\/[^\/]+\/)/ig;
					var inCleanReg = /(hostc)|(\/)/ig;
					ibrPath = $tOA.path;
					if(inReg.test(ibrPath)){
						inbound_referrer = ibrPath.match(inReg)[0].replace(inCleanReg,'');
					}
				}

				if (inbound_referrer != "") {
					document.cookie = "inbound.referrer=" + inbound_referrer + ";path=/;host=" + $tOA.dlh + ";false";
				}
			},

			/** *********************************************************************************************************
			*	@label	Define the Anametrix Tracking Path:
			*	@description This utility is used to check for alternative tracking overrides to define the anametrixPath value.
			*	If no overrides are present then the value is deternined by the native URI.
			*
			*	@method cas.trackObj.utils.defineAnametrixPath()
			********************************************************************************************************* */
			defineAnametrixPath : function(){

				var ap = "",
				tmp = $tOA.dlh.split("."),
				env = tmp[0].toLowerCase(),
				language = (env == 'es')?'es':'en';

				if(typeof(ASC_config) != "undefined" && ASC_config.mlc){
					ap = ASC_config.mlc;
				}else if(typeof(trackPathOverride) != "undefined"){
					ap = trackPathOverride;
				}else{
					ap = (typeof customerType != 'undefined')?customerType = $tOA.utils.nameCleaner(customerType)+'/':'';
					ap += (typeof pageName != 'undefined')?(pageName = $tOA.utils.nameCleaner(pageName))+$tOA.utils.cutFileName():$tOA.utils.cutFileName();
					//ap = "/" + $tOA.brand +'/'+ ap;
					ap = "/mexico/es/jeep/" + ap;
				}

				if (ap.indexOf(";") != -1) {
					ap = ap.split(";")[1];
				}

				if(language.indexOf('es')!=-1){
					ap.replace('/en/','/es/');
				}

				return ap;
			},

			/** *********************************************************************************************************
			*	@label	Cut File Name:
			*	@description This utility is used to strip [file name]. html, jsp or php in first defining the $tOA.anametrixPath.
			*	If the $tOA.path ends in a slash and not file then it simply uses $tOA.path.
			*
			*	@method cas.trackObj.utils.cutFileName()
			********************************************************************************************************* */
			cutFileName : function(){
				var aPath = '';
				var devPath = '';
				if (/sapientem/.test($tOA.dlh)) {
					devPath = $tOA.path.split('htdocs')[1];
					aPath = devPath.replace($tOA.fileTypeRegx, "");
				}else{
					aPath = $tOA.path.replace($tOA.fileTypeRegx, "");
				}
				return (aPath.indexOf('?') >= 0) ? aPath.split('?')[0] : aPath;
			},

			/** *********************************************************************************************************
			*	@label	Name Cleaner:
			*	@description This utility is used to strip and replace special characters & white spaces and replaces them with the underscore "_".
			*	This is most commonly used to process the LID parameter value of a manual linkTrack call.
			*
			*	@method cas.trackObj.utils.nameCleaner(a)
			********************************************************************************************************* */
			nameCleaner :  function(a) {
				if(typeof a == "undefined"){
					return "nameCleaner_undefined_value";
				}else{
					a = unescape(a).toString();
					return a.replace(/[^a-zA-Z0-9,\s,+,-,_,\/,|]/g, "").replace(/[\s+]/g, "_").replace(/[__]+/g,"_").replace(/_$/g,'').toLowerCase();
			   }
			},

			/** *********************************************************************************************************
			*	@label	Clean Dashes
			*	@description This utility is used to strip and replace all dashes "-" and replaces them with the underscore "_".
			*	This is most commonly used to process the page tracking path values for strings or vehicle names that contain the dash.
			*
			*	@method cas.trackObj.utils.cleanDashes(a)
			********************************************************************************************************* */
			cleanDashes : function(a){
				var dashRE = /(\-)/g; try{a = a.replace(dashRE,"_");}catch(e){'no dashes found'}; return a;
			},

			/** *********************************************************************************************************
			*	@label	To Title Case
			*	@description This utility is used in the case of text needing to be title case "This Is Title Case".
			*
			*	@method cas.trackObj.utils.toTitleCase()
			********************************************************************************************************* */
			toTitleCase : function(str){
				return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
			},

			/** *********************************************************************************************************
			*	@label	Overlay Tracking
			*	@description This utility is used to part of the augmenting process to control the value of $tOA.anametrixPath.
			*
			*	@method cas.trackObj.utils.overlayTracking(augVal)
			********************************************************************************************************* */
			overlayTracking: function(augVal){


				/* 	IF - $tOA.tempANMTX is or has been reset to a ONE character empty string ' ' with augVal defined.
					THEN - Update $tOA.tempANMTX with the same value that will update $tOA.anametrixPath in context of the setPageTrackVariables function.
				*/
				if($tOA.tempANMTX == ' ' && augVal != 'undefined'){
					$tOA.tempANMTX = '/'+augVal;
				}
				else
				{
					/*
						This utility is what allows for continuous augmentation of the $tOA.anametrixPath.
						1 - The $tOA.anametrixPath is going to be stripped of the CURRENT value of $tOA.tempANMTX in preparation of being augmented with a new value.
							- The value ADDED to $tOA.anametrixPath occurs after this operation in context of the setPageTrackVariables function.
						2 - Update $tOA.tempANMTX with the same value that will update $tOA.anametrixPath.

					*/
					$tOA.anametrixPath = $tOA.anametrixPath.split($tOA.tempANMTX)[0].toString();
					$tOA.tempANMTX = (augVal != 'undefined')?'/'+augVal:' ';
				}
			},

			/** *********************************************************************************************************
			*	@label	Document Location Query String Redirect Tracking
			*	@description This utility is used to determine and populate the page referrar for Vanity URL redirects.
			*
			*	@method cas.trackObj.utils.locQueryVanityRedirect(s)
			********************************************************************************************************* */
			locQueryVanityRedirect: function(s){

				var qs = $tOA.nr_t.pu(document.location);

				if(/www\.[\w\d]+\.[\w]+/.test(qs.qsh['hrf'])){
					var rhost = qs.qsh['hrf'].match(/www\.[\w\d]+\.[\w]+/)[0];
					$tOA.nr_t['sc']['r'] = $tOA.nr_t.pu($tOA.nr_t.ue(qs.qsh['hrf']));
					$tOA.nr_t['sc']['r'].host = rhost;
					$tOA.nr_t['sc']['r'].src = $tOA.nr_t.ue(qs.qsh['hrf']);
				}
				else{
					$tOA.nr_t['sc']['r'].src = qs.qsh['hrf'];
				}

			},

			/** *********************************************************************************************************
			*	@label	Object Children Test
			*	@description This utility is used in tandem with setPageTrackAttributes to check if additional attributes have been
			*	injected by the cas.trackObj.actions.attrInjection method.
			*
			*	@method cas.trackObj.utils.objChildrenTest()
			********************************************************************************************************* */
			objChildrenTest : function(argObj){
				var i = 0;
				for(var x in argObj){
					i++
				}
				return i;
			},

			/** *********************************************************************************************************
			*	@label	Get Cookie
			*	@description This utility is used to retrieve the requested cookie value.
			*
			*	@method cas.trackObj.utils.getCookie(name)
			********************************************************************************************************* */
			getCookie :function(name){
				var value = document.cookie.match('(?:^|;)\\s*' + name.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1') + '=([^;]*)');
				return value ? decodeURIComponent(value[1]) : false;
			},

			/** *********************************************************************************************************
			*	@label	Get Akamai Cookie
			*	@description This utility is used to aquire the user's Zip Code from Akamai if their zipcode cookie is not defined.
			*	If the cookie is not present then the ak_zip is set to "00000". If the cookie is present but no zip value then ak_zip is to "00001".
			*
			*	@method cas.trackObj.utils.getAkamaiCookie()
			********************************************************************************************************* */
			getAkamaiCookie : function(){

				try{
					if($tOA.utils.getCookie('CT_Akamai') != false){
						$tOA.ak_cookie = $tOA.utils.getCookie('CT_Akamai');
						try{
							$tOA.ak_zip = $tOA.ak_cookie.split("zip=")[1].match(/[\d]{5}/)[0].toString();
						}catch(e){$tOA.ak_zip = '00001'; $tOA.bandwidth='high';}
					}else{
						$tOA.ak_zip = '00000'; $tOA.bandwidth='high';
					}
				}catch(e){$tOA.ak_zip = '00000'; $tOA.bandwidth='high';};
			},

			/** *********************************************************************************************************
			*	@label	Get Zip Code for Tracking
			*	@description This utility is used to aquire the user's Zip Code from Akamai if their zipcode cookie is not defined.
			*
			*	@method cas.trackObj.utils.getZipCodeForTracking()
			********************************************************************************************************* */
			getZipCodeForTracking : function(){
				var zipCodeData = ($tOA.utils.getCookie("zipcode"))?$tOA.utils.getCookie("zipcode"):(typeof(context)!='undefined' && typeof(context.zip)!='undefined')?context.zip:'no_zip';
				$tOA.pageTrackVariables["s.pc"] = (zipCodeData != 'no_zip')?zipCodeData:$tOA.ak_zip;
			},

			/** *********************************************************************************************************
			*	@label	Get Campaign
			*	@description This utility is used to check the query string for OLA or Paid Search values. If the values are found then Campaign ID &
			*	Campaign Responce are recorded and sent with the Page Track data.
			*
			*	@method cas.trackObj.utils.getZipCodeForTracking()
			********************************************************************************************************* */
			getCampaign : function(){

				var qs = $tOA.nr_t.pu(document.location);
				if (qs.qsh['channel'] != undefined && qs.qsh['channel'] != " ") {
					var campaignId = qs.qsh['sid'] + "-" + qs.qsh['adid'] + "-" + qs.qsh['pid'];
					var campaignResponse = [{
						id: campaignId,
						a_1: qs.qsh['sid'],
						a_2: qs.qsh['bid'],
						a_3: qs.qsh['adid'],
						a_4: qs.qsh['pid'],
						a_5: qs.qsh['channel'],
						a_6: qs.qsh['KWNM'],
						a_7: qs.qsh['KWID'],
						a_8: qs.qsh['spid'],
						a_9: qs.qsh['cid'],
						a_10: "",
						a_11: "",
						a_12: "",
						a_13: "",
						a_14: ((typeof context === "object")?context.brand:brand),
						a_15: ((typeof mobile === "object" && typeof mobile.tracking === "object")?"mobile":"desktop"),
						a_16: ((typeof cur_vehicle !== "undefined")?cur_vehicle:(typeof context !== "undefined")?context.vehicle:""),
						a_17: ""
						}];
					$tOA.pageTrackVariables['cmp'] = campaignResponse;

				}
			},

			/** *********************************************************************************************************
			*	@label	Goal Page & Page Groups Tracking
			*	@description This utility is a precursor to what runs the check, lookup and reporting of a Goal Page in the page tracking call.
			*	Before the Page Track is complete, the string value that becomes the nr_t.sc['p.t'] is passed into this function. There is a
			*	separate file containing an object for Goal Page Tracking that tacks on to the "cas" object. The file has been made separate for
			*	the sake of loose coupling. Brand & vendor sites will define what URIs qualifies as a Goal Page and what the Goal ID value is set to.
			*	This object contains the
			*
			*	@file cas.tracking.goals.js
			*	@scope cas.trackObj.goals
			*
			*	@method cas.trackObj.utils.goalTracking(gVal)
			********************************************************************************************************* */
			goalTracking : function(gVal){

				(typeof mobile === "object" && typeof mobile.tracking === "object")?$tOA.goals.pageGroupsAndGoalsMobile(gVal):$tOA.goals.pageGroupsAndGoals(gVal);
			},

			/** *********************************************************************************************************
			*	@label	Track Default & Selected Options - Build My Own
			*	@description This utility is used to parse and define the attribute indexes & values for BMO Options reported in the page tracking call.
			*
			*	@method cas.trackObj.utils.trackOptionsBMO()
			********************************************************************************************************* */
			trackOptionsBMO : function(){

				try {

					var offerState = $tOA.utils.getCookie('offerState');
					var options = eval('(' + offerState + ')');
					options = options.selectedOptions;
					/* The above code is specific to MooTools - Update with JQuery's ... parseJson()   */
					var optSplit = options.split(' ');
					var optInt = [];
					var optSplice;
					var i = 0;
					var n = optSplit.length-1;
					for(i; i<=n; i++){
						if(optSplit[i].indexOf('P') == 0){
							$tOA.pageTrackVariables["p.a_8"] = optSplit[i];
							optSplit.splice(i,1);
							optSplice = optSplit;
							n = n-1;
							i = i-1;
						}
						else
						if(optSplit[i].length == 2)
						{
							optInt.unshift(optSplit[i]);
							optSplit.splice(i,1);
							optSplice = optSplit;
							n = n-1;
							i = i-1;
						}
					}
					optSplice = optSplice.join('|');
					optInt = optInt.join('_');
					$tOA.pageTrackVariables["p.a_10"] = optSplice;
					$tOA.pageTrackVariables["p.a_9"] = optInt;
				} catch (e) {}
			},

			/** *********************************************************************************************************
			*	@label	Set Page View Attributes
			*	@description This utility is used to parse and define the attribute reported in the page tracking call.
			*
			*	@method cas.trackObj.utils.setPageTrackAttributes()
			********************************************************************************************************* */
			setPageTrackAttributes : function(b) {

				var _v = b.split('/');
				var x = 1;
				var y = _v.length;
				for(x; x<y;x++){$tOA.pageTrackVariables['p.a_'+(x)]=_v[x];}
				if($tOA.utils.objChildrenTest($tOA.pvvAttrInjection.ai) >= 1){
					for(var _a in $tOA.pvvAttrInjection.ai){
						var _b = _a.split('_')[1];
						/*
						IF ATTRIBUTE INJECTED INDEX IS THE SAME OR LESS THEN CURRENT ATTRIBUTE COUNT
						THEN INCREMENT INJECTED ATTRIBUTE INDEX TO THE NEXT AVAILABLE NUMBER.
						THIS WILL PREVENT ATTRIBUTE OVERWRITING.
						*/
						_b = (_b-x <=0)?x:_b;

						/*In order to check X accuratley - X itself needs to be updated based on the result of the previous line of code.*/
						(_b==x)?x++:x=_b;

						$tOA.pageTrackVariables['p.a_'+(_b)] = $tOA.pvvAttrInjection.ai[_a];

					}
					$tOA.pvvAttrInjection.ai = {};
				}
			}
		},

		/** ***********************************
			ACTIONALBE AND REPORTING FUNCTIONS
			cas.trackObj.actions
		*********************************** */
		actions: {

			/** *********************************************************************************************************
			*	@label	Set Page View Variables
			*	@description This action serves the purpose of initiating the Page Track process.
			*	Manual page tracking can be called when a CTA summons content that changes the appearance of the page without a new page load.
			*		- Examples: Spawning and Overlay, Page content loaded with AJAX, Tabbed page sections that Hide/Show or Pan.
			*		1 - The augVal is the parameter that represnts the value you wish to augment the anametrixPath value with.
			*			- Example - Original Page Load anametrixPath: /dodge/en/2012/durango
			*			- Example - augVal of "foobar" passed - anametrixPath updated: /dodge/en/2012/durango/foobar
			*			- Example - Pass no value to reset to native anametrixPath - anametrixPath updated again: /dodge/en/2012/durango
			*			- Exapmle - Augmenting to ADD Value - cas.trackObj.actions.setPageTrackVariables(augVal)
			*			- Exapmle - Augmenting to RESET Value - cas.trackObj.actions.setPageTrackVariables()
			*		2 - The anametrixPath can be completely overwritten too by supplying both parameters - augVal & b as a boolean set to true.
			*			- Example - Original Page Load anametrixPath: /dodge/en/2012/durango
			*			- Example - augVal of "/dodge/en/section/feature/overlay" & b value of true passed - anametrixPath updated: /dodge/en/section/feature/overlay
			*
			*	@method	cas.trackObj.actions.setPageTrackVariables(augVal,b)
			********************************************************************************************************* */
			setPageTrackVariables : function(augVal, b){
				
				$tOA.pageTrackVariables = {};
				
				if(typeof(b) != "undefined" && b == true){
					$tOA.anametrixPath = augVal;
				}else{
					$tOA.utils.overlayTracking(augVal);
					$tOA.anametrixPath = ((typeof augVal != "undefined")?$tOA.anametrixPath+'/'+augVal:$tOA.anametrixPath).replace(/[\/\/]+/g, "/");
					//alert("Path:" + $tOA.anametrixPath);
				}
				
				if ($tOA.anametrixPath.indexOf('Encuentra-Distribuidor') != -1) {
				  a = '/mexico/es/jeep/dealer/' + $tOA.anametrixPN;
				}
				else 
				  if ($tOA.anametrixPath.indexOf('wrangler-2013/') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/wrangler/' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('wrangler-2013') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/wrangler' + $tOA.anametrixPN;
				 }
				  else 
				  if ($tOA.anametrixPath.indexOf('wrangler-unlimited-2013/') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/wrangler_unlimited/' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('wrangler-unlimited-2013') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/wrangler_unlimited' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('compass-2013/') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/compass/' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('compass-2013') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/compass' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('patriot-2013/') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/patriot/' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('patriot-2013') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/patriot' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('liberty-2013/') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/liberty/' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('liberty-2013') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/liberty' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('grand-cherokee-2013/') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/grand_cherokee/' + $tOA.anametrixPN;
				 }
				 else 
				  if ($tOA.anametrixPath.indexOf('grand-cherokee-2013') != -1) {
				  a = '/mexico/es/jeep/autos-nuevos/2013/grand_cherokee' + $tOA.anametrixPN;
				 }
				else {
				a = ($tOA.anametrixPath.replace(/index\.html*/,'')+ "/" + $tOA.anametrixPN).toLowerCase().replace(/[\/\/]+/g,"/");
				}

				a = $tOA.utils.cleanDashes(a);
				$tOA.pageTrackVariables.name = a;
				$tOA.utils.setPageTrackAttributes(a);
				
				$tOA.utils.getAkamaiCookie();
				$tOA.utils.getZipCodeForTracking();
				
				if(/hrf/.test(location.search)){$tOA.utils.locQueryVanityRedirect()};


				/*
				GOAL & CONVERSION CALLS - The function calls within are only
				called in the case of a compaign query string present in the URI
				*/
				if(/channel/.test(location.search)){
					$tOA.utils.getCampaign();
					$tOA.addons.setMarketCodes();
				};

				//$tOA.utils.goalTracking(a);

				if(/\/hostc\/bmo\//.test($tOA.path)){$tOA.utils.trackOptionsBMO();};

				$tOA.nr_t.pageView($tOA.pageTrackVariables);
			},

			pageTrackHostcVariables : function(c, b) {
				$tOA.pageTrackVariables = {};

				if (b.indexOf(";") != -1) {b = b.split(";")[1];}

				var a = (b + "/" + c).toLowerCase().replace(/[\/\/]+/g, "/");

				$tOA.pageTrackVariables.name = a;

				$tOA.utils.setPageTrackAttributes(a);

				if(/channel/.test(location.search)){
					$tOA.utils.getCampaign();
					$tOA.addons.setMarketCodes();
				};

				$tOA.utils.getAkamaiCookie();
				$tOA.utils.getZipCodeForTracking();


				$tOA.nr_t.pageView($tOA.pageTrackVariables);
			},


			/** *********************************************************************************************************
			*	@label	Page Track Attribute Injection:
			*	@description This action serves up to two purposes.
			*	1 - The first parameter (REQUIRED) supplies the object used to inject attributes into the page track values that are reported. The attributes can be injected into the defined index order in which attributes will appear.
			*		If the index defined has already been filled with a value then the next available index is populated with the injected value.
			*		The object structure - {KEY:INDEX} - The KEY is the value of the attribute and the INDEX is the position the attribute is injected.
			*		Example: {"overlay_gallery":4,image_name:5} - The overlay_gallery is static value and image_name is a dynamicaly populated varaible.
			*		Native Page Track attributes: a_1-dodge, a_2-en, a_3-index.html
			*		Page Track with Injected attributes: a_1-dodge, a_2-en, a_3-index.html, a_4-overlay_gallery, a_5-durango_hero_image
			*	2 - The second parameter (OPTIONAL) can be used to augment the page track's nr_t.sc["p.t"] value itself.
			*		Example: With example #1 in place the second parameter value is now set to "slideshow".
			*		Native Page Track value - /dodge/en/index.html
			*		Native Page Track attributes: a_1-dodge, a_2-en, a_3-index.html
			*		Page Track value augmented - /dodge/en/slideshow/index.html
			*		Page Track with Injected attributes: a_1-dodge, a_2-en, a_3-slideshow, a_4-index.html, a_5-overlay_gallery, a_6-durango_hero_image
			*
			*	@method	cas.trackObj.actions.attrInjection(argInject, argAddPT)
			********************************************************************************************************* */
			attrInjection : function(argInject, argAddPT){

				//console.log(argInject);
					$tOA.pvvAttrInjection.ai = {};
					if(typeof(argInject) == 'object'){
						for(var x in argInject){
							$tOA.pvvAttrInjection.ai['p.a_'+(argInject[x])]= x;
						}
					}
					(argAddPT != '')?$tOA.actions.setPageTrackVariables(argAddPT):$tOA.actions.setPageTrackVariables();
			},

			/** *********************************************************************************************************
			*	@label	Media or Video Tracking:
			*	@description This action serves the purpose of reporting the tracking information received from a given FLASH or HTML5 video player.
			*	Parameters:
			*	1 - n : is the Video Name or ID
			*	2 - a : are the available attributes (a_1 to a_10) - brand, file path/file name, page url, file size, ect...
			*	3 - p : is the Position or Percentage of the duration played in 10% increments
			*	4 - s : is the current Status or State of the player - start, complete, resume, pause, forward, rewind, skip
			*
			*	@method	cas.trackObj.actions.mediaTrack(n,a,p,s)
			********************************************************************************************************* */
			mediaTrack : function(n,a,p,s){

				var n = $tOA.utils.nameCleaner(n);
				var a = $tOA.utils.nameCleaner(a);
				var p = $tOA.utils.nameCleaner(p);
				var s = $tOA.utils.nameCleaner(s);
				var v = new Object();

				v["m.n"] = n;

				var _v = a.split(',');
				var x = 0;
				var y = _v.length;

				for(x; x<y;x++){v['m.a_'+(x+1)]=_v[x];}

				v["m.p"] = p;
				v["m.s"] = s;

				$tOA.nr_t.sendReq(v);
			},

			/** *********************************************************************************************************
			*	@label	Site Actions or Site Events:
			*	@description Site actions can model any actions taken by the visitor on the web site such as logging in, logging out, using internal search, etc.
			*	If the site action is a step-based process, you can flag the site action as initiated or completed as the visitor moves through the completion process.
			*	Parameters:
			*	1 - aN : Action Name
			*	2 - aA : Action Attributes
			*
			*	@method	cas.trackObj.actions.siteAction(aN,aA)
			********************************************************************************************************* */
			siteAction : function(aN,aA){

				var c = new Object();
				c['a.n'] = aN;
				c['a.a_1'] = $tOA.nr_t.sc['p.t'];
				(typeof aA != 'string')?aA = aA.toString():aA;
				var _v = aA.split(',');
				var x = 0;
				var y = _v.length;
				/* c['a.a_1'] is already populated - begin with a_2 when populating attributes in FOR LOOP*/
				for(x; x<y;x++){c['a.a_'+(x+2)]=_v[x];}

				$tOA.nr_t.sendReq(c);
			},

			/** *********************************************************************************************************
			*	@label	Page Asset:
			*	@description This action's future purpose is an alternative to firing aditional page tracks or link tracks for internal page activity.
			*	The Page Asset Actions can be a View or a Click - Like spawing an overlay gallery or clicking on a swatch in context of a colorizer menu.
			*	This allows us to reserve the Link Tracking for Anchors that travers the user across the site and Page Tracking for the initial page load.
			*	The aspect of a page track alternative reduces the LOE for analytics teams trying to determine tracking statistics.
			*	Parameters:
			*	1 - pName - The first parameter (REQUIRED) supplies the Page Asset Name
			*	2 - pType - The second parameter (OPTIONAL) supplies the Page Asset Type ("v" for View |or| "c" for Click)
			*	3 - pAttr - The thrid parameter (OPTIONAL) supplies the Page Asset Attributes. Supplied as a csv string.
			*
			*	@method	cas.trackObj.actions.pageAsset(pName,pType,pAttr)
			********************************************************************************************************* */
			pageAsset:function(pName,pType,pAttr){
				var p = new Object();
				p['pa.n'] = pName;
				p['pa.a'] = pType;
				p['pa.a_1'] = $tOA.nr_t.sc['p.t'];
				(typeof pAttr != 'string')?pAttr = pAttr.toString():pAttr;
				var _v = pAttr.split(',');
				var x = 0;
				var y = _v.length;
				for(x; x<y;x++){p['pa.a_'+(x+2)]=_v[x];}

				$tOA.nr_t.sendReq(p);
			},

			/** *********************************************************************************************************
			*	@label	Link Track:
			*	@description	For a CTA that is not an <a> but is an html node bound with a click with JS will call this linkTrack method manually.
			*	- cas.trackObj.actions.linkTrack(lpos,lid)
			*
			*	Nativley the Link tracking is handled in the background with simple data requirements supplied to the <a> tags.
			*	The <a> tag needs the NAME attribute populated with the values of and LID & LPOS
			*		- The LID is the link ID. A string value that represents the link's verbiage. Multiple words separated by underscores "_"
			*		- The LPOS is the link position. A string value that represents the content location of the link.
			*			- Example: vehicle_menu_content, global_nav_content, footer_content or page_content - for links contained within the content of the page.
			*		- <a href="/foo" name="&lid=foobar_cta&lpos=global_menu_content">
			*	Alternative to name attribute is to use data-lid & data-lpos attributes.
			*		- <a href="/foo" data-lid="foobar_cta" data-lpos="global_menu_content">
			*	Parameters:
			*	1 - a - The first parameter (REQUIRED) supplies the LPOS or Link Position.
			*		The optional purpose of the first parameter is to supply multiple values and attributes in the form of an object.
			*		This is currently only being utilized by the Brand Site's Payment Calculator.
			*	2 - b - The second parameter (OPTIONAL) supplies the LID or Link ID.
			*
			*
			*	@method	cas.trackObj.actions.linkTrack(a, b)
			********************************************************************************************************* */
			linkTrack : function(a, b) {

				var c = new Object();
				if (typeof(a) == "object") {
					try {
						c["lc.a_1"] = a.a1;
						c["lc.n"] = a.a2;
						for (var i in a) {
							var attr_no = i.replace(/a(\d)/, '$1');
							if (attr_no > 2) {
								c["lc.a_"+attr_no] = $tOA.utils.nameCleaner(a[i]);
							}
						}
					} catch(e) {
						return;
					}
				} else {
					var b = $tOA.utils.nameCleaner(b);
					var a = $tOA.utils.nameCleaner(a);
					c["lc.n"] = b;
					c["lc.a_1"] = a;
				}
				if (typeof($tOA.nr_t.sc['p.t']) != "undefined") {
					c["lc.a_2"] = $tOA.nr_t.sc['p.t'];
				}

				$tOA.nr_t.sendReq(c,true);
			}
		}

	};


	/* LEGACY CODE - ACCESSING NEW LOGIC */
	linkTrack = function(a,b){$tOA.actions.linkTrack(a,b)};

	pageTrack = function(a,b){
		var _a = (typeof a != 'undefined')?a:'';
		var _b = (typeof b != 'undefined')?b:false;
		(typeof a != 'undefined')?$tOA.actions.setPageTrackVariables(_a,_b):$tOA.actions.setPageTrackVariables();
	}

	setPageViewVariablesForAutodataPages = function(a,b){

		$tOA.actions.pageTrackHostcVariables(a,b);
	}

	setPageViewVariables = function(a,b){
		var _a = (typeof a != 'undefined')?a:'';
		var _b = (typeof b != 'undefined')?b:false;
		(typeof a != 'undefined')?$tOA.actions.setPageTrackVariables(_a,_b):$tOA.actions.setPageTrackVariables();
	}

	attrInjection = function(a,b){
		var _a = (typeof a != 'undefined')?a:'';
		var _b = (typeof b != 'undefined')?b:'';
		$tOA.actions.attrInjection(_a,_b);
	};

	siteAction = function(a,b){$tOA.actions.siteAction(a,b)};

	mediaTrack = function(a,b,c,d){$tOA.actions.mediaTrack(a,b,c,d)};

	pageAsset = function(a,b,c){$tOA.actions.pageAsset(a,b,c)};

	nameCleaner = function(){$tOA.utils.nameCleaner(b)};


/**
*	@instructions 	Be sure to update the actual location of your cas.tracking.js file when populating the nr_t.load() function call below.
*/

//})();


/**
This variable is used to access the trackObj - or Track Object Accessor. This variable's access scope is defined within the INIT() of the trackObj.
var $tOA;
*/
//var $tOA = cas.trackObj;








