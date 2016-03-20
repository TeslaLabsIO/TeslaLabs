/**
 * Created by mahmoud on 7/13/14.
 */
App.FacebookView = Ember.View.extend({
    initLocationTooltip : function(title){
        //you to set style for container of tooltip 'position:relative' so tooltip can go with it up and down
        //in this case the container is #local
        $('#loctooltip').tooltip('destroy');
        $('#loctooltip').tooltip({
            title: title ? title : 'To get local news feed you have to provide us with your location;press here to send it',
            placement:'left',
            template:'<div class="tooltip" role="tooltip">'+
                '<div class="tooltip-arrow loc_left_arrow"></div>'+
                '<div class="tooltip-inner loc_left_title"></div>'+
                '</div>'
            /*,viewport:{ "selector": "#loctooltip" //,"padding": 0}*/
            //,container:'#local'
        });
    },
    didInsertElement: function() {

        this.initLocationTooltip();

        if(APP_Storage.getValue(APP_Storage.facebookUserID())==null){
            Ember.$('#facebookbtn').fadeIn(0);
        }else{
            Ember.$('#facebookdata').fadeIn(0);

            $("#fbData").mCustomScrollbar();
            $("#fbContent").mCustomScrollbar();

            if(APP_Storage.getValue(APP_Storage.userLocationInfo(),null)==null){
                //it's not request before but if he get local feed from another device just show icon
                $('#loctooltip').fadeIn(0);
                if(APP_Storage.getValue(APP_Storage.facebookLocalPost,[],true).length==0){//local feed return [] in first req we can't use ==null here
                    APP_Storage.setValue(APP_Storage.facebookLastSelected,2)//force user to see tooltip
                    $('#loctooltip').tooltip('show')
                }else{
                    //To get local news feed you have to provide us with your location;so press here to send it
                    this.initLocationTooltip('Press here to get local news feed according to your new location');
                }
            }else{
                //request but user know this feature is found so don't show tooltip
                var locationInfo = APP_Storage.getValue(APP_Storage.userLocationInfo()).split(",")
                //hide only in not supported a user can allow permission from browser after he denied it
                if(locationInfo.length==1 && locationInfo[0] != APP_Location_Error.NotSupported){// && locationInfo[0] != APP_Location_Error.PermissionDenied) {
                    APP_Storage.setValue(APP_Storage.facebookLastSelected,2)//not in all case
                    $('#loctooltip').fadeIn(0);//not in all case
                }
            }
            selectFbTab();
            //autoCompleteSendUser();
        }
    }
});