function Preloader(){
    return {
        data:{},
        preloadDatas:{},
        preloadByConfigure:function(templateURL,jQSelector){
                $.ajax({'url':templateURL,'success':function(ret){
                    var reg = new RegExp("\{\{(.+?)\}\}","igm");
                    ret.replace(reg, function (node, key) {
                              return this.data[key];
                    });
                    jQSelector.append(ret);
                }
            
            });
            
        }
        
        
    }
}