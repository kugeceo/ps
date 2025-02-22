/***
 @name Marquee-Slide
 基于jq无缝滚动,用于解决方案
 ***/
!function(a){var b;b=function(){function b(b,c){this.elements={wrap:b,ul:b.children(),li:b.children().children()},this.settings=a.extend({},a.fn.marquee.defaults,c),this.cache={allowMarquee:!0}}return b.prototype.init=function(){this.setStyle(),this.move(),this.bind()},b.prototype.setStyle=function(){var a,b,c,d,e,f,g,h;switch(d=this.elements.li.outerWidth(!0),c=this.elements.li.outerHeight(!0),b=Math.max(parseInt(this.elements.li.css("margin-top"),10),parseInt(this.elements.li.css("margin-bottom"),10)),this.settings.type){case"horizontal":h=this.settings.showNum*d,g=c,f=9999,e="auto",a="left",this.cache.stepW=this.settings.stepLen*d,this.cache.prevAnimateObj={left:-this.cache.stepW},this.cache.nextAnimateObj={left:0},this.cache.leftOrTop="left";break;case"vertical":h=d,g=this.settings.showNum*c-b,f="auto",e=9999,a="none",this.cache.stepW=this.settings.stepLen*c-b,this.cache.prevAnimateObj={top:-this.cache.stepW},this.cache.nextAnimateObj={top:0},this.cache.leftOrTop="top"}this.elements.wrap.css({position:"relative",width:h,height:g,overflow:"hidden"}),this.elements.ul.css({position:"relative",width:f,height:e}),this.elements.li.css({"float":a})},b.prototype.bind=function(){var a,b,c,d,e,f;f=this,null!=(a=this.settings.prevElement)&&a.click(function(a){a.preventDefault(),f.prev()}),null!=(b=this.settings.nextElement)&&b.click(function(a){a.preventDefault(),f.next()}),null!=(c=this.settings.pauseElement)&&c.click(function(a){a.preventDefault(),f.pause()}),null!=(d=this.settings.resumeElement)&&d.click(function(a){a.preventDefault(),f.resume()}),null!=(e=this.elements.wrap)&&e.hover(function(){f.pause()},function(){f.resume()})},b.prototype.move=function(){var a,b,c;if(c=this,this.settings.auto){switch(this.settings.direction){case"forward":b=c.prev;break;case"backward":b=c.next}a=c.settings.interval,setTimeout(function(){b.call(c),setTimeout(arguments.callee,a)},a),this.cache.moveBefore=this.cache.moveAfter=function(){return null}}else this.cache.moveBefore=function(){return c.cache.allowMarquee=!1},this.cache.moveAfter=function(){return c.cache.allowMarquee=!0}},b.prototype.prev=function(){var a,b,c;c=this,this.cache.allowMarquee&&(this.cache.moveBefore.call(this),this.settings.prevBefore.call(this),b=this.elements.ul,a=b.children().slice(0,this.settings.stepLen),a.clone().appendTo(b),b.animate(this.cache.prevAnimateObj,this.settings.speed,function(){b.css(c.cache.leftOrTop,0),a.remove(),c.cache.moveAfter.call(c),c.settings.prevAfter.call(c)}))},b.prototype.next=function(){var a,b,c;c=this,this.cache.allowMarquee&&(this.cache.moveBefore.call(this),this.settings.nextBefore.call(this),b=this.elements.ul,a=b.children().slice(-this.settings.stepLen),a.clone().prependTo(b),b.css(c.cache.leftOrTop,-this.cache.stepW).animate(this.cache.nextAnimateObj,this.settings.speed,function(){a.remove(),c.cache.moveAfter.call(c),c.settings.nextAfter.call(c)}))},b.prototype.pause=function(){this.settings.pauseBefore.call(this),this.cache.allowMarquee=!1,this.settings.pauseAfter.call(this)},b.prototype.resume=function(){this.settings.resumeBefore.call(this),this.cache.allowMarquee=!0,this.settings.resumeAfter.call(this)},b}(),a.fn.marquee=function(c){this.each(function(){var d;d=new b(a(this),c),d.init()})},a.fn.marquee.defaults={auto:!0,interval:3e3,direction:"forward",speed:500,showNum:1,stepLen:1,type:"horizontal",prevElement:null,prevBefore:function(){},prevAfter:function(){},nextElement:null,nextBefore:function(){},nextAfter:function(){},pauseElement:null,pauseBefore:function(){},pauseAfter:function(){},resumeElement:null,resumeBefore:function(){},resumeAfter:function(){}}}(jQuery);


/*首页banner动画*/
$(function () {
	/*banner carousel*/
	var btn = $("#slider-btn li");
	var sliderImg = $("#slider-back li");
	var $bannerTxt = $(".banner-text");
	var $sliderTxt = $(".slider-text");
	var $sliderLinkBtn = $(".banner-txt a");
	var iNow = 0;
	btn.each(function (index) {
		$(this).mouseover(function () {
			slide(index);
		});
		$(this).data("index");
	});

	function slide(index) {
		iNow = index;
		btn.eq(index).addClass("active").siblings().removeClass();
		var bannerTxtActive = $bannerTxt.eq(index);
		var slideElements = bannerTxtActive.children();
		bannerTxtActive.siblings(".banner-text").stop(true).fadeOut(100);
		//初始化
		bannerTxtActive.show();
		slideElements.each(function () {
			var $_self = $(this);
			$_self.css({
				opacity: 0,
				top: $_self.data("start_top") || 0,
				left: $_self.data("start_left") || 0
			});
			$_self.stop(true).delay(400).animate({
				opacity: 1,
				top: $_self.data("to_top"),
				left: $_self.data("to_left")
			}, 1200);
			if ($_self.data("class") !== undefined) {
				$_self.removeClass($_self.data("class"));
				setTimeout(function () {
					$_self.addClass($_self.data("class"));
				}, 0);
			}
		});

		sliderImg.eq(index).siblings().stop().animate({opacity: 0}, 600);
		sliderImg.eq(index).stop().animate({opacity: 1}, 600);

	}

	function autoRun() {
		iNow++;
		if (iNow == btn.length) {
			iNow = 0;
		}
		slide(iNow);
	}

	var timer = null;
	var $_pointsContainer = $("#slider-btn");
	var setBannerInterval = function () {
		var $_activePoint = $_pointsContainer.find(".active");
		timer = setTimeout(function () {
			autoRun();
			setBannerInterval();
		}, $_activePoint.data("delay") || 8000);
	};
	setBannerInterval();
	btn.hover(function () {
			clearInterval(timer);
		}, function () {
			setBannerInterval();
		}
	);
	//banner初始化
	slide(0);
});
$(function () {
	var activeNum=1;
	
	//购买模块变化大小
	$(".cloud-product-ul>li").mouseenter(function(){
		var $_this=$(this);
		activeNum=$_this.data("index");
		var $_this=$(this);
		setTimeout(function(){
			if(activeNum==$_this.data("index")){
				$(".cloud-product-ul>li").removeClass("active");
				$_this.addClass("active");
			}
		},120)

	});
	$(".product-tab-item").mouseenter(function(){
		var $_this=$(this);
		$_this.siblings().removeClass("active");
		$_this.addClass("active");
	});
	//初始化选中的位置
	$('.solution-list').marquee({
		auto: false,
		speed: 500,
		showNum: 4,
		stepLen: 1,
		nextElement: $('.arr-btn-left'),
		prevElement: $('.arr-btn-right'),
		prevBefore: function () {
		},
		prevAfter: function () {
		},
		nextBefore: function () {
		},
		nextAfter: function () {
		}
	});
	//证书
	$('#swiperSlide').marquee({
		auto: true,
		speed: 500,
		showNum: 4,
		stepLen: 1,
		type: 'horizontal' ,
		prevBefore: function () {
		},
		prevAfter: function () {
		},
		nextBefore: function () {
		},
		nextAfter: function () {
		}
	});
});


