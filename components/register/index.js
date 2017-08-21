var timer;//定时器
$(function(){
    //placeholder 兼容到ie8
    var isflag=false;
    var input = document.createElement('input');
    if("placeholder" in input){
        // alert("支持")
        isflag=true;
    }else{
        // alert("不支持")
        isflag=false;
        JPlaceHolder.init();
        // $("#shoppingsite21").css({"position":"absolute","top":0,"left":"10px")
    }
    // input获得焦点时候背景颜色变成白色
    $("input[type=text],input[type=password]").focus(function(event) {
        /* Act on the event */
        $(this).css("background","#fff");
    });


    //切换样式li
    $(".itemUl li").click(function(){
        $(this).addClass('isactive').siblings('li').removeClass('isactive')
        var value = $(this).attr("value")
        if(value=='1'){
            $("#form").show();
            $("#form1 input:not(input[type=button])").val("");
            $("#form1").hide();
            $(this).children('img').attr("src",'../../imgs/phone.png');
            $(this).siblings('li').children('img').attr("src",'../../imgs/note-hui.png');
            clearTimeout(timer);
            $(".phone").removeAttr('disabled')
            $(".getCode").val("发送验证码")
            $(".getCode").removeAttr('disabled').css("background","#2F8BE6");
            // $("input:not(input[type=button])").removeClass('Validform_error').css("background","#F4F4F4");
            // $(".Validform_checktip").removeClass('Validform_wrong').text("");
        }else if(value=="2"){
            $("#form").hide();
            $("#form1").show();
            $("#form input:not(input[type=button])").val("");
            $(this).children('img').attr("src",'../../imgs/note.png');
            $(this).siblings('li').children('img').attr("src",'../../imgs/phone-hui.png');
            clearTimeout(timer);
            $(".getCode").val("发送验证码")
            $(".getCode").removeAttr('disabled').css("background","#2F8BE6");
            $(".email").removeAttr('disabled');
            // $("input:not(input[type=button])").removeClass('Validform_error').css("background","#F4F4F4");
            // $(".Validform_checktip").removeClass('Validform_wrong').text("");
        }
    })

    //邮箱验证注册
    $("#form1").Validform({
        tiptype:function(msg,o,cssctl){
            if(!o.obj.is("form")){//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
                if(isflag){
                    var objtip=o.obj.siblings(".Validform_checktip").show();
                }else{
                    var objtip=o.obj.parent().siblings(".Validform_checktip").show();
                }
                // objtip.parent().height("80")
                cssctl(objtip,o.type);
                objtip.text(msg);
                $(".Validform_right").text("")
            }
        },
        showAllError:false,
        beforeSubmit:function(form){
            var param={
                "customerAccount":$(".email").val(),
                "customerPassword":$(".customerEmai").val()
            }
            // console.log(param)
            getData(api.handleRegister,param,"post",true,function(json){
                if(json.rtState){
                    top.$.jBox.tip(json.rtMsg,"success",{
                        timeout:500,
                        closed:function(){
                            // alert();
                            delCookie("codeValueEmail","",-1);
                            window.location.href="../login/index.html"
                        }
                    });
                }else{
                    top.$.jBox.tip(json.rtMsg,"error");
                }
            })
            return false;
        }
    });

    //手机验证注册
    $("#form").Validform({
        tiptype:function(msg,o,cssctl){
            if(!o.obj.is("form")){//验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
                if(isflag){
                    var objtip=o.obj.siblings(".Validform_checktip").show();
                }else{
                    var objtip=o.obj.parent().siblings(".Validform_checktip").show();
                }
                // objtip.parent().height("80")
                cssctl(objtip,o.type);
                objtip.text(msg);
                $(".Validform_right").text("")
            }
        },
        showAllError:false,
        beforeSubmit:function(form){
            var param={
                "customerAccount":$(".phone").val(),
                "customerPassword":$(".customerPhone").val()
            }
            // console.log(param)
            getData(api.handleRegister,param,"post",true,function(json){
                if(json.rtState){
                    top.$.jBox.tip(json.rtMsg,"success",{
                        timeout:500,
                        closed:function(){
                            delCookie("codeValuePhone","",-1);
                            window.location.href="../login/index.html"
                        }
                    });

                }else{
                    top.$.jBox.tip(json.rtMsg,"error");

                }
            })
            return false;
        }
    });

});

//获取手机验证码
function getCodePhone(){
    // alert();
    $(".getCodePhone").css({"background":"#2F8BE6"},{"color":"#fff"})
    $(".getCodePhone").attr("disabled",true)
    var phone =$(".phone").val();
    var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/;
    if(!reg.test(phone)){
        $(".phone").addClass('Validform_error');
        if(phone==""){
            $(".Validform_phone").addClass('Validform_wrong').text("您还没输入手机号")
        }else{
            $(".Validform_phone").addClass('Validform_wrong').text("请输入正确格式手机号")
        }
        $(".getCodePhone").attr("disabled",false)
        return ;
    };
    var json = getData(api.getCodePhone+phone,"","get",false);
    console.log(json)
    if(json.rtState){
        var date= new Date();
        date.setTime(date.getTime()*1+10*60*1000); //设置date为当前时间+10分
        // setCookie("codeValue",json.rtData,10);
        document.cookie = "codeValuePhone" + "=" + escape(json.rtData) + ";path=/;expires="
    			+ date.toGMTString();
        top.$.jBox.tip(json.rtMsg,"success");
    }else{
        top.$.jBox.tip(json.rtMsg,"error");
        clearTimeout(timer);
        $(".getCodePhone").attr("disabled",false).val("发送验证码");
        return ;
    }
    var obj = $(".getCodePhone");
    setTimeout(function(){
        settime(obj);
    },1000)
}

//获取邮箱验证码
function getCodeEmail(){
    // alert()
    $(".getCodeEmail").css({"background":"#2F8BE6"},{"color":"#fff"})
    $(".getCodeEmail").attr("disabled",true)

    var email =$(".email").val();
    var reg =/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!reg.test(email)){
        $(".email").addClass('Validform_error');
        if(email==""){
            $(".Validform_email").addClass('Validform_wrong').text("您还没输入邮箱")
        }else{
            $(".Validform_email").addClass('Validform_wrong').text("请输入正确格式邮箱")
        }
        $(".getCodeEmail").attr("disabled",false);

        return ;
    }
    var json = getData(api.getCodeEmail+email,"","get",false);
    console.log(json)
    if(json.rtState){
        var date= new Date();
        date.setTime(date.getTime()*1+10*60*1000); //设置date为当前时间+10分
        // setCookie("codeValue",json.rtData,10);
        document.cookie = "codeValueEmail" + "=" + escape(json.rtData) + ";path=/;expires="
    			+ date.toGMTString();
        top.$.jBox.tip(json.rtMsg,"success");
        $(".email").removeAttr('disabled');
    }else{
        top.$.jBox.tip(json.rtMsg,"error");
        // alert();

        clearTimeout(timer);
        $(".getCodeEmail").attr("disabled",false).val("发送验证码")
        return ;
    }

    var obj = $(".getCodeEmail");
    settime(obj);
}


//手机方式提交
function getPhone(){
    if($(".phone").val()==""){
        $(".phone").blur();
        return ;
    }

    if($("#code").val()==""){
        $("#code").blur();
        return ;
    }
    var codeValuePhone=getCookie("codeValuePhone");
    if(codeValuePhone =="null" || codeValuePhone ==null){
        $("#code").addClass('Validform_error');
        $(".Validform_checktip_phone").addClass('Validform_wrong').text("验证码已失效");
        return ;
    }
    if($("#code").val()!=codeValuePhone){
        $("#code").addClass('Validform_error');
        $(".Validform_checktip_phone").addClass('Validform_wrong').text("验证码不正确");
        return ;
    }

    // console.log(codeValue)
    $("#form").submit();

}

//邮箱提交
function getEmail(){
    if($(".email").val()==""){
        $(".email").blur();
        return ;
    }

    if($("#codeEmail").val()==""){
        $("#codeEmail").blur();
        return ;
    }
    var codeValueEmail=getCookie("codeValueEmail");
    if(codeValueEmail =="null" || codeValueEmail ==null){
        $("#codeEmail").addClass('Validform_error');
        $(".Validform_checktip_email").addClass('Validform_wrong').text("验证码已失效");
        return ;
    }
    if($("#codeEmail").val()!=codeValueEmail){
        $("#codeEmail").addClass('Validform_error');
        $(".Validform_checktip_email").addClass('Validform_wrong').text("验证码不正确");
        return ;
    }

    // console.log(codeValue)
    $("#form1").submit();
}



//120秒倒计时
var countdown=120;
function settime(obj) { //发送验证码倒计时
    if (countdown == 0) {
        obj.attr('disabled',false);
        $(".phone").removeAttr('disabled');
        //obj.removeattr("disabled");

        $(".email").removeAttr('disabled');
        obj.css({"background":"#2F8BE6"})
        obj.val("重新获取验证码");
        countdown = 120;
        return;
    } else {
        obj.attr('disabled',true).css("background","#61a9ef");
        obj.val("重新发送(" + countdown + ")");
        $(".phone").attr('disabled', true);
        $(".email").attr('disabled', true);
        countdown--;
    }
    timer =setTimeout(function() {
        settime(obj)
    },1000)

}
