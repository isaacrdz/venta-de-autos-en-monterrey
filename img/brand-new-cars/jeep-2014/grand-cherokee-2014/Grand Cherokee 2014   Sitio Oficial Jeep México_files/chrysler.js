var chrysler = new function()
{
	this.version = "1.0";
	this.request = new Object();
	
	if (window.location.href.indexOf("?") > 0)
	{
		var querystring = window.location.href.substring(window.location.href.indexOf("?") + 1).split('&');
		
		for (var i = 0; i < querystring.length; i++)
		{
			this.request[querystring[i].substring(0, querystring[i].indexOf("="))] = querystring[i].substring(querystring[i].indexOf("=") + 1);
		}
	}
	
	this.toString = function()
	{
		return "[object chrysler]";
	};
}