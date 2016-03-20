/**
 * Created by mahmoud on 14-Aug-14.
 */
function saveWheelOnCookie() {
    //no need for unused cookie
    if(APP_Cookies.getCookie(APP_Cookies.userID)==""){
        return;
    }
    var blades = APP_Storage.getValue(APP_Storage.wheelItems(), [], true);
    var blade_key_index = "";
    for(var i=0;i<blades.length;i++){
        blade_key_index += (blades[i].key + "_" + blades[i].index + "_" + (blades[i].show?"1":"0") + "|");
    }
    blade_key_index += location.protocol;

    var categories = APP_Storage.getValue(APP_Storage.wheelCategories(), [], true);
    var category_key_index = "";
    for(i=0;i<categories.length;i++){
        category_key_index += ("|" + categories[i].key+"_"+categories[i].index);
    }
    if(categories.length){
        category_key_index = category_key_index.substr(1)
    }
    APP_Cookies.setCookie(APP_Cookies.wheelItems(), blade_key_index, 1, true);
    APP_Cookies.setCookie(APP_Cookies.wheelCategories(), category_key_index, 1, true);

    /*var selectedIds = location.protocol;
    for (var i = 0; i < options.length; i++) {
        if (options[i].show) {
            selectedIds += ("|" + i);
        }
    }
     APP_Cookies.setCookie(APP_Cookies.wheelItems(), selectedIds, 365, true)
    */
}
function moveWheelToStorage(callback) {
    var blade_key_index = APP_Cookies.getCookie(APP_Cookies.wheelItems()).split('|');
    //cookie is not deleted already
    if(blade_key_index[0] != ""){
        /*if(saveOnCurrent && _.last(blade_key_index) != location.protocol){//must check we are on another protocol
            jQuery('body').append(
                jQuery('<iframe>').css({'width':'0px','height':'0px'}).attr('src','customauth/wheel.html?rdr=1').load(
                    function(){
                        alert('success')
                        if(callback){
                            callback()
                        }
                    }
                )
            );
        }else if(!saveOnCurrent){*/
            //we should make internal redirection
            jQuery('body').append(
                jQuery('<iframe>').css({'width':'0px','height':'0px',float:'left'}).attr('src','customauth/wheel.html').load(
                    function(){
                        //alert('success2')
                        if(callback){
                            callback(true)
                        }
                    }
                )
            );
        //}
    }else {//if(callOnEmpty){
        if(callback){
            callback(false)
        }
    }
    /*var selectedIds = APP_Cookies.getCookie(APP_Cookies.wheelItems()).split('|')

    var domainWheel = APP_Storage.getValue(APP_Storage.wheelItems(), wheel_sprockets, true);//it includes all items

    if (selectedIds.length > 0 && selectedIds[0] != "" && selectedIds[0] != location.protocol) {//we are on another domain protocol
        var i = 0;
        for (i = domainWheel.length - 1; i >= 0; i--) {
            if (selectedIds.length && selectedIds[selectedIds.length - 1] == i) {
                selectedIds.pop();
                domainWheel[i].show = true;
            } else {
                domainWheel[i].show = false;
            }
        }
        APP_Cookies.removeCookie(APP_Cookies.wheelItems())
        APP_Storage.setValue(APP_Storage.wheelItems(), JSON.stringify(domainWheel), false, true);
        return true;//data removed
    }
    return false;//no data removed*/
    return true;
}
function redirectWheel() {
    /*var selectedIds = APP_Cookies.getCookie(APP_Cookies.wheelItems()).split('|')
    if (selectedIds.length > 0 && selectedIds[0] == location.protocol) {//we are on another domain protocol
        //alert('redirect')
        if (location.protocol == 'http:') {
            return 'https';
        } else {
            return 'http';
        }
    }*/
    return false;
}