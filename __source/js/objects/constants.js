(function () {
    'use strict';

    // in the future this object should be constant
    App.ConstantObject = Ember.Object.extend({
        set: function () {
        }
    });
    App.CONSTANT = App.ConstantObject.create({
        api: {
            baseUrl: API_Base_Url,
            headerKey: 'Authorization'
        },
        vimeo: {
            contentNetworkId: APP_External_Network.Vimeo,
            clientPlatformId: APP_Client_Platform.WEB  // clientPlatformId is 2 for web
        },
        networks: APP_External_Network,
        baseUrl: API_Base_Url,
        headerKey: 'Authorization',
        clientPlatformId: APP_Client_Platform.WEB,
        twitterId: 0,
        facebookId: 1,
        yahooId: 2,
        linkedinId: 3,
        gmailId: 4,
        googleId: 4,
        youtubeId: 5,
        vimeoId: 6,
        netflixId: 7,
        yelpId: 8,
        tumblrId: 9,
        redditId: 10,
        entitySortKeys: {
            messages: 'lastMessageDate',
            activities: 'date',
            localActivities: 'date',
            neighborhoods: 'name',
            interests: 'name',
            externalInterests : 'name',
            favorites: 'name',//'no_sort_key'//this is value doesn't exist in fav obj but we just want to reverse order of data returned by api
            contacts:'displayName'
        },
        authorization : {
            oauth1 : 1,
            oauth2 : 2
        },
        network: {
            '-2' : {
                name : 'contacts',
                index:null,
                route:'',
                entities: ['contacts'],
                entityCategories: {},
                dataStorageKeys: {
                    contacts : APP_Storage.contacts
                },
                dataStorageMaxSize: {
                    contacts: 0
                },
                lastModifiedStorageKeys: {
                    contacts : APP_Storage.contactsLastModified
                },
                syncTimeout: 10000,
                authorization: {
                    userId: null,
                    oauth : 0
                }
            },
            '-1': {
                name : 'app',
                index:null,
                route:'',
                entities: ['neighborhoods', 'interests'],
                entityCategories: {},
                dataStorageKeys: {
                    neighborhoods: APP_Storage.yelpPlaces,
                    interests: APP_Storage.yelpInterests
                },
                dataStorageMaxSize: {
                    neighborhoods: 3000,
                    interests: 100
                },
                lastModifiedStorageKeys: {
                    neighborhoods: APP_Storage.yelpPlacesLastModified,
                    interests: APP_Storage.yelpInterestsLastModified
                },
                syncExtraOptions : {
                    neighborhoods : {region : 'us'}
                },
                syncTimeout: APP_Sync.yelpSyncTimeOut,
                authorization: {
                    userId: null,
                    oauth : 0
                }
            },
            1: {
                name: 'facebook',
                index:0,
                route:'facebook',
                entities: ['messages', 'activities', 'localActivities','contacts'],
                entityCategories: {},
                dataStorageKeys: {
                    messages: APP_Storage.facebookMessage,
                    activities: APP_Storage.facebookPost,
                    localActivities: APP_Storage.facebookLocalPost,
                    contacts : APP_Storage.contacts
                },
                dataStorageMaxSize: {
                    messages: 25,
                    activities: 25,
                    localActivities: 25,
                    contacts : 1000
                },
                lastModifiedStorageKeys: {
                    messages: APP_Storage.facebookMessageLastModified,
                    activities: APP_Storage.facebookPostLastModified,
                    localActivities: APP_Storage.facebookLocalPostLastModified,
                    contacts : APP_Storage.contactsLastModified
                },
                syncTimeout: APP_Sync.facebookSyncTimeOut,
                authorization:{
                    userId: APP_Storage.facebookUserID(),
                    contactStorageKeys : {
                        displayName : APP_Storage.facebookUserName(),
                        imageUrl : APP_Storage.facebookUserPic()
                    },
                    oauth : 0
                }
            },
            0: {
                name: 'twitter',
                index:1,
                route:'twitter',
                entities: ['messages', 'activities'],
                entityCategories: {
                    activities: ['Tweets', 'My Tweets']
                },
                dataStorageKeys: {
                    messages: APP_Storage.twitterMessage,
                    activities: [APP_Storage.twitterPost, APP_Storage.twitterMyPost] // in same order of entityCategories
                },
                dataStorageMaxSize: {
                    messages: 25,
                    activities: 50 // in same order of entityCategories
                },
                lastModifiedStorageKeys: {
                    messages: APP_Storage.twitterMessageLastModified,
                    activities: APP_Storage.twitterPostLastModified
                },
                syncTimeout: APP_Sync.twitterSyncTimeOut,
                authorization: {
                    userId: APP_Storage.twitterUserID(),
                    contactStorageKeys : {
                        displayName : APP_Storage.twitterUserName(),
                        imageUrl : APP_Storage.twitterUserPic()
                    },
                    oauth : 1,
                    //serviceUrl : 'https://api.twitter.com/oauth/authorize',
                    serviceDefaultParameters : {
                        redirectUrl: Twitter_Callback_Url
                    },
                    serviceDefaultOptions:{
                        saveSecret: true,
                        redirect : true,
                        redirectParams : {
                            url : 'https://api.twitter.com/oauth/authorize'
                        }
                    },
                    authorizeDefaultParameters:{},
                    authorizeDefaultOptions:{}
                }
            },
            3: {
                name: 'linkedin',
                index:2,
                route:'linkedin',
                entities: ['activities','contacts'],
                entityCategories: {},
                dataStorageKeys: {
                    activities: APP_Storage.linkedInPost,
                    contacts : APP_Storage.contacts
                },
                dataStorageMaxSize: {
                    activities: 50,
                    contacts : 1000
                },
                lastModifiedStorageKeys: {
                    activities: APP_Storage.linkedInPostLastModified,
                    contacts : APP_Storage.contactsLastModified
                },
                syncTimeout: APP_Sync.linkedInSyncTimeOut,
                authorization:{
                    userId:APP_Storage.linkedInUserID(),
                    oauth : 0
                }
            },
            4: {
                name: 'gmail',
                index:5,
                route:'gmail',
                entities: ['messages','contacts'],
                entityCategories: {},
                dataStorageKeys: {
                    messages: APP_Storage.gMailMessage,
                    contacts : APP_Storage.contacts
                },
                dataStorageMaxSize: {
                    messages: 20,
                    contacts : 1000
                },
                lastModifiedStorageKeys: {
                    messages: APP_Storage.gMailMessageLastModified,
                    contacts : APP_Storage.contactsLastModified
                },
                syncTimeout: APP_Sync.googlePlusSyncTimeOut,
                authorization:{
                    userId: APP_Storage.gMailUserID(),
                    contactStorageKeys : {
                        displayName : APP_Storage.googleUserName(),
                        imageUrl : APP_Storage.googleUserPic(),
                        email: APP_Storage.googleUserEmail()
                    },
                    oauth : 0
                }
            },
            5: {
                name: 'youtube',
                index:4,
                route:'youtube',
                entities: ['videos'],
                entityCategories: {
                    videos: ['Most Popular', 'Latest Subscription Videos', 'My History']
                },
                dataStorageKeys: {
                    videos: [APP_Storage.youtubeVideos, APP_Storage.youtubeSubscriptionVideo, APP_Storage.youtubeHistoryVideo]
                },
                dataStorageMaxSize: {
                    videos: 10 //this mean 10 for each category so subscription will have max 10 & history max 10 & most popular max 10
                },
                lastModifiedStorageKeys: {
                    videos: APP_Storage.youtubeLastModified
                },
                syncTimeout: APP_Sync.youtubeSyncTimeOut,
                authorization: {
                    userId: APP_Storage.youtubeUserID(),
                    contactStorageKeys : {
                        displayName : APP_Storage.googleUserName(),
                        imageUrl : APP_Storage.googleUserPic(),
                        email: APP_Storage.googleUserEmail()
                    },
                    oauth : 0
                }
            },
            6: {
                name: 'vimeo',
                index:3,
                route:'vimeo.index',
                entities: ['videos'],
                entityCategories: {
                    videos: ['My Feeds','Latest Subscription Videos']
                },
                dataStorageKeys: {
                    videos: [APP_Storage.vimeoVideos, APP_Storage.vimeoSubscriptionVideo]
                },
                dataStorageMaxSize: {
                    videos: 10 //this mean 10 for each category so subscription will have max 10 & my feed max 10
                },
                lastModifiedStorageKeys: {
                    videos: APP_Storage.vimeoLastModified
                },
                syncTimeout: APP_Sync.vimeoSyncTimeOut,
                authorization:{
                    userId:APP_Storage.vimeoUserID(),
                    contactStorageKeys : {
                        displayName : APP_Storage.vimeoUserName(),
                        imageUrl : APP_Storage.vimeoUserPic()
                    },
                    oauth : 2,
                    serviceUrl : 'https://api.vimeo.com/oauth/authorize',
                    serviceDefaultParameters : {
                        client_id: Vimeo_Api_Key,
                        scope: 'private interact public',
                        redirect_uri : Vimeo_Callback_Url
                    },
                    serviceDefaultOptions:{},
                    authorizeDefaultParameters:{
                        redirectUrl: Vimeo_Callback_Url
                    },
                    authorizeDefaultOptions:{}
                }
            },
            8: {
                name: 'yelp',
                index:6,
                route:'yelp',
                entities: ['neighborhoods', 'interests','favorites'],
                entityCategories: {},
                dataStorageKeys: {
                    neighborhoods: APP_Storage.yelpPlaces,
                    interests: APP_Storage.yelpInterests,
                    favorites: APP_Storage.yelpAllFav
                },
                dataStorageMaxSize: {
                    neighborhoods: 3000,
                    interests: 200,
                    favorites: 100
                },
                lastModifiedStorageKeys: {
                    neighborhoods: APP_Storage.yelpPlacesLastModified,
                    interests: APP_Storage.yelpInterestsLastModified,
                    favorites: APP_Storage.yelpAllFavLastModified
                },
                syncExtraOptions : {
                    neighborhoods : {region : 'us'}
                },
                syncTimeout: APP_Sync.yelpSyncTimeOut,
                authorization:{
                    userId:null,
                    oauth : 0
                }
            },
            9: {
                name: 'tumblr',
                index:7,
                route:'tumblr',
                entities: ['activities', 'messages'],//,'externalInterests'
                entityCategories: {},
                dataStorageKeys: {
                    activities: APP_Storage.tumblrPost,
                    messages:APP_Storage.tumblrMessage//,externalInterests: APP_Storage.tumblrInterests
                },
                dataStorageMaxSize: {
                    activities: 25,
                    messages:25//,externalInterests: 100
                },
                lastModifiedStorageKeys: {
                    activities: APP_Storage.tumblrPostLastModified,//APP_Storage.tumblrPostLastModified
                    messages: APP_Storage.tumblrMessageLastModified//,externalInterests: APP_Storage.tumblrInterestsLastModified
                },
                syncTimeout: APP_Sync.tumblrSyncTimeOut,
                authorization:{
                    userId:APP_Storage.tumblrUserID(),
                    oauth : 1,
                    //serviceUrl : 'https://www.tumblr.com/oauth/authorize',
                    serviceDefaultParameters : {
                        redirectUrl: Tumblr_Callback_Url
                    },
                    contactStorageKeys : {
                        displayName : APP_Storage.tumblrUserName(),
                        imageUrl : APP_Storage.tumblrUserPic()
                    },
                    serviceDefaultOptions:{
                        saveSecret: true,
                        redirect : true,
                        redirectParams : {
                            url : 'https://www.tumblr.com/oauth/authorize'
                        }
                    },
                    authorizeDefaultParameters:{},
                    authorizeDefaultOptions:{}
                }
            },
            10: {
                name: 'reddit',
                index:8,
                route:'reddit',
                entities: ['activities','externalInterests'],
                entityCategories: {},
                dataStorageKeys: {
                    activities: APP_Storage.redditPost,
                    externalInterests: APP_Storage.redditInterests
                },
                dataStorageMaxSize: {
                    activities: 25,
                    externalInterests: 100
                },
                lastModifiedStorageKeys: {
                    activities: APP_Storage.redditPostLastModified,
                    externalInterests: APP_Storage.redditInterestsLastModified
                },
                syncTimeout: APP_Sync.redditSyncTimeOut,
                authorization:{
                    userId:APP_Storage.redditUserID(),
                    contactStorageKeys : {
                        displayName : APP_Storage.redditUserName()
                    },
                    oauth : 2,
                    serviceUrl : 'https://ssl.reddit.com/api/v1/authorize',
                    serviceDefaultParameters : {
                        client_id: Reddit_Api_Key,
                        scope: 'identity,read,submit,vote',
                        redirect_uri : Reddit_Callback_Url,
                        duration: 'permanent'
                    },
                    serviceDefaultOptions:{},
                    authorizeDefaultParameters:{
                        redirectUrl: Reddit_Callback_Url
                    },
                    authorizeDefaultOptions:{}
                }
            }
        }
    });
    //calculate max storage for contacts according to networks that support networks
    _.each(App.CONSTANT.network,function(data,id){
       if(data.dataStorageMaxSize && data.dataStorageMaxSize.contacts && id != -2){
           App.CONSTANT.network[-2].dataStorageMaxSize.contacts +=  data.dataStorageMaxSize.contacts;
       }
    });
    if(App.CONSTANT.network[-2].dataStorageMaxSize.contacts > 3000){//3000 contacts ~ 1 M
        App.CONSTANT.network[-2].dataStorageMaxSize.contacts = 3000;
    }
})();