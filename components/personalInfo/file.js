function fileUpload(input){
    var boxImg=$(input).siblings('.boxImg');
    // console.log(boxImg)
    // var img=$("<img/>")
    var img=$("<img/>")
       img.css({"position":"absolute","right":0,"top":0,"z-index":9999,"cursor":'pointer'}).attr("title","删除").addClass("delectImg").click(function(){
           delectImg(this)
       })
       img.attr("src","../../imgs/shanchu.png");
    if(window.FileReader){
        var file = input.files[0];
        var size=file.size;
        // $("input").val(file.name);
        var extStart=file.name.lastIndexOf(".");
        var  ext=file.name.substring(extStart,file.name.length).toUpperCase();
        // console.log(ext)
        if(ext!=".PNG"&&ext!=".JPG"&&ext!=".JPEG"){
          	  alert("只能上传图片为jpg、png格式的图片");
              $(input).val("");
              $(".boxImg").hide()
              return false;
          }
          if(size>20480*1024){
        	  alert("图片大小不能超过20M");
        	  $(input).val("");
              $(".boxImg").hide()
        	  return false;
          }
        //   $(".boxImg").show();
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
              var img = new Image();
              img.onload = function(){
                //   console.log(img.width)
                //   console.log(img.height)
                var width = img.width;
                var height = img.height;
                if(width>150){
                    $(".boxImg").css("width",150+"px")
                    $(".boxImg").css("height",height*150/width+"px")
                }else {
                    $(".boxImg").css("height",150+"px")
                    $(".boxImg").css("width",width*150/height+"px")
                }
              }
              img.src =  this.result
              $(".boxImg").show();
        	  boxImg.find("img")[0].src = this.result
          }
          $(".boxImg").append(img);
    }else if(typeof window.ActiveXObject != 'undefined'){
        // console.log("2")
        input.select();
        input.blur();
        // $('.boxImg').focus();
        var nfile = document.selection.createRange().text;
        var extStart=nfile.lastIndexOf(".");
        var ext=nfile.substring(extStart,nfile.length).toUpperCase();
        if(ext!=".PNG"&&ext!=".JPG"&&ext!=".JPEG"){
          	  alert("只能上传图片为jpg、png格式的图片");
              $(input).val("");
              $(".boxImg").hide()
              return false;
          }
        var image = new Image();
        image.src=nfile;
        // console.log(image)
        if(nfile){
            $(".boxImg").show();
        }
        // console.log(size);
        $("#companyllogo").remove();
        $(".boxImg").css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='"+nfile+"')");
        // $(".tdShow").append(img);
        $(".boxImg").append(img);
        image.onreadystatechange = function() {
            // alert("2")
            if(image.readyState == "complete" || image.readystate=="loaded"){
              var size = image.fileSize;
            //   console.log(size);
                  if(size>20480*1024)
                  {
                      alert("图片大小不能超过20M");
                      return false;
                  }
                  $("#companyLogo").remove();
                  $(".boxImg").css("filter","progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='"+nfile+"')");
                  $(".tdShow").append(img);
            }
        };

      }
}


function delectImg(img){
    $(".boxImg").hide();
}
