if( !window.console ){
    window.console = {
        log: function(){}
    }
}


/*!
 * jQuery resizeend - A jQuery plugin that allows for window resize-end event handling.
 * Copyright (c) 2015 Erik Nielsen
 * 
 * Licensed under the MIT license:
 *    http://www.opensource.org/licenses/mit-license.php
 * Project home:
 *    http://312development.com
 * Version:  0.2.0
 */
!function(a){var b=window.Chicago||{utils:{now:Date.now||function(){return(new Date).getTime()},uid:function(a){return(a||"id")+b.utils.now()+"RAND"+Math.ceil(1e5*Math.random())},is:{number:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},fn:function(a){return"function"==typeof a},object:function(a){return"[object Object]"===Object.prototype.toString.call(a)}},debounce:function(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;d&&clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}},$:window.jQuery||null};if("function"==typeof define&&define.amd&&define("chicago",function(){return b.load=function(a,c,d,e){var f=a.split(","),g=[],h=(e.config&&e.config.chicago&&e.config.chicago.base?e.config.chicago.base:"").replace(/\/+$/g,"");if(!h)throw new Error("Please define base path to jQuery resize.end in the requirejs config.");for(var i=0;i<f.length;){var j=f[i].replace(/\./g,"/");g.push(h+"/"+j),i+=1}c(g,function(){d(b)})},b}),window&&window.jQuery)return a(b,window,window.document);if(!window.jQuery)throw new Error("jQuery resize.end requires jQuery")}(function(a,b,c){a.$win=a.$(b),a.$doc=a.$(c),a.events||(a.events={}),a.events.resizeend={defaults:{delay:250},setup:function(){var b,c=arguments,d={delay:a.$.event.special.resizeend.defaults.delay};a.utils.is.fn(c[0])?b=c[0]:a.utils.is.number(c[0])?d.delay=c[0]:a.utils.is.object(c[0])&&(d=a.$.extend({},d,c[0]));var e=a.utils.uid("resizeend"),f=a.$.extend({delay:a.$.event.special.resizeend.defaults.delay},d),g=f,h=function(b){g&&clearTimeout(g),g=setTimeout(function(){return g=null,b.type="resizeend.chicago.dom",a.$(b.target).trigger("resizeend",b)},f.delay)};return a.$(this).data("chicago.event.resizeend.uid",e),a.$(this).on("resize",a.utils.debounce(h,100)).data(e,h)},teardown:function(){var b=a.$(this).data("chicago.event.resizeend.uid");return a.$(this).off("resize",a.$(this).data(b)),a.$(this).removeData(b),a.$(this).removeData("chicago.event.resizeend.uid")}},function(){a.$.event.special.resizeend=a.events.resizeend,a.$.fn.resizeend=function(b,c){return this.each(function(){a.$(this).on("resizeend",b,c)})}}()});


/* 
 * jsui
 * ====================================================
*/
jsui.bd = $('body')
jsui.is_signin = jsui.bd.hasClass('logged-in') ? true : false;

if( $('.widget-nav').length ){
    $('.widget-nav li').each(function(e){
        $(this).hover(function(){
            $(this).addClass('active').siblings().removeClass('active')
            $('.widget-navcontent .item:eq('+e+')').addClass('active').siblings().removeClass('active')
        })
    })
}

if( $('.sns-wechat').length ){
    $('.sns-wechat').on('click', function(){
        var _this = $(this)
        if( !$('#modal-wechat').length ){
            $('body').append('\
                <div class="modal fade" id="modal-wechat" tabindex="-1" role="dialog" aria-hidden="true">\
                    <div class="modal-dialog" style="margin-top:200px;width:340px;">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                <h4 class="modal-title">'+ _this.attr('title') +'</h4>\
                            </div>\
                            <div class="modal-body" style="text-align:center">\
                                <img style="max-width:100%" src="'+ _this.data('src') +'">\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            ')
        }
        $('#modal-wechat').modal()
    })
}


if( $('.carousel').length ){
    var el_carousel = $('.carousel')

    el_carousel.carousel({
        interval: 4000
    })

    require(['hammer'], function(Hammer) {

        // window.Hammer = Hammer
        
        var mc = new Hammer(el_carousel[0]);

        mc.on("panleft panright swipeleft swiperight", function(ev) {
            if( ev.type == 'swipeleft' || ev.type == 'panleft' ){
                el_carousel.carousel('next')
            }else if( ev.type == 'swiperight' || ev.type == 'panright' ){
                el_carousel.carousel('prev')
            }
        });

    })
}


if( Number(jsui.ajaxpager) > 0 && ($('.excerpt').length || $('.excerpt-minic').length) ){
    require(['ias'], function() {
        if( !jsui.bd.hasClass('site-minicat') && $('.excerpt').length ){
            $.ias({
                triggerPageThreshold: jsui.ajaxpager?Number(jsui.ajaxpager)+1:5,
                history: false,
                container : '.content',
                item: '.excerpt',
                pagination: '.pagination',
                next: '.next-page a',
                loader: '<div class="pagination-loading"><img src="'+jsui.uri+'/img/loading.gif"></div>',
                trigger: 'More',
                onRenderComplete: function() {
                    require(['lazyload'], function() {
                        $('.excerpt .thumb').lazyload({
                            data_attribute: 'src',
                            placeholder: jsui.uri + '/img/thumbnail.png',
                            threshold: 400
                        });
                    });
                }
            });
        }

        if( jsui.bd.hasClass('site-minicat') && $('.excerpt-minic').length ){
            $.ias({
                triggerPageThreshold: jsui.ajaxpager?Number(jsui.ajaxpager)+1:5,
                history: false,
                container : '.content',
                item: '.excerpt-minic',
                pagination: '.pagination',
                next: '.next-page a',
                loader: '<div class="pagination-loading"><img src="'+jsui.uri+'/img/loading.gif"></div>',
                trigger: 'More',
                onRenderComplete: function() {
                    require(['lazyload'], function() {
                        $('.excerpt .thumb').lazyload({
                            data_attribute: 'src',
                            placeholder: jsui.uri + '/img/thumbnail.png',
                            threshold: 400
                        });
                    });
                }
            });
        }
    });
}


/* 
 * lazyload
 * ====================================================
*/
if ( $('.thumb:first').data('src') || $('.widget_ui_posts .thumb:first').data('src') || $('.wp-smiley:first').data('src') || $('.avatar:first').data('src')) {
    require(['lazyload'], function() {
        $('.avatar').lazyload({
            data_attribute: 'src',
            placeholder: jsui.uri + '/img/avatar-default.png',
            threshold: 400
        })

        $('.widget .avatar').lazyload({
            data_attribute: 'src',
            placeholder: jsui.uri + '/img/avatar-default.png',
            threshold: 400
        })

        $('.thumb').lazyload({
            data_attribute: 'src',
            placeholder: jsui.uri + '/img/thumbnail.png',
            threshold: 400
        })

        $('.widget_ui_posts .thumb').lazyload({
            data_attribute: 'src',
            placeholder: jsui.uri + '/img/thumbnail.png',
            threshold: 400
        })

        $('.wp-smiley').lazyload({
            data_attribute: 'src',
            // placeholder: jsui.uri + '/img/thumbnail.png',
            threshold: 400
        })
    })
}


/* 
 * prettyprint
 * ====================================================
*/
$('pre').each(function(){
    if( !$(this).attr('style') ) $(this).addClass('prettyprint')
})

if( $('.prettyprint').length ){
    require(['prettyprint'], function(prettyprint) {
        prettyPrint()
    })
}



/* 
 * rollbar
 * ====================================================
*/
jsui.rb_comment = ''
if ($('.comment-open').length) {
    jsui.rb_comment = "<li><a href=\"javascript:(scrollTo('#comment-place',-15));\"><i class=\"fa fa-comments\"></i></a><h6>去评论<i></i></h6></li>"
}

jsui.bd.append('\
    <div class="m-mask"></div>\
    <div class="rollbar"><ul>'
    +jsui.rb_comment+
    '<li><a href="javascript:(scrollTo());"><i class="fa fa-angle-up"></i></a><h6>去顶部<i></i></h6></li>\
    </ul></div>\
')

var _wid = $(window).width();
$(window).resize(function(event) {
    _wid = $(window).width();
});

$(window).load(function(){
    $(".widget_ui_comments li,.focusbox .most-comment-posts ul li,.excerpt h2,.widget_ui_posts li").hover(function() {
		$(this).stop().animate({
			marginLeft: "12px"
		}, 400);
	}, function() {
		$(this).stop().animate({
			marginLeft: "0px"
		}, 400);
	});
});

var scroller = $('.rollbar');
var _fix = jsui.is_fix==2 ? true : false;
$(window).scroll(function() {
    var h = document.documentElement.scrollTop + document.body.scrollTop;

    if(_fix&& h > 21 && _wid > 720 ){
        jsui.bd.addClass('nav-fixed');
    }else{
        jsui.bd.removeClass('nav-fixed');
    }

    h > 200 ? scroller.fadeIn() : scroller.fadeOut();
})


/* 
 * bootstrap
 * ====================================================
*/
$('.user-welcome').tooltip({
    container: 'body',
    placement: 'bottom'
})



/* 
 * sign
 * ====================================================
*/
if (!jsui.bd.hasClass('logged-in')) {
    require(['signpop'], function(signpop) {
        signpop.init()
    })
}


/* 
 * single
 * ====================================================
*/

var fix = $('.widget_fix');
if (_wid>1024 && fix.length) {


side_high = fix.height();
side_top = fix.offset().top;
$(window).scroll(function () {
	var scrollTop = $(window).scrollTop();
	var a = $(".widget.widget_fix");
	var mh = $('.content').height();
//如果距离顶部的距离小于浏览器滚动的距离，则添加fixed属性。
if (side_top < scrollTop){
	 a.addClass("affix");
	 if(scrollTop + side_high > mh){
		a.css('top',mh-scrollTop-side_high+'px');	
	}else{
		a.css('top','0px');	
	}	
}
//否则清除fixed的css属性
else {a.removeClass("affix");
	  a.css("top","inherit");
	  };
});



}






$('.plinks a').each(function(){
    var imgSrc = $(this).attr('href')+'/favicon.ico'
    $(this).prepend( '<img src="'+imgSrc+'">' )
})

function huoquqq() {
	$('#loging').html('<img src="'+jsui.uri+'/images/loading.gif"><a style="font-size:12px;margin-left:5px;">\u6b63\u5728\u83b7\u53d6QQ\u4fe1\u606f..</a>');
	var urls = window.location.href;
	$.ajax({
		url: urls,
		type: "POST",
		data: {
			"qq": $('#qqnum').val()
		},
		dataType: "html",
		success: function(c) {
			var josn = eval("" + c.split('@@')[1].split('@@')[0] + "");
			$('#loging').html(" ");
			$('#comname').val(josn.comname);
			$('#commail').val(josn.commail);
			$('#comurl').val(josn.comurl);
			$(".none_user").html(josn.comname);
			$('#toux').attr("src", josn.toux);
		}
	});
}


/* 
 * page u
 * ====================================================
*/
if (jsui.bd.hasClass('page-template-pagesuser-php')) {
    require(['user'], function(user) {
        user.init()
    })
}


/* 
 * page theme
 * ====================================================
*/
if (jsui.bd.hasClass('page-template-pagestheme-php')) {
    require(['theme'], function(theme) {
        theme.init()
    })
}

if (window.console && window.console.log) {
    console.log("%cwww.17uw.cn 　　会飞的鱼", " text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:2em");
}
/* 
 * page nav
 * ====================================================
*/
if( jsui.bd.hasClass('page-template-pagesnavs-php') ){

    var titles = ''
    var i = 0
    $('#navs .items h2').each(function(){
        titles += '<li><a href="#'+i+'">'+$(this).text()+'</a></li>'
        i++
    })
    $('#navs nav ul').html( titles )

    $('#navs .items a').attr('target', '_blank')

    $('#navs nav ul').affix({
        offset: {
            top: $('#navs nav ul').offset().top,
            bottom: $('.footer').height() + $('.footer').css('padding-top').split('px')[0]*2
        }
    })


    if( location.hash ){
        var index = location.hash.split('#')[1]
        $('#navs nav li:eq('+index+')').addClass('active')
        $('#navs nav .item:eq('+index+')').addClass('active')
        scrollTo( '#navs .items .item:eq('+index+')' )
    }
    $('#navs nav a').each(function(e){
        $(this).click(function(){
            scrollTo( '#navs .items .item:eq('+$(this).parent().index()+')' )
            $(this).parent().addClass('active').siblings().removeClass('active')
        })
    })
}


/* 
 * page search
 * ====================================================
*/
if( jsui.bd.hasClass('search-results') ){
    var val = $('.site-search-form .search-input').val()
    var reg = eval('/'+val+'/i')
    $('.excerpt h2 a, .excerpt .note').each(function(){
        $(this).html( $(this).text().replace(reg, function(w){ return '<b>'+w+'</b>' }) )
    })
}


/* 
 * search
 * ====================================================
*/
$('.search-show').bind('click', function(){
    $(this).find('.fa').toggleClass('fa-remove')

    jsui.bd.toggleClass('search-on')

    if( jsui.bd.hasClass('search-on') ){
        $('.site-search').find('input').focus()
        jsui.bd.removeClass('m-nav-show')
    }
})

/* 
 * phone
 * ====================================================
*/

jsui.bd.append( $('.site-navbar').clone().attr('class', 'm-navbar') )

$('.m-icon-nav').on('click', function(){
    jsui.bd.addClass('m-nav-show')

    $('.m-mask').show()

    jsui.bd.removeClass('search-on')
    $('.search-show .fa').removeClass('fa-remove') 
})

$('.m-mask').on('click', function(){
    $(this).hide()
    jsui.bd.removeClass('m-nav-show')
})




if ($('.article-content').length){
    $('.article-content img').attr('data-tag', 'bdshare')
}


video_ok()
$(window).resizeend(function(event) {
    video_ok()
});

function video_ok(){
    var cw = $('.article-content').width()
    $('.article-content embed, .article-content video, .article-content iframe').each(function(){
        var w = $(this).attr('width')||0,
            h = $(this).attr('height')||0
        if( cw && w && h ){
            $(this).css('width', cw<w?cw:w)
            $(this).css('height', $(this).width()/(w/h))
        }
    })
}






/* functions
 * ====================================================
 */
function scrollTo(name, add, speed) {
    if (!speed) speed = 300
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed)
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top + (add || 0)
            }, speed)
        }
    }
}


function is_name(str) {
    return /.{2,12}$/.test(str)
}
function is_url(str) {
    return /^((http|https)\:\/\/)([a-z0-9-]{1,}.)?[a-z0-9-]{2,}.([a-z0-9-]{1,}.)?[a-z0-9]{2,}$/.test(str)
}
function is_qq(str) {
    return /^[1-9]\d{4,13}$/.test(str)
}
function is_mail(str) {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(str)
}


$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


function strToDate(str, fmt) { //author: meizz   
    if( !fmt ) fmt = 'yyyy-MM-dd hh:mm:ss'
    str = new Date(str*1000)
    var o = {
        "M+": str.getMonth() + 1, //月份   
        "d+": str.getDate(), //日   
        "h+": str.getHours(), //小时   
        "m+": str.getMinutes(), //分   
        "s+": str.getSeconds(), //秒   
        "q+": Math.floor((str.getMonth() + 3) / 3), //季度   
        "S": str.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (str.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}





/* erphpdown 登录使用dux弹出登录框
 * ====================================================
 */
$('.erphp-login-must').each(function(){
    $(this).addClass('signin-loader')
})

/* 
 * phone
 * ====================================================
*/
function pjax_done(){
	
/*
 * 表情
 */ 
	var m = $(".comment_face_btn");
	var n = $("#Face");
	//n.hide();
	m.click(function() {
		n.slideToggle();
	});
	$("#Face a").bind({
		"click": function() {
			var a = $(this).attr("data-title");
				obj = $("#comment").get(0);
			if (document.selection) {
				obj.focus();
				var b = document.selection.createRange();
				b.text = a;
			} else {
				if (typeof obj.selectionStart === "number" && typeof obj.selectionEnd === "number") {
					obj.focus();
					var c = obj.selectionStart;
					var d = obj.selectionEnd;
					var e = obj.value;
					obj.value = e.substring(0, c) + a + e.substring(d, e.length)
				} else {
					obj.value += a;
				}
			}
		}
	});


if(Number(jsui.iasnum)){
	require(['ias.min'],function(ias){
	$.ias({
        triggerPageThreshold: jsui.iasnum?Number(jsui.iasnum)+1:5,
        history: false,
        container : '.content',
        item: '.excerpt',
        pagination: '.pagenavi',
        next: '.nextpages',
        loader: '<div class="pagination-loading"><img src="'+jsui.uri+'/images/loading.gif"><a>\u6b63\u5728\u52a0\u8f7d\u002e\u002e\u002e</a></div>',
        trigger: 'More',
        onRenderComplete: function() {
        	pjax_done();
          }  
	    });
})
}
$("#commentform").submit(function() {
        var a = $("#commentform").serialize();
        $(".comment_info").html('<img src="'+jsui.uri+'/images/loading.gif">');
        $.ajax({
            type: 'POST',
            url: $("#commentform").attr("action"),
            data:a,
            success: function(a){
				//评论失败：您提交评论的速度太快了，请稍后再发表评论
                var c = /<div class=\"main\">[\r\n]*<p>(.*?)<\/p>/i;
                c.test(a) ? ($(".comment_info").html(a.match(c)[1]).show().fadeOut(2500)) : (c = $("input[name=pid]").val(), cancelReply(), $("[name=comment]").val(""), $(".article_comment_list").html($(a).find(".article_comment_list").html()), 0 != c ? (a = window.opera ? "CSS1Compat" == document.compatMode ? $("html") : $("body") : $("html,body"), a.animate({
                    scrollTop: $("#comment-" + c).offset().top - 250
                }, "normal", function() {
                $(".comment_info").html("Ctrl+Enter快速提交").fadeOut(2500);
                })) : (a = window.opera ? "CSS1Compat" == document.compatMode ? $("html") : $("body") : $("html,body"), a.animate({
                    scrollTop: $(".article_comment_list").offset().top - 250
                }, "normal", function() {
                    $(".comment_info").html("Ctrl+Enter快速提交").fadeOut(2500);
                })));
                var imgcode = $(".c_code");
                imgcode.click();
                pjax_done();
            }
        })
        return !1
    });
$("#comment").focus(function(){
	$(".comment_info").html("Ctrl+Enter快速提交").fadeIn(2500);
})

}
pjax_done()
if(document.body.offsetWidth>=600 && jsui.is_pjax==1){
	require(['pjax'], function(pjax) {
	$(document).pjax('a[target!=_blank]', '.pjax', {fragment:'.pjax', timeout:8000});
	$(document).on('submit', 'form', function(event) {
		$.pjax.submit(event, '.content-wrap', {
			fragment: '.content-wrap',
			timeout: 6000
		})
	});
	$(document).on('pjax:send', function() { //pjax链接点击后显示加载动画；
    $(".pjax_loading").css("display", "block");});
	$(document).on('pjax:complete', function() { //pjax链接加载完成后隐藏加载动画；
    $(".pjax_loading").css("display", "none");
    pjax_done();
	if($(".article-title").length){
		$(".container")["addClass"]("single");
	}else{
		$(".container")["removeClass"]("single")
	}
	if($(".user-main").length || $("#setting").length){
		$(".sidebar").css("display", "none");
	}else{
		$(".sidebar").css("display", "block");
	}
	if($(".focusbox-wrapper").length){
		$(".focusbox-wrapper").css("display", "none");
	}
    })
});
}
	