/**
 * Created by mahmoud on 29-Sep-14.
 */
Ember.Handlebars.helper('fullDate', function(value) {
    return App.utilities.getPostDate(value);
});
Ember.Handlebars.helper('shortDate', function(value) {
    return App.utilities.getPostDate(value,'short');
});
Ember.Handlebars.helper('sumValues', function(value1,value2) {
    return value1+value2;
});
Ember.Handlebars.helper('whenEqual', function(value1,value2,output) {
    return value1==value2 ? output : '';
});
Ember.Handlebars.helper('whenDefined', function(value,output1,output2) {
    return value ? output1 : (output2 ? output2 : '');
});
Ember.Handlebars.helper('alphabeticalCategory', function(array,index,attr) {
    var current="";
    var last="";
    if(index>0 && array[index-1][attr]){
        last = array[index-1][attr].substring(0,1).toUpperCase();
    }
    if(array[index][attr]){
        current = array[index][attr].substring(0,1).toUpperCase();
    }
    if(current != last){
        return new Handlebars.SafeString("<div class='alphabetical_category'>"+current+"</div>");
    }
    return "";
});
Ember.Handlebars.helper('ifEqual', function(v1,v2,options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Ember.Handlebars.helper('unlessEqual', function(v1,v2,options) {
    if(v1 !== v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});