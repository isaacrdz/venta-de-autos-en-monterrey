//JCV 100727 - SE AGREGA FUNCION PARA DETECTAR BROWSER
if(typeof jsExa=="undefined"){var jsExa=new Object();}
if(typeof jsExa.Browser=="undefined"){jsExa.Browser=new Object();}
jsExa.Browser = function() {
    var intIdx = 0;
    var strUA = navigator.userAgent.toLowerCase();
    strUA = strUA.toLowerCase();
    this.appVersion = navigator.appVersion;
    this.appProduct = navigator.product;
    this.appPlatform = navigator.platform;
    this.appName = navigator.appName;
    this.appCodeName = navigator.appCodeName;
    this.intVer = 0;
    this.sngVer = 0;
    this.strVer = "";
    this.bolIE = false;
    this.bolNav = false;
    this.bolFF = false;
    this.bolSaf = false;
    this.bolWin32 = false;
    this.bolWin16 = false;
    this.bolUnix = false;
    this.bolLinux = false;
    this.bolMac = false;
    this.bolWinCE = false;
    this.bolChrome = false;
    //---  080218  HMO  Browser y version 
    if (strUA.indexOf("msie") != -1) {
        this.bolIE = true;
        this.strNom = "Microsoft Internet Explorer";
        this.strVer = strUA.substring(intIdx = strUA.indexOf("msie") + 5, strUA.indexOf(";", intIdx));
    }
    else
        if (strUA.indexOf("netscape6/") != -1 || strUA.indexOf("netscape/") != -1) {
        this.bolNav = true;
        this.strNom = "NETSCAPE";
        this.strVer = strUA.indexOf("netscape6/") != -1 ? strUA.split(' netscape6/')[1] : strUA.split(' netscape/')[1];
    }
    else
        if (strUA.indexOf("firefox/") != -1) {
        this.bolFF = true;
        this.strNom = "MOZILLA FIREFOX";
        this.strVer = strUA.split(' firefox/')[1];
    }
    else
        if (strUA.indexOf("chrome") != -1) {
        this.bolChrome = true;
        this.strNom = "GOOGLE CHROME";
        this.strVer = strUA.split(' chrome/')[1].split(' ')[0];
    }
    else
        if (strUA.indexOf("safari/") != -1) {
        this.bolSaf = true;
        this.strNom = "APPLE SAFARI";
        this.strVer = strUA.split(' safari/')[1];
    }
    else
        if (strUA.indexOf("opera") != -1) {
        this.bolOpe = true;
        this.strNom = "OPERA";
        //---  090729  HMO  Se corrige un problema al obtener la version, se tomaba strUA.agent cuando strUA es tan solamente un string...
        this.strVer = strUA.split('opera')[1].substring(1).split(' (')[0];
    }

    //---  080218  HMO  Plataforma...
    if (strUA.indexOf("windows 95") > 0 || strUA.indexOf("win95") != -1 || strUA.indexOf("win98") != -1 || strUA.indexOf("windows 98") != -1 || strUA.indexOf("windows nt") != -1) { this.bolWin32 = true; }
    else if (strUA.indexOf("windows 3.1") != -1 || strUA.indexOf("win16") != -1) { this.bolWin16 = true; }
    else if (strUA.indexOf("mac") != -1) { this.bolMac = true; }
    else if (strUA.indexOf("linux") != -1) { this.bolLinux = true; }
    else if (!this.bolLinux && (strUA.indexOf("sunos") != -1 || strUA.indexOf("hp-ux") != -1 || strUA.indexOf("x11") != -1)) { this.bolUnix = true; }
    else if (strUA.indexOf("windows ce") != -1) { this.bolWinCE = true; }

    this.sngVer = parseFloat(this.strVer);
    this.intVer = Math.floor(this.sngVer);
};
var objBC = new jsExa.Browser();