var getParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

$(function () {

    var path = getParam("path");
    var isRoot = getParam("isRoot");
    var url = "/info/getInfos?path=" + path;
    if(isRoot){
        url = url + "&isRoot=" + isRoot;
    }

    $.get(url, function(datas){
        console.log(datas);
    });

})