var cases = getData(api.getCommonInfoByType, {
     "infoType": "客户案例",
     "date":new Date()
 }, "get", false);
 if (cases.rtState) {
     if (cases.rtData.length) {
         var data = [];
         for (var i = 0, len = cases.rtData.length; i < len; i += 10) {
             data.push(cases.rtData.slice(i, i + 10))
         }
         // console.log(data);
         var index = 0;
         var len = data.length;
         $.each(data[0], function(k, v) {
             var attachPath = ""
             if (!v.info_banner) {
                 attachPath = "";
             } else {
                 attachPath = v.info_banner;
             }
             var lists = "";
             // console.log(v);
             lists += "<div class='y-caseList-slide'>" +
                 "<div class='y-caseList-slide-left'>" +
                 "<h2><strong>" + v.info_title + "</strong></h2>" +
                 "<p>" + v.info_abstract + "</p>" +
                 "</div>" +
                 "<img class='y-caseList-slide-right' src='" + ip + "/cms/attachController/getAttach.act?attachPath=" + attachPath + "'>" +
                 "</div>";
             $(".y-caseList-list").append(lists);
         })
         // console.log($(window).height());
         // console.log($(document).height())
         $(window).scroll(function() {
             // console.log($(document).height() - ($(window).height() + $(window).scrollTop()))
             if ($(document).height() - ($(window).height() + $(window).scrollTop()) <= 400) {
                 index++;
                 if (index >= len) {
                     // alert()
                    //  return;
                 } else {
                     $.each(data[index], function(k, v) {
                         var attachPath = ""
                         if (!v.info_banner) {
                             attachPath = "";
                         } else {
                             attachPath = v.info_banner;
                         }
                         var lists = "";
                         // console.log(v);
                         lists += "<div class='y-caseList-slide'>" +
                             "<div class='y-caseList-slide-left'>" +
                             "<h2><strong>" + v.info_title + "</strong></h2>" +
                             "<p>" + v.info_content + "</p>" +
                             "</div>" +
                             "<img class='y-caseList-slide-right' src='" + ip + "/cms/attachController/getAttach.act?attachPath=" + attachPath + "'>" +
                             "</div>";
                         $(".y-caseList-list").append(lists);
                     })
                 }
             }
         })
     }
 }
