var isflag=false;
$(function(){
    //第一次登录显示跳过按钮
    var firstLogon=getCookie("firstLogon");
    if(firstLogon){
        $(".firstLogon").show();
    }

    //获取客户名称
    if(getCookie("customerAccount")!=null && getCookie("customerAccount")!="null"){
        $("#getCustomerAccount").text(getCookie("customerAccount"))
    }
    // JPlaceHolder.init(); ie低版本支持placeholder

    var input = document.createElement('input');
    if("placeholder" in input){
        // alert("支持")
        isflag=true;
    }else{
        // alert("不支持")
        isflag=false;
        JPlaceHolder.init();
        $(".divParent span").css("left","18px");
        $(".spanTextInput").hide()
    }



    // input获得焦点时候背景颜色变成白色
    $("input,select").focus(function() {
        /* Act on the event */
        $(this).css("background","#fff");
        $("input[type=button]").css("background","#2F8BE6");
        $("input[type=button]").css("background","#2F8BE6");
    });


    //获取客户sid
    var sid = getCookie("customerId");
    if(sid!=null&&sid!="null"){
        $("#sid").val(sid)
    }
    //获得客户姓名
    var customerName=getCookie("customerName");
    if(customerName!=null&&customerName!="null"){
        $("customerName").val(customerName);
    }
    //表单进行验证提交数据
    $("#form1").Validform({
        datatype: {
            "empty": /^\s*$/,
            "pt":/^[\d-]{7,14}$/,
            "qqPattern":/^[1-9][0-9]{4,10}$/,
            "phoneTel":/^[\d+(\-\d+)?]{7,14}$/,

        },
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
                $(".Validform_right").text("");
            }
        },
        showAllError:false,
        beforeSubmit:function(form){
            var sid = getCookie("customerId");
            if(sid==null || sid =="null"){
                top.$.jBox.tip("请先登录","error",{
                    timeout:500,
                    closed:function(){
                        window.location.href="../login/index.html";

                    }
                })
                return false;
            }
            $("#area").val($("#city").val());
            if($("#city").val()==""){
                $("#area").val($("#province").val());
            }
        }
    });
})

// 初始化显示数据
function onload(){
    //获得省的下拉列表
    getProvince();
    var sid=getCookie("customerId");
    if(sid==null || sid=="null"){
        return false;
    }
    var param ={
        "sid" :sid
    }
    getData(api.handleGetCustomerInfo,param,"post",true,function(json){
        // console.log(json)
        if(json.rtState){
            var imgSrc=json.rtData.company_logo;
            // console.log(imgSrc)
            if(imgSrc!=""&&imgSrc!=null&&imgSrc!="null"){
                $(".boxImg").show();
                $(".boxImg").find("img")[0].src=api.getAttach+"attachPath="+imgSrc;

            }
            // console.log(api.getAttach+"attachPath="+imgSrc)
            if(isflag){
                var img = new Image();
                img.src=api.getAttach+"attachPath="+imgSrc;
                img.onload=function(){
                    var width = img.width;
                    var height = img.height;
                    if(width>150){
                        $(".boxImg").css("width",150+"px")
                        $(".boxImg").css("height",height*150/width+"px")
                    }else {
                        $(".boxImg").css("height",150+"px")
                        $(".boxImg").css("width",width*150/height+"px")
                    }
                }
            }
             bindJsonObj2Cntrl(json.rtData.customerInfo);
            var obj=getCityFullInfo(json.rtData.customerInfo.area);
            // console.log(obj)
            if(obj){
                $("#province").val(obj.provinceCode);
                getCity();
                $("#city").val(obj.cityCode);
            }
        }else{
            tip.$.jBox.top(json.rtMsg,"error")
        }
    });



}
var status = false;
//数据提交
function handleBtn(){
    var customerQq= $("#customerQq").val();
    var reg = /^[1-9][0-9]{4,10}$/;
    if(customerQq!=""){
        if(!reg.test(customerQq)){
            $("#customerQq").addClass('Validform_error');
            $(".customerQq").addClass('Validform_wrong').text("QQ格式不正确");
            status = false;
            return
        }else{
            // $("#customerQq").blur(function(){
                $("#customerQq").removeClass('Validform_error');
                $(".customerQq").removeClass('Validform_wrong').text("");
                // alert(1);
                $("#form1").submit();
                status = true;
            // })
        }
    }else{
        $("#customerQq").removeClass('Validform_error');
        $(".customerQq").removeClass('Validform_wrong').text("");
    }
    status == false ? status = false : $("#form1").submit();
}


/**
* 获取省
*/
function getProvince(){
    // var url = contextPath + "/gmsCityController/getProvinceList.act";
    var param={
        "data":new Date()
    }
    var json = getData(api.handleProvinceList,param,"get",false)
    // console.log(json)
    if(json.rtState){
        var province = document.getElementById('province');
        var prcList = json.rtData;
        if(prcList.length){
            $.each(prcList,function(i,prc){
                var option = new Option(prc.cityFullName,prc.cityCode);
                province.options.add(option);
            });
        }
    }
}

/**
* 获取市
*/
function getCity(){
    var province = document.getElementById('province').value;
    // console.log(province)
    var city = document.getElementById('city');
    city.length = 1;
    if(province==""){
        return;
    }
    var param={
        "provinceCode":province,
        "data":new Date(),
        "rows":999
    };
    var json = getData(api.handleCityList,param,"get",false)
    // var json = tools.requestJsonRs(url,param);
    // console.log(json)
    // if(json.rtState){
        var prcList = json.rows;
        if(prcList.length){
            $.each(prcList,function(i,prc){
                var option = new Option(prc.cityFullName,prc.cityCode);
                city.options.add(option);
            });
        // }
    }
}

//根据cityCode 获取省市名称
function getCityFullInfo(cityCode){
    if(cityCode=="" || cityCode=="000000"){
        return null;
    }

    var param = {
        "cityCode":cityCode,
        "data":new Date()
    };
    // console.log(api.handleGetCity);
    // var json = getData(api.handleGetCity+"?cityCode="+cityCode,"","post");
    var json = getData(api.handleGetCity,param,"get",false);
    // console.log(json)
    var returnObj = "";
    if(json.rtState){
        returnObj = json.rtData;
    }
    return returnObj;
}
