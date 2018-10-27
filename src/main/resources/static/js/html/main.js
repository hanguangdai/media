var icons = ["mui-icon mui-icon-home",
    "mui-icon mui-icon-contact",
    "mui-icon mui-icon-person",
    "mui-icon mui-icon-personadd",
    "mui-icon mui-icon-weibo",
    "mui-icon mui-icon-loop",
    "mui-icon mui-icon-spinner mui-spin",
    "mui-icon mui-icon-spinner-cycle mui-spin",
    "mui-icon mui-icon-star",
    "mui-icon mui-icon-starhalf"];

$(function () {
    $.get("/main/getHomeInfo", function(datas){
        if(datas.length > 0){
            var toolbar = $("#footer");
            $.each(datas,function (index, data) {
                var element = $('<a class="mui-tab-item">');
                if(index == 0){
                    element.addClass("mui-active");
                }
                var iconSpan = $('<span class="mui-icon">');
                iconSpan.addClass(icons[index]);
                var numSpan = $('<span class="mui-badge">');
                iconSpan.append(numSpan);
                element.append(iconSpan);
                numSpan.html(data.count);
                var textSpan = $('<span class="mui-tab-label">');
                textSpan.html(data.name);
                element.attr("href", "#" + data.file);
                element.attr("data-name", data.file);
                toolbar.append(element);

                var mainContent = $("#main");
                mainContent.append(createContent(data.file, index == 0));
            })
        }
    });

    var $back = $("#back");
    $back.click(function () {
        var $content = $("[class='mui-control-content mui-active']");
        var $ul = $content.find("ul");
        var path = $ul.attr("data-path");
        console.log(path);
        if(path){
            path = path.indexOf("\\")==-1?"":path.substr(0,path.lastIndexOf("\\"));
            if(!path){
                return null;
            }
            var isRoot = path.indexOf("\\")==-1;
            if(isRoot){
                path = path.replace(":","");
            }
            $content.empty();
            var $newul = createUl(path,isRoot,$content);
            $content.append($newul);
        }
    })
});

var createContent = function(id, isActive){
    var $conent = $('<div>');
    $conent.attr("id", id);
    $conent.addClass("mui-control-content");
    if(isActive){
        $conent.addClass("mui-active");
    }
    var $uls = createUl(id, true, $conent);
    $conent.append($uls);
    return $conent;
};


var createUl = function (path, isRoot, ele) {
    var $ul = $('<ul class="mui-table-view">');
    var url = "/info/getInfos?path=" + encodeURI(path);
    if(isRoot){
        url = url + "&isRoot=" + isRoot;
    }
    $.get(url, function(datas){
        if(datas&&datas.length>0){
            $.each(datas, function (index, data) {
                var $li = $('<li class="mui-table-view-cell">');
                var $a = $('<a class="mui-navigate-right">');
                var $num = $('<span class="mui-badge mui-badge-danger">');
                $num.html(data.count);
                $a.append($num);
                $a.append(data.name);
                $li.append($a);
                $ul.append($li);
                $ul.attr("data-path", path);

                $li.click(function () {
                    if(ele&&data.count){
                        var $back = $("#back");
                        ele.empty();
                        var $newul = createUl(data.file,false,ele);
                        ele.append($newul);
                    }else{
                        if(data.count==null||data.count == undefined){
                            window.location.href = "/"+data.file.replace(":","");
                        }

                    }
                })
            })
        }
    });
    return $ul;
}

var choiceTab = function(){
    console.log($(this).attr("data-name"));
}