if(typeof heated == "undefined"){
    var filterHTMLTag = function (msg) {
        var msg = msg.replace('<', '&lt;'); //去除HTML Tag
        var msg = msg.replace('>', '&rt;');
        return msg;
}
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
    menuContext="<center>Chat Helper V2.0</center>";
    
    
    
    chVersion="1.0";
    $("#hCourse").removeAttr("href").removeAttr("target").removeAttr("data-tpl").removeAttr('onclick');
    $("#hCourse").append('<a class="mr10 h-course-status fs12" style="border: 1px solid #b53daf;color: #b53daf;" href="javascript:void(0)" id="chatHelper">聊天助手</a><a href="https://redstonefun.cn" target="_blank">By 红石粉</a> <div style="position: absolute; z-index: 99999; top: 45px; left: 23%; background: rgb(255, 255, 255); color: black; width: 30%; height: 250px; border: 3px solid blue; display: none;" id="chatHelperTag">'+menuContext+'</div>');
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
                if(x.html().substr(0,8)=="[已加密]##+"){
                    uncryptedData=bitEncrypt(x.html().substr(8));
                    userName2=x.parent().children('.chat-name').children('span').attr('data-name');
                    userName2=userName2=="我说"?username:userName2;
                        
                        if(uncryptedData.substr(0,1)!=String.fromCharCode(gh_crc8(userName2+':'+uncryptedData.substr(1))*-84)){
                            continue;
                        }
                    x.html('<span style="color:#33cc33;font-weight:bold;">[加密信息]'+uncryptedData.substr(1)+"</span>");
                }
                x.html(x.html().replace('@'+username,'<span style="color:yellow">@'+username+"</span>"));
            }
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
    $("#chatSend_cryptoed").click(function(){
        toolbox.sendXSS("[已加密]##+"+bitEncrypt(String.fromCharCode(-84*gh_crc8(username+":"+$("#chatEdit").html()))+$("#chatEdit").html()));
        $("#chatEdit").html("");
    });
    $(".chat-footer").append('<button class="fr button-md bgc-green cWhite cWhite-hover pointer mr5 mt5 chat-send-nogagable" id="chatSend_soundless">静音发送</button>');
    $("#chatSend_soundless").click(function(){
    wsc.send(JSON.stringify({'type':'chat','fromUser':username,'data':$("#chatEdit").html()}));
        $("#chatEdit").html("");
    });
    setInterval("recheck()",200);
    
        function bitEncrypt (data) {
            var data = data || ''
            var arr = data.split('')
            
            var result = arr.map(function (item) {
                if (!special[item]) {
                    return xor(item)
                } else {
                    return item
                }
            })
            return result.join('')
        }

        function xor(msg) {
            var isNum = /[0-9]/.test(msg)
            if (isNum) {
                return +msg ^ 1
            } else {
                var num10 = msg.charCodeAt()
                var numXOR = num10 ^ 1
                return String.fromCharCode(numXOR)
            }
        }
            var wsc=new WebSocket(chatHelperWSServer);
            wsc.onmessage=function(e){
                f=JSON.parse(e.data);
                if(f.type=='chat'){
                    dx=filterHTMLTag(f.data);
                    fr=filterHTMLTag(f.fromUser);
                    $('#chatListMain').append('<li data-uid="0" data-mid="1" class="others"><div class="chat-photo redstonefun-processed"><img src="//cdn-f-ssl-hw.yunke.com/7,0de93e7b3e7f57" title=""></div><div class="chat-main"><p class="chat-name"><i class="icon lv10"></i><span class="" data-name="">'+fr+'</span></p><div class="chat-content  redstonefun-processed">'+dx+'</div></li>');
                    $("#chatListMain")[0].scrollTop = $("#chatListMain")[0].scrollHeight;
                }
            }
            
        }
