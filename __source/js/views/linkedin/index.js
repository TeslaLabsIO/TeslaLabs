/**
 * Created by mahmoud on 8/10/14.
 */

function restoreLinkedInScroll(index,accordionStatus){
    var controller = App.__container__.lookup('controller:linkedin');
    if(accordionStatus=="visible"){
        setTimeout(function(){
            $("#linkedin_post_results").mCustomScrollbar("scrollTo",controller.get('scrollPosition.activities'),{scrollInertia:0})
        },100)
    }
    $("#linkedData").mCustomScrollbar("scrollTo",0,{scrollInertia:0});
}
function setLinkedInSelected(index,accordionStatus){
    APP_Storage.setValue(APP_Storage.linkedInLastSelected,index)
    restoreLinkedInScroll(index,accordionStatus)
}
function selectLinkedInTab(){
    var index=APP_Storage.getValue(APP_Storage.linkedInLastSelected,0);
    var tabs= Em.$('#linkedData .social_accordion_header');//Em.$('.social_accordion_header');
    var accordionStatus = performAccordionSelection(tabs[index])
    restoreLinkedInScroll(index,accordionStatus)
}

App.LinkedinView = Ember.View.extend({
    didInsertElement: function() {
        if(APP_Storage.getValue(APP_Storage.linkedInUserID())==null && location.protocol.indexOf('https') != -1){//on https and not logged that's normal so show the button
            Ember.$('#linkedinbtn').fadeIn(0);
        }else if(APP_Storage.getValue(APP_Storage.linkedInUserID())!=null && location.protocol.indexOf('https') == -1){//on http and we have data so display it
            Ember.$('#linkedindata').fadeIn(0);

            $("#linkedData").mCustomScrollbar();
            $("#linkedContent").mCustomScrollbar();
            selectLinkedInTab();
        }
    }
});