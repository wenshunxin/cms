
//修改产品信息
function editerInfo(){
    // alert()
    if($("#productStatus").val()==1){
        top.$.jBox.tip("该产品已发布，不可修改","error",{
            timeout:1000
        });
        return false;
    }
    $("#uploadInfo").show();
    $("select").removeAttr('disabled');
    $("input[type=text]").each(function(i){
        $("input[type=text]").show();
        $("input[type=text]").eq(i).siblings('span').hide();
        $("input[type=text]").eq(i).val($("input").eq(i).siblings('span').text());
    });
    $("textarea").show();
    $("textarea").siblings('span').hide();
    $("textarea").val($("textarea").siblings('span').text());
    $("#spanText1").show();
    $("#spanText1").html($("textarea").val().length+"/300");
}
//发布产品
function launchPro(){
    if($("#productStatus").val()==1){
        top.$.jBox.tip("该产品已发布","success");
        return false;
    }
    $(".w-center").load("productCon/launchPro.html")
}

//关闭code
function closePopCode(){
    $(".popBoxDiv").hide();
    $(".popCode").hide();
}
function showCode(){
    $(".popBoxDiv").show();
    // $("#showCode").text();
    $(".popCode").show();
}

function closePop(){
    $(".popDel").hide();
    $(".popBoxDiv").hide();
}
