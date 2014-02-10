var backgroundCarousel = new function()
{
	this.backgrounds;
	this.loader;
	this.images = new Array();
	this.imagesUrls = new Array();
	this.intervalId;
	this.timeoutId;
	this.leftArrow;
	this.rightArrow;
	this.navigator;
	this.slides;
	this.autoplay = false;
	this.interval = 10000;
	this.currImg = -1;
	this.currType = 0;
	this.type = "fade";
	this.types = new Array();
	this.cicleTypes = false;
	this.cicleimg = true;
	this.customnavigator = false;
	this.onChangeImage = function(){};
	this.onPreLoader = function(){};
	this.onShowBackground = function(){};
	this.showTilLoad = true;
	this.urlImgEmpty = "img/vacio.gif"
	this.loaderEffect = "";
	this.init = function(target, options)
	{
	    if(!options) options = {};
		this.imagesUrls = options.urls ? options.urls : new Array();
		this.backgrounds = target;
		if(options.types) this.types = options.types;
		if(options.type) this.type = options.type;
		if(options.onLoaded) this.onLoaded = options.onLoaded; else this.onLoaded = function(){ };
		if(options.cicleTypes) this.cicleTypes = options.cicleTypes
		if(this.types.length > 0){
		    this.type = options.types[0];
		}
		if(options.loader) this.loader = $(options.loader);
		if(options.slides) this.slides = $(options.slides);
		if(options.autoplay) this.autoplay = options.autoplay;
		if(options.interval) this.interval = options.interval;
		if(options.onChangeImage) this.onChangeImage = options.onChangeImage;
		if(options.onPreLoader) this.onPreLoader = options.onPreLoader
		if(options.onShowBackground) this.onShowBackground = options.onShowBackground;
		if(options.cicleimage != null) this.cicleimg = options.cicleimage;
		if(options.showTilLoad != null) this.showTilLoad = options.showTilLoad;
		if(options.urlImgEmpty) this.urlImgEmpty = options.urlImgEmpty;
		if(options.navigator){
		    if(options.customnavigator != null) this.customnavigator = options.customnavigator;
		    this.navigator = $(options.navigator);
		    if(this.imagesUrls.length > 1){
		        if(!this.customnavigator){
		            this.navigator.append('<ul><li class="selected"><div></div></li><li class="last"><div></div></li></ul>');
		            if(this.imagesUrls.length > 2){
		                for(var nElm = 0;  nElm < this.imagesUrls.length - 2; nElm++)
		                    $("<li><div></div></li>").insertBefore(this.navigator.find("li.last"));
		            }
		        }
		        var navDiv = this.navigator.find("div");
		        var navLi = this.navigator.find("li");
		        var unit = parseInt(navDiv.outerWidth(true),10);
		        var padd = parseInt(navLi.first().css("padding-left"),10) + parseInt(navLi.last().css("padding-right"),10)
		        this.navigator.find("ul").width(((unit * navLi.length) + padd) + "px");
		        navLi.each(function(idx){
		            $(this).click(function(){
		                navLi.removeClass("selected")
		                $(this).addClass("selected");
		                backgroundCarousel.pause();
		                backgroundCarousel.showBackground(idx);
		                backgroundCarousel.iniPlay(false);
		            });
		        });
		        this.navigator.show();
		    }
		}
		if(options.leftArrow){
		    this.leftArrow = $(options.leftArrow);
		    this.leftArrow.hover
            (
                function(){
                    $(this).find("div").fadeIn(500);
                },
                function(){
                    $(this).find("div").fadeOut(500);
                }
            ).find("div").click(function(){
		        backgroundCarousel.showBackground(backgroundCarousel.currImg - 1);
		    });
		    if(this.imagesUrls.length < 2)  this.leftArrow.hide();
		}
		if(options.rightArrow){
		    this.rightArrow = $(options.rightArrow);
		    this.rightArrow.hover
            (
                function(){
                    $(this).find("div").fadeIn(500);
                },
                function(){
                    $(this).find("div").fadeOut(500);
                }
            ).find("div").click(function(){
		        backgroundCarousel.showBackground(backgroundCarousel.currImg + 1);
		    });
		    if(this.imagesUrls.length < 2)  this.rightArrow.hide();
		}
		if(this.imagesUrls.length > 0){
		    this.iniPlay(true);
		}
	};
	this.iniPlay = function(init){
	    if(this.autoplay && this.imagesUrls.length > 1){
	        if(init) this.showBackground(0);
	        this.intervalId = setInterval( function(){ backgroundCarousel.showBackground(backgroundCarousel.currImg + 1) }, this.interval);
	    }
	    else if(init)
	        this.showBackground(0);
	};
	this.changeImgUrl = function(urls){
	    backgroundCarousel.backgrounds.empty();
	    this.imagesUrls = urls;
	    this.currImg = -1;
	    this.currType = 0;
	    this.images = new Array();
	    if(this.types.length > 0)
	        this.type = this.types[0];
	    if(this.imagesUrls.length > 0){
		    this.showBackground(0);
		}
	};
	this.showLoader = function(bolShow, callback){
	    if(this.loader){
	        if(bolShow){
	            if(this.loaderEffect == "fade")
	                this.loader.fadeIn(200);
	            else
	                this.loader.show();
	        }
	        else{
	            if(this.loaderEffect == "fade")
	                this.loader.fadeOut(500);
	            else
	                this.loader.hide();
	        }
	    }
	    if(callback) callback();
	}

	this.showBackground = function(index, changeFunction)
	{
	    this.onShowBackground();
	    if(index > (this.imagesUrls.length - 1)) index = 0;
	    if(index < 0) index = this.imagesUrls.length - 1;
		if (this.images[index]){
		    if(typeof(changeFunction) == "function")
		        changeFunction(index);
		    else
			    this.changeBackground(index);
		}
		else{
		    this.showLoader(true);
			if(!this.showTilLoad){
			    var imgVacia = new Image();
			    imgVacia.src = this.urlImgEmpty;
			    this.images[index] = $(imgVacia);
			    this.images[index].addClass("loading")
			    this.backgrounds.append(this.images[index]);
			    if(typeof(changeFunction) == "function")
		            changeFunction(index);
		        else
			        this.changeBackground(index);
			}
			this.onPreLoader();
			chrysler.lazy.loadImage
			(
				backgroundCarousel.imagesUrls[index],
				function(index, backgroundCarousel, img)
				{
				    backgroundCarousel.showLoader(false);
				    if(backgroundCarousel.showTilLoad){
					    backgroundCarousel.images[index] = $(img);
					    backgroundCarousel.backgrounds.append(backgroundCarousel.images[index]);
					    if(typeof(changeFunction) == "function")
		                    changeFunction(index);
		                else
					        backgroundCarousel.changeBackground(index);
					}
					else{
					    backgroundCarousel.images[index].attr("src", $(img).attr("src")).removeClass("loading");
					}
					backgroundCarousel.onLoaded();
				},
				index,
				backgroundCarousel
			);
		}
	};
	this.changeType = function(newType){
	    this.queue.push(function(){ backgroundCarousel.type = newType });
	}

	this.changeBackground = function(index)
	{
	    if(this.type == "fade"){
		    this.backgrounds.children(".selected").stop(true, true).fadeOut(1500).removeClass("selected");
		    this.images[index].stop(true, true).fadeIn(1500).addClass("selected");
		}
		if(this.type == "slide"){
		    var prev = this.images[this.currImg];
            var next = this.images[index];
            var leftCont = this.backgrounds.css("width");
            var objPCss = { left: leftCont };
            var objNCss = { left: "-" + leftCont };
		    //if(this.currImg < index){
		        objPCss = { left: "-" + leftCont };
                objNCss = { left: leftCont };
            //}
            next.css(objNCss).show().animate({ left: 0 }, 500,
                function(){
                    $(this).addClass("selected");
                }
            );
            if(prev){
                prev.animate(objPCss, 500,
                    function(){
                        $(this).removeClass("selected").hide();
                    }
                );
            }
		}
		this.nextType(index);
		this.nextSlide(index);
		this.currImg = index;
		if(!this.cicleimg)
		{
		    if(index == (this.imagesUrls.length - 1) && this.rightArrow)
		        this.rightArrow.hide().find("div").hide();
		    else
		        this.rightArrow.show();
		    if(index == 0 &&  this.leftArrow)
		        this.leftArrow.hide().find("div").hide();
		    else
		        this.leftArrow.show();
		}
		this.onChangeImage(index);
	};
	this.nextSlide = function(index){
	    if(this.slides){
	        var selSlide = this.slides.children("li.selected");
	        var nextSlide = this.slides.children("li").eq(index);
	        this.slides.find("li").removeClass("selected");
	        selSlide.stop().fadeOut(500);
	        nextSlide.addClass("selected").fadeIn(500);
	    }
	    if(this.navigator){
            this.navigator.find("li").removeClass("selected").eq(index).addClass("selected");
        }
	};
	this.nextType = function(index){
	    if (this.types.length > 0 && this.currType < this.types.length){
	        this.currType++;
	        if (this.currType < this.types.length)
	            this.type = this.types[this.currType];
	        else if(this.cicleTypes){
	            this.currType = 0;
	            this.type = this.types[0];
	        }
	    }
	};
	this.pause = function()
	{
		clearInterval(this.intervalId);
		//clearTimeout(this.timeoutId);
	};

	this.toString = function()
	{
		return "[object backgroundCarousel]";
	};
};