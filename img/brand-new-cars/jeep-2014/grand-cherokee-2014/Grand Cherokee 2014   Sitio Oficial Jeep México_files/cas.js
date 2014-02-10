
function nr_tag() {
var tagVersion = "1.4.4.8";
    this.load = load;
    this.reg = reg;
    this.init = init;
    this.pageView = pageView;
    this.sendReq = sendReq;
    this.sendGwReq = sendGwReq;
    this.pageLoadedInit = pageLoadedInit;
    this.log = log;
    this.ue = ue;
    this.es = es;
    this.pu = pu;
    this.check = check;
	this.v4 = v4;
    this.v3 = v3;
    this.p3 = p3;
    this.sendAsynRequest = sendAsynRequest;
    i0 = [];
    autoRun = 0;
    j0 = 0;
    tagDebug = 0;
    loggingEnabled = 0;
    var a2;
    var i2 = [{
        n: "Google",
        h: "www.google",
        s: "q"
    }, {
        n: "Yahoo!",
        h: "yahoo.com",
        s: "q"
    }, {
        n: "Live Search",
        h: "search.live.com",
        s: "q"
    }, {
        n: "Ask.com",
        h: "ask.com",
        s: "q"
    }, {
        n: "AOL Search",
        h: "search.aol.com",
        s: "query"
    }, {
        n: "Lycos.com",
        h: "search.lycos.com",
        s: "query"
    }, {
        n: "MSN",
        h: "msn",
        s: "q"
    }, {
        n: "Baidu",
        h: "baidu",
        s: "wd"
    }, {
        n: "AllTheWeb",
        h: "alltheweb",
        s: "q"
    }, {
        n: "GigaBlast",
        h: "gigablast",
        s: "q"
    }, {
        n: "Mamma",
        h: "mamma",
        s: "query"
    }, {
        n: "Looksmart",
        h: "looksmart",
        s: "qt"
    }, {
        n: "CNN",
        h: "cnn",
        s: "query"
    }];

    function log(data) {
        if (typeof (console) !== 'undefined' && console != null && loggingEnabled == 1) console.log(data);
    }
    /*
    Description - Used to load additional JS files and writes a script tag to the header. When the load is complete then initialize() is called.
    Function parameters passed in as an array : nr_t.load(["/folder/file1.js","/folder/file2.js"])
    Scope - nr_t.load(k0)
    */
    function load(k0) {
        autoRun = 1;
        j0 = k0.length;
        if (j0 == 0) {
            initialize();
        } else {
            for (var m0 = 0; m0 < k0.length; m0++) {
                n0(k0[m0]);
            }
        }
    }
    /*
    Description - A boolean utility used to verify if an element of code has already been processed or not.
    */
    function check(keyName) {
        if (e(this["check-" + keyName])) return true;
        this["check-" + keyName] = "true";
        return false;
    }
    /*
    Description - A boolean utility used to verify if an element of code is a function or not.
    */
    function f(n1) {
        return (typeof n1 == "function");
    }
    /*
    Description - A utility for assigning and organizing tracking data before it is sent.
    Example - pv.lc.n
    */
    function b2() {
        if (!a2) return;
        for (var key in a2) {
            if (a2[key] == '' || f(a2[key])) continue;
            gw["pv." + key] = a2[key];
        }
    }
    /*
    Description - A utility for clearing data after tracking has been sent.
    */
    function h2(ss) {
        for (var key in ss) {
            if (ss[key] == '' || f(ss[key])) continue;
            delete ss[key];
        }
    }
    /*
    Description - A utility for processing strings into Arrays, Objects or Escaping strings to be used in a cookie.
    */
    function gj(n1) {
        var l1 = "";
        if (n1 instanceof Array) {
            l1 += '[';
            for (var m0 = 0; m0 < n1.length; m0++) {
                if (m0 > 0) l1 += ",";
                l1 += gj(n1[m0]);
            }
            l1 += ']';
        } else if (n1 instanceof Object) {
            l1 += "{";
            for (var m1 in n1) {
                if (n1[m1] == '' || f(n1[m1])) continue;
                if (l1 != "{") l1 += ",";
                l1 += '"' + m1 + '":';
                l1 += gj(n1[m1]);
            }
            l1 += "}";
        } else {
            l1 += '"' + escape(n1) + '"';
        }
        return l1;
    }
    /*
    Description - A utility for writing cookies set by anametrix.
    */
    function sd(key, object, w1) {
        var u1 = o(gj(object));
        var v1 = key + "=" + u1 + ";";
        if (w1) v1 += " expires=" + w1.toGMTString() + ";";
        if (!nr_t['domain']) nr_t['domain'] = document.location.hostname;
        v1 += " domain=" + nr_t['domain'] + ";";
        v1 += " path=/;";
        document.cookie = v1;
    }
    /*
    Description - A utility for reading cookies set by anametrix.
    */
    function ld(key) {
        var search = key + "=";
        var x1 = document.cookie;
        if (x1.length > 0) {
            offset = x1.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = x1.indexOf(";", offset);
                if (end == -1) end = x1.length;
                var v1ue = x1.substring(offset, end);
                y1 = eval('(' + od(v1ue) + ')');
                uej(y1);
                return y1;
            }
        }
        return new Object();
    }
    /*
    Description - A utility for processing the values of cookies set by anametrix in the last step of reading them.
    */
    function uej(object) {
        if (object instanceof Array) {
            for (var m0 = 0; m0 < object.length; m0++) {
                object[m0] = uej(object[m0]);
            }
        } else if (object instanceof Object) {
            for (var m1 in object) {
                if (f(object[m1])) continue;
                object[m1] = uej(object[m1]);
            }
        } else {
            return unescape(object);
        }
        return object;
    }
    /*
    Description - A utility for boolean error checking.
    */
    function e(k1) {
        return ((typeof k1 != 'undefined') && k1);
    }
    /*
    Description - A utility firing a track with available data in case ( or catch(){} ) of error while assembling or processing data.
    */
    function u3(e) {
        if (tagDebug == 1) document.write("Exception: " + e);
        var q0 = "/gw?g.t=" + new Date().getTime() + "&g.i=" + tagVersion + "&g.r=i&g.ex=1&g.d=" + nr_t['dataset'] + "&ex.m=" + encodeURIComponent(e.message) + "&ex.l=" + e.lineNumber + "&ex.f=" + encodeURIComponent(e.fileName) + "&ex.n=" + encodeURIComponent(e.name);
        log("NR Exception: " + e);
        for (var m0 = 0; m0 < nr_t['gwlist'].length; m0++) {
            var l0 = new Image();
            l0.src = document.location.protocol + "/" + "/" + nr_t['gwlist'][m0] + q0;
        }
    }
    /*
    Description - A utility to initialize the nr_t object and send the page view the pv object as its parameter.
    */
    function initialize() {
        try {
            init();
            pageView(pv);
        } catch (e) {
            u3(e);
        }
    }
    function reg(object) {
        i0.push(object);
        if (--j0 == 0 && autoRun == 1) {
            initialize();
        }
    }
    /*
    Description - A utility to convert objects or strings into an array..
    */
    function aa(object, key, value) {
        var j1 = object[key];
        if (!e(j1)) {
            j1 = [];
            object[key] = j1;
        }
        if (e(value)) {
            j1.push(es(value));
        } else {
            j1.push("");
        }
    }
    /*
    Description - A utility to escape a string - but will return an empty string if an undefined parameter is passed.
    */
    function es(str) {
        if (str) return escape(str);
        return "";
    }
    /*
    Description - A utility to unescape a string - but will return an empty string if an undefined parameter is passed.
    */
    function ue(str) {
        if (str) return unescape(str);
        return "";
    }
    /*
    Description - A utility for the cross browser safe attachEvent functionality.
    */
    function ae(element, eventName, eventHandler, scope, params)
    {
        var scopedEventHandler = eventHandler;

        if (scope)
        {
            scopedEventHandler = function(event)
            {
                if (params)
                {
                    if (params[params.length - 1].type)
                    {
                        params[params.length - 1] = event;
                    }
                    else
                    {
                        params.push(event);
                    }
                }
                else
                {
                    params = [event];
                }

                eventHandler.apply(scope, params);
            }
        }

        if (element.addEventListener)
        {
            element.addEventListener(eventName, scopedEventHandler, false);
        }
        else if (element.attachEvent)
        {
            element.attachEvent("on" + eventName, scopedEventHandler);
        }
    }
    /*
    Description - A utility to perform the writing the script tag of a loaded script file.
    */
    function n0(name) {
        var o0 = document.createElement('script');
        o0.setAttribute("language", "javascript1.1");
        o0.setAttribute("src", name);
        document.getElementsByTagName("head")[0].appendChild(o0);
    }
    /*
    Description - The final or second to final step in reporting the track to anametrix. The FF & Chrome fix for link tracking
    adds one more step to report with an XMLHttpRequest() by way of the sendAsynRequest(url) function.
    */
    function sendGwReq(async) {
        if(async){
            var q0 = "/gw?g.t=" + sc['t'] + "&g.r=x";
        }else{
            var q0 = "/gw?g.t=" + sc['t'] + "&g.r=i";
        }
        q0 += jo(z1);
        q0 += jo(gw);
            if(/pv\.lc\.n/.test(q0) && (typeof sc["p.t"] !== "string" || /[\w\W]+/.test(sc["p.t"]) == false)){return;}
            for (var m0 = 0; m0 < nr_t['gwlist'].length; m0++) {
                if (async)
                {
                    sendAsynRequest(document.location.protocol + "/" + "/" + nr_t['gwlist'][m0] + q0);
                }
                else
                {
                    var l0 = new Image();
                    l0.src = document.location.protocol + "/" + "/" + nr_t['gwlist'][m0] + q0;
                }
            }

        if (tagDebug == 1) document.write("Request: " + q0);
        log("NR request: " + q0);
    }
    /*
    Description - The final step in reporting the link track to anametrix. The FF & Chrome fix for link tracking
    uses an XMLHttpRequest() and send the imformation directly to anametrix instead of the standard GET and loading of an image (pixel).
    */
    function sendAsynRequest(url)
    {
        var httpRequest;

        if (window.XMLHttpRequest)
        {
            httpRequest = new XMLHttpRequest();

            if (typeof httpRequest.withCredentials == "undefined")
            {
                sendGwReq();
                return;
            }
        }
        else
        {
            sendGwReq();
            return;
        }

        httpRequest.open("GET", url, false);
        httpRequest.send(null);
    }
    /*
    Description - A utility to create the sum of the numeric strings passed in.
    */
    function add(h1, o1) {
        i1 = parseInt(vod(h1, "0"));
        if (isNaN(i1)) i1 = 0;
        inc = parseInt(vod(o1, "0"));
        if (isNaN(inc)) inc = 0;
        return i1 + inc;
    }
    /*
    Description - A utility to convert the collective objects into the query string passed when tracking is reported.
    */
    function jo(obj) {
        var s0 = "";
        for (var key in obj) {
            value = obj[key];
            if (value == '' || f(value)) continue;
            if (value instanceof Array) {
                g1 = true;
                array = value;
                value = "";
                for (var m0 = 0; m0 < array.length; m0++) {
                    if (e(array[m0])) {
                        g1 = false;
                        value += array[m0];
                    }
                    value += ',';
                }
                if (g1) continue;
            }
            s0 += "&" + key + "=" + encodeURIComponent(value);
        }
        return s0;
    }
    /*
    Description - A utility to convert strings the character codes.
    */
    function od(b1) {
        if (b1.indexOf("o~") == 0) return "{}";
        if (b1.indexOf("o2~") != 0) return b1;
        var c1 = "",
            d1;
        for (var m0 = 3; m0 < b1.length; m0++) {
            d1 = b1.charCodeAt(m0);
            if (d1 >= 34 && d1 <= 58) d1--;
            else if (d1 == 33) d1 = 58;
            else if (d1 >= 61 && d1 <= 126) d1--;
            else if (d1 == 60) d1 = 126;
            c1 += String.fromCharCode(d1);
        }
        return c1;
    }
    /*
    Description - A utility to convert strings the character codes.
    */
    function o(e1) {
        var c1 = "",
            d1;
        for (var m0 = 0; m0 < e1.length; m0++) {
            d1 = e1.charCodeAt(m0);
            if (d1 >= 33 && d1 <= 57) d1++;
            else if (d1 == 58) d1 = 33;
            else if (d1 >= 60 && d1 <= 125) d1++;
            else if (d1 == 126) d1 = 60;
            c1 += String.fromCharCode(d1);
        }
        return "o2~" + c1;
    }
    /*
    Description - A utility to serve as a get parameter from a given query string.
    EXAMPLE -   var qs = nr_t.pu(document.location);
                qs.qsh['hrf'] will return the VALUE of the hrf KEY;
    */
    function pu(str) {
        var m = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(str),
            p1 = {},
            i = 14;
        var keys = ["src", "pr", "a", "u", "us", "pa", "host", "po", "pa", "re", "dir", "file", "qs", "an"];
        while (i--) p1[keys[i]] = m[i] || "";
        p1["qsh"] = {};
        p1["qs"].replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
            if ($1) p1["qsh"][$1] = $2;
        });
        return p1;
    }
    /*
    Description - A utility to return a boolean when checking a string for a specific value.
    */
    function cstr(str, w0) {
        return str.indexOf(w0) != -1;
    }
    /*
    Description - A utility to return the value of an object key or null if the value is undefined.
    */
    function gv(y0, key) {
        if (typeof y0[key] == "undefined") return null;
        return y0[key];
    }
    /*
    Description - A utility to convert the time stamp or number with toString(20).
    Example - 1344375644188 is converted to 2CA5H53C7A.
    The code performs further processing to concatendate -4F85 and -28DF
    Resulting - g.x 2CA5H53C7A-4F85-28DF
    */
    function a1(q1) {
        var r1, i, j;
        r1 = q1.toString(20) + "-";
        for (j = 0; j < 8; j++) {
            if (j == 4) r1 = r1 + '-';
            i = Math.floor(Math.random() * 20).toString(20);
            r1 = r1 + i;
        }
        return r1.toUpperCase();
    }
    /*
    Description - A utility to return either the string of the first parameter else the number of the second parameter.
    */
    function vod(s1, t0) {
        if (s1 != null && s1 != "") {
            return s1;
        }
        return t0;
    }
    /*
    Description - A utility used to translate values passed in that coorelate to system identifiers in the anametrix gui.
    */
    function tr(key, u0, z0) {
        var y0 = sc;
        if (cstr(z0, "Sp")) y0 = ps;
        if (cstr(z0, "Ss")) y0 = ss;
        var x0 = y0[key];
        if (cstr(z0, "Uo")) y0[key] = u0;
        if (cstr(z0, "Us") && sc['ns']) y0[key] = u0;
        if (cstr(z0, "Un") && !y0[key]) y0[key] = u0;
        if (cstr(z0, "Up") && u0 != null && u0 != "") y0[key] = u0;
        if (cstr(z0, "Ue") && u0 != null) y0[key] = u0;
        if (y0[key] == null || y0[key] == "") delete y0[key];
        var v0 = null;
        if (cstr(z0, "Ea")) v0 = y0[key];
        if (cstr(z0, "En") && !x0) v0 = y0[key];
        if (cstr(z0, "Es") && sc['ns']) v0 = y0[key];
        if (cstr(z0, "Ec") && x0 != y0[key]) v0 = y0[key];
        if (cstr(z0, "C") && !sc['c']) v0 = null;
        if (cstr(z0, "G") && v0) gw[key] = v0;
        if (cstr(z0, "I") && v0) z1[key] = v0;
        return v0;
    }
    /*
    Description - A utility that all tracking(besides page tracks) directly calls when reporting from the
    client side files. For the page track, This is the second function called.
    */
    function sendReq(vars, async) {
        try {
            a2 = vars;
            nr_t['pv'] = a2;
            tr('p.sc', add(sc['p.sc'], 1), "UoEaGC");
            sc['t'] = new Date().getTime();
            for (m0 = 0; m0 < i0.length; m0++) {
                i0[m0].updateEvent();
            }
            s3();
            for (m0 = 0; m0 < i0.length; m0++) {
                i0[m0].finalize();
            }
            t3();
            sd(nr_t['dataset'] + "_ps", ps, f1);
            sd(nr_t['dataset'] + "_ss", ss, null);
            sd(nr_t['dataset'] + "_cs", cs, f1);
            sendGwReq(async);
            gw = new Object();
            nr_t['gw'] = gw;
            sc['ns'] = false;
        } catch (e) {
            u3(e);
        }
    }
    /*
    Description - A utility to run after the nr_t object is instanciated - link and form tracking is then instanciated.
    */
    function pageLoadedInit() {
        if (nr_t.check("pl")) return;
        //attachLinkTracking(null);
        v3(null);
        //v4();
        p3();
    }
    /*
    Description - A utility to run the initial setup for the base of all tracking to report.
    */
    function init() {
        if (nr_t.check("init")) return;
        if (!nr_t['dataset']) return;
        sc = new Object();
        nr_t['sc'] = sc;
        sc['t'] = new Date().getTime();
        sc['r'] = pu(eval("document.ref" + "errer"));
        sc['p'] = pu(document.location);
        for (var m0 = 0; m0 < i0.length; m0++) {
            i0[m0].init();
        }
        ss = ld(nr_t['dataset'] + "_ss");
        nr_t['ss'] = ss;
        ps = ld(nr_t['dataset'] + "_ps");
        z1 = new Object();
        nr_t['z1'] = z1;
        gw = new Object();
        nr_t['gw'] = gw;
        z1['g.d'] = nr_t['dataset'];
        z1['g.x'] = a1(sc['t']);
        z1['g.i'] = tagVersion;
        f1 = new Date(sc['t'] + 31536000000);
        ps['c.t'] = sc['t'];
        sd(nr_t['dataset'] + "_ps", ps, f1);
        ps = ld(nr_t['dataset'] + "_ps");
        nr_t['ps'] = ps;
        if (ps['c.t']) sc['c'] = '1';
        cs = ld(nr_t['dataset'] + "_cs");
        nr_t['cs'] = cs;
        tr('v.i', z1['g.x'], "SpUnEaIC");
        setTimeout("nr_t.pageLoadedInit()", 3200);
        ae(window, 'load', pageLoadedInit);
    }
    /*
    Description - A utility used when a page track is called. All data passed with the page track is
    passed through this function and then to their specific functions for processing.
    */
    function pageView(vars) {
        a2 = vars;
        nr_t['pv'] = a2;
        processWebAnalytics();
        for (m0 = 0; m0 < i0.length; m0++) {
            i0[m0].process();
        }
        sendReq(a2);
    }
    function intDiv(w3, y3) {
        var x3 = w3 % y3;
        return vv3 = (w3 - x3) / y3;
    }
    /*
    Description - A utility for processing the page groups data passed in by way of the page track.
    */
    function updatePageGroups() {
        var cs = nr_t['cs'];
        var gw = nr_t['gw'];
        var j3 = nr_t['sc']['p'];
        var q1 = nr_t['sc']['t'];
        var f0 = parseInt(ps['v.cf']);
        d0 = cs['pg'];
        if (!e(d0)) {
            d0 = new Object();
            cs['pg'] = d0;
        }
        var pageGroup = a2['p.g.n'];
        if (!e(pageGroup)) return;
        log("Stored page groups: " + gj(d0));
        g0 = d0[pageGroup];
        if (!e(g0)) {
            g0 = new Object();
            g0['ft'] = q1;
            g0['vc'] = 1;
            g0['fc'] = 1;
            g0['fd'] = "0";
            d0[pageGroup] = g0;
        } else {
            log("Page group exists: " + g0);
            h0 = parseInt(g0['ts']);
            if (h0 < f0) {
                g0['vc'] = add(g0['vc'], 1);
            }
            var a0 = q1 - h0;
            if (a0 > 86400000) {
                log("This pagegroup wasn't seen today: " + a0);
                g0['fc'] = add(g0['fc'], 1);
                log("TSD: " + intDiv(a0, 86400000));
                g0['fd'] = add(g0['fd'], intDiv(a0, 86400000));
                gw["p.g.fc"] = g0['fc'];
                gw["p.g.fd"] = g0['fd'];
            }
        }
        g0['ts'] = q1;
        gw["p.g.ts"] = g0['ts'];
        gw["p.g.ft"] = g0['ft'];
        gw["p.g.vc"] = g0['vc'];
        while (true) {
            var e0 = 0;
            var z3 = null;
            var o2 = 0;
            var p2 = 0;
            for (var m1 in d0) {
                if (f(d0[m1])) continue;
                e0++;
                g0 = d0[m1];
                p2 = parseInt(g0['ts']);
                if (z3 == null || p2 < o2) {
                    o2 = p2;
                    z3 = m1;
                }
            }
            if (e0 > 20) {
                delete d0[z3];
                log("Deleted page group: " + z3);
                continue;
            }
            break;
        }
    }
    /*
    Description - A utility to process the campaign, conversion and goal page tracking.
    */
    function d3() {
        var cs = nr_t['cs'];
        var gw = nr_t['gw'];
        var j3 = nr_t['sc']['p'];
        var q1 = nr_t['sc']['t'];
        var v2 = a2['cmp'];
        a2['cmp'] = '';
        var u2;
        if (!e(v2)) v2 = [];
        if (sc['p.sc'] == 1) {
            var t2 = j3.qsh['cmp_id'];
            if (t2) {
                u2 = new Object();
                u2['id'] = t2;
                u2['exp'] = j3.qsh['cmp_exp'];
                u2['c'] = j3.qsh['cmp_c'];
                for (var r2 = 1; r2 <= 20; r2++) {
                    u2["a_" + r2] = j3.qsh['cmp_a_' + r2];
                }
                v2.push(u2);
            }
        }
        n2 = cs['cmp'];
        if (!e(n2)) {
            n2 = new Object();
            cs['cmp'] = n2;
        }
        for (var m0 = 0; m0 < v2.length; m0++) {
            u2 = v2[m0];
            f3 = n2[u2.id];
            if (!e(f3)) {
                f3 = new Object();
                f3['id'] = u2.id;
                f3['fr'] = q1;
                n2[f3.id] = f3;
            } else {}
            aa(gw, "p.cmp.id", f3['id']);
            f3['ts'] = q1;
            if (e(u2['exp'])) f3['exp'] = u2['exp'];
            f3['c'] = add(f3['c'], u2.c);
            aa(gw, "p.cmp.c", f3['c']);
            f3['rc'] = add(f3['rc'], 1);
            aa(gw, "p.cmp.rc", f3['rc']);
            aa(gw, "p.cmp.fr", f3['fr']);
            for (var r2 = 1; r2 <= 20; r2++) {
                attr = u2["a_" + r2];
                if (e(attr)) f3['a_' + r2] = attr;
                aa(gw, "p.cmp.a_" + r2, f3['a_' + r2]);
            }
        }
        while (true) {
            var s2 = 0;
            var q2 = null;
            var o2 = 0;
            var p2 = 0;
            for (var m1 in n2) {
                if (f(n2[m1])) continue;
                s2++;
                f3 = n2[m1];
                p2 = parseInt(f3['ts']);
                if (q2 == null || p2 < o2) {
                    o2 = p2;
                    q2 = m1;
                }
                if (e(f3['exp']) && (q1 > (parseInt(f3['ts']) + (parseInt(f3['exp'] * 1000))))) {
                    delete n2[m1];
                }
            }
            if (s2 > 0 && (gj(cs).length > 1000)) {
                delete n2[q2];
                continue;
            }
            break;
        }
        h3 = a2['goal'];
        a2['goal'] = '';
        if (e(h3)) {
            tr('v.goal.id', h3['id'], "UoEaG");
            tr('v.goal.v', h3['v'], "UoEaG");
            tr('v.goal.vb', h3['vb'], "UoEaG");
            for (r2 = 1; r2 <= 10; r2++) {
                attr = h3["a_" + r2];
                if (e(attr)) tr('v.goal.a_' + r2, attr, "UoEaG");
            }
            var y2 = h3['cmp'];
            var a3 = h3['match_key'];
            var b3 = h3['match_value'];
            var z2 = [];
            var x2 = null;
            var w2 = null;
            for (var m1 in n2) {
                if (f(n2[m1])) continue;
                f3 = n2[m1];
                if (x2 == null || f3.ts < x2.ts) x2 = f3;
                if (w2 == null || f3.ts > w2.ts) w2 = f3;
                if (y2 == "all" || (a3 && f3[a3] == b3)) {
                    z2.push(f3);
                }
            }
            if (y2 == "first" && x2) {
                z2.push(x2);
            } else if (y2 == "last" && w2) {
                z2.push(w2);
            }
            for (m0 = 0; m0 < z2.length; m0++) {
                f3 = z2[m0];
                aa(gw, "v.cnv.id", f3['id']);
                aa(gw, "v.cnv.c", f3['c']);
                aa(gw, "v.cnv.rc", f3['rc']);
                aa(gw, "v.cnv.ts", f3['ts']);
                f3['cc'] = add(f3['cc'], 1);
                aa(gw, "v.cnv.cc", f3['cc']);
                for (var r2 = 1; r2 <= 20; r2++) {
                    aa(gw, "v.cnv.a_" + r2, f3['a_' + r2]);
                }
            }
        }
    }
    /*
    Description - A utility to process the page referrer and identifies search engines & paid keywords.
    */
    function j2() {
        var k2;
        var m2;
        var l2 = sc['r'].host;
        for (var m0 = 0; m0 < i2.length; m0++) {
            k2 = i2[m0];
            m2 = sc['r'].qsh[k2.s];
            paidKeyword = sc['p'].qsh['nr_pk'];
            if (l2.indexOf(k2.h) > -1 && e(m2)) {
                tr('p.se.id', k2.n, "UoEaG");
                tr('p.se.ok', m2, "UoEaG");
                tr('p.se.pk', paidKeyword, "UoEaG");
                tr('v.se.id', k2.n, "SpUpEsGC");
                tr('v.se.ok', m2, "SpUpEsGC");
                tr('v.se.pk', paidKeyword, "SpUpEsGC");
                tr('v.se.ts', sc['t'], "SpUpEsGC");
                break;
            }
        }
        tr('e.id', null, "SpEsGC");
        tr('v.se.ok', null, "SpEsGC");
        tr('v.se.ts', null, "SpEsGC");
    }
    /*
    Description - A utility to determine, evaluate and establish the user's session cookie.
    */
    function m3() {
        c0 = sc['t'];
        g2 = parseInt(ps['v.cl']);
        if (!g2) sc['nv'] = true;
        if (!g2 || (c0 - g2) > 1800000) {
            sc['ns'] = true;
            tr('v.ls', ps['s.s'], "SpUo");
            tr('v.cf', c0, "SpUo");
            tr('v.ll', ps['v.cl'], "SpUoEaG");
            if (e(ps['v.cl'])) {
                var b0 = parseInt(ps['v.cl']);
                var a0 = c0 - b0;
                if (a0 > 86400000) {
                    tr('v.fc', add(ps['v.fc'], 1), "SpUoEaG");
                    log("New visit with a day-delta of: " + intDiv(a0, 86400000));
                    tr('v.fd', add(ps['v.fd'], intDiv(a0, 86400000)), "SpUoEaG");
                }
            }
            h2(ss);
        }
    }
    function v333(elementId) {
        return;
    }
    /*
    Description - Orininal Link Tracking function - LEGACY CODE
    Parameter (optional) is used to isolate a tag ID as a container to a new set of LINKS that need the link tracking bind applied to them.
    */
    function v3(elementId) {
        /*Check to verify enabled or diabled link tracking - The file is global so its either on of off for all brands.*/
        if (nr_t['link_tracking'] != 1) return;

        /*Represent the array of LINKS to be accounted for.*/
        var o3;

        /*If an ID is provided then bind the LINKS contained - else - bind all links present in the document (default to page load).*/
        if (elementId){ o3 = document.getElementById(elementId).getElementsByTagName('a')}else{ o3 = document.links };

        /*For every LINK in the array */
        for (var i = 0; i < o3.length; i++) {

            var linkName = o3[i].name;
            var linkAttribute = '';

            /*
            Oringinal tracking data parser:
            Leveraging the NAME attribute with lid & lpos defined together.
               <a href="" name="&amp;lpos=link_positon_value&amp;lid=link_name_value">Some Link</a>
            Some frown due to the result of invalid HTML
            */
            if (e(linkName) && linkName.indexOf("lid") > -1) {
                var linkData = nr_t.pu("x:/" + "/x.x?x&" + linkName);
                linkName = linkData.qsh['lid'];
                if (e(linkName)) linkName = linkName.toLowerCase();
                linkAttribute = linkData.qsh['lpos'];
                if (e(linkAttribute)) linkAttribute = linkAttribute.toLowerCase();
            }
            /*
            Updated tracking parser:
            Leveraging individual attributes for the LID & LPOS.
                <a href="" data-lid="link_name_value" data-lpos="link_positon_value">Some Link</a>
            Latest browser accept these attributes and HTML successfully validates.
            */
            else if(o3[i].getAttribute('data-lid')){
                linkName = o3[i].getAttribute('data-lid');
                if (e(linkName)) linkName = linkName.toLowerCase();
                linkAttribute = o3[i].getAttribute('data-lpos');
                if (e(linkAttribute)) linkAttribute = linkAttribute.toLowerCase();
            }
            /*
            If the tracking parser fails then:
                1 - Check the innerText  <a href="">Some Link</a>
                2 - Check for a contained element such as an image and leverage its ALT or TITLE attribute
                3 - If all else failes the the linkName is assigned to "linkName_not_found".
            */
            if (linkName == '') linkName = o3[i].innerText || o3[i].text || (o3[i].firstChild ? o3[i].firstChild.alt || o3[i].firstChild.title:'linkName_not_found');

            /*
            Some link data tries to pass special character - So the value is cleaned and passed back in the proper format.
            */
            linkName = stringCleaner(linkName);

            /*
            Finally we have the actual CLICK BIND for tracking. Any data present at this moment is what is reported on CLICK of the link.
            LC.N = The value of LID
            LC.A_1 = The value of LPOS
            LC.A_2 = The value of the initial P.T in context of the browser tab in focus.
            LC.U = The HREF
            */
            if (linkName) ae(o3[i], 'click', new Function("nr_t.sendReq({'lc.n':nr_t.ue('" + es(linkName) + "'),'lc.a_1':nr_t.ue('" + es(linkAttribute) + "'),'lc.a_2':nr_t.ue('" + es(sc['p.t']) + "'),'lc.u': nr_t.ue('" + es(o3[i].href) + "')},true);"));
        }
    }
    /*
    Description - A utility to locate and identify the source elements parents until an <a> anchor tag is found.
    */
    function findParentAnchor(el)
    {
        var pn = el;

        /*
        Some may not know -
        1 - The significance of a DO/WHILE loop is that it will execute ONE or more times.
        2 - Where as a WHILE loop will execute ZERO or more times.
        */
        do
        {
            if(pn.tagName == "A")
            {
                return pn;
            }
            else
            {
                pn = pn.parentNode;
            }
        }
        while(pn);
    }
    /*
    Description - The new link trakcing logic. Instead of binding all links on page load the function uses
    the attachevent - ae() - to bind a click event function to the document level and listens for the bubble event.

    Some may not know - There are two event phases to the mouse interaction.

        1 - Capture Phase
               | |
---------------| |-----------------
| element1     | |                |
|   -----------| |-----------     |
|   |element2  \ /          |     |
|   -------------------------     |
|        Event CAPTURING          |
-----------------------------------

        2 - Bubble Phase
               / \
---------------| |-----------------
| element1     | |                |
|   -----------| |-----------     |
|   |element2  | |          |     |
|   -------------------------     |
|        Event BUBBLING           |
-----------------------------------

    The code runs on the fly so this processing in many cases will only happen one time per page view if the
    LINK clicked is one that directs the user to a different page.

    */
    function v4()
    {
        ae(document, "click", function(event){
            var link;

            /*
            Cross-Browser check for a "target" or "srcElement" that was clicked. The logic contained within each are the same.
            1 - Is the element an ANCHOR?
                YES - Then the variable "link" is assigned to that element.
                NO - Then pass the element to findParentAnchor(el) and assign the variable "link" to the returned anchor.
                NOTE: Elements other than <a> have capture & bubble phases - If no <a> is returned then desregard and stop.
            */
            if (event.target){
                if(event.target.tagName == "A"){
                    link = event.target;
                }else{
                    link = findParentAnchor(event.target);
                }
            }
            else if (event.srcElement)
            {
                if(event.srcElement.tagName == "A"){
                    link = event.srcElement;
                }else{
                    link = findParentAnchor(event.srcElement);
                }

            }

            /*
            With the success of a LINK being identified then continue.
            */
            if (link)
            {

                if(link.getAttribute('data-stoptrack')){return;};

                /*
                SAME LOGIC AS ABOVE - Accept it is only running on demand of (and in context of) the link being click.
                The link is not being bound with a CLICK nor are the values being hard coded. This allows code to
                modify link tracking data if and when needed during the users visit.
                */
                var linkName = (link.name).replace(/&amp;/g,'&');
                var linkAttribute = '';
                if (e(linkName) && linkName.indexOf("lid") > -1) {
                    var linkData = nr_t.pu("x:/" + "/x.x?x&" + linkName);
                    linkName = linkData.qsh['lid'];
                    if (e(linkName)) linkName = linkName.toLowerCase();
                    linkAttribute = linkData.qsh['lpos'];
                    if (e(linkAttribute)) linkAttribute = linkAttribute.toLowerCase();
                }else if(link.getAttribute('data-lid')){
                    linkName = link.getAttribute('data-lid');
                    if (e(linkName)) linkName = linkName.toLowerCase();
                    linkAttribute = link.getAttribute('data-lpos');
                    if (e(linkAttribute)) linkAttribute = linkAttribute.toLowerCase();
                }
                if (linkName == '') linkName = link.innerText || link.text || (link.firstChild ? link.firstChild.alt || link.firstChild.title:'linkName_not_found');

                linkName = stringCleaner(linkName);
                nr_t.sendReq({
                    'lc.n':nr_t.ue(es(linkName)),
                    'lc.a_1':nr_t.ue(es(linkAttribute)),
                    'lc.a_2':nr_t.ue(es(nr_t.sc['p.t'])),
                    'lc.u': nr_t.ue(es(link.href))
                },true);
            }
        });
    }
    /*
    Description - A utility to bind <form> with all form tracking logic.
    */
    function p3() {
        if (nr_t['form_tracking'] != 1) return;
        var q3 = [];
        var n3 = document.forms;
        for (var i = 0; i < n3.length; i++) {
            var r3 = n3[i].id || n3[i].name;
            if (!r3) continue;
            q3.push(r3);
            var formChangeFunction = new Function("if (nr_t.check('form')) return;nr_t.sendReq({'fi.n':nr_t.ue('" + es(r3) + "')});");
            ae(n3[i], 'change', formChangeFunction);
            ae(n3[i], 'keypress', formChangeFunction);
            ae(n3[i], 'submit', new Function("nr_t.sendReq({'fs.n':nr_t.ue('" + es(r3) + "')});"));
            for (var e = 0; e < n3[i].elements.length; e++) {
                var fieldName = n3[i].elements[e].id;
                var formFocusFunction = new Function("t", "var t=t?t:window.event;var el=t.target?t.target:t.srcElement;nr_t.log(t);nr_t.sendReq({'ff.n':nr_t.ue('" + es(fieldName) + "'),'ff.f': el.name,'ff.i': el.id,'ff.a_1':nr_t.ue('" + es(r3) + "')});");
                ae(n3[i].elements[e], 'focus', formFocusFunction);
            }
        }
        if (q3.length > 0) {
            tr('fv.n', q3, "UoEaG");
        }
    }
    function e2() {
        c0 = sc['t'];
        tr('s.sc', add(ss['s.sc'], 1), "SsUoEaGC");
        tr('v.sc', add(ps['v.sc'], 1), "SpUoEaGC");
        tr('v.ls', null, "SpEaGC");
        tr('v.ll', null, "SpEaGC");
        tr('v.cl', null, "SpEaGC");
        tr('v.c', add(ps['v.c'], 1), "SpUsEaGC");
        if (ps['v.c'] == "1") tr('v.fl', c0, "SpUo");
        tr('v.fl', null, "SpEaGC");
        tr('s.s', c0, "SpUsEaGC");
        tr('v.fs', c0, "SpUnEaGC");
        for (var m0 = 0; m0 < 10; m0++) {
            l3 = 'v.s_' + m0;
            tr(l3, a2[l3], "SpUeEcEsGC");
            a2[l3] = '';
        }
    }
    /*
    Description - A utility to process surrounding data outside of what is passed in by track that is called.
    */
    function s3() {
        m3();
        e2();
        updatePageGroups();
        d3();
        b2();
    }
    /*
    Description - A utility to process surrounding data outside of what is passed in by the page track that is called.
    */
    function processWebAnalytics() {
        m3();
        tr('g.a', 'pv', "UoEaG");
        tr('p.t', vod(gv(a2, 'name'), document.title), "UoEaG");
        a2['name'] = '';
        var ref = sc['r'].src;
        tr('v.r', ref, "SpUnEsGC");
        if (sc['r'].host != document.location.host) {
            tr('p.r', ref, "UoSsEcG");
        }
        tr('v.z', new Date().getTimezoneOffset(), "EsGC");
        tr('s.sr', screen.width + "x" + screen.height, "UoEsGC");
        j2();
    }
    /*
    Description - A utility to translate the time stamp in the process of running the sendReq() function.
    */
    function t3() {
        tr('v.cl', nr_t['sc']['t'], "SpUoEn");
    }

    /** *********************************************************************************************************
    *   @label  String Cleaner:
    *   @description This utility is used to strip and replace special characters & white spaces and replaces them with the underscore "_".
    *   This is most commonly used to process the LID parameter value of a manual linkTrack call.
    *
    *   @method stringCleaner(a)
    ********************************************************************************************************* */
    function stringCleaner(a) {
        if(typeof a == "undefined"){
            return "stringCleaner_undefined_value";
        }else{
            a = unescape(a).toString();
            return a.replace(/[^a-zA-Z0-9,\s,+,-,_,\/,|]/g, "").replace(/[\s+]/g, "_").replace(/[__]+/g,"_").replace(/_$/g,'').toLowerCase();
       }
    }
}

/**

*   @instructions   Be sure to update the actual location of your cas.tracking.js file when populating the nr_t.load() function call below.
*                   Be sure that this file loads nearly last as to allow for other user facing scripts load and run first.
*                   I updated the cas.tracking.js to self instanciate so there are no additional calls to get the process running.
*/
var nr_t = new nr_tag();

//(function(){
	cas =
	{
		exists: true,
		scriptCount : 3,
		scriptCounter : 0
	}
	cas = window.cas;
	cas.trackObj = {};
//})();


nr_t.load([strRutaBase+"_dcn/anametrix/cas.tracking_"+strBrand+".js"]);