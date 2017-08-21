var ip="http://192.168.0.106:9090"
var ips = "http://localhost:8080/cms"
// 接口
var api={
    // 首页获取产品
    getNewProduct: ip+"/cms/productController/getNewProduct",
    //首页活动、案例、方案、新闻
    getCommonInfoByType: ip+"/cms/commonInfoController/getCommonInfoByType",
    // 案例、新闻详情
    getCommonInfoById: ip+"/cms/commonInfoController/getCommonInfoById?sid=",
    //产品详情
    getProductBySid: ip+"/cms/productController/getProductBySid?sid=",
    //注册获取手机验证码
    getCodePhone:ip+"/cms/teleCheckOutController/tele?customerPhone=",
    //注册获取邮箱验证码
    getCodeEmail:ip+"/cms/emailCheckController/email?email=",
    //注册数据提交
    handleRegister:ip+"/cms/customerRegistController/registCustomerInfo",
    //登陆数据提交
    handleLogin:ip+"/cms/customerController/login",
    //重置密码手机/邮箱验证码
    handleReSetPassCode:ip+"/cms/sendMessageController/sendMessage",
    //重置密码
    handleReSetPass:ip+"/cms/customerController/reSetPass",
    //项目咨询
    handleProjectConsultation:ip+"/cms/feedbackController/customerFeedback",
    //修改密码
    handleChangePass:ip+"/cms/customerController/updatePass",
   //城市二级联动省
   handleProvinceList:ip+"/cms/cityController/getProvinceList",
   //市
   handleCityList:ip+"/cms/cityController/getCityListByProvinceCode",
   //完善客户信息
   handleCustomerInfo:ip+"/cms/customerController/updateInfo",
   //获取客户信息
   handleGetCustomerInfo:ip+"/cms/customerController/selectCustomerInfoById",
   //获取城市
   handleGetCity:ip+"/cms/cityController/getCityFullInfoByCityCode",
   //图片路径
    getAttach:ip+"/cms/attachController/getAttach.act?",
    // 二期所有接口
    //查询客户产品
    getCustomerProduct:ip+"/cms/customerProductController/getCustomerProduct.act?",
    //添加产品借口
    saveProduct:ip+"/cms/customerProductController/saveProduct.act?",
    //修改客户产品
    updateProduct:ip+"/cms/customerProductController/updateProduct.act?",
    //删除客户产品
    deleteProduct:ip+"/cms/customerProductController/deleteProduct.act?",
    //发布产品
    changeState:ip+"/cms/customerProductController/changeState.act?",
    //根据sid查询客户产品
    getProductBySid:ip+"/cms/customerProductController/getProductBySid.act?",
    //获取所有数据点列表
    getDataPointAll:ip+"/cms/dataPointController/getDataPointAll.act?",
    // 修改数据点
    updateDataPoint:ip+"/cms/dataPointController/updateDataPoint.act?",
    //根据sid查找数据点
    getDataPointById:ip+"/cms/dataPointController/getDataPointById.act?",
    //添加数据点
    addDataPoint:ip+"/cms/dataPointController/addDataPoint.act?",
    //删除数据点sid
    deleDataPointById:ip+"/cms/dataPointController/deleDataPointById.act?",
    //获取下载
    getToolsDownload: ip + "/cms/toolsDownloadController/getToolsDownload",
    // 设备列表
    getEquipmentInfoList: ip + "/cms/equipmentInfoController/getEquipmentInfoList.act",
    // 设备解绑
     updateEquipmentInfo: ip + "/cms/equipmentInfoController/updateEquipmentInfo.act",
    //  设备日志列表
    getEquipmentLog: ip + "/cms/equipmentInfoController/getEquipmentLog.act",
    //应用开发
    //获取应用开发列表
    getCustomerAppDatagrid:ip+"/cms/CustomerAppController/getCustomerAppDatagrid.act?",
    //添加应用开发
    saveCustomerApp:ip+"/cms/CustomerAppController/saveCustomerApp.act?",
    //修改应用开发
    updateCustomerApp:ip+"/cms/CustomerAppController/updateCustomerApp.act?",
    //删除应用开发列表
    deleteCustomerApp:ip+"/cms/CustomerAppController/deleteCustomerApp.act?",
    //根据应用开发列表sid
    getCustomerAppBySid:ip+"/cms/CustomerAppController/getCustomerAppBySid.act?",
    // 虚拟设备
    getEquipmentDataPoints:ip + "/cms/equipmentInfoController/getEquipmentDataPoints.act",
    // 虚拟设备id
    getEquipmentId:ip + "/cms/equipmentInfoController/getEquipmentId.act",
    // 上报数据
    uploadEquipmentLog: ip + "/cms/equipmentInfoController/uploadEquipmentLog.act",

    //mcu下载
    mcuDownload:ip+"/cms/attachController/download.act?attachPath=",
    //mcuu
    getZipFieldPath:ip+"/cms/docmentController/getZipFieldPath.act?"


}
 jQuery.support.cors=true;
 var getData = function (url,param,type,async,callback) {
     if(!param) param={};
     type = (!type ? "post" : type);
     var json;
     $.ajax({
         url: url,
         data: param,
         type: type,
         async:async,
         dataType: "json",
         contentType:"text/plain",
         success: function (data) {
         	 json = data;
              if(callback){
  				callback(json);
  		    }
         },
         error: function (response) {
         	json = {rtState:false,rtMsg:"Ajax Request Error"};
         }
     });
     return json;
 }
 var getDataTwo = function (url,param,type,async,callback) {
     if(!param) param={};
     type = (!type ? "post" : type);
     var json;
     $.ajax({
         url: url,
         data: param,
         type: type,
         async:async,
         headers: {
             "token": getCookie("token")
         },
         dataType: "json",
         contentType:"text/plain",
         success: function (data) {
            json = data;

            if(json.statusCode==911){
                top.$.jBox.tip(json.rtMsg,"error",{
                    timeout:500,
                    closed:function(){
                        window.location.href="../../components/login/index.html"
                    }
                });
            }{
                if(callback){
                 callback(json);
             }
            }

         },
         error: function (response) {
           json = {rtState:false,rtMsg:"Ajax Request Error"};
         }
     });
     return json;
 }
/*解析地址栏*/
function getParm() {
    var aa = window.location.search,
        bb = aa.substr(1).split("&"),
        obj = {};
    for (var i = 0; i < bb.length; i++) {
        var cc = bb[i].split("=");
        obj[cc[0]] = cc[1]
    }
    return obj;
}

/*将毫秒转换成日期*/
function trasSecond(a){
  if(a) {
    var date = new Date(a),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minute = date.getMinutes(),
        seconds = date.getSeconds(),
        d = year + "-" + month + "-" + day;
    return d;
  }else {
    return false;
  }
}

function substring(src){
    var s = src.substring(0,4);
	var h = src.substring(28);
	var sh= src.substring(4,28);
	var arr = src.split("");
	var arr1=[];
	for(var i=0;i<arr.length;i++){
		var obj=arr[i];
		obj="*";
		arr1.push(obj)
	}
	var str =arr1.join("");
	var sss = s+str+h;
	return sss;
}
/*将毫秒转换成日期*/
function zhrq(a) {
  if(a) {
    var b = new Date(a),
        year = b.getFullYear(),
        month = b.getMonth() + 1,
        day = b.getDate(),
        hours = b.getHours(),
        minute = b.getMinutes(),
        seconds = b.getSeconds(),
        d = year + "-" + jzero(month) + "-" + jzero(day)+"&nbsp;"+jzero(hours) + ":" + jzero(minute) + ":" + jzero(seconds);
    return d;
  }else {
    return "--";
  }
}
function jzero(num) {
    if(num < 10) {
        return num = "0" + num;
    }else {
        return num = num;
    }
}
