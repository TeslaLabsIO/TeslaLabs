/**
 * Created by mahmoud on 29-Sep-14.
 */
App.SocialVideoController = Ember.ObjectController.extend({
    uploadedBy: function () {
        if (this.get('postedBy')) {
            return 'By ' + this.get('postedBy.displayName')
        } else {
            return this.get('description');
        }
    }.property('postedBy.displayName', 'description'),
    viewNo: function () {
        //return "5555 Views"
        if (this.get('views')) {
            return this.get('views') + ' Views'
        } else {
            return getPostDateString(this.get('date'))
        }
    }.property('views', 'date'),
    viewMoreVisibility: function () {
        if (!(this.get('description') && this.get('description').length > 75)) {
            return 'display:none'
        }
        return '';
    }.property('description'),
    descriptionVisibility:function(){
        if (!(this.get('description') && this.get('description').length > 0)) {
            return 'display:none';
        }
        return '';
    }.property('description'),
    isYoutube : function(){
        return (this.get('externalNetworkId')==APP_External_Network.YouTube);
    }.property('externalNetworkId'),
    isVimeo : function(){
        return (this.get('externalNetworkId')==APP_External_Network.Vimeo);
    }.property('externalNetworkId')
});