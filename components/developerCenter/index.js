$(window).scroll(function () {
    // console.log($(window).scrollTop())
    // console.log($(".banner").outerHeight())
    if($(window).scrollTop() >= $(".banner").outerHeight()-100){
        $(".y-header-box").css("background","#000d19");
    }else{
        $(".y-header-box").css("background","#022b45");
    }
})
$(".goQuickGetStart").on("mouseover", function () {
    $(this).find("img").attr("src", "./img/1.1.png");
}).on("mouseout", function () {
    $(this).find("img").attr("src", "./img/1.png");
}).on("click", function () {
    window.open(ips+"/components/documentCenter/index.html?url=1");
});
$(".goDevelopmentDocument").on("mouseover", function () {
    $(this).find("img").attr("src", "./img/2.1.png");
}).on("mouseout", function () {
    $(this).find("img").attr("src", "./img/2.png");
}).on("click", function () {
    window.open(ips+"/components/documentCenter/index.html?url=2");
});
$(".goToolDownload").on("mouseover", function () {
    $(this).find("img").attr("src", "./img/3.1.png");
}).on("mouseout", function () {
    $(this).find("img").attr("src", "./img/3.png");
}).on("click", function () {
    window.open(ips+"/components/toolDownload/index.html");
})
// 跳转子网站首页
function goChildHomePage() {
    // console.log(getCookie("token"))
    if(getCookie("token")) {
        window.open(ips+"/components/cloudPlatform/index.html");
    }else {
        window.open(ips+"/components/login/index.html");
    }
}
