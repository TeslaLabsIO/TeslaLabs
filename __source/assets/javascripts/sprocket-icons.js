/**
 * Created by mahmoud on 6/29/14.
 */
var APP_Icons_Mapping={
    extensions:['jpg','png'],
    defaultExtension:'png',
    iconPath:'assets/images/headericons/',
    iconMap:{
        //linkedin:{icon:'facebook',title:'hm'}
        google: {
            title: 'google+'
        },
        contacts: {
            title: 'Contact Manager'
        }
    }
};
var APP_Icons={
    GetIconName:function(key){
        if(APP_Icons_Mapping.iconMap[key] && APP_Icons_Mapping.iconMap[key].icon){
            var split=APP_Icons_Mapping.iconMap[key].icon.split('.');
            var extension = split[split.length - 1];
            if(APP_Icons_Mapping.extensions.indexOf(extension)==-1){
                return APP_Icons_Mapping.iconMap[key].icon+'.'+APP_Icons_Mapping.defaultExtension;
            }
            return APP_Icons_Mapping.iconMap[key].icon;
        }
        return key+'.'+APP_Icons_Mapping.defaultExtension;
    },
    GetPageTitle:function(key){
        if(APP_Icons_Mapping.iconMap[key] && APP_Icons_Mapping.iconMap[key].title){
            return APP_Icons_Mapping.iconMap[key].title.toUpperCase();
        }
        return key.toUpperCase();
    },
    SetPageIcon : function (type){
        if(Em.$('.status_center_bar img').length){
            /*var currentUrl=location.hash.substring(1);
            if(currentUrl[0]=='/'){
                currentUrl=currentUrl.substring(1);
                currentUrl=currentUrl.split('/')[0]
            }
            currentUrl = currentUrl.split('?')[0];*/
            var icon = App.PollingManager.getNetworkIdName().name;//currentUrl.toLowerCase();
            var title= icon;
            //alert(icon)
            if(["login","register","logout","dashboard","","forgetpassword","reset"].indexOf(icon) != -1){
                Em.$('.status_center_bar img').attr('src',APP_Icons_Mapping.iconPath + 'transparent.png');
                Em.$('.status_center_bar span').html('')
                return;
            }

            icon = APP_Icons.GetIconName(icon);
            title = APP_Icons.GetPageTitle(title);


            var imagePath=APP_Icons_Mapping.iconPath +icon;
            //alert(type)
            console.log(type+"--"+Em.$('.status_center_bar img').attr('src'))

            Em.$('.status_center_bar img').attr('src',imagePath);

            Em.$("<img src='"+imagePath+"'>")
            //Em.$('#testloading').attr('src',imagePath)
            /*    .load(function(){
                    console.log(imagePath)
                    Em.$('.status_center_bar img').attr('src',imagePath);
                })*/
                .error(function(){
                    console.log('error')
                    Em.$('.status_center_bar img').attr('src',APP_Icons_Mapping.iconPath + 'transparent.png');
                })
            Em.$('.status_center_bar span').html(title)
        }
    }
}