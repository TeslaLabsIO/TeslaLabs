/**
 * Created by mahmoud on 6/25/14.
 */

Ember.Handlebars.helper('getDateString', function(timesstamp) {
    return getPostDateString(timesstamp);
});
Ember.Handlebars.helper('getLastElementAttr', function(array,attr,methodName) {
    //alert(typeof(methodName))
    if(array.length==0)
    {
        return '';
    }

    var value;

    if(typeof(attr)=='string'){
        value = array[array.length-1][attr];
    }else{
        value = array[array.length-1];
    }

    if(typeof(methodName)=='string'){
        return eval(methodName+'('+value+')')
    }else{
        return value;
    }
});
/*Ember.Handlebars.helper('setHtmlContent', function(text,defaultVal) {
alert(jQuery('#fb_msg_detail_1').html())
   /* if(Em.$('#html_custom_content').length==0){
        Em.$('body').append(Em.$('<div>').attr('id','html_custom_content').css({'display':'none'}))
    }

    var replaceLine=replaceNewLines(text);

    //return replaceLine.length ? (jQuery('#html_custom_content').html(replaceLine).html()) : defaultVal;
    //return replaceLine;//.length ? (unescape(replaceLine)) : defaultVal;
});*/

//Ember.$( document ).on( "click", ".search_element a", function(event) {
Ember.$( document ).on( "click", ".search_element_wrapper .search_element", function(event) {
        //alert(Ember.$(event.target).html())
        //alert(Ember.$(this).html())

        //if(Ember.$(this).parent('.search_element').parent(".search_element_wrapper").length){
        //if(Ember.$(this).parent(".search_element_wrapper").length){
            Ember.$('.search_element_wrapper').children('.search_element').css({'background':'none'});

            //Ember.$(this).parent('.search_element').css({'background':'#414750'});/*#4D4D4D*/
            Ember.$(this).css({'background':'#414750'});/*#4D4D4D*/
        //}
    }
)
Ember.$( document ).on( "click", ".read_more", function(event) {
    var parentElem=Ember.$(this).parent().parent();
    if(parentElem.children(".description_summary").length){
        parentElem.children(".description_summary").each(function(index){
            Em.$(this).removeClass('description_summary')
            Em.$(this).addClass('description_summary_temp')
        })
        Em.$(this).html('View Less')
    }else if(parentElem.children(".description_summary_temp").length){
        parentElem.children(".description_summary_temp").each(function(index){
            Em.$(this).removeClass('description_summary_temp')
            Em.$(this).addClass('description_summary')
        })
        Em.$(this).html('View More')
    }

})
function setSingleAccordion(obj){
    $(obj).attr('accordion-single','1')
}
function resetSingleAccordion(obj){
    $(obj).removeAttr('accordion-single')
}
function performAccordionSelection(obj,force){

    var prev = Ember.$(obj).prevAll(".social_accordion");
    var next = Ember.$(obj).nextAll(".social_accordion");

    var accordionStatus = Ember.$(next[0]).is(":visible");

    if($(obj).attr('accordion-single')!='1'){
        prev.fadeOut(0);
        next.fadeOut(0);
    }
    if(force){
        Ember.$(next[0]).fadeIn(0);
        return "visible";
    }else{
        if(accordionStatus){
            Ember.$(next[0]).fadeOut(0)
        }else{
            Ember.$(next[0]).fadeIn(0)
        }
        return accordionStatus?"hidden":"visible";//new status
    }
}
Ember.$( document ).on( "click", ".social_accordion_header", function(event) {
//alert('a')
        var prev = Ember.$(this).prevAll(".social_accordion")

        var newStatus = performAccordionSelection(this)

        var callback=Ember.$(this).attr('accordion-callback');
        if(typeof(callback)!="undefined"&&callback!=""){
            try{
                eval(callback+'('+prev.length+',"'+newStatus+'")')
            }catch(err){

            }
        }
    }
)

Ember.$( document ).on( "keypress", ".loginform input", function(event) {
    if(event.keyCode==13){
        var formButton = Ember.$(this)
            .parent('form')
            .parent('div')
            .parent('div')
            .children('button')

        var externalButton = Ember.$(this)
            .parent('div')
            .parent('div')
            .children('button')
        if(formButton.length){
            formButton.click();
        }else{
            externalButton .click();
        }
    }
});

Ember.$( document ).on( "keyup", ".status_right_bar_search_text", function(event) {//chrome not detect ESC with keypress event
    //alert(event.keyCode)
    if(event.keyCode==27){
        hideSearchBox()
    }
});
Ember.$( document ).on( "blur", ".status_right_bar_search_text", function(event) {
    hideSearchBox()
});
//here for use in sprocket-constant.js
function getParameterByName(name,alternativeSearch) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    if(results == null && alternativeSearch){
        results = regex.exec(alternativeSearch);
    }
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function SetAppType(status){
    //alert(status)
    if(getParameterByName("webview")=="1"){
        APP_Storage.setValue(APP_Storage.appTypeStorage,"webviewIOS");
        //alert(APP_Storage.getValue(APP_Storage.appTypeStorage))
    }
    else if(getParameterByName("webview")=="2"){
        APP_Storage.setValue(APP_Storage.appTypeStorage,"webviewAndriod");
        //alert(APP_Storage.getValue(APP_Storage.appTypeStorage))
    }
}

function AutoCompleteSprocketLoginForm(){
    Ember.$('.loginform button')
        .parent('div')
        .children('div')
        .children('form')
        .children('input')
        .change();
}

function autoCompleteReplace(event,ui){
    event.preventDefault();
    //alert(event.target.id)
    Em.$('#'+event.target.id).val(ui.item.label)
}
function MarkSearchResult(selector,query){
    if(!query || query.length==0){
        return;
    }
    var html='';
    query = query[0].toUpperCase()+query.slice(1);
    var queryReg = new RegExp(query,'gi');
    var replace='<span class="search_content_mark">'+query+'</span>';
    var replaceReg = new RegExp(replace,'gi');
    Em.$(selector).each(function(index){
        html = Em.$(this).html();
        //console.log(html);
        html = html.replace(replaceReg,query);
        //console.log(html);
        html = html.replace(queryReg,replace);
        //console.log(html);
        Em.$(this).html(html);
    });
}
function ConvertHtmlToText(selector){
    var element;
    $(selector).each(function(index){
        element = $(this);
        if(typeof(element.attr('app_text_converted'))=="undefined"){
            element.children('style').remove();
            element.children('script').remove();
            element.children('link').remove();
            //console.log(element.text());
            element.html(element.text());
            element.attr('app_text_converted','true')
        }
    });
}
function ConvertTextElementToHtml(selector,replaceBr){
    Em.$(selector).each(function(index){
        //if(Em.$(this).children('.app_html_converted').length===0) {//check it's not converted before
        if(typeof(Em.$(this).attr('app_html_converted'))=="undefined"){
            var convertedDiv = '';//<div class="app_html_converted" style="display: none !important;"></div>'
            var text = Em.$(this).text();
            if (replaceBr) {
                Em.$(this).html(convertedDiv + replaceNewLines(text))
            } else {
                Em.$(this).html(convertedDiv + text)
            }
            Em.$(this).attr('app_html_converted','true')
        }
    });
}
function FormatNumber(num){

}
function FormatViewsNumber(selector){
    Em.$(selector).each(function(index){
        if(typeof(Em.$(this).attr('app_num_converted'))=="undefined"){//check it's not converted before
            console.log('--------------------');
            var views = Em.$(this).html().trim();
            views = views.split(' ');
            if (views.length == 2) {
                var numArr = views[0].split('.');
                var val = numArr[0];
                var fraction = numArr[1];

                val = val.replace(/[,]/g, '');

                numArr = val.split('');//JSON.parse('['+val.split('').join(',')+']')

                var len = numArr.length;

                var id = (len) % 3;
                var loopNum = 0;
                var limit = 50;
                if (id != len) {
                    while (id < len && id < limit) {
                        if (id != 0) {
                            numArr.splice((id + loopNum), 0, ',')
                            //console.log(numArr)
                            loopNum++;
                        }
                        id += 3;
                    }
                    //console.log(id)
                    Em.$(this).html(numArr.join('') + (fraction ? ('.' + fraction) : '') + ' ' + views[1]);
                } else {
                    console.log('else')
                    // Em.$(this).html(views);
                }
            }
            Em.$(this).attr('app_num_converted','true')
        }
    });
}
function showSearchBox(){
    jQuery('.status_right_bar').fadeOut(0);
    jQuery('.status_right_bar_search').fadeIn(0);
    jQuery('.status_right_bar_search_text').focus();
}
function hideSearchBox(){
    jQuery('.status_right_bar_search').fadeOut(0);
    jQuery('.status_right_bar').fadeIn(0);
    jQuery('.status_right_bar_search_text').val('');
}
function isInArray(num,marr,checkRange){
    var index=marr.indexOf(num)
    if(index==-1){
        for(var i = (marr.length-1);(i>=0 && marr[i].length);i--){//we have valid 2 dem arr
            console.log(i)
            if(marr[i].indexOf(num)!=-1){
                return true;
            }else if(checkRange && marr[i].length==2 && num>=marr[i][0] && num<=marr[i][1]){
                return true;
            }
        }
        return false;
    }else{
        return true;
    }
}
function SecureAjaxData(element){
    if(typeof(element)=="string"){
        element = element.replace(/\?/g, '? ');//encodeURIComponent(element);//element.replace(/\?/g, '-');
    }else if(typeof(element)=="object"){
        if(typeof(element.length)=="undefined"){
            //object
            element = $.extend(true,{},element);//as when element are ember we need to use .set method to change property value and this will not be generic
            for(var k in element){
                if(typeof(element[k])=="string"){
                    element[k] = element[k].replace(/\?/g, '? ');//encodeURIComponent(element[k]);//element[k].replace(/\?/g, '-');
                }
            }
        }else if(typeof(element.length)=="number"){
            //array
            element = $.extend(true,[],element);//as when element are ember we need to use .set method to change property value and this will not be generic
            for(var i=0;i< element.length;i++){
                for(var k in element[i]){
                    if(typeof(element[i][k])=="string"){
                        element[i][k] = (element[i][k]).replace(/\?/g, '? ');//encodeURIComponent(element[i][k]);//(element[i][k]).replace(/\?/g, '-');
                    }
                }
            }
        }
    }
    return element;
}
function setEmbedIframeScript(iframeId,iframeName,embedScript){
    if(iframeId && !$('#'+iframeId).attr('displayed')){
        $('#'+iframeId).attr('displayed','true');
    }else if(iframeId){
        console.log('iframe already loaded');
        return;
    }

    var bodyStart = '<body>';
    var bodyEnd = '</body>';
    //
    var jQueryLib = '<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>';
    var embedLib = '<script type="text/javascript" src="../js/libs/embed/embed.js?_' + (new Date().getTime()) + '"></script>';
    //
    //var iframeId = 'embedCodeFrame';
    //var iframeName = 'embedCodeFrame';
    var iframeVarScript = !iframeId ? '' : ('<script type="text/javascript">var iframeId="' + iframeId + '";</script>');
    //var embedScript = $('#embedCode').text();
    //
    var document = frames[iframeName].document;
    if(!document){//support IE
        document = frames[iframeName].contentWindow.document;
    }
    document.open();
    document.write(bodyStart + jQueryLib + iframeVarScript + embedLib + '<div>' + embedScript + '</div>' + bodyEnd);
    document.close();
}