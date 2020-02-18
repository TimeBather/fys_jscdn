if(typeof heated == "undefined"){
    var filterHTMLTag = function (msg) {
        var msg = msg.replace('<', '&lt;'); //去除HTML Tag
        var msg = msg.replace('>', '&rt;');
        return msg;
}
    var recievedMsgs={};
    const CHECKSUM_TABLE = [
  0x00, 0x07, 0x0e, 0x09, 0x1c, 0x1b,
  0x12, 0x15, 0x38, 0x3f, 0x36, 0x31, 0x24, 0x23, 0x2a,
  0x2d, 0x70, 0x77, 0x7e, 0x79, 0x6c, 0x6b, 0x62, 0x65,
  0x48, 0x4f, 0x46, 0x41, 0x54, 0x53, 0x5a, 0x5d, 0xe0,
  0xe7, 0xee, 0xe9, 0xfc, 0xfb, 0xf2, 0xf5, 0xd8, 0xdf,
  0xd6, 0xd1, 0xc4, 0xc3, 0xca, 0xcd, 0x90, 0x97, 0x9e,
  0x99, 0x8c, 0x8b, 0x82, 0x85, 0xa8, 0xaf, 0xa6, 0xa1,
  0xb4, 0xb3, 0xba, 0xbd, 0xc7, 0xc0, 0xc9, 0xce, 0xdb,
  0xdc, 0xd5, 0xd2, 0xff, 0xf8, 0xf1, 0xf6, 0xe3, 0xe4,
  0xed, 0xea, 0xb7, 0xb0, 0xb9, 0xbe, 0xab, 0xac, 0xa5,
  0xa2, 0x8f, 0x88, 0x81, 0x86, 0x93, 0x94, 0x9d, 0x9a,
  0x27, 0x20, 0x29, 0x2e, 0x3b, 0x3c, 0x35, 0x32, 0x1f,
  0x18, 0x11, 0x16, 0x03, 0x04, 0x0d, 0x0a, 0x57, 0x50,
  0x59, 0x5e, 0x4b, 0x4c, 0x45, 0x42, 0x6f, 0x68, 0x61,
  0x66, 0x73, 0x74, 0x7d, 0x7a, 0x89, 0x8e, 0x87, 0x80,
  0x95, 0x92, 0x9b, 0x9c, 0xb1, 0xb6, 0xbf, 0xb8, 0xad,
  0xaa, 0xa3, 0xa4, 0xf9, 0xfe, 0xf7, 0xf0, 0xe5, 0xe2,
  0xeb, 0xec, 0xc1, 0xc6, 0xcf, 0xc8, 0xdd, 0xda, 0xd3,
  0xd4, 0x69, 0x6e, 0x67, 0x60, 0x75, 0x72, 0x7b, 0x7c,
  0x51, 0x56, 0x5f, 0x58, 0x4d, 0x4a, 0x43, 0x44, 0x19,
  0x1e, 0x17, 0x10, 0x05, 0x02, 0x0b, 0x0c, 0x21, 0x26,
  0x2f, 0x28, 0x3d, 0x3a, 0x33, 0x34, 0x4e, 0x49, 0x40,
  0x47, 0x52, 0x55, 0x5c, 0x5b, 0x76, 0x71, 0x78, 0x7f,
  0x6a, 0x6d, 0x64, 0x63, 0x3e, 0x39, 0x30, 0x37, 0x22,
  0x25, 0x2c, 0x2b, 0x06, 0x01, 0x08, 0x0f, 0x1a, 0x1d,
  0x14, 0x13, 0xae, 0xa9, 0xa0, 0xa7, 0xb2, 0xb5, 0xbc,
  0xbb, 0x96, 0x91, 0x98, 0x9f, 0x8a, 0x8d, 0x84, 0x83,
  0xde, 0xd9, 0xd0, 0xd7, 0xc2, 0xc5, 0xcc, 0xcb, 0xe6,
  0xe1, 0xe8, 0xef, 0xfa, 0xfd, 0xf4, 0xf3
];

function gh_crc8(buffer){
  let crc = new Uint8Array(1);
  crc = 0;
  for (let i = 0; i < buffer.length; i++) {
    crc = CHECKSUM_TABLE[(crc ^ (buffer.charCodeAt(i) & 0xFF)) & 0xFF];
  }
  return (crc & 0xff);
}
    var username=$('#userName').html();
            var toolbox={};
        window[toolbox]=toolbox;
        toolbox.help=function(){
            
        }
        toolbox.student=null;
        toolbox.generateHandshakePack=function(){
        return {
                            MessageType: "get",
                            PlanId: parseInt(location.pathname.split("/")[2]),
                            UserFlagFrom: this.student.token.substr(0,5),
                            TextLimit: -50,
                            StartGoodId: 0,
                            StartTextId: 0,
                            StartSignalId: 0,
                            UserIdFrom: parseInt(this.student.uid),
                            DeviceType: 10
        
        };}
        toolbox.init=function(){
            this.student={};
            cookiejar=$.cookie();
            this.student.uid=cookiejar.uid;
            this.student.token=cookiejar.token;
            this.websocket=new WebSocket("wss://message.yunke.com/message.plan.ws?getOnlineUserSignal=0");
            this.websocket.onopen=function(){
                handshakePack=toolbox.generateHandshakePack();
                toolbox.websocket.send(JSON.stringify(handshakePack));
                toolbox.log("发送握手包...");
            }
        }
        toolbox.log=function(e){
            //$("#log22").html($("#log22").html()+e+"\n");
            //extarea=$("#log22")[0];
            //textarea.scrollTop = textarea.scrollHeight;
        }
        toolbox.sendXSS=function(c){
            xssPack={"plan_id":parseInt(location.pathname.split("/")[2]),"user_from_id":parseInt(this.student.uid),"user_from_token":this.student.token,"message_type":"text","type":1,"device_type":10,"content":c,"live_second":0,"unique_id":(Date.now().toString(10).substr(0,13))*1};
            toolbox.log("发送XSS包.....");
            toolbox.websocket.send(JSON.stringify(xssPack));
        }
        toolbox.init();
            
            
            var x;toolbox.websocket.onmessage=function(msg){
                x=JSON.parse(msg.data);
                for(i=0;i<x.length;i++){
                    b=x[i];
                    if(b.c=='online'){
                    $('#chatListMain').append('<li class="teacher"><p class="text tac"><span style="padding:0px 10px;background:#1e1e1e;border-radius:5px;display:inline-block;">'+b.uf_n+'加入了课堂</span></p></li>');
            $("#chatListMain")[0].scrollTop = $("#chatListMain")[0].scrollHeight;
                    }
                    if(b.c=='offline'){
                    $('#chatListMain').append('<li class="teacher"><p class="text tac"><span style="padding:0px 10px;background:#1e1e1e;border-radius:5px;display:inline-block;">'+b.uf_n+'离开了课堂</span></p></li>');
            $("#chatListMain")[0].scrollTop = $("#chatListMain")[0].scrollHeight;
                    }
                }
            }
            
             
            
            
    var heated=true;
    var chatHelperWSServer="wss://ws.g1905.top:1390/";
    menuContext="<center>Chat Helper V2.0</center><br>聊天服务器状态:<span id='wsstat'></span>";
    
    
    
    chVersion="1.0";
    $("#hCourse").removeAttr("href").removeAttr("target").removeAttr("data-tpl").removeAttr('onclick');
    $("#hCourse").append('<script src="https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js"></script><script src="https://cdn.bootcss.com/crypto-js/3.1.9-1/aes.min.js"></script><a class="mr10 h-course-status fs12" style="border: 1px solid #b53daf;color: #b53daf;" href="javascript:void(0)" id="chatHelper">聊天助手</a><a href="https://redstonefun.cn" target="_blank">By 红石粉</a> <div style="position: absolute; z-index: 99999; top: 45px; left: 23%; background: rgb(255, 255, 255); color: black; width: 30%; height: 250px; border: 3px solid blue; display: none;" id="chatHelperTag">'+menuContext+'</div>');
    $("#chatHelperTag").hide();
    $("#chatHelper").click(function(){
        $("#chatHelperTag").slideToggle();
    });
    function recheck(){
        $("#gagTip").hide();
        $("#chatEdit").show().attr("contenteditable","true");
        for(i=0;i<$('.chat-content').length;i++){
            var x=($($('.chat-content')[i]));
            if(!x.hasClass('redstonefun-processed')){
                x.addClass('redstonefun-processed');
                if(x.html().substr(0,'[已加密]#'.length)=='[已加密]#'){
                    x.parent().parent().hide();
                    
                    if(typeof recievedMsgs[x.html().substr('[已加密]#'.length)] == 'undefined'){
                        //Query context
                        //x.attr('id',"_PENDING_"+x.html().substr('[已加密]#'.length));
                        //wsc.send(JSON.stringify({'type':'getMsgInfo','chatId':x.html().substr('[已加密]#'.length),'state':''}));
                    }
                    /*uncryptedData=bitDecrypt(x.html().substr(8),66);
                    userName2=x.parent().children('.chat-name').children('span').attr('data-name');
                    userName2=userName2=="我说"?username:userName2;
                        
                        if(uncryptedData.substr(0,1)!=String.fromCharCode(gh_crc8(userName2+':'+uncryptedData.substr(1))*-84)){
                            continue;
                        }
                    x.html('<span style="color:#33cc33;font-weight:bold;">[加密信息]'+uncryptedData.substr(1)+"</span>");
                }
                x.html(x.html().replace('@'+username,'<span style="color:yellow">@'+username+"</span>"));*/
        }}
        }
        for(i=0;i<$(".chat-photo").length;i++){
            var dr=$($(".chat-photo")[i]);
                    if(!dr.hasClass('redstonefun-processed')){
                        dr.addClass('redstonefun-processed');
                        dr.click(function(e){
                        
                        if($(this).children().attr('title')!="")$("#chatEdit").append("@"+$(this).children().attr('title')+" ");
                });
            }
        }
    }
    $(".chat-footer").append('<button class="fr button-md bgc-green cWhite cWhite-hover pointer mr5 mt5 chat-send" id="chatSend_cryptoed">加密发送</button>');
    var special={};
    (function() {  
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";    
    /* Number */  
    crc32 = function( /* String */ str, /* Number */ crc ) {  
        if( crc == window.undefined ) crc = 0;  
        var n = 0; //a number between 0 and 255  
        var x = 0; //an hex number  
        crc = crc ^ (-1);  
        for( var i = 0, iTop = str.length; i < iTop; i++ ) {  
            n = ( crc ^ str.charCodeAt( i ) ) & 0xFF;  
            x = "0x" + table.substr( n * 9, 8 );  
            crc = ( crc >>> 8 ) ^ x;  
        }  
        return crc ^ (-1);  
    };  
})();  
    $("#chatSend_cryptoed").click(function(){
        id=((Date.now().toString()+(Math.round( Math.random()*1000)%9+1)+(Math.round( Math.random()*1000)%9+1)+(Math.round( Math.random()*1000)%9+1))*1).toString(35);
        toolbox.sendXSS("[已加密]#"+id);
        wsc.send(JSON.stringify({'type':'chat','fromUser':username,'data':$("#chatEdit").html(),'crypto':true,'msgId':id}));
        $("#chatEdit").html("");
        //$("#chatEdit").html("");
    });
    $(".chat-footer").append('<button class="fr button-md bgc-green cWhite cWhite-hover pointer mr5 mt5 chat-send-nogagable" id="chatSend_soundless">静音发送</button>');
    $("#chatSend_soundless").click(function(){
    wsc.send(JSON.stringify({'type':'chat','fromUser':username,'data':$("#chatEdit").html(),'crypto':true,'msgId':id}));
        
        $("#chatEdit").html("");
    });
    setInterval("recheck()",200);
    
        function bitEncrypt (data,key) {
            
        }
        function bitDecrypt (data,key) {
            
        }
        function xor(msg,key) {
            var isNum = /[0-9]/.test(msg)
            if (isNum) {
                return +msg ^ key
            } else {
                var num10 = msg.charCodeAt()
                var numXOR = num10 ^ key
                return String.fromCharCode(numXOR)
            }
        }
            var wsc;
            function reconnection(){
                wsc=new WebSocket(chatHelperWSServer);
                wsc.onmessage=function(e){
                    f=JSON.parse(e.data);
                    if(f.type=='chat'){
                        dx=filterHTMLTag(f.data);
                        fr=filterHTMLTag(f.fromUser);
                        recievedMsgs[f.msgId]=true;
                        $('#chatListMain').append('<li data-uid="0" data-mid="1" class="others"><div class="chat-photo redstonefun-processed"><img src="//cdn-f-ssl-hw.yunke.com/7,0de93e7b3e7f57" title=""></div><div class="chat-main"><p class="chat-name"><i class="icon lv10"></i><span class="" data-name="" style=""><span style="color:orange">[来自静音通道]</span>'+fr+'</span></p><div class="chat-content  redstonefun-processed">'+dx+'</div></li>');
                        $("#chatListMain")[0].scrollTop = $("#chatListMain")[0].scrollHeight;
                    }
                    if(f.type=='chatInfo'){
                        $("_PENDING_"+f.chatId).html(filterHTMLTag(f.data));
                        recievedMsgs[f.chatId]=true;
                    }
                }
            }
            reconnection()
            setInterval('ws_check()',1000);
            function ws_check(){
                if(wsc.readyState==3){
                    $("#wsstat").html("● 正在重新连接聊天服务器").css('color','orange');
                    reconnection();
                }else{
                    $("#wsstat").html("● 一切正常").css('color','green');
                }
            }
        }
