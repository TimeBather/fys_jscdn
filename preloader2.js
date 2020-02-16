function addLog(param){
		tpl='<article class="excerpt {{excerpt}} wow fadeInUp" style="padding: 10px 10px 10px 20px;"><img data-src="{{log_thumb}}" class="autoload-pics thumb" ></a><header><a class="cat" href="{{sortURL}}>{{sortAttr}}</a><a class="focus" href="{{log_url}}"><h2><a href="{{log_url}}" title="{{title}}">{{title}}</a></h2></header><p class="note">{{logdes}}</p><p class="meta"><time><i class="fa fa-clock-o"></i>{{stime}}</time><span class="pv"><i class="fa fa-eye"></i>阅读（{{reads}}）</span><a class="pc" href="{{log_url}}#comments"><i class="fa fa-comments-o"></i>评论({{comments}})</a></p></article>';
					var reg = new RegExp("\{\{(.+?)\}\}","igm");
					var data2=param;
                    tpl=tpl.replace(reg, function (node, key) {
                              return data2[key];
                    });
		$("#log_list_autoload").append(tpl);
	}
function Preloader(){return{data:{},preloadDatas:{},preloadByConfigure:function(templateURL,jQSelector){var that=this;$.ajax({'url':templateURL,'success':function(ret){var reg=new RegExp("\{\{(.+?)\}\}","igm");ret=ret.replace(reg,function(node,key){console.log(key,that.data[key]);return that.data[key]});jQSelector.append(ret)}})}}}var preloader=new Preloader();preloader.data=stata;function loadImage(jQSelector){var x=jQSelector;x.attr("src",x.attr('data-src'))}