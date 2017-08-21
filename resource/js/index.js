$(function () {
    // 品牌宣传
    var banner = getData(api.getCommonInfoByType, {
        "infoType": "品牌宣传",
        "date": new Date()
    }, "get", false);
    // console.log(banner)
    if (banner.rtState) {
        if (banner.rtData.length) {
            $.each(banner.rtData, function(k, v) {
                var attachPath = ""
                if (!v.info_banner) {
                    attachPath = "";
                } else {
                    attachPath = v.info_banner;
                }
                var banner_slide = "";
                banner_slide += "<div class='swiper-slide'>" +
                    "<img src='" + ip + "/cms/attachController/getAttach.act?attachPath=" + attachPath + "' style='width: 100%;display: block;'>" +
                    "</div>";
                $(".swiper-container>.swiper-wrapper").append(banner_slide);
            });
            if (banner.rtData.length > 1) {
                var mySwiper = new Swiper('.swiper-container', {
                    loop: true,
                    autoplay: 3000,
                    simulateTouch: false,
                    pagination: ".pagination ",
                    paginationClickable: true,
                    autoplayDisableOnInteraction: false,
                    calculateHeight: true,
                    resizeReInit: true,
                    visibilityFullFit: true,
                });
            } else {
                var mySwiper = new Swiper('.swiper-container', {
                    // loop: true,
                    // autoplay: 3000,
                    simulateTouch: false,
                    pagination: ".pagination ",
                    paginationClickable: true,
                    autoplayDisableOnInteraction: false,
                    calculateHeight: true,
                    resizeReInit: true,
                    visibilityFullFit: true,
                });
            }
            $(".swiper-container").mouseover(function() {
                mySwiper.stopAutoplay();
            }).mouseout(function() {
                mySwiper.startAutoplay();
            });
        }
    }
    // console.log(banner)

    // 产品
    var getNewProduct = getData(api.getNewProduct, {
        "date": new Date()
    }, "get", false);
    if (getNewProduct.rtState) {
        if (getNewProduct.rtData.length) {
            $.each(getNewProduct.rtData, function(k, v) {
                var products = "";
                var attachPath = ""
                if (!v.productPhotos[0]) {
                    attachPath = "";
                } else {
                    attachPath = v.productPhotos[0].attachPath;
                }
                products += "<div>" +
                    "<img src='" + ip + "/cms/attachController/getAttach.act?attachPath=" + attachPath + "' >" +
                    "<p>" + v.productName + "</p>";
                $(".y-products-main").append(products);
            })
            // 产品滑过效果
            $(".y-products-main>div").on("mouseover", function() {
                $(this).stop().animate({
                    "padding": "30px"
                }, 200);
                $(this).find("p").stop().animate({
                    "height": "70px"
                }, 200)
            })
            $(".y-products-main>div").on("mouseout", function() {
                $(this).stop().animate({
                    "padding": "50px"
                }, 200);
                $(this).find("p").stop().animate({
                    "height": 0
                }, 200)
            })
        }
    }
    // 客户案例
    var customerCase = getData(api.getCommonInfoByType, {
        "infoType": "客户案例",
        "date": new Date()
    }, "get", false);
    if (customerCase.rtState) {
        if (customerCase.rtData.length) {
            // console.log(customerCase.rtData);
            var is_recommend_len = [];
            $.each(customerCase.rtData, function(k, v) {
                if (v.is_recommend == 1) {
                    is_recommend_len.push(v.is_recommend);
                    var customerCase_slide = "";
                    var attachPath = ""
                    if (!v.info_banner) {
                        attachPath = "";
                    } else {
                        attachPath = v.info_banner;
                    }
                    customerCase_slide += "<div class='swiper-slide'>" +
                        "<div class='y-customerCase-s' >" +
                        "<img src='" + ip + "/cms/attachController/getAttach.act?attachPath=" + attachPath + "' >" +
                        "<div>" +
                        "<div>" +
                        "<p>" + v.info_abstract + "</p>" +
                        "<div onclick='goCaseLise()' style='cursor: pointer;'>更多案例</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    $(".swiper-container1>.swiper-wrapper").append(customerCase_slide);
                }
            });
            if (is_recommend_len.length > 1) {
                var backg = ["./imgs/index/kehuanli.png", "./imgs/index/kehuanli1.png", "./imgs/index/kehuanli2.png"];
                // console.log(Math.floor(Math.random()*backg.length))
                var i = 0;
                var mySwiper1 = new Swiper('.swiper-container1', {
                    loop: true,
                    autoplay: 5000,
                    simulateTouch: false,
                    pagination: ".pagination1",
                    paginationClickable: true,
                    autoplayDisableOnInteraction: false,
                    calculateHeight: true,
                    resizeReInit: true,
                    onSlideChangeStart: function (swiper) {
                        i++;
                        if(i > 2){
                            i=0;
                        }
                        $(".y-customerCase-s").css({
                            "background": "url('"+backg[i]+"') no-repeat"
                        })
                    }
                });
            } else {
                var mySwiper1 = new Swiper('.swiper-container1', {
                    // loop: true,
                    // autoplay: 5000,
                    simulateTouch: false,
                    pagination: ".pagination1",
                    paginationClickable: true,
                    autoplayDisableOnInteraction: false,
                    calculateHeight: true,
                    resizeReInit: true
                });
            }
            $(".swiper-container1").mouseover(function() {
                mySwiper1.stopAutoplay();
            }).mouseout(function() {
                mySwiper1.startAutoplay();
            });
        }
    }


    //最新资讯
    var journalism = getData(api.getCommonInfoByType, {
        "infoType": "最新资讯",
        "date": new Date()
    }, "get", false);
    if (journalism.rtState) {
        if (journalism.rtData.length) {
            var data = [];
            for (var i = 0, len = journalism.rtData.length; i < len; i += 3) {
                data.push(journalism.rtData.slice(i, i + 3));
            }
            if (journalism.rtData.length > 3) {
                if (3 - data[data.length - 1].length == 2) {
                    data[data.length - 1].unshift(data[data.length - 2][data[data.length - 2].length - 1]);
                    data[data.length - 1].unshift(data[data.length - 2][data[data.length - 2].length - 2]);
                } else if (3 - data[data.length - 1].length == 1) {
                    data[data.length - 1].unshift(data[data.length - 2][data[data.length - 2].length - 1]);
                }
            }
            for (var i = 0, len = data.length; i < len; i++) {
                var uls = "<ul>";
                for (var j = 0, lens = data[i].length; j < lens; j++) {
                    var attachPath = ""
                    if (!data[i][j].info_banner) {
                        attachPath = "";
                    } else {
                        attachPath = data[i][j].info_banner;
                    }
                    uls += "<li sid='" + data[i][j].sid + "' style='cursor: pointer;'>" +
                        "<div>" +
                        "<img src='" + ip + "/cms/attachController/getAttach.act?attachPath=" + attachPath + "'>" +
                        "<p style='color: #333;padding: 0 20px;' title='" + data[i][j].info_title + "'><strong>" + data[i][j].info_title + "</strong></p>" +
                        "<p style='color:#666;padding: 0 20px;''>" + data[i][j].update_time + "</p>" +
                        "<p style='color:#666;padding: 0 20px;text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;' title='" + data[i][j].info_abstract + "'>" + data[i][j].info_abstract + "</p>" +
                        "</div>" +
                        "</li>";
                }
                uls += "</ul>";
                $(".ulWrap").append(uls);
            }
            $(".ulWrap ul>li").each(function() {
                $(this).on("mouseover", function() {
                    $(this).addClass("shadow").siblings().removeClass("shadow");
                }).on("mouseout", function() {
                    $(this).removeClass("shadow");
                }).on("click", function() {
                    // console.log(this)
                    var sid = $(this).attr("sid");
                    window.location = "./components/newsDetail/index.html?sid=" + sid;
                })
            });
            $(".superSlide").slide({
                mainCell: ".bd .ulWrap",
                effect: "leftLoop"
            });
            if (journalism.rtData.length < 3) {
                $(".prev").hide();
                $(".next").hide();
            }
        }
    }
    // console.log(getData(api.getCommonInfoByType,{"infoType":"客户案例"},"get",false))
})
// 联系我们
$(".y-contactUs-Qme").on("mouseover", function() {
    $(".y-contactUs-Qme>img").attr("src", "./imgs/index/Qme2.png");
    $(".y-contactUs-Qme>div").show();
}).on("mouseout", function() {
    $(".y-contactUs-Qme>img").attr("src", "./imgs/index/Qme.png");
    $(".y-contactUs-Qme>div").hide();
})
$(".y-contactUs-telme").on("mouseover", function() {
    $(".y-contactUs-telme>img").attr("src", "./imgs/index/telme2.png");
    $(".y-contactUs-telme>div").show();
}).on("mouseout", function() {
    $(".y-contactUs-telme>img").attr("src", "./imgs/index/telme.png");
    $(".y-contactUs-telme>div").hide();
})
$(".y-contactUs-projectConsulting").on("mouseover", function() {
    $(".y-contactUs-projectConsulting>img").attr("src", "./imgs/index/projectConsulting2.png");
    $(".y-contactUs-projectConsulting>div").show();
}).on("mouseout", function() {
    $(".y-contactUs-projectConsulting>img").attr("src", "./imgs/index/projectConsulting.png");
    $(".y-contactUs-projectConsulting>div").hide();
})


var dragging = false;
var iy = 0;
$(".y-contactUs").on("mousedown", function(e) {
    dragging = true;
    var e = e || window.event;
    iy = e.clientY - this.offsetTop;
    // console.log(e)
    return false;
})
$(document.body).on("mousemove", function(e) {
    // console.log(e);
    if (dragging) {
        var e = e || window.event;
        var oy = e.clientY - iy;
        if (oy < 0) {
            oy = 0;
        } else if (oy > $(window).height() - 164) {
            oy = $(window).height() - 164;
        }
        $(".y-contactUs").css("top", oy + "px");
        return false;
    }
})
$("*").on("mouseup", function() {
    dragging = false;
    return false;
})
function goProjectConsulting() {
    window.location.href = ips + "/components/projectConsultation/index.html";
}
