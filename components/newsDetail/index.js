var jiathis_config;
var newsDetail = getData(api.getCommonInfoById+getParm().sid,{
    "date":new Date()
},"get",false);
if(newsDetail.rtState){
    // console.log(newsDetail.rtData);
     jiathis_config = {
        title: ""+newsDetail.rtData.CommonInfo.infoTitle+"",
        summary: "222",
        evt: {"share":"geturl"}
    }
    $(".y-newsDetail-main-header").html(newsDetail.rtData.CommonInfo.infoTitle);
    $(".y-newsDetail-times").html(newsDetail.rtData.updateTime);
    $(".y-newsDetail-infos").html(newsDetail.rtData.CommonInfo.infoContent);
}

function geturl(evt) {
    console.log(evt)
}
