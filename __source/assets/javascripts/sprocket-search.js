/**
 * Created by mahmoud on 7/22/14.
 */
var APP_Search = {
    SearchIndexed:function(network,query,callback,url,privateSearch){
        query = encodeURIComponent(query);
        var external = (url&&!privateSearch) ? true : false;
        var searchUrl = url ? url : API_Base_Url+"documents/providers/"+network+"/indexed?q="+query;

        privateSearch = privateSearch ? true : false;

        Ember.$.ajax(searchUrl, {
                type: 'GET',
                dataType: 'JSON',
                headers: {'Content-type': 'application/json' },
                success: function (data, textStatus, jqXHR) {
                    var searchResult=data.documents;
                    var categorized={};
                    var documents={}
                    var elem={};

                    for(var i=0;i<searchResult.length;i++){
                        elem=searchResult[i];
                        if(typeof(categorized[elem.dataType])=="undefined"){
                            categorized[elem.dataType]=[];
                            documents[elem.dataType]=[];
                        }
                        elem.data.externalSearch = external;
                        elem.data.privateSearch = privateSearch;
                        elem.data.searchResult = true;
                        elem.data.searchTerm = query;
                        categorized[elem.dataType].push(elem.data);
                        documents[elem.dataType].push(elem);
                    }
                    if(callback){
                        callback(categorized,documents);
                    }
                },error: function (jqXHR, textStatus, errorThrown) {
                    if(callback){
                        callback([],[])
                    }
                    SetErrorMessage(jqXHR,network);
                }
            }
        );
    },
    SearchLive:function(network,query,page,callback){
        var searchUrl = API_Base_Url+"documents/users/"+getCookie(APP_Cookies.userID)+"/providers/"+network+"/live?q="+encodeURIComponent(query)+"&page="+page;
        this.SearchIndexed(network,query,callback,searchUrl);
    },
    SearchPrivate:function(network,query,callback){
        var searchUrl = API_Base_Url+"documents/users/"+getCookie(APP_Cookies.userID)+"/providers/"+network+"/indexed?q="+encodeURIComponent(query);
        this.SearchIndexed(network,query,callback,searchUrl,true);
    }
}
App.SearchMixin = Ember.Mixin.create({
    //---override in controller
    messagesModel:'',
    postsModel:'',
    videosModel:'',

    //---override in first call
    _searchOptions:{
        searchNetwork:0,
        query:'',
        ignoreLive:false,
        private : false,
        reloadCallback:function(controller){},
        preIndexedSearch:function(controller){},
        preLiveSearch:function(controller,tab){},
        searchCallback:function(controller,tab,live,result,documents){}//type live or normal
    },//override
    searchOptions:{ },
    //-----------------------
    showShare:true,
    notInSearchMode:function(){
        return this.get('showShare')
    }.property('showShare'),
    privateSearchMode:function(){
        return(this.get('notInSearchMode') || this.get('searchOptions').private);
    }.property('notInSearchMode','searchOptions'),
    searchQuery:'',
    searchPage:0,
    searchInProgress:false,
    searchAllowed:function(){
        return this.get('searchQuery')!='' && (!this.get('searchInProgress'));
    }.property('searchQuery','searchInProgress'),

    messagesLoading:false,
    messagesEmpty:false,
    messagesAvailable:false,
    messagesDocuments:[],

    postsLoading:false,
    postsEmpty:false,
    postsAvailable:false,
    postsDocuments:[],

    videosLoading:false,
    videosEmpty:false,
    videosAvailable:false,
    videosDocuments:[],

    IsModelElementExist:function(modelkey){
        return this.get(modelkey)!='';
    },
    SetModelElement:function(modelkey,value){
        if(this.IsModelElementExist(modelkey)){
            this.set(this.get(modelkey),value)
        }else{
            console.log('+++++++++++++++++++++ Set '+modelkey+' not exist');
        }
    },
    GetModelElement:function(modelkey){
        if(this.IsModelElementExist(modelkey)){
            return this.get(this.get(modelkey))
        }else{
            return [];
        }
    },
    ResetSearchData:function(){
        this.set('messagesLoading',false)
        this.set('messagesEmpty',false)
        this.set('messagesAvailable',false)
        this.set('messagesDocuments',[])

        this.SetModelElement('messagesModel',[])

        this.set('postsLoading',false)
        this.set('postsEmpty',false)
        this.set('postsAvailable',false)
        this.set('postsDocuments',[])

        this.SetModelElement('postsModel',[])

        this.set('videosLoading',false)
        this.set('videosEmpty',false)
        this.set('videosAvailable',false)
        this.set('videosDocuments',[])

        this.SetModelElement('videosModel',[])

        this.set('searchInProgress',false)
        this.set('searchPage',0)
    },
    DisplaySearchResult:function(result,documents,live,tabId){
        var messages=this.GetModelElement('messagesModel');
        var activities=this.GetModelElement('postsModel');
        var videos=this.GetModelElement('videosModel');

        if(result.Message && result.Message.length){
            messages.pushObjects(result.Message)//push the data part in document object
            this.notifyPropertyChange(this.get('messagesModel'));//as push not fire the change observer

            this.get('messagesDocuments').pushObjects(documents.Message)//push the document object it self
            if(live && (tabId=='messages' || tabId==-1)){ //display see more in messages part
                this.set('messagesAvailable',true)
            }

        }else{
            if(live && (tabId=='messages' || messages.length==0)){//there is no messages and live not return any thing
                this.set('messagesEmpty',true)
            }//else no loader so no more search
        }

        if(result.Activity && result.Activity.length){
            activities.pushObjects(result.Activity)//push the data part in document object
            this.notifyPropertyChange(this.get('postsModel'));//as push not fire the change observer

            this.get('postsDocuments').pushObjects(documents.Activity)//push the document object it self
            if(live && (tabId=='activities' || tabId==-1) ){ //display see more in activities part
                this.set('postsAvailable',true)
            }

        }else{
            if(live && (tabId=='activities' || activities.length==0)){//there is no activities and live not return any thing
                this.set('postsEmpty',true)
            }//else no loader so no more search
        }

        if(result.VideoContent && result.VideoContent.length){
            videos.pushObjects(result.VideoContent)
            this.notifyPropertyChange(this.get('videosModel'));//as push not fire the change observer

            this.get('videosDocuments').pushObjects(documents.VideoContent)//push the document object it self
            if(live && (tabId=='videos' || tabId==-1) ){ //display see more in videos part
                this.set('videosAvailable',true)
            }
        }else{
            if(live && (tabId=='videos' || videos.length==0)){//there is no videos and live not return any thing
                this.set('videosEmpty',true)
            }//else no loader so no more search
        }

        var searchOptions = this.get('searchOptions');

        if(searchOptions.searchCallback){
            searchOptions.searchCallback(this,tabId,live,result,documents)
        }
    },
    actions:{
        ReloadModel:function(prevent){
            var searchOptions = this.get('searchOptions');

            this.set('searchQuery','');
            this.set('showShare',true)
            this.ResetSearchData();

            //prevent is used when reload is called in transition between pages as callback change elements exist in controller and in this case it will not exist
            if(!prevent && searchOptions.reloadCallback){
                searchOptions.reloadCallback(this);
            }
        },
        StartSearch:function(options){
            this.set('searchOptions',Em.$.extend({},this.get('_searchOptions'),options?options:{}))
            var searchOptions = this.get('searchOptions');

            if(searchOptions.query == ''){
                if(this.get('searchAllowed')){//query exist and no search in progress
                    this.send('ReloadModel');
                }
                return;
            }else if(this.get('searchInProgress')){// || (searchOptions.query==this.get('searchQuery'))){
                //second condition removed to allow user search on same term
                return;
            }

            this.set('searchQuery',searchOptions.query);//save for live search paging
            this.set('showShare',false)
            this.ResetSearchData();

            if(searchOptions.preIndexedSearch){//callback provided in options
                searchOptions.preIndexedSearch(this);
            }

            var _self=this;
            if(searchOptions.private){//for now private search is separated from public
                APP_Search.SearchPrivate(searchOptions.searchNetwork,searchOptions.query,function(result,documents) {
                    var messages = result.Message;//the message returned from the private search still follow the old structure so we update it in for-loop
                    try {
                        if (messages && messages.length) {
                            for (var i = 0; i < messages.length; i++) {
                                if(messages[i].body) {
                                    messages[i].lastMessageDate = messages[i].date;
                                    messages[i].receivers = [];
                                    messages[i].conversation = [];

                                    messages[i].conversation.push(jQuery.extend({}, messages[i]));
                                    messages[i].conversation[0].conversation = [];
                                    messages[i].conversation[0].receivers = [];
                                }
                                console.log(i)//just check the messages update works
                            }
                        }
                    }catch (e){
                        console.log(e)
                    }

                    _self.DisplaySearchResult(result, documents)
                    if (!(result.Message && result.Message.length)) {//there is no live search so we put live search checks here
                        _self.set('messagesEmpty', true)
                    }
                    if (!(result.Activity && result.Activity.length)) {//there is no live search so we put live search checks here
                        _self.set('postsEmpty', true)
                    }
                    if (!(result.VideoContent && result.VideoContent.length)) {//there is no live search so we put live search checks here
                        _self.set('videosEmpty', true)
                    }
                    HideLoadingImage();//there is no callback for private search right now
                });
            }else{
                APP_Search.SearchIndexed(searchOptions.searchNetwork,searchOptions.query,function(result,documents){
                    _self.DisplaySearchResult(result,documents)
                    if(!searchOptions.ignoreLive){//ignore live search this user in case of linked in as example
                        _self.send('SearchLive',-1)
                    }
                });
            }
        },

        SearchLive:function(tabId){
            var _self=this;
            var searchOptions = this.get('searchOptions');

            if(!_self.get('searchAllowed')){
                return;
            }

            if(tabId=='messages'){
                if(this.get('messagesLoading')||this.get('messagesEmpty')){
                    return;//no more messages
                }else{
                    this.set('messagesAvailable',false)
                    this.set('messagesLoading',true)
                }
            }else if(tabId=='activities'){
                if(this.get('postsLoading')||this.get('postsEmpty')){
                    return;//no more activities
                }else{
                    this.set('postsAvailable',false)
                    this.set('postsLoading',true)
                }
            }else if(tabId=='videos'){
                if(this.get('videosLoading')||this.get('videosEmpty')){
                    return;//no more videos
                }else{
                    this.set('videosAvailable',false)
                    this.set('videosLoading',true)
                }
            }else if(tabId==-1){//first live search
                var messages=this.GetModelElement('messagesModel');
                var activities=this.GetModelElement('postsModel');
                var videos=this.GetModelElement('videosModel');
                if(messages.length){//if there is no indexed messages the top header loading will be enough
                    //_self.set('messagesLoading',true) //****** ignore live search of messages
                }
                if(activities.length){//if there is no indexed activities the top header loading will be enough
                    _self.set('postsLoading',true)
                }
                if(videos.length){//if there is no indexed videos the top header loading will be enough
                    _self.set('videosLoading',true)
                }
            }

            if(searchOptions.preLiveSearch){
                searchOptions.preLiveSearch(this,tabId);
            }

            _self.set('searchInProgress',true)

            var currentQuery = _self.get('searchQuery');

            APP_Search.SearchLive(searchOptions.searchNetwork,currentQuery,(_self.get('searchPage')+1),function(result,documents){
                if(_self.get('searchQuery')==currentQuery){ //no reset to model happen ** open another page then back or search new term
                    _self.set('searchPage' , (_self.get('searchPage') + 1));
                    _self.DisplaySearchResult(result,documents,true,tabId)
                    _self.set('searchInProgress',false)
                    _self.set('messagesLoading',false)
                    _self.set('postsLoading',false)
                    _self.set('videosLoading',false)
                }else{
                    console.log('********** reset happen in progress >> '+currentQuery)//this executed in case of swirch between pages will search in progress
                }
            })
        }
    }
})
