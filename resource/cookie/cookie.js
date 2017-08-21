 var setCookie = function(name, value, Days){
    var exp = new Date();
    exp.setTime(exp.getTime() + Days* 24 * 60 * 60 * 1000);//天数
    return  document.cookie = name + "=" + escape(value) + ";path=/;expires="
    + exp.toGMTString();
}
 var delCookie = function(name)  {
    return setCookie(name, "", -1);
}
 var getCookie = function(name)  {
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if (arr != null){
        return unescape(arr[2]);
    }else{
        return null;
    }
    return null;
}
