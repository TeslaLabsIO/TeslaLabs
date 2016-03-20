/**
 * Created by mahmoud on 6/17/14.
 */
//---------------------------Apps Scope---------------------------------

var Facebook_Scope_Read = 'read_stream,read_mailbox,user_about_me,user_activities,offline_access,user_birthday,user_friends,user_hometown,user_location';
var Facebook_Scope_Publish= 'publish_actions';
var Facebook_Error_Code={
    Temporary:[1,2,4,17,341],
    Permission:[10,[200,299]],//10,range >200,<299
    TokenExpire:[190],
    DuplicatedPost:[506],
    MissingFile:[324]
};

var Google_Plus_Scope = [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.me',

    'https://mail.google.com/',

    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',

    'https://mail.google.com/mail/feed/atom',

    'https://www.googleapis.com/auth/youtube',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/youtube.upload',

    'https://www.google.com/m8/feeds/contacts'
];