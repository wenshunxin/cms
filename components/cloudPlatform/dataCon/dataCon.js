
// 关闭弹框
function closePop(){
    $("#spanText").html("0/300");
    $("input[type=text]").each(function(i){
        $("input[type=text]").eq(i).removeClass('Validform_error');
        $("input[type=text]").eq(i).siblings('div').removeClass('Validform_wrong').text("");
        $("input[type=text]").eq(i).css("background","#F4F4F4");
    })
    $("select,textarea").css("background","#F4F4F4");
    $(".popBoxDiv").hide();
    $(".popBox").hide();
    $(".popDel").hide();
}
//添加和修改数据点
function editerData(sid){
    // console.log($(document).height()
    if($("#productStatus").val()==1){
        top.$.jBox.tip("该产品已发布，数据点不可操作","error",{
            timeout:1000
        });
        return false;
    }
    $(".popBoxDiv").show();
    $(".popBox").show();
    if($(document).height()<800){
        $(".popBox").css("top","80px")
    }
    //隐藏域修改数据点传sid
    $("#sid").val(sid);
    var param= {
        "sid":sid
    }
    if(sid=="undefined"||sid==undefined){
        $(".popBox .popBoxTop span").text("添加数据点");
        $(".popBox input[type=button]").val("添加").attr("title","添加");
        $("input[type=text],select,textarea").val("")
    }else{
        $(".popBox .popBoxTop span").text("修改数据点");
        $(".popBox input[type=button]").val("修改").attr("title","修改");

        //根据sid查找该sid的数据点信息
        getDataTwo(api.getDataPointById,param,"post",true,function(json){
            // console.log(json)
                //显示弹框
            bindJsonObj2Cntrl(json.rtData);
            $("#spanText").html($("textarea").val().length+"/300");
            if($("#fieldType").val()=="NUMBER"){
                $(".decimals").show();
            }else{
                $(".decimals").hide();
            }
        });
        // console.log($("#fieldType").val())

    }
}

// 小数位显示隐藏
function decimals(){
    if($("#fieldType").val()=="NUMBER"){
        $(".decimals").show();
    }else{
        $(".decimals").hide();
        $("#decimalDigit").val("");
    }
}

//删除数据点弹框
function delData(sid){
    if($("#productStatus").val()==1){
        top.$.jBox.tip("该产品已发布，数据点不可操作","error",{
            timeout:1000
        });
        return false;
    }
    $("#delSid").val(sid);
    $(".popBoxDiv").show();
    $(".popDel").show();
}


//删除数据点
function delDataTrue(){
    // alert();
    var sid=$("#delSid").val();
    var param={
        "sid":sid
    }
    //根据数据点sid删除数据点
    getDataTwo(api.deleDataPointById,param,"post",true,function(json){
        if(json.rtState){
            top.$.jBox.tip(json.rtMsg,"success",{
                timeout:500,
                closed:function(){
                    closePop();
                    // $(".w-center").load("dataCon/dataCon.html")
                    onload();
                }
            })
        }else{
            top.$.jBox.tip(json.rtMsg,"error",{
                timeout:500,
                closed:function(){
                    if(json.statusCode==911){
                        window.location.href="../../components/login/index.html"
                    }
                }
            });
        }
    })
}
