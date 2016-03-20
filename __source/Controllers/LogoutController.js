/**
 * Created by mahmoud on 5/12/14.
 */
App.LogoutRoute = Ember.Route.extend({
    beforeModel: function () {
        //removeCookie(APP_Cookies.userID)
        var redirect = redirectWheel();
        if (redirect !== false) {
            //APP_Storage.removeAll();//delete storage on current protocol
            location.protocol = redirect;
        } else {
            //location.reload();
            var dataRemoved = moveWheelToStorage(function () {
                APP_Sync.StopAll();
                APP_Timers.RemoveAllTimeOut();
                APP_Storage.removeValues(APP_Storage.userLocationInfo());//user should update his location on logout and login again
                APP_Storage.removeValues(APP_Storage.userNeighbourhoodId);//user should update his location on logout and login again
                //APP_Storage.removeAll();//before cookies as some storage depend on cookie value
                APP_Cookies.ClearAllCookies();

                location.href = location.origin.replace('https', 'http');//(location.href.split('#')[0].split('?')[0] + '').replace('https', 'http');//remove rdr parameter and go http
            });//before cookie clear

            //there was redirection for wheel and another protocol data is cleared so just delete on current protocol
            //or we already come from redirection so just delete the data
            /*if(dataRemoved || getParameterByName('rdr')!=""){
             APP_Storage.removeAll();//before cookies as some storage depend on cookie value of user id

             APP_Cookies.ClearAllCookies();
             location.href = (location.href.split('#')[0].split('?')[0]+'#/login').replace('https','http');//remove rdr parameter and go http
             }else{
             APP_Storage.removeAll();//delete in current protocol first

             //we need redirection to remove data in another protocol
             if(location.protocol=='http:'){
             location.href = (location.href.split('#')[0].split('?')[0]+'?rdr=1#/logout').replace('http','https')
             }else{
             location.href = (location.href.split('#')[0].split('?')[0]+'?rdr=1#/logout').replace('https','http')
             }
             }*/
        }
    }
});