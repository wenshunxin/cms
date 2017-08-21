$(function () {
    $.ajax({
        url: ips+"/components/fromBeginningToEnd/header.html",
        type: "get",
        async: false,
        success: function (data) {
            $(".y-header").html(data);
            // $(".y-header>ul>li").on("mouseover",function(){
            //     $(this).addClass("active").siblings().removeClass("active");
            // })
            // console.log($(document).attr("title"));
            if($("#titles").text() == "About Us") {
                $(".aboutUs").addClass("active").siblings().removeClass("active");
            }else if($("#titles").text() == "caseList") {
                $(".caseList").addClass("active").siblings().removeClass("active");
            }else if($("#titles").text() == "developerCenter") {
                $(".developerCenter").addClass("active").siblings().removeClass("active");
            }else if($("#titles").text() == "coreProducts") {
                $(".coreProducts").addClass("active").siblings().removeClass("active");
            }
            if( getCookie("customerAccount") ) {
                $(".y-header-button2").show();
                $(".y-header-button1").hide();
                $(".y-userName").text(getCookie("customerAccount"));
            }else {
                $(".y-header-button2").hide();
                $(".y-header-button1").show();
            }
        }
    })
    $.ajax({
        url: ips+"/components/fromBeginningToEnd/bottom.html",
        type: "get",
        async: false,
        success: function (data) {
            $(".y-bottom").html(data);
        }
    });
    $.ajax({
        url: ips+"/components/fromBeginningToEnd/documentH.html",
        type: "get",
        async: false,
        success: function (data) {
            $(".y-documentH").html(data);
            if($("#titles").text() == "toolDownload") {
                $(".dow").hide();
                $(".dow1").show();
                $(".documentico1").hide();
                $(".documentico").show();
            }else {
                $(".documentico1").show();
                $(".documentico").hide();
                $(".dow").show();
                $(".dow1").hide();
            }
        }
    });

    //回到首页
    $(".wEast_ul_liHome").click(function(){
        window.location.href=ips+'/components/cloudPlatform/index.html'
    })
});

function openMeun(sid,url){
    window.location.href=ips+"/components/"+url+"?sid="+sid;
    // console.log(url)
}

// go 首页
function goIndex () {
    window.location = ips+"/index.html";
}
// go login
function goLogin () {
    window.location = ips+"/components/login/index.html";
}
// go 注册
function register () {
    window.location = ips+"/components/register/index.html";
}
// go 关于我们
function goAboutUs () {
    window.location = ips+"/components/aboutUs/index.html";
}
// go 个人中心
function goPersonalInfo () {
    window.location = ips+"/components/personalInfo/index.html";
}
// go 核心产品
function goCoreProducts() {
  window.location = ips+"/components/coreProducts/index.html";
}
// 退出
function getOut () {
    var getUser=getCookie("getUser");
    if(getUser==null&&getUser=="null"){
        delCookie("customerAccount1","",-1);//删除账号
        delCookie("customerPassword","",-1);//删除密码
        delCookie("getUser","",-1);//删除记住密码
    }
    window.location = ips+"/components/login/index.html";
    delCookie("customerAccount","",-1);//删除账号
    delCookie("token","",-1);//删除token
    delCookie("customerId","",-1);//删除客户sid
    delCookie("customerName","",-1);//删除用户姓名
    delCookie("firstLogon","",-1);//删除是否是第一次登录

}
// go 客户案例
function goCaseLise () {
    window.location = ips+"/components/caseList/index.html";
}
// go 开发者中心
function goDeveloperCenter() {
    window.location = ips+"/components/developerCenter/index.html";
}

// goToolDownload
function goToolDownload() {
    window.location = ips+"/components/toolDownload/index.html";
}
// goDocumentC
function goDocumentC() {
    window.location = ips+"/components/documentCenter/index.html?url=0";
}
// 跳转子网站首页
function goChildHomePage() {
    // console.log(getCookie("token"))
    if(getCookie("token")) {
        window.open(ips+"/components/cloudPlatform/index.html");
    }else {
        window.open(ips+"/components/login/index.html");
    }

}
