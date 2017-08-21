// 滚动条滚动出现动画
$(function () {
    $(window).scroll(function () {
        // console.log($(document).scrollTop())
        if($(document).scrollTop() >= 200){
            for(var i=0,len=$(".y-aboutUs-individualUser-info>ul>li").length;i<len;i++){
                $(".y-aboutUs-individualUser-info ul li").eq(i).addClass("animated fadeInRight fadeInRight"+(i+5))
            }
        }
    })
})

// 地图
var map = new BMap.Map("map");    // 创建Map实例
map.centerAndZoom(new BMap.Point(116.588359, 39.928024), 18);
map.disableDragging();
map.disableDoubleClickZoom();
var marker = new BMap.Marker(new BMap.Point(116.588359, 39.928005));
map.addOverlay(marker);
marker.addEventListener("click", function () {
    window.open ( "http://map.baidu.com/");
})
