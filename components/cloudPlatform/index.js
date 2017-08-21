$(function(){

    var timestamp=new Date().getTime();
    $(".w-center").load("demo1.html"+"?"+timestamp,function(){
        $(".w-content").outerHeight($(".w-center").outerHeight()+"px");
    });

    //回到首页
    $(".wEast_ul_liHome").click(function(){
        $(".wEast_ul_liApplica").removeClass('isActiveLi').children('img').attr("src","../../imgs/cloud/yingyong.png");
        $(".wEast_ul_liHome").addClass('isActiveLi').children('img.imgg').attr("src","../../imgs/cloud/home.png");
        $(".wEast_ul_liProduct").removeClass('isActiveLi').children('img.imgg').attr("src","../../imgs/cloud/product.png");
        $(".w-center").load("demo1.html"+"?"+timestamp,function(){
            $(".w-content").outerHeight($(".w-center").outerHeight()+"px");
        })
    });
    //设置账号显示隐藏
    var getCustomerAcc= getCookie("customerAccount");
    if(getCustomerAcc!=null&&getCustomerAcc!="null"){
        $("#getCustomerAcc").text(getCustomerAcc);
        $("#getCustomerAcc").siblings('img').show();
        $(".login").hide();
    }else{
        $("#getCustomerAcc").siblings('img').hide();
        $(".login").show();
        $("#getCustomerAcc").hide();
    }
})

//打开页面进行局部刷新
function openMeun(sid,custPid,productKey,url){
    // console.log(sid)
    // console.log(custPid)
    if(url=='applicationDev/application.html'){
        $(".wEast_ul_liApplica").addClass('isActiveLi').children('img').attr("src","../../imgs/cloud/applicaBai.png");
        $(".wEast_ul_liHome").removeClass('isActiveLi').children('img.imgg').attr("src","../../imgs/cloud/homeHui.png");
        $(".wEast_ul_liProduct").removeClass('isActiveLi').children('img.imgg').attr("src","../../imgs/cloud/product.png");
    }else{
        $(".wEast_ul_liApplica").removeClass('isActiveLi').children('img').attr("src","../../imgs/cloud/yingyong.png");
        $(".wEast_ul_liHome").removeClass('isActiveLi').children('img.imgg').attr("src","../../imgs/cloud/homeHui.png");
        $(".wEast_ul_liProduct").addClass('isActiveLi').children('img.imgg').attr("src","../../imgs/cloud/productBai.png");
    }
    $("#custPid").val(custPid)
    $("#productSid").val(sid);
    $("#product_key").val(productKey);
    var timestamp=new Date().getTime();
    $(".w-center").load(url+"?"+timestamp,function(){
        $(".w-content").outerHeight($(".w-center").outerHeight()+"px");
    })
    $(document).scrollTop(0)
}
//退出登录
function backLogin(){
    window.location = ips+"/components/login/index.html";
    delCookie("customerAccount","",-1);//删除账号
    delCookie("token","",-1);//删除token
    delCookie("customerId","",-1);//删除客户sid
    delCookie("customerName","",-1);//删除用户姓名
    delCookie("firstLogon","",-1);//删除是否是第一次登录
}

//获取客户产品
function getCustomerProduct(){
    var param={
        "customerId":getCookie("customerId")
    }
    $(".product_ul_li").remove();
    // alert("1")
    getDataTwo(api.getCustomerProduct,param,"post",true,function(json){
        // console.log(json)
        if(json.rtState){
            var li;
            for(var i in json.rtData){
                var obj = json.rtData[i];
                li="<li class='product_ul_li'>"
                +"<div class='product_ul_li_div'><span>"+obj.product_name+"</span>"
                +"<img src='../../imgs/cloud/arrows_left.png' alt=''>"
                +"</div><ul>"
                        +"<li onclick='openMeun("+obj.sid+",\""+obj.cust_pid+"\",\""+obj.product_key+"\",\"productCon/productInfo.html\")'>产品信息</li>"
                        +"<li onclick='openMeun("+obj.sid+",\""+obj.cust_pid+"\",\""+obj.product_key+"\",\"dataCon/dataCon.html\")'>数据点</li>"
                        +"<li   onclick='openMeun("+obj.sid+",\""+obj.cust_pid+"\",\""+obj.product_key+"\",\"mcuDevelop/index.html\")'>MCU开发</li>"
                        +"<li  onclick='openMeun("+obj.sid+",\""+obj.cust_pid+"\",\""+obj.product_key+"\",\"virtualDev/index.html\")'>虚拟设备</li>"
                        +"<li   onclick='openMeun("+obj.sid+",\""+obj.cust_pid+"\",\""+obj.product_key+"\",\"deviceList/index.html\")'>设备列表</li>"

                +"</ul></li>"
                $(".product_ul").append(li)
            }
            toggle();
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
    });
}

//侧边栏显示隐藏函数
function toggle(){
    $('.product_ul_li_div').each(function(i){
        $('.product_ul_li_div').eq(i).siblings('ul').hide();
    })
    $(".product_ul_li_div").click(function(){

        $(this).siblings().toggle();
        if($(this).siblings().is(':hidden')){
            $(this).children('img').attr("src","../../imgs/cloud/arrows_left.png");
            $(this).removeClass('isActive');
        }else{
            $(this).children('img').attr("src","../../imgs/cloud/arrows_bottom.png");
            $(this).addClass('isActive');
        }
    });
};
