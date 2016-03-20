Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n    <div id=\"searcher\" class=\"searcher\">");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "searcher", options) : helperMissing.call(depth0, "render", "searcher", options))));
  data.buffer.push("</div>\r\n\r\n    <div class=\"contact_url\">\r\n        <a href=\"/#/contacts\">\r\n            <img src=\"images/network/contact/contact_menu.png\"/>\r\n        </a>\r\n    </div>\r\n");
  return buffer;
  }

  data.buffer.push("<!-- Modal -->\r\n<div class=\"modal fade wheelModal\" id=\"wheelModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"wheelModalLabel\"\r\n     aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\">\r\n                <!-- Nav tabs -->\r\n                <ul class=\"nav nav-tabs\" role=\"tablist\">\r\n                    <li class=\"active\"><a href=\"#main\" role=\"tab\" data-toggle=\"tab\">Main Categories</a></li>\r\n                    <li><a href=\"#inner\" role=\"tab\" data-toggle=\"tab\">Inner Categories</a></li>\r\n                </ul>\r\n                <!-- Tab panes -->\r\n                <div class=\"tab-content\">\r\n                    <div class=\"tab-pane active\" id=\"main\">\r\n                        <ul id=\"wheelItems\" class=\"nolist\"></ul>\r\n                    </div>\r\n                    <div class=\"tab-pane\" id=\"inner\">\r\n                        <ul id=\"innerCategories\" class=\"nolist\"></ul>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id=\"wheel\">");
  stack1 = helpers._triageMustache.call(depth0, "sprocket-wheel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n\r\n<!-- Searcher -->\r\n");
  stack1 = helpers['if'].call(depth0, "isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n<!-- end of wheel -->\r\n<div id=\"page\" style=\"overflow-y: auto; overflow-x: hidden;\">");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>");
  console.log(data.buffer.buffer);
  return buffer;
  
});

Ember.TEMPLATES["authorize"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                                Please wait, completing authorization....\r\n                            ");
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <a ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onLoginClick", "network", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" style=\"cursor: pointer\">\r\n                                    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("networkImage")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n                                </a>\r\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"mainContainer\">\r\n    <div class=\"mainContent\">\r\n        <div class=\"oneColumnContainer\">\r\n            <div class=\"oneColumnContent\">\r\n                <table id=\"wrapper\">\r\n                    <tr>\r\n                        <td>\r\n                            ");
  stack1 = helpers['if'].call(depth0, "authorizationCallback", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </td>\r\n                    </tr>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["bestbuy"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!--<iframe class=\"mainFrame\" src=\"http://www.bestbuy.com/\" frameborder=\"1\" allowtransparency=\"false\"></iframe>-->\r\n<div class=\"wrapper\">\r\n    <div align='center' class=\"hello\">\r\n        Best Buy is not supported in current version\r\n    </div>\r\n</div>");
  
});

Ember.TEMPLATES["cleardata"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<br><br><br>\r\n<button onclick=\"alert('facebook clear \\n ------------------------------------------------- '+APP_Storage.removeByNetwork('facebook'))\">\r\n    Clear Facebook\r\n</button>\r\n<br>\r\n<button onclick=\"alert('twitter clear \\n ------------------------------------------------- '+APP_Storage.removeByNetwork('twitter'))\">\r\n    Clear Twitter\r\n</button>\r\n<br>\r\n<button onclick=\"alert('google clear \\n ------------------------------------------------- '+APP_Storage.removeByNetwork('google'))\">\r\n    Clear Google +\r\n</button>\r\n<br>\r\n<button onclick=\"alert('gmail clear \\n ------------------------------------------------- '+APP_Storage.removeByNetwork('gmail'))\">\r\n    Clear Gmail\r\n</button>\r\n<br>\r\n<button onclick=\"alert('youtube clear \\n ------------------------------------------------- '+APP_Storage.removeByNetwork('youtube'))\">\r\n    Clear Youtube\r\n</button>\r\n<br>\r\n<button onclick=\"alert('linkedin clear \\n ------------------------------------------------- '+APP_Storage.removeByNetwork('linkedin'))\">\r\n    Clear Linkedin\r\n</button>\r\n<br>\r\n<button onclick=\"alert('vimeo clear \\n ------------------------------------------------- '+APP_Storage.removeByNetwork('vimeo'))\">\r\n    Clear Vimeo\r\n</button>\r\n<br>\r\n<button onclick=\"alert('yelp clear \\n ------------------------------------------------- '+APP_Storage.removeByNetwork('yelp'))\">\r\n    Clear Yelp\r\n</button>\r\n<br>\r\n<button onclick=\"for(var k in localStorage){localStorage.removeItem(k);};alert('success')\">Clear Domain Local Storage\r\n</button>\r\n<br>\r\n");
  
});

Ember.TEMPLATES["cnet"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://www.cnet.com/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["components/sprocket-wheel"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!-- start of wheel -->\r\n<ul id=\"sprocket\">\r\n</ul>\r\n<div class=\"core\">\r\n    <div class=\"wheel-btn\"></div>\r\n    <div class=\"inner-wheel\">\r\n        <ul>\r\n        </ul>\r\n    </div>\r\n</div>\r\n");
  
});

Ember.TEMPLATES["contacts"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    <label class=\"btn btn-primary search_network ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "whenEqual", "contactNetwork", "network.id", "active", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","ID","STRING"],data:data})));
  data.buffer.push("\">\r\n                                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("network"),
    'selectionBinding': ("contactNetwork"),
    'value': ("network.id")
  },hashTypes:{'name': "STRING",'selectionBinding': "STRING",'value': "ID"},hashContexts:{'name': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                        <img src=\"assets/images/headericons/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "network.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(".png\" class=\"search_result_network_img\"/>\r\n                                        <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "network.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                                    </label>\r\n                                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <img src=\"assets/images/search.png\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "searchContacts", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                            ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <img src=\"assets/images/clear_search.png\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "resetSearch", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.alphabeticalCategory || (depth0 && depth0.alphabeticalCategory),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["ID","ID","STRING"],data:data},helper ? helper.call(depth0, "parentController.contactsPaged", "_view.contentIndex", "displayName", options) : helperMissing.call(depth0, "alphabeticalCategory", "parentController.contactsPaged", "_view.contentIndex", "displayName", options))));
  data.buffer.push("\r\n                                <span style=\"display: none\" id=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "contactId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></span>\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/contact", options) : helperMissing.call(depth0, "partial", "social/contact", options))));
  data.buffer.push("\r\n                            ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                <div style=\"padding: 5px\">\r\n                                ");
  stack1 = helpers['if'].call(depth0, "isNetworkActivated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </div>\r\n                            ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "searchQuery", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                        No ");
  stack1 = helpers._triageMustache.call(depth0, "selectedNetworkInfo.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" contacts matched your search criteria.\r\n                                    ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                        This may take a few minutes while we synchronize your ");
  stack1 = helpers._triageMustache.call(depth0, "selectedNetworkInfo.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" contacts.\r\n                                    ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    Please login to <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("selectedNetworkInfo.url")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "selectedNetworkInfo.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a> so we can get your contacts.\r\n                                ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <!--don't user lastSelectedContact because it's the controller and will leaded to recursion problem if u select contact on the details view-->\r\n                            ");
  stack1 = helpers['with'].call(depth0, "lastSelectedContact.model", {hash:{
    'controller': ("SocialContact")
  },hashTypes:{'controller': "STRING"},hashContexts:{'controller': depth0},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                    ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/contactdetails", options) : helperMissing.call(depth0, "partial", "social/contactdetails", options))));
  data.buffer.push("\r\n                            ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <div class=\"flexibleColumn contactDetails addContact\">\r\n                            ");
  stack1 = helpers['with'].call(depth0, "newContact", {hash:{
    'controller': ("SocialContact")
  },hashTypes:{'controller': "STRING"},hashContexts:{'controller': depth0},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                    ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/contactadd", options) : helperMissing.call(depth0, "partial", "social/contactadd", options))));
  data.buffer.push("\r\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"mainContainer\">\r\n    <div class=\"mainContent\">\r\n        <div class=\"twoColumnContainer\">\r\n            <div class=\"twoColumnContent\">\r\n                <div class=\"flexibleRow\">\r\n                    <div class=\"flexibleColumn contacts\" id=\"user_contacts_parent\">\r\n                        <div class=\"header\" style=\"\">\r\n                            <div class=\"title\">\r\n                                Your Contacts\r\n                            </div>\r\n                            <div class=\"btn-group networks\" data-toggle=\"buttons\">\r\n                                <!--<label class=\"btn btn-primary search_network\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addContact", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                                    <img src=\"images/network/contact/add.png\" class=\"search_result_network_img\"/>\r\n                                    <span class=\"search_result_text\">Add</span>\r\n                                </label>\r\n                                <label class=\"btn btn-primary search_network\">\r\n                                    <img src=\"images/network/contact/sync.png\" class=\"search_result_network_img\"/>\r\n                                    <span class=\"search_result_text\">Sync</span>\r\n                                </label>-->\r\n                                ");
  stack1 = helpers.each.call(depth0, "network", "in", "networks", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"search_box\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.KeyUpTextField", {hash:{
    'valueBinding': ("query"),
    'keyUpAction': ("onSearchKeyUp"),
    'placeholder': ("Search")
  },hashTypes:{'valueBinding': "STRING",'keyUpAction': "STRING",'placeholder': "STRING"},hashContexts:{'valueBinding': depth0,'keyUpAction': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            ");
  stack1 = helpers['if'].call(depth0, "showSearchGlass", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                        <div id=\"user_contacts\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("isDetailsDisplayed:two_contact:three_contact")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                            ");
  stack1 = helpers.each.call(depth0, "contactsPaged", {hash:{
    'itemController': ("SocialContact")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"flexibleColumn contactDetails\">\r\n                    ");
  stack1 = helpers['if'].call(depth0, "lastSelectedContact", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n                    ");
  stack1 = helpers['if'].call(depth0, "newContact", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["deadspin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://deadspin.com/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["espn"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://espn.go.com\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["expedia"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://www.expedia.com\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["facebook"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span>new</span>\r\n                ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <span>\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "fBMessages.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </span>\r\n                ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <li class=\"search_element_wrapper\">\r\n                            <div id=\"fb_contact_id_");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriend.contactId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"\r\n                                 class=\"message_item poster-wrapper search_element\"\r\n                                 onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "Message", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","STRING","ID"],data:data})));
  data.buffer.push(">\r\n                                <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                                    <span class=\"inner-wrapper\">\r\n                                                        ");
  stack1 = helpers.each.call(depth0, "friendImage", "in", "friendsImage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                    </span>\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_name\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriend.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_subject fb_message_html ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastMessageStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"\r\n                                   href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getLastElementAttr", "allMessages", "body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["ID","ID","STRING"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_date\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getLastElementAttr", "allMessages", "date", "getPostDateString", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","STRING","STRING"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"fb_post_img\" href=\"javascript:void(0)\">\r\n                                </a>\r\n                            </div>\r\n                        </li>\r\n                    ");
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                                            <div class=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "friendImage.class", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                                                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "friendImage.img", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                                            </div>\r\n                                                        ");
  return buffer;
  }

function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display:block\">\r\n                                This may take a few minutes while we synchronize your Messages\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program10(depth0,data) {
  
  
  data.buffer.push("\r\n                <span>new</span>\r\n            ");
  }

function program12(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ActivityView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                ");
  return buffer;
  }

function program14(depth0,data) {
  
  
  data.buffer.push("\r\n                    <li style=\"width: 100%;\">\r\n                        <div class=\"search_no_result\" style=\"display:block\">\r\n                            This may take a few minutes while we synchronize your News Feed\r\n                        </div>\r\n                    </li>\r\n                ");
  }

function program16(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ActivityView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program18(depth0,data) {
  
  
  data.buffer.push("\r\n                    <div class=\"search_no_result\" style=\"display:block\">\r\n                        This may take a few minutes while we synchronize the Local News Feed\r\n                    </div>\r\n                ");
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers['if'].call(depth0, "localEmpty", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program21(depth0,data) {
  
  
  data.buffer.push("\r\n                        <div class=\"search_no_result\" style=\"display:block\">\r\n                            We can not get local news feed for this account\r\n                        </div>\r\n                    ");
  }

function program23(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display:block\">\r\n                                This may take a few minutes while we synchronize the Recommended News Feed\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program25(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n            <li class=\"search_element_wrapper_details\">\r\n                <div class=\"search_video_title search_fb_date_details\" href=\"javascript:void(0)\">\r\n                    <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                    <span></span>\r\n                </div>\r\n                <div class=\"search_element\">\r\n                    <div class=\"search_fb_url ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "contactClass", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" href=\"javascript:void(0)\">\r\n                            <span class=\"inner-wrapper\">\r\n                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            </span>\r\n                    </div>\r\n                    <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\">\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"search_video_title search_fb_subject_details fb_message_details_html\"\r\n                         href=\"javascript:void(0)\">\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n\r\n            </li>\r\n        ");
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n\r\n            <li class=\"search_element_wrapper_details\">\r\n                <!--<div class=\"search_video_title search_fb_date_details\" href=\"javascript:void(0)\">\r\n                        <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "fBPostsDetail.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                        <span></span>\r\n                    </div>-->\r\n                <div class=\"search_element\" style=\"height:auto !important\">\r\n                    <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                                    <span class=\"inner-wrapper\">\r\n                                                        <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                                    </span>\r\n                    </div>\r\n                    <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\">\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\"\r\n                         style=\"min-height:inherit !important\">\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"search_video_title search_fb_subject_details fb_post_body fb_post_details_html\"\r\n                         href=\"javascript:void(0)\" style=\"\">\r\n                        <!--min-height:inherit !important;color:white;float:left;padding-top:5px-->\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "caption", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postLink", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"fb_post_img_container\">\r\n                        ");
  stack1 = helpers['if'].call(depth0, "isPhoto", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                        ");
  stack1 = helpers['if'].call(depth0, "isVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n\r\n                    <div class=\"fb_post_error likepermission\">Unable to post to your profile because we need <span>More permission</span>\r\n                    </div>\r\n                    <div class=\"fb_post_error likeinvalid\" style=\"color:red\" onclick=\"this.style.display='none'\">This\r\n                        post was deleted or you don't have access to it\r\n                    </div>\r\n\r\n                    <div class=\"fb_post_like\">\r\n                        <div style=\"display:none !important\">\r\n                            <img class=\"fb_like_icon\" src=\"assets/images/like.png\"/>\r\n                            <a class=\"fb_like_count\">");
  stack1 = helpers._triageMustache.call(depth0, "likeCount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\r\n                            <a class=\"likepost\" href=\"javascript:void(0)\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "LikePost", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "likeTitle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a>\r\n                            <a style=\"margin-top:1px\" href=\"javascript:void(0)\"\r\n                               onclick='$(\"#fbContent\").mCustomScrollbar(\"scrollTo\",\"bottom\")'>Comment</a>\r\n                        </div>\r\n                        <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                    </div>\r\n                    <div class=\"fb_post_comments\" style=\"display:none !important\">\r\n                        ");
  stack1 = helpers.each.call(depth0, "comment", "in", "postComments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(38, program38, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n                    <div class=\"fb_post_error postpermission\">Unable to post to your profile because we need <span>More permission</span>\r\n                    </div>\r\n                    <div class=\"fb_post_error commentinvalid\" style=\"color:red\" onclick=\"this.style.display='none'\">This\r\n                        post was deleted or you don't have access to it\r\n                    </div>\r\n\r\n                    <div class=\"send_comment_box_parent chat_window\" style=\"display:none !important\">\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'placeholder': ("Write a comment.."),
    'class': ("send_message_box send_message_input"),
    'value': ("userComment")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'class': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'class': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "CommentOnPost", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"send_message_button\" style='margin-left: 6px'>Comment\r\n                        </button>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </li>\r\n\r\n        ");
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            <img class=\"fb_post_details_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                        ");
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            ");
  stack1 = helpers['if'].call(depth0, "isSecureIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <iframe width=\"100%\" height=\"250px\" frameborder=\"0\" allowfullscreen\r\n                                        src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></iframe>\r\n                            ");
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "isIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(36, program36, data),fn:self.program(34, program34, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }
function program34(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    <a href=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" target=\"_blank\" class=\"fb_video_player\">\r\n                                        <img style=\"margin-top:50px !important;margin-bottom:50px !important;cursor:pointer;\"\r\n                                             class=\"fb_post_details_img\" src=\"assets/images/playvideo.png\" alt=\"\"/>\r\n                                    </a>\r\n                                ");
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    <video width=\"100%\" height=\"250\" controls>\r\n                                        <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"video/mp4\">\r\n                                        <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"video/ogg\">\r\n                                        Your browser does not support video\r\n                                    </video>\r\n                                ");
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            <div class=\"fb_post_comment\">\r\n                                <img class=\"userimg\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "comment.from.pic", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                <span class=\"user\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "comment.from.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n                                <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "comment.message", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n                                <span class=\"date\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "comment.created_time", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                            </div>\r\n                        ");
  return buffer;
  }

  data.buffer.push("<!--<div class=\"wrapper\" style=\"display:none\" id=\"facebookbtn\">\r\n        <div align='center'>\r\n            <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "FacebookLogin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >login to Facebook</button>\r\n            <br/>\r\n            <div id=\"facebookResult\"></div>\r\n        </div>\r\n    </div>-->\r\n<div class=\"loginwrapper\" style=\"display:none\" id=\"facebookbtn\">\r\n    <div class=\"loginContainer\">\r\n        <div class=\"loginform\" align='center'>\r\n            <div class=\"logindiv\" style=\"background-color:transparent !important;border-width:0px\">\r\n                <div id=\"facebookResult\"></div>\r\n                <button class=\"fblogin\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "FacebookLogin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >Login to Facebook</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<button style=\"display:none\" id=\"updateFacebookMessages\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateFacebookMessages", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >u</button>\r\n<button style=\"display:none\" id=\"updateFacebookPosts\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateFacebookPosts", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >u</button>\r\n\r\n<div class=\"search_wrapper\" style=\"display:none\" id=\"facebookdata\">\r\n<div id=\"fbData\" class=\"search_wrapper_root\" style=\"\">\r\n    <div class=\"swipe search_data\">\r\n        <div class=\"social_accordion_header search_category_numeric\" accordion-callback=\"setFbSelected\" onclick=\"\"><!--onclick='' for safari mobile-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.messages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                <div>Messages</div>\r\n            </div>\r\n        <div class=\"social_accordion\">\r\n                <ul id=\"fb_msg_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 430px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "fBMessages", {hash:{
    'itemController': ("FacebookMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(8, program8, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    <li style=\"display:none !important\"><a id=\"hidden_message_send\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "Message", -1, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","STRING","INTEGER"],data:data})));
  data.buffer.push("href=\"javascript:void(0)\">send</a></li>\r\n                </ul>\r\n            </div>\r\n\r\n        <div class=\"social_accordion_header search_category\" accordion-callback=\"setFbSelected\" onclick=\"\"><!--onclick='' for safari mobile-->\r\n            ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            <div>News Feed</div>\r\n        </div>\r\n        <div class=\"social_accordion\">\r\n\r\n            <div class=\"send_message_box_parent social_share_box\" id=\"fb_share\">\r\n                    <div class=\"share_photo_video_header\"\r\n                         onclick=\"Em.$('#fb_upload_gallery').is(':visible') ? (Em.$('#fb_upload_gallery').fadeOut(0)) :( Em.$('#fb_upload_gallery').fadeIn(0))\">\r\n                        <img src=\"assets/images/share_photo_icon.png\">\r\n                        <span title=\"Files more than 15MB will not uploaded\">Add Photo/Video *</span>\r\n                    </div>\r\n                    <div class=\"upload_gallery\" style=\"display:none\" id=\"fb_upload_gallery\">\r\n                        <input style=\"visibility:hidden;width:1px\" id=\"fb_post_upload\" type=\"file\" accept=\"image/*,video/*\" onchange=\"uploadFbPhotoVideo(event)\" multiple=\"1\"/>\r\n\r\n                        <span id=\"fb_img_template\" style=\"display:none\" class=\"file_uploader_image\"><span><img src=\"\" alt=\"\"/></span></span>\r\n\r\n                        <span class=\"file_uploader\" id=\"fb_upload_button\" onclick=\"Em.$('#fb_post_upload').click()\">+</span>\r\n                    </div>\r\n\r\n                    <div class=\"fb_post_error permission\">Unable to post to your profile because we need <span>More permission</span></div>\r\n                    <div class=\"fb_post_error temporary\" onclick=\"this.style.display='none'\">Server is temporary not available; please try again later</div>\r\n                    <div class=\"fb_post_error duplicated\" onclick=\"this.style.display='none'\">Duplicated post</div>\r\n                    <div class=\"fb_post_error files\" onclick=\"this.style.display='none'\">Photos/videos not added to post</div>\r\n                    <div class=\"fb_post_error video\" style=\"color:white\" onclick=\"this.style.display='none'\">It may take several minutes for this video to appear on your facebook feed</div>\r\n\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("fb_post_status"),
    'class': ("send_message_box post_status_input"),
    'placeholder': ("What's on your mind?"),
    'type': ("text"),
    'value': ("postMessage")
  },hashTypes:{'id': "STRING",'class': "STRING",'placeholder': "STRING",'type': "STRING",'value': "ID"},hashContexts:{'id': depth0,'class': depth0,'placeholder': depth0,'type': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n\r\n                    <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "CheckPostToken", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("  style=\"margin-bottom:10px\" class=\"post_status_button\">POST</button>\r\n            </div>\r\n\r\n            <ul id=\"fb_posts_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 455px\">\r\n                ");
  stack1 = helpers.each.call(depth0, "fBPosts", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </ul>\r\n        </div>\r\n\r\n        <div style=\"position:relative\" class=\"social_accordion_header search_category\" id=\"local\" accordion-callback=\"setFbSelected\" onclick=\"\"><!--onclick='' for safari mobile-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.localActivities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>Local News Feed</div>\r\n                <span ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getLocation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" id=\"loctooltip\">\r\n                    <img src=\"assets/images/position2.png\">\r\n                </span>\r\n        </div>\r\n        <div class=\"social_accordion\">\r\n                <ul id=\"fb_local_posts_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 455px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "fBLocalPosts", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n                ");
  stack1 = helpers['if'].call(depth0, "localNotSync", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n\r\n        <div class=\"social_accordion_header search_category\" accordion-callback=\"setFbSelected\" onclick=\"\" style=\"visibility: hidden\"><!--onclick='' for safari mobile-->\r\n                <span id=\"fb_recommended_post_new\">new</span>\r\n                <div>Recommended</div>\r\n        </div>\r\n        <div class=\"social_accordion\" style=\"visibility: hidden\">\r\n                <ul id=\"fb_recommended_posts_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 455px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "fBRecommendedPosts", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(23, program23, data),fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"searchContent\" id=\"fbContent\">\r\n    <ul id=\"fb_msg_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n        ");
  stack1 = helpers.each.call(depth0, "fBMessagesDetails", {hash:{
    'itemController': ("FacebookMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </ul>\r\n\r\n    <ul id=\"fb_post_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n        <!--style=\"max-height: 100%; overflow: auto;\"-->\r\n        ");
  stack1 = helpers.each.call(depth0, "fBPostsDetails", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </ul>\r\n</div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["facebooktest"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "feeddetails", options) : helperMissing.call(depth0, "render", "feeddetails", options))));
  data.buffer.push("\r\n");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "feed", "news", options) : helperMissing.call(depth0, "render", "feed", "news", options))));
  data.buffer.push("\r\n");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "feed", "local", options) : helperMissing.call(depth0, "render", "feed", "local", options))));
  data.buffer.push("\r\n");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "feed", "recommended", options) : helperMissing.call(depth0, "render", "feed", "recommended", options))));
  data.buffer.push("\r\n\r\n<!--{ {render \"Feed\" controller.local}}\r\n{ {render \"Feed\" controller.recommended}}\r\n{ {#each s in recommended} }\r\n    da<br>\r\n{ {/each} }-->");
  return buffer;
  
});

Ember.TEMPLATES["feed"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n<!--{ {#each feeditem in controller} }-->\r\n    <div style=\"cursor: pointer\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "_view.contentIndex", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data})));
  data.buffer.push(">\r\n        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n    <br>\r\n");
  return buffer;
  }

  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "feeddetails", "g", options) : helperMissing.call(depth0, "render", "feeddetails", "g", options))));
  data.buffer.push(" <!-- empty} }-->\r\n<div style=\"background: #0000ff;color: #ffffff\">Separator</div>\r\n<br>\r\n");
  stack1 = helpers._triageMustache.call(depth0, "model.empty", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  stack1 = helpers._triageMustache.call(depth0, "content.empty", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  stack1 = helpers._triageMustache.call(depth0, "empty.photo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n");
  stack1 = helpers._triageMustache.call(depth0, "empty.photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "PostFeed", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">post</button>\r\n<br>\r\n");
  stack1 = helpers.each.call(depth0, "model", {hash:{
    'itemController': ("feeditem")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

Ember.TEMPLATES["feeddetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n");
  return buffer;
  }

  data.buffer.push("<br><br><br><br>\r\n<div style=\"background: #ffffff;color: #0000ff\">Details</div>\r\nCondtional binding (unbound updated when condition chnage only)\r\n<br>\r\n");
  stack1 = helpers['if'].call(depth0, "model", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n<br>\r\nNon Condtitional binding (unbound not work)\r\n<br>\r\n");
  stack1 = helpers._triageMustache.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n<br>\r\n");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n<br>\r\n<img class=\"fb_post_thumb_img\"  src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n<br>\r\n<img class=\"fb_post_thumb_img\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("photo.url")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["flixster"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!--<iframe class=\"mainFrame\" src=\"https://www.flixster.com/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>-->\r\n<div class=\"wrapper\">\r\n    <div align='center' class=\"hello\">\r\n        Flixster is not supported in current version\r\n    </div>\r\n</div>\r\n");
  
});

Ember.TEMPLATES["forgetpassword"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                        Reset link has been sent to your mail\r\n                    ");
  }

  data.buffer.push("<div class=\"loginwrapper\">\r\n    <div class=\"loginContainer\">\r\n        <div class=\"loginform\" align='center'>\r\n            <h4 style=\"font-size: 16px;margin-bottom:20px;font-weight:normal\">\r\n                Please Enter your <span class=\"sprocket_label\">SPROCKET</span> User name and we will send reset link to your mail</h4>\r\n            <div class=\"logindiv\">\r\n                <div id=\"loginResult\" style=\"color: #67b561\">\r\n                    ");
  stack1 = helpers['if'].call(depth0, "emailSent", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n                <div>\r\n                   ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'placeholder': ("User name"),
    'type': ("text"),
    'value': ("username")
  },hashTypes:{'placeholder': "STRING",'type': "STRING",'value': "ID"},hashContexts:{'placeholder': depth0,'type': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                </div>\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "Submit", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >Submit</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["gawker"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://gawker.com/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["gizmodo"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://gizmodo.com/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["global-feed"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "feeds", {hash:{
    'itemController': ("SocialActivity")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activity", options) : helperMissing.call(depth0, "partial", "social/activity", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <div style=\"padding: 5px\">\r\n                                ");
  stack1 = helpers['if'].call(depth0, "isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                    ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    This may take a few minutes while we synchronize your ");
  stack1 = helpers._triageMustache.call(depth0, "feedsType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    Please login to <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("networkUrl")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "networkName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a> so we can get your ");
  stack1 = helpers._triageMustache.call(depth0, "feedsType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "feeds", {hash:{
    'itemController': ("SocialVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/video", options) : helperMissing.call(depth0, "partial", "social/video", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <div style=\"padding: 5px\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "isLoggedIn", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                    ");
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                This may take a few minutes while we synchronize your ");
  stack1 = helpers._triageMustache.call(depth0, "feedsType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                Please login to <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("networkUrl")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "networkName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</a> so we can get your ");
  stack1 = helpers._triageMustache.call(depth0, "feedsType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "feeds", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/gplace", options) : helperMissing.call(depth0, "partial", "social/gplace", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <div style=\"padding: 5px\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "locationPosted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                    ");
  return buffer;
  }
function program21(depth0,data) {
  
  
  data.buffer.push("\r\n                                This may take a few minutes while we synchronize yelp most popular places.\r\n                            ");
  }

function program23(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                Please provide your <a href=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getLocation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" >location</a> so we can get yelp\r\n                                most popular places.\r\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"globalFeedScroller\">\r\n    <div class=\"globalFeedScrollerCintent\">\r\n        <div class=\"globalFeedHeader\">SPROCKET FEED</div>\r\n        <div class=\"btn-group search_private_network\" data-toggle=\"buttons\">\r\n            <label class=\"btn btn-primary search_network active\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("socialFeed"),
    'changeAction': ("changeNetwork"),
    'selectionBinding': ("feedNetwork"),
    'value': ("1")
  },hashTypes:{'name': "STRING",'changeAction': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'changeAction': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                <img src=\"assets/images/headericons/facebook.png\" class=\"search_result_network_img\"/>\r\n                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "model.1.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </label>\r\n            <label class=\"btn btn-primary search_network\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("socialFeed"),
    'changeAction': ("changeNetwork"),
    'selectionBinding': ("feedNetwork"),
    'value': ("0")
  },hashTypes:{'name': "STRING",'changeAction': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'changeAction': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                <img src=\"assets/images/headericons/twitter.png\" class=\"search_result_network_img\"/>\r\n                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "model.0.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </label>\r\n            <label class=\"btn btn-primary search_network\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("socialFeed"),
    'changeAction': ("changeNetwork"),
    'selectionBinding': ("feedNetwork"),
    'value': ("3")
  },hashTypes:{'name': "STRING",'changeAction': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'changeAction': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                <img src=\"assets/images/headericons/linkedin.png\" class=\"search_result_network_img\"/>\r\n                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "model.3.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </label>\r\n            <label class=\"btn btn-primary search_network\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("socialFeed"),
    'changeAction': ("changeNetwork"),
    'selectionBinding': ("feedNetwork"),
    'value': ("6")
  },hashTypes:{'name': "STRING",'changeAction': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'changeAction': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                <img src=\"assets/images/headericons/vimeo.png\" class=\"search_result_network_img\"/>\r\n                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "model.6.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </label>\r\n            <label class=\"btn btn-primary search_network\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("socialFeed"),
    'changeAction': ("changeNetwork"),
    'selectionBinding': ("feedNetwork"),
    'value': ("5")
  },hashTypes:{'name': "STRING",'changeAction': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'changeAction': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                <img src=\"assets/images/headericons/youtube.png\" class=\"search_result_network_img\"/>\r\n                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "model.5.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </label>\r\n            <label class=\"btn btn-primary search_network\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("socialFeed"),
    'changeAction': ("changeNetwork"),
    'selectionBinding': ("feedNetwork"),
    'value': ("8")
  },hashTypes:{'name': "STRING",'changeAction': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'changeAction': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                <img src=\"assets/images/headericons/yelp.png\" class=\"search_result_network_img\"/>\r\n                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "model.8.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </label>\r\n            <label class=\"btn btn-primary search_network\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("socialFeed"),
    'changeAction': ("changeNetwork"),
    'selectionBinding': ("feedNetwork"),
    'value': ("9")
  },hashTypes:{'name': "STRING",'changeAction': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'changeAction': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                <img src=\"assets/images/headericons/tumblr.png\" class=\"search_result_network_img\"/>\r\n                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "model.9.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </label>\r\n            <label class=\"btn btn-primary search_network\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("socialFeed"),
    'changeAction': ("changeNetwork"),
    'selectionBinding': ("feedNetwork"),
    'value': ("10")
  },hashTypes:{'name': "STRING",'changeAction': "STRING",'selectionBinding': "STRING",'value': "STRING"},hashContexts:{'name': depth0,'changeAction': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                <img src=\"assets/images/headericons/reddit.png\" class=\"search_result_network_img\"/>\r\n                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "model.10.count", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </label>\r\n        </div>\r\n        <div id=\"global_feed\" class=\"search_wrapper_root\" style=\"width: 100%\">\r\n            <ul id=\"global_feed_activity\" class=\"videos-list cleafix nolist search_result\">\r\n\r\n                ");
  stack1 = helpers['if'].call(depth0, "isActivity", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers['if'].call(depth0, "isVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers['if'].call(depth0, "isPlace", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["global-search"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <div class=\"global-search-public-column\">\r\n                        <div class=\"global-search-public-title\">GLOBAL SEARCH RESULT</div>\r\n                        <div class=\"global-search-public-content\">\r\n                            ");
  stack1 = helpers.unless.call(depth0, "searcher.isNetworkSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            <div class=\"global-search-public-data\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("searcher.isNetworkSearch:global-search-public-data-global")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                <div class=\"accordion_content panel-collapse collapse in\">\r\n                                    <ul id=\"\" class=\"videos-list cleafix nolist search_result\">\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "isPublicActivity", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "isPublicVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "isPublicPlace", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "publicLoading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "publicPageEmpty", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "publicPager", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                <div class=\"global-search-public-tabs\">\r\n                                    <div class=\"btn-group\" data-toggle=\"buttons\">\r\n                                        ");
  stack1 = helpers.each.call(depth0, "publicNetworks", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </div>\r\n                                </div>\r\n                            ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            <label class=\"btn btn-primary search_network ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "active", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("publicsearch"),
    'selectionBinding': ("controller.publicNetworkSelected"),
    'value': ("id")
  },hashTypes:{'name': "STRING",'selectionBinding': "STRING",'value': "ID"},hashContexts:{'name': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                                <img src=\"assets/images/headericons/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(".png\"\r\n                                                     class=\"search_result_network_img\"/>\r\n                                                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                                            </label>\r\n                                        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                <div>\r\n                                    <div class=\"accordion_header\">\r\n                                        <div class=\"pull-left text-uppercase\">");
  stack1 = helpers._triageMustache.call(depth0, "searcher.networkName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n                                        <span class=\"count pull-right\">");
  stack1 = helpers._triageMustache.call(depth0, "publicFeeds.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                                    </div>\r\n                                </div>\r\n                            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            ");
  stack1 = helpers.each.call(depth0, "publicFeeds", {hash:{
    'itemController': ("SocialActivity")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activity", options) : helperMissing.call(depth0, "partial", "social/activity", options))));
  data.buffer.push("\r\n                                            ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            ");
  stack1 = helpers.each.call(depth0, "publicFeeds", {hash:{
    'itemController': ("SocialVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/video", options) : helperMissing.call(depth0, "partial", "social/video", options))));
  data.buffer.push("\r\n                                            ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            ");
  stack1 = helpers.each.call(depth0, "publicFeeds", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/gplace", options) : helperMissing.call(depth0, "partial", "social/gplace", options))));
  data.buffer.push("\r\n                                            ");
  return buffer;
  }

function program16(depth0,data) {
  
  
  data.buffer.push("\r\n                                            <li class=\"search_more\">\r\n                                                <img src=\"assets/images/upload_progress.gif\">\r\n                                            </li>\r\n                                        ");
  }

function program18(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            <li class=\"search_more\">\r\n                                                ");
  stack1 = helpers['if'].call(depth0, "isPublicActivity", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </li>\r\n                                        ");
  return buffer;
  }
function program19(depth0,data) {
  
  
  data.buffer.push("\r\n                                                    No more Feeds match the search criteria\r\n                                                ");
  }

function program21(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                    ");
  stack1 = helpers['if'].call(depth0, "isPublicVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                ");
  return buffer;
  }
function program22(depth0,data) {
  
  
  data.buffer.push("\r\n                                                        No more Videos match the search criteria\r\n                                                    ");
  }

function program24(depth0,data) {
  
  
  data.buffer.push("\r\n                                                        No more Places match the search criteria\r\n                                                    ");
  }

function program26(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                            <li class=\"search_more more_loader\" title=\"Load More\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "LoadMore", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                                                <img src=\"assets/images/more_loader.png\">\r\n                                            </li>\r\n                                        ");
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <div class=\"global-search-private-column\">\r\n                        <div class=\"global-search-private-title\">USER SEARCH RESULT</div>\r\n                        <div class=\"global-search-private-content\">\r\n                            ");
  stack1 = helpers.unless.call(depth0, "searcher.isNetworkSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            <div class=\"global-search-private-data\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("searcher.isNetworkSearch:global-search-private-data-global")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                <div id=\"searchAccordion\" class=\"panel-group\" role=\"tablist\" aria-multiselectable=\"true\">\r\n                                    <div class=\"panel\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("hasPrivateMessages:show:hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                        <div id=\"search-headingOne\" class=\"panel-heading\" role=\"tab\" data-toggle=\"collapse\" data-parent=\"#searchAccordion\"\r\n                                             data-target=\"#search-collapseOne\" aria-expanded=\"true\" aria-controls=\"search-collapseOne\">\r\n                                            <div class=\"pull-left\">Messages</div>\r\n                                            <span class=\"count pull-right\">");
  stack1 = helpers._triageMustache.call(depth0, "privateMessages.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                                        </div>\r\n                                        <div id=\"search-collapseOne\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\r\n                                            <div class=\"panel-body\">\r\n                                                <ul class=\"videos-list cleafix nolist\">\r\n                                                    ");
  stack1 = helpers.each.call(depth0, "privateMessages", {hash:{
    'itemController': ("SocialMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(34, program34, data),fn:self.program(32, program32, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                </ul>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"panel\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("hasPrivateFeeds:show:hidden")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                                        <div id=\"search-headingTwo\" class=\"panel-heading collapsed\" role=\"tab\" data-toggle=\"collapse\" data-parent=\"#searchAccordion\"\r\n                                             data-target=\"#search-collapseTwo\" aria-expanded=\"false\" aria-controls=\"search-collapseTwo\">\r\n                                            <div class=\"pull-left\">");
  stack1 = helpers['if'].call(depth0, "isPrivateActivity", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(41, program41, data),fn:self.program(39, program39, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n                                            <span class=\"count pull-right\">");
  stack1 = helpers._triageMustache.call(depth0, "privateFeeds.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                                        </div>\r\n                                        <div id=\"search-collapseTwo\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo\">\r\n                                            <div class=\"panel-body\">\r\n                                                <ul class=\"videos-list cleafix nolist\">\r\n                                                    ");
  stack1 = helpers['if'].call(depth0, "isPrivateActivity", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(51, program51, data),fn:self.program(43, program43, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                </ul>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                ");
  return buffer;
  }
function program29(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                <div class=\"global-search-private-tabs\">\r\n                                    <div class=\"btn-group\" data-toggle=\"buttons\">\r\n                                        ");
  stack1 = helpers.each.call(depth0, "privateNetworks", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </div>\r\n                                </div>\r\n                            ");
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            <label class=\"btn btn-primary search_network ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "active", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                                                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.RadioButton", {hash:{
    'name': ("privatesearch"),
    'selectionBinding': ("controller.privateNetworkSelected"),
    'value': ("id")
  },hashTypes:{'name': "STRING",'selectionBinding': "STRING",'value': "ID"},hashContexts:{'name': depth0,'selectionBinding': depth0,'value': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                                <img src=\"assets/images/headericons/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(".png\"\r\n                                                     class=\"search_result_network_img\"/>\r\n                                                <span class=\"search_result_count\">");
  stack1 = helpers._triageMustache.call(depth0, "length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                                            </label>\r\n                                        ");
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/message", options) : helperMissing.call(depth0, "partial", "social/message", options))));
  data.buffer.push("\r\n                                                    ");
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                        ");
  stack1 = helpers['if'].call(depth0, "model.indexedLoading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                    ");
  return buffer;
  }
function program35(depth0,data) {
  
  
  data.buffer.push("\r\n                                                            <li class=\"search_more\">\r\n                                                                <img src=\"assets/images/upload_progress.gif\">\r\n                                                            </li>\r\n                                                        ");
  }

function program37(depth0,data) {
  
  
  data.buffer.push("\r\n                                                            <li class=\"mayTakeMessage\">No Message match the search criteria</li>\r\n                                                        ");
  }

function program39(depth0,data) {
  
  
  data.buffer.push("NEWS FEED");
  }

function program41(depth0,data) {
  
  
  data.buffer.push("VIDEOS");
  }

function program43(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                        ");
  stack1 = helpers.each.call(depth0, "privateFeeds", {hash:{
    'itemController': ("SocialActivity")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(46, program46, data),fn:self.program(44, program44, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                    ");
  return buffer;
  }
function program44(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activity", options) : helperMissing.call(depth0, "partial", "social/activity", options))));
  data.buffer.push("\r\n                                                        ");
  return buffer;
  }

function program46(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                            ");
  stack1 = helpers['if'].call(depth0, "model.indexedLoading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(49, program49, data),fn:self.program(47, program47, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                        ");
  return buffer;
  }
function program47(depth0,data) {
  
  
  data.buffer.push("\r\n                                                                <li class=\"search_more\">\r\n                                                                    <img src=\"assets/images/upload_progress.gif\">\r\n                                                                </li>\r\n                                                            ");
  }

function program49(depth0,data) {
  
  
  data.buffer.push("\r\n                                                                <li class=\"mayTakeMessage\">No Feed match the search\r\n                                                                    criteria\r\n                                                                </li>\r\n                                                            ");
  }

function program51(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                        ");
  stack1 = helpers.each.call(depth0, "privateFeeds", {hash:{
    'itemController': ("SocialVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(54, program54, data),fn:self.program(52, program52, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                    ");
  return buffer;
  }
function program52(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/video", options) : helperMissing.call(depth0, "partial", "social/video", options))));
  data.buffer.push("\r\n                                                        ");
  return buffer;
  }

function program54(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                            ");
  stack1 = helpers['if'].call(depth0, "model.indexedLoading", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(55, program55, data),fn:self.program(47, program47, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                        ");
  return buffer;
  }
function program55(depth0,data) {
  
  
  data.buffer.push("\r\n                                                                <li class=\"mayTakeMessage\">No Video match the search\r\n                                                                    criteria\r\n                                                                </li>\r\n                                                            ");
  }

function program57(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activitydetails", options) : helperMissing.call(depth0, "partial", "social/activitydetails", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program59(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/messagedetails", options) : helperMissing.call(depth0, "partial", "social/messagedetails", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program61(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/videodetails", options) : helperMissing.call(depth0, "partial", "social/videodetails", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program63(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/gplacedetails", options) : helperMissing.call(depth0, "partial", "social/gplacedetails", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"global-search\">\r\n    <div class=\"global-search-container\">\r\n        <div class=\"global-search-content\">\r\n            <div class=\"global-search-header\">\r\n                <span class=\"global-search-title\">SEARCH RESULT FOR \"");
  stack1 = helpers._triageMustache.call(depth0, "searcher.query", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\"</span>\r\n                <span id=\"large_popup_close\" class=\"pull-right global-search-close\"><img src=\"assets/images/exit.png\"/></span>\r\n            </div>\r\n            <div class=\"global-search-columns\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "hasPublic", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  stack1 = helpers['if'].call(depth0, "hasPrivate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div id=\"searchDetailsModal\" class=\"modal fade searchDetailsModal\" tabindex=\"-1\" role=\"dialog\"\r\n     aria-labelledby=\"searchDetailsModalLabel\" aria-hidden=\"true\"><!--style=\"width: 50%;margin-left: 25%\"-->\r\n    <div class=\"searchDetailsDialog modal-dialog\">\r\n        <div class=\"searchDetailsContent modal-content\">\r\n            <div class=\"search_result_query\">\r\n                <span>Search result</span>\r\n                <span class=\"search_popup_close\" id=\"small_popup_close\"><img src=\"assets/images/exit.png\"/></span>\r\n            </div>\r\n            <div id=\"searchDetailsContent\" style=\"float: left;width: 100%;max-height: calc(100% - 50px);overflow: auto\">\r\n                <ul class=\"videos-list cleafix nolist search_result\" style=\"width: 100% !important;\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "activityDetails", {hash:{
    'itemController': ("SocialActivity")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(57, program57, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "messageDetails", {hash:{
    'itemController': ("SocialMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(59, program59, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "videoDetails", {hash:{
    'itemController': ("SocialVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(61, program61, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "placeDetails", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(63, program63, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["gmail"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span>new</span>\r\n                ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <span>\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "gmailMsgs.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </span>\r\n                ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.MessageView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display: block\">\r\n                                This may take a few minutes while we synchronize your Emails\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <li class=\"search_element_wrapper_details\">\r\n                    <div class=\"search_element\">\r\n                        <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                            <span class=\"inner-wrapper\">\r\n                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"search_video_title google_mail_header\" href=\"javascript:void(0)\"\r\n                             style=\"height:23px !important\">\r\n                            <span class=\"sender_name\"\r\n                                  title=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n                            ");
  stack1 = helpers.unless.call(depth0, "searchResult", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\"\r\n                             style=\"min-height:inherit !important\">\r\n                            <span class=\"message_subject\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "subject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n                            <span class=\"message_date\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details gmail_message_details_html google_mail_body\"\r\n                             href=\"javascript:void(0)\" style=\"margin-left:10px\">\r\n                            <!--min-height:inherit !important;color:white;float:left;padding-top:5px-->\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n            ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <span class=\"sender_mail\" title=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">[");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                    ]</span>\r\n                                <span style=\"display: none\" class=\"message_reply\"\r\n                                      onclick=\"$('#gmail_replay_parent').fadeIn(0);setTimeout(function(){$('#gmailContent').mCustomScrollbar('scrollTo','bottom')},100)\">Reply</span>\r\n                            ");
  return buffer;
  }

  data.buffer.push("<button style=\"display:none\" id=\"updateGMailMessages\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateGMailMessages", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >u</button>\r\n<div class=\"search_wrapper\" id=\"gmaildata\">\r\n    <div id=\"gmailMessageData\" style=\"float: left;\" class=\"search_wrapper_root\">\r\n        <div class=\"swipe search_data\">\r\n            <div class=\"social_accordion_header search_category_numeric\" accordion-callback=\"setGmailSelected\"\r\n                 onclick=\"\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.messages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>Emails</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n\r\n                <ul id=\"gmail_msg_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 500px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "gmailMsgs", {hash:{
    'itemController': ("FacebookMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"searchContent\" id=\"gmailContent\">\r\n        <ul id=\"gmail_msg_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n            ");
  stack1 = helpers.each.call(depth0, "gmailMsgsDetails", {hash:{
    'itemController': ("FacebookMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            <li class=\"search_element_wrapper_details\" id=\"gmail_replay_parent\"\r\n                style=\"display:none;padding-bottom:10px;\">\r\n\r\n                <div class=\"replay_container\">\r\n                    <textarea class=\"replay_area\" contact-id=\"\" message-id=\"\" id=\"gmail_replay_message\"></textarea>\r\n                </div>\r\n                <div class=\"send_buttons\">\r\n                    <span class=\"message_send\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "replayGmail", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">Send</span>\r\n                    <span class=\"message_send\"\r\n                          onclick=\"$('#gmail_replay_parent').fadeOut(0);$('#gmail_replay_message').val('')\"\r\n                          style=\"float: right;\">Cancel</span>\r\n                </div>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["google"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <li class=\"search_element_wrapper\">\r\n                            <div class=\"poster-wrapper search_element message_item\"\r\n                                 onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "Message", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","STRING","ID"],data:data})));
  data.buffer.push(">\r\n                                <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                                    <span class=\"inner-wrapper\">\r\n                                                        <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googleMsg.sender.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                                    </span>\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_name\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googleMsg.sender.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_subject\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googleMsg.subject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_date\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "googleMsg.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"fb_post_img\" href=\"javascript:void(0)\">\r\n                                </a>\r\n                            </div>\r\n                        </li>\r\n                    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <li class=\"search_element_wrapper\">\r\n                            <div class=\"poster-wrapper search_element\" style=\"height:auto !important\"\r\n                                 onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "Activity", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","STRING","ID"],data:data})));
  data.buffer.push(" >\r\n                                <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                            <span class=\"inner-wrapper\">\r\n                                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePost.postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                            </span>\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_name\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePost.postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_subject\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePost.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_subject fb_post_body_summary google_post_html\"\r\n                                   href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePost.body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a style=\"margin-left:70px\" class=\"search_video_title search_fb_date\"\r\n                                   href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "googlePost.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"fb_post_img\" href=\"javascript:void(0)\">\r\n                                    <div>\r\n                                        <img class=\"fb_post_thumb_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePost.img", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                    </div>\r\n                                </a>\r\n                            </div>\r\n                        </li>\r\n                    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <li class=\"search_element_wrapper_details\">\r\n                    <div class=\"search_element\">\r\n                        <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                                    <span class=\"inner-wrapper\">\r\n                                                        <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googleMsgsDetail.sender.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                                    </span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\">\r\n                            <span class=\"sender_name\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googleMsgsDetail.sender.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n                            <span class=\"sender_mail\">[");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googleMsgsDetail.sender.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("]</span>\r\n                            <span class=\"message_date\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "googleMsgsDetail.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\"\r\n                             style=\"min-height:inherit !important\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googleMsgsDetail.subject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details google_message_details_html google_mail_body\"\r\n                             href=\"javascript:void(0)\" style=\"margin-left:10px\">\r\n                            <!--min-height:inherit !important;color:white;float:left;padding-top:5px-->\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googleMsgsDetail.body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n            ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <li class=\"search_element_wrapper_details\">\r\n                    <div class=\"search_element\" style=\"height:auto !important\">\r\n                        <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                                    <span class=\"inner-wrapper\">\r\n                                                        <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePostsDetail.postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"\r\n                                                             alt=\"\"/>\r\n                                                    </span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePostsDetail.postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\"\r\n                             style=\"min-height:inherit !important\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePostsDetail.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details google_post_details_html fb_post_body\"\r\n                             href=\"javascript:void(0)\" style=\"\">\r\n                            <!--min-height:inherit !important;color:white;float:left;padding-top:5px-->\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePostsDetail.body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"fb_post_img_container\">\r\n                            <img class=\"fb_post_details_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "googlePostsDetail.img", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                        </div>\r\n                        <div class=\"fb_post_like\">\r\n                            <a href=\"javascript:void(0)\">Like</a>\r\n                            <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "googlePostsDetail.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                        </div>\r\n                        <div class=\"send_comment_box_parent chat_window\">\r\n                            <input type=\"text\" placeholder=\"Write a comment..\"\r\n                                   class=\"send_message_box send_message_input\">\r\n                            <button class=\"send_message_button\">Comment</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                </li>\r\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"loginwrapper\" style=\"display:none\" id=\"googleLogin\">\r\n    <div class=\"loginContainer\">\r\n        <div class=\"loginform\" align='center'>\r\n            <div class=\"logindiv\" style=\"background-color:transparent !important;border-width:0px\">\r\n                <div id=\"googleResult\"></div>\r\n                <button class=\"googlelogin\" style=\"margin-top:0px\" id=\"authorize-button\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "LoginToGoogle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >\r\n                    Login to Google\r\n                </button>\r\n                <!--onclick=\"handleAuthClick2()\"-->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<button style=\"display:none\" id=\"updateGooglePlusMessages\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateGooglePlusMessages", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >u</button>\r\n<button style=\"display:none\" id=\"updateGooglePlusPosts\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "updateGooglePlusPosts", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >u</button>\r\n\r\n<div class=\"search_wrapper\" style=\"display:none\" id=\"googledata\">\r\n    <div id=\"googleMessageNews\" style=\"float: left;\" class=\"search_wrapper_root\">\r\n        <div class=\"swipe search_data\">\r\n            <div class=\"send_message_box_parent\" style=\"display:none !important\">\r\n                <input type=\"text\" class=\"send_message_box\" placeholder=\"Search\"/>\r\n            </div>\r\n            <div class=\"social_accordion_header search_category_numeric\" accordion-callback=\"setGoogleSelected\"\r\n                 onclick=\"\">\r\n                        <span id=\"google_msg_count\">\r\n                            ");
  stack1 = helpers._triageMustache.call(depth0, "googleMsgs.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </span>\r\n\r\n                <div>Messages</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n\r\n                <ul id=\"google_msg_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 430px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "googleMsg", "in", "googleMsgs", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n                <div id=\"google_loading_msg\" class=\"search_no_result\">\r\n                    This may take a few minutes while we synchronize your Messages\r\n                </div>\r\n            </div>\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"setGoogleSelected\" onclick=\"\">\r\n                <!--onclick='' for safari mobile-->\r\n                <span id=\"google_post_new\">new</span>\r\n\r\n                <div>News Feed</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n                <div class=\"send_message_box_parent social_share_box\" style=\"display:none !important\">\r\n                    <input id=\"google_post_status\" type=\"text\" class=\"send_message_box post_status_input\"\r\n                           placeholder=\"What's on your mind?\"/>\r\n                    <button class=\"post_status_button\">POST</button>\r\n                </div>\r\n                <ul id=\"google_posts_results\" class=\"videos-list cleafix nolist search_result\"\r\n                    style=\"max-height: 455px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "googlePost", "in", "googlePosts", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n                <div id=\"google_loading_post\" class=\"search_no_result\">\r\n                    This may take a few minutes while we synchronize your Activities\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"searchContent\" id=\"googleContent\">\r\n        <!--<span class=\"searchName searchTime\" id=\"googleMsgName\" style=\"float:left\"></span><span class=\"searchTime\" id=\"googleMsgTime\" style=\"float:right\"></span>\r\n        <div class=\"searchTitle\" id=\"googleMsgTitle\" style=\"display:none;\"></div>\r\n        <div class=\"searchInnerContent\" style=\"display:none;float:left;width:100%\" id=\"googleMsgContent\"></div>\r\n        <div class=\"searchInnerContent\" style=\"display:none;float:left;width:100%\" id=\"googlePostContent\"></div>-->\r\n        <ul id=\"google_msg_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n            ");
  stack1 = helpers.each.call(depth0, "googleMsgsDetail", "in", "googleMsgsDetails", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n\r\n        <ul id=\"google_post_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n            <!--style=\"max-height: 100%; overflow: auto;\"-->\r\n            ");
  stack1 = helpers.each.call(depth0, "googlePostsDetail", "in", "googlePostsDetails", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            <li ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "message", "", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","ID","ID"],data:data})));
  data.buffer.push(" element-id=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriend.contactId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" class=\"pointer\">\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-xs-3 col-md-3 placeName ellipsis\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriendName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</div>\r\n                                    <div class=\"col-xs-3 col-md-3 ellipsis\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastMessage.subject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</div>\r\n                                    <div class=\"col-xs-4 col-md-4 ellipsis gmail_message_text_body\" style=\"color:#149ee2\">\r\n                                       ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "stripBody", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                    </div>\r\n                                    <div class=\"col-xs-2 col-md-2 date\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "shortDate", "lastMessage.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</div>\r\n                                </div>\r\n                            </li>\r\n                        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            <li style=\"height: auto\">\r\n                                <div class=\"row statusMessage\">\r\n                                    <div class=\"col-xs-12 col-md-12\">\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "gmailLoginStatus", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </div>\r\n                                </div>\r\n                            </li>\r\n                        ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            ");
  stack1 = helpers._triageMustache.call(depth0, "gmailMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\r\n                                            Please login to <a href=\"#/gmail\">Gmail</a> so we can get your emails\r\n                                        ");
  }

function program8(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activitydetails", options) : helperMissing.call(depth0, "partial", "social/activitydetails", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/messagedetails", options) : helperMissing.call(depth0, "partial", "social/messagedetails", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/videodetails", options) : helperMissing.call(depth0, "partial", "social/videodetails", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/hplacedetails", options) : helperMissing.call(depth0, "partial", "social/hplacedetails", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"homePage\">\r\n    <div class=\"homePageContent\">\r\n        <div class=\"firstRow\">\r\n            <div class=\"gmailHome\">\r\n                <div class=\"accordion_header\" style=\"position:relative\">\r\n                    <img alt=\"\" src=\"assets/images/headericons/gmail.png\" width=\"28\" height=\"28\" class=\"pull-left\">\r\n                    <div class=\"pull-left\"> Mail</div>\r\n                    <span class=\"count pull-right\">");
  stack1 = helpers._triageMustache.call(depth0, "gmailMessagesCount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                </div>\r\n                <div id=\"gmailHome\" class=\"accordion_content panel-collapse collapse in\">\r\n                    <ul class=\"cleafix nolist\" id=\"gmailList\">\r\n                        ");
  stack1 = helpers.each.call(depth0, "gmailMessages", {hash:{
    'itemController': ("SocialMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"secondRow\">\r\n            <div class=\"row homeBottom\">\r\n                <div class=\"col-xs-12 col-md-12 globalFeed\">\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "global-feed", options) : helperMissing.call(depth0, "render", "global-feed", options))));
  data.buffer.push("\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id=\"homeDetailsModal\" class=\"modal fade searchDetailsModal homeDetailsModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"homeDetailsModalLabel\" aria-hidden=\"true\"><!--style=\"width: 50%;margin-left: 25%\"-->\r\n    <div class=\"searchDetailsDialog modal-dialog\" >\r\n        <div class=\"searchDetailsContent homeDetailsContent modal-content\" >\r\n            <div class=\"search_result_query\">\r\n                <!--<span>Search result</span>-->\r\n                <span class=\"search_popup_close\" id=\"home_small_popup_close\"><img src=\"assets/images/exit.png\" /></span>\r\n            </div>\r\n            <div id=\"homeDetailsContent\" style=\"float: left;width: 100%;max-height: calc(100% - 50px);overflow: auto\">\r\n                <ul class=\"videos-list cleafix nolist search_result\" style=\"width: 100% !important;\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "activityDetails", {hash:{
    'itemController': ("SocialActivity")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "messageDetails", {hash:{
    'itemController': ("SocialMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "videoDetails", {hash:{
    'itemController': ("SocialVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  stack1 = helpers.each.call(depth0, "placeDetails", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["jezebel"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" style=\"display:block!important;\" src=\"http://jezebel.com/\" frameborder=\"1\"\r\n        allowtransparency=\"false\"></iframe>\r\n");
  
});

Ember.TEMPLATES["kotaku"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://kotaku.com/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["last_fm"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!--<iframe class=\"mainFrame\" src=\"http://www.last.fm/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>-->\r\n<div class=\"wrapper\">\r\n    <div align='center' class=\"hello\">\r\n        Last FM is not supported in current version\r\n    </div>\r\n</div>\r\n\r\n");
  
});

Ember.TEMPLATES["linkedin"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span>new</span>\r\n                ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <li class=\"search_element_wrapper\" >\r\n                            <div class=\"poster-wrapper search_element\" style=\"height:auto !important\" onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "Activity", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","STRING","ID"],data:data})));
  data.buffer.push(">\r\n                                <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                            <span class=\"inner-wrapper\">\r\n                                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                            </span>\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_name\"  href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_subject\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_subject fb_post_body_summary linkedin_post_html\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "caption", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postLink", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a style=\"margin-left:70px\" class=\"search_video_title search_fb_date\" href=\"javascript:void(0)\">\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "searchResult", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n\r\n                                <a class=\"fb_post_img\" href=\"javascript:void(0)\">\r\n                                    <div>\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "isMedia", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </div>\r\n                                </a>\r\n                            </div>\r\n                        </li>\r\n                    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "externalSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                            <img src=\"assets/images/live_search.png\" class=\"search_type_icon\">\r\n                                        ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            ");
  stack1 = helpers.unless.call(depth0, "privateSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                                                <img src=\"assets/images/bookmark_search.png\" class=\"search_type_icon\">\r\n                                            ");
  }

function program10(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                            <img class=\"fb_post_thumb_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                        ");
  return buffer;
  }

function program12(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display:block\">\r\n                                This may take a few minutes while we synchronize your Posts\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <li class=\"search_element_wrapper_details\" >\r\n                    <div class=\"search_element\" style=\"height:auto !important\">\r\n                        <div class=\"search_fb_url\"  href=\"javascript:void(0)\">\r\n                                                    <span class=\"inner-wrapper\">\r\n                                                        <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                                    </span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\" style=\"min-height:inherit !important\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details fb_post_body linkedin_post_details_html\"  href=\"javascript:void(0)\" style=\"\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "caption", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postLink", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"fb_post_img_container\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "isPhoto", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = helpers['if'].call(depth0, "isVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"fb_post_like\">\r\n                            <a style=\"display:none !important\" class=\"likepost\" href=\"javascript:void(0)\">Like</a>\r\n                            <a style=\"display:none !important;margin-top:1px\" href=\"javascript:void(0)\">Comment</a>\r\n                            <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n            ");
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <img class=\"fb_post_details_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "isSecureIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    <iframe width=\"100%\" height=\"250px\" frameborder=\"0\" allowfullscreen src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></iframe>\r\n                                ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "isIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                        <a href=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" target=\"_blank\" class=\"fb_video_player\">\r\n                                            <img style=\"margin-top:50px !important;margin-bottom:50px !important;cursor:pointer;\" class=\"fb_post_details_img\" src=\"assets/images/playvideo.png\" alt=\"\"/>\r\n                                        </a>\r\n                                    ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                        <video width=\"100%\" height=\"250\" controls>\r\n                                            <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"video/mp4\">\r\n                                            <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"video/ogg\">\r\n                                            Your browser does not support video\r\n                                        </video>\r\n                                    ");
  return buffer;
  }

  data.buffer.push("\r\n<div class=\"loginwrapper\" style=\"display:none\" id=\"linkedinbtn\">\r\n    <div class=\"loginContainer\">\r\n        <div class=\"loginform\" align='center'>\r\n            <div class=\"logindiv\" style=\"background-color:transparent !important;border-width:0px\">\r\n                <div id=\"linkedinResult\"></div>\r\n                <button class=\"linked_in_login\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "LinkedInLogin", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >Login to LinkedIn</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"search_wrapper\" style=\"display:none\" id=\"linkedindata\">\r\n    <div id=\"linkedData\" style=\"float: left;\" class=\"search_wrapper_root\">\r\n        <div  class=\"swipe search_data\">\r\n\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"setLinkedInSelected\" onclick=\"\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>Posts</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n\r\n                    <div class=\"send_message_box_parent social_share_box\">\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("linkedin_status"),
    'class': ("send_message_box post_status_input"),
    'placeholder': ("What's on your mind?"),
    'type': ("text"),
    'value': ("linkedinStatus")
  },hashTypes:{'id': "STRING",'class': "STRING",'placeholder': "STRING",'type': "STRING",'value': "ID"},hashContexts:{'id': depth0,'class': depth0,'placeholder': depth0,'type': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n\r\n                        <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "postStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("  style=\"margin-bottom:10px\" class=\"post_status_button\">Post</button>\r\n                    </div>\r\n\r\n                <ul id=\"linkedin_post_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 430px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "linkedInPosts", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(12, program12, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"searchContent\" id=\"linkedContent\">\r\n        <ul id=\"linkedin_post_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n            ");
  stack1 = helpers.each.call(depth0, "linkedinPostsDetails", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["livingsocial"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<!--<iframe class=\"mainFrame\"  src=\"https://www.livingsocial.com/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>-->\r\n<div class=\"wrapper\">\r\n    <div align='center' class=\"hello\">\r\n        Living Social is not supported in current version\r\n    </div>\r\n</div>\r\n");
  
});

Ember.TEMPLATES["login"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(" New? Create Account");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("Forgot Password?");
  }

  data.buffer.push("<!--<div class=\"wrapper\">-->\r\n<div class=\"loginwrapper\">\r\n    <div class=\"loginContainer\">\r\n        <div class=\"loginform\" align='center'>\r\n            <h4 style=\"text-transform:uppercase;margin-bottom:20px;font-weight:normal\">Please sign in to <span\r\n                    class=\"sprocket_label\">SPROCKET</span> social account</h4>\r\n\r\n            <div class=\"logindiv\">\r\n                <a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "LoginDifferent", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Not you? Sign in with a different account</a>\r\n                <br>\r\n\r\n                <div id=\"loginResult\"></div>\r\n                <div>\r\n                    <form id=\"rememberLoginForm\" target=\"rememberIFrame\" method=\"post\" action=\"customauth/empty.html\">\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("user_name"),
    'placeholder': ("User name"),
    'type': ("text"),
    'value': ("username")
  },hashTypes:{'id': "STRING",'placeholder': "STRING",'type': "STRING",'value': "ID"},hashContexts:{'id': depth0,'placeholder': depth0,'type': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                        <br>\r\n\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("user_pass"),
    'placeholder': ("Password"),
    'type': ("password"),
    'value': ("password")
  },hashTypes:{'id': "STRING",'placeholder': "STRING",'type': "STRING",'value': "ID"},hashContexts:{'id': depth0,'placeholder': depth0,'type': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                    </form>\r\n                </div>\r\n\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "Login", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >Sign In</button>\r\n                <div style=\"margin: 15px;\"></div>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "register", options) : helperMissing.call(depth0, "link-to", "register", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div style=\"margin: 15px;\"></div>\r\n                ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "forgetpassword", options) : helperMissing.call(depth0, "link-to", "forgetpassword", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["logout"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"wrapper\">\r\n</div>\r\n");
  
});

Ember.TEMPLATES["message"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<li class=\"search_element_wrapper\" >\r\n    <div class=\"poster-wrapper search_element message_item\" onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "", "lastFriend.contactId", "view._parentView.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","ID","ID","ID"],data:data})));
  data.buffer.push(">\r\n        <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n            <span class=\"inner-wrapper\">\r\n                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriend.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n            </span>\r\n        </a>\r\n        <a class=\"search_video_title search_fb_name\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriendName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_fb_subject gmail_message_html ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastMessageStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getLastElementAttr", "allMessages", "subject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["ID","ID","STRING"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_fb_date\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getLastElementAttr", "allMessages", "date", "getPostDateString", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","STRING","STRING"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"fb_post_img\" href=\"javascript:void(0)\">\r\n        </a>\r\n    </div>\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["netflix"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"wrapper\">\r\n    <div align='center' class=\"hello\">\r\n        Netflix is not supported in current version\r\n    </div>\r\n</div>\r\n");
  
});

Ember.TEMPLATES["reddit"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <span class=\"count pull-right\">new</span>\r\n                                    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                                ");
  stack1 = helpers.each.call(depth0, "subreddits", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                                                                    <!-- don't format the following line as we don't want to add spaces before interest name due to conditions inside controller-->\r\n                                                                    ");
  stack1 = (helper = helpers['ic-autocomplete-option'] || (depth0 && depth0['ic-autocomplete-option']),options={hash:{
    'value': ("id"),
    'label': ("name"),
    'title': ("name")
  },hashTypes:{'value': "ID",'label': "ID",'title': "ID"},hashContexts:{'value': depth0,'label': depth0,'title': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ic-autocomplete-option", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                    <!-- don't format the previous line as we don't want to add spaces before interest name due to conditions inside controller-->\r\n                                                                ");
  return buffer;
  }
function program5(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                                                                    <ic-autocomplete-option>No results</ic-autocomplete-option>\r\n                                                                ");
  }

function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                            <div class=\"captcha\">\r\n                                                                <div class=\"image\">\r\n                                                                    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("captchaImage")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'alt': ("captchaAlt")
  },hashTypes:{'alt': "ID"},hashContexts:{'alt': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("/>\r\n                                                                </div>\r\n                                                                <div class=\"refresh reddit\">\r\n                                                                    <img src=\"assets/images/refresh.png\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getCaptcha", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("/>\r\n                                                                </div>\r\n                                                                ");
  stack1 = helpers['if'].call(depth0, "captchaId", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                            </div>\r\n                                                        ");
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("captchaReply"),
    'placeholder': ("Type the code shown"),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activity", options) : helperMissing.call(depth0, "partial", "social/activity", options))));
  data.buffer.push("\r\n                                        ");
  return buffer;
  }

function program14(depth0,data) {
  
  
  data.buffer.push("\r\n                                            <div class=\"mayTakeMessage\">\r\n                                                This may take a few minutes while we synchronize your Feed\r\n                                            </div>\r\n                                        ");
  }

function program16(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            ");
  stack1 = helpers['with'].call(depth0, "selectedActivity", {hash:{
    'controller': ("SocialActivity")
  },hashTypes:{'controller': "STRING"},hashContexts:{'controller': depth0},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activitydetails", options) : helperMissing.call(depth0, "partial", "social/activitydetails", options))));
  data.buffer.push("\r\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"mainContainer\">\r\n    <div class=\"mainContent\">\r\n        <div class=\"twoColumnContainer reddit\">\r\n            <div class=\"twoColumnContent\">\r\n                <div class=\"columnOne\">\r\n                    <div class=\"columnOneContent\">\r\n                        <div class=\"accordionContainer\">\r\n                            <div class=\"accordionContent\">\r\n                                <div class=\"accordion_header\">\r\n                                    <div class=\"pull-left\">NEWS FEED</div>\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                </div>\r\n                                <div id=\"activities\" class=\"accordion_content panel-collapse collapse in\">\r\n                                    <div class=\"postBoxContainer\">\r\n                                        <div class=\"postBoxContent\">\r\n                                            <div class=\"tabContainer\" role=\"tabpanel\">\r\n                                                <div class=\"tabContent\">\r\n                                                    <!-- Nav tabs -->\r\n                                                    <ul class=\"nav nav-tabs postTabs reddit\" role=\"tablist\">\r\n                                                        <li role=\"presentation\" class=\"active link\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setSelectedType", "link", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(">\r\n                                                            <a href=\"#link\" aria-controls=\"link\" role=\"tab\" data-toggle=\"tab\">\r\n                                                                &nbsp;\r\n                                                            </a>\r\n                                                        </li>\r\n                                                        <li role=\"presentation\" class=\"text\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "setSelectedType", "text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(">\r\n                                                            <a href=\"#text\" aria-controls=\"text\" role=\"tab\" data-toggle=\"tab\">\r\n                                                                &nbsp;\r\n                                                            </a>\r\n                                                        </li>\r\n                                                    </ul>\r\n                                                    <!-- Tab panes -->\r\n                                                    <div class=\"tab-content postTabsContent\">\r\n                                                        <div role=\"tabpanel\" class=\"tab-pane active\" id=\"link\">\r\n                                                            <div class=\"postTabForm\">\r\n                                                                <div class=\"postTabContent\">\r\n                                                                    <div class=\"\">\r\n                                                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("linkTitle"),
    'placeholder': ("Title"),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                    </div>\r\n                                                                    <div class=\"\">\r\n                                                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("linkUrl"),
    'placeholder': ("URL"),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div role=\"tabpanel\" class=\"tab-pane\" id=\"text\">\r\n                                                            <div class=\"postTabForm\">\r\n                                                                <div class=\"postTabContent\">\r\n                                                                    <div class=\"\">\r\n                                                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("textTitle"),
    'placeholder': ("Title"),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                    </div>\r\n                                                                    <div class=\"\">\r\n                                                                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("textComment"),
    'placeholder': ("Text"),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                        <div class=\"subreddits\">\r\n                                                            <!--<input type=\"text\" class=\"spInput\" placeholder=\"Choose a subreddit\"/>-->\r\n                                                            ");
  stack1 = (helper = helpers['ic-autocomplete'] || (depth0 && depth0['ic-autocomplete']),options={hash:{
    'value': ("selectedSubreddits"),
    'on-input': ("onFilterSubreddits"),
    'on-select': ("onSelectSubreddits"),
    'placeholder': ("Choose a subreddit")
  },hashTypes:{'value': "ID",'on-input': "STRING",'on-select': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'on-input': depth0,'on-select': depth0,'placeholder': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ic-autocomplete", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                        </div>\r\n                                                        ");
  stack1 = helpers['if'].call(depth0, "captchaRequired", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                        <div class=\"postTabButtons\">\r\n                                                            <div class=\"pull-right\">\r\n                                                                <button class=\" btn btn-dark\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelPost", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                                                                    CANCEL\r\n                                                                </button>\r\n                                                            </div>\r\n                                                            <div>\r\n                                                                <button class=\" btn btn-success\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sharePost", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                                                                    SHARE\r\n                                                                </button>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                    <ul id=\"social_posts_results\" class=\"cleafix nolist placeList\">\r\n                                        ");
  stack1 = helpers.each.call(depth0, "activities", {hash:{
    'itemController': ("SocialActivity")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"columnTwo\">\r\n                    <div class=\"columnTwoContent nolist\">\r\n                        ");
  stack1 = helpers['if'].call(depth0, "selectedActivity", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["register"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<!--<div class=\"wrapper\">-->\r\n<div class=\"loginwrapper\">\r\n    <div class=\"loginContainer\">\r\n        <div class=\"loginform\" align='center'>\r\n            <h4 style=\"text-transform:uppercase;margin-bottom:20px;font-weight:normal\">Create Your <span\r\n                    class=\"sprocket_label\">SPROCKET</span> social account</h4>\r\n\r\n            <div class=\"logindiv\">\r\n                <div id=\"registerResult\"></div>\r\n                <div>\r\n                    <form id=\"rememberSignUpForm\" target=\"rememberIFrame\" method=\"post\" action=\"customauth/empty.html\">\r\n                        <!--");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'placeholder': ("First name"),
    'class': ("small_inp first"),
    'value': ("firstName")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'class': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'class': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'placeholder': ("Last name"),
    'class': ("small_inp"),
    'value': ("lastName")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'class': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'class': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                            <br>-->\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'placeholder': ("Email"),
    'value': ("email")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                        <br>\r\n                            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'placeholder': ("User name"),
    'value': ("username")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("<!--add user name after login so browser save login it with pass instead mail-->\r\n                        <br>\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("password"),
    'placeholder': ("Password"),
    'value': ("password")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                        <br>\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("password"),
    'placeholder': ("Confirm Password"),
    'value': ("confirmPassword")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                    </form>\r\n                </div>\r\n\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "Register", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >Register</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["reset"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"loginwrapper\">\r\n    <div class=\"loginContainer\">\r\n        <div class=\"loginform\" align='center'>\r\n            <h4 style=\"text-transform:uppercase;margin-bottom:20px;font-weight:normal\">Please reset Your <span class=\"sprocket_label\">Sprocket</span> password</h4>\r\n            <div class=\"logindiv\">\r\n                <div id=\"registerResult\"></div>\r\n                <div>\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("password"),
    'placeholder': ("Enter New Password"),
    'value': ("password")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                    <br>\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("password"),
    'placeholder': ("Confirm New Password"),
    'value': ("confirmPassword")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                </div>\r\n\r\n                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "ResetPassword", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" >RESET PASSWORD</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["sample/accordion"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\r\n    <div class=\"panel\">\r\n        <div id=\"headingOne\" class=\"panel-heading\" role=\"tab\" data-toggle=\"collapse\" data-parent=\"#accordion\"\r\n             data-target=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\r\n            <div class=\"pull-left\">Messages</div>\r\n            <span class=\"count pull-right\">new</span>\r\n        </div>\r\n        <div id=\"collapseOne\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\r\n            <div class=\"panel-body\">\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"panel\">\r\n        <div id=\"headingTwo\" class=\"panel-heading collapsed\" role=\"tab\" data-toggle=\"collapse\" data-parent=\"#accordion\"\r\n             data-target=\"#collapseTwo\" aria-expanded=\"false\" aria-controls=\"collapseTwo\">\r\n            <div class=\"pull-left\">NEWS FEED</div>\r\n            <span class=\"count pull-right\">new</span>\r\n        </div>\r\n        <div id=\"collapseTwo\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo\">\r\n            <div class=\"panel-body\">\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  
});

Ember.TEMPLATES["search"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <li class=\"search_element_wrapper\">\r\n                        <div class=\"poster-wrapper search_element\">\r\n                            <!--https://www.youtube.com/embed/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.itemKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("-->\r\n                            <a class=\"search_video_url\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchvideo.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                        <span class=\"inner-wrapper\">\r\n                                            <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.thumb.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                        </span>\r\n                            </a>\r\n                            <a class=\"search_video_title\"\r\n                               title=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchvideo.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            </a>\r\n                            <a class=\"search_video_title search_video_desc\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchvideo.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            </a>\r\n                            <a class=\"video_link_container\">\r\n                                <span class=\"video-rating-container video-rating-");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.rank", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">0 Star</span>\r\n                                <span class=\"icon youtube-colored\">youtube</span>\r\n                            </a>\r\n                            <!--<p class=\"search_video_mark\">\r\n                                <span class=\"rating-container stars-");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.rank", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">0 Star</span>\r\n                                <span class=\"icon youtube-colored\">youtube</span>\r\n                            </p>-->\r\n                        </div>\r\n                        <!--<h4 ><a href=\"https://www.youtube.com/embed/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.itemKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</a></h4>-->\r\n                        <!--<h6 style=\"text-align: left;\">\r\n                            <a style=\"font-weight: bold; font-size: 13px; line-height: 14px; direction: ltr; float: left; width: 133px; margin-left: 5px; text-align: left ! important;\" href=\"https://www.youtube.com/embed/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.itemKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchvideo.data.description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</a>\r\n                        </h6>-->\r\n                    </li>\r\n                ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <li class=\"search_element_wrapper\">\r\n                        <div class=\"poster-wrapper search_element\" style=\"height:50px !important\">\r\n                            <!--https://www.facebook.com/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBMsg.data.sender.contactId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("-->\r\n                            <a class=\"search_fb_url\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchFBMsg.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                        <span class=\"inner-wrapper\">\r\n                                            <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBMsg.data.sender.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                        </span>\r\n                            </a>\r\n                            <a class=\"search_video_title search_fb_name\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchFBMsg.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBMsg.data.sender.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            </a>\r\n                            <a class=\"search_video_title search_fb_subject\"\r\n                               title=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBMsg.data.subject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchFBMsg.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBMsg.data.subject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            </a>\r\n                        </div>\r\n                    </li>\r\n                ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <li class=\"search_element_wrapper\">\r\n                        <div class=\"poster-wrapper search_element\" style=\"height:50px !important\">\r\n                            <!--https://www.facebook.com/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBMsg.data.sender.contactId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("-->\r\n                            <a class=\"search_fb_url\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchFBPost.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                        <span class=\"inner-wrapper\">\r\n                                            <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBPost.data.postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                        </span>\r\n                            </a>\r\n                            <a class=\"search_video_title search_fb_name\"\r\n                               href=\"javascript:void(0)\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchFBPost.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBPost.data.postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            </a>\r\n                            <a class=\"search_video_title search_fb_subject\"\r\n                               title=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBPost.data.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "searchFBPost.dataType", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push("\r\n                               href=\"javascript:void(0)\">\r\n                                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "searchFBPost.data.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            </a>\r\n                        </div>\r\n                    </li>\r\n                ");
  return buffer;
  }

  data.buffer.push("<!--<div class=\"wrapper\">-->\r\n<div class=\"search_wrapper\">\r\n    <div style=\"float: left;\" class=\"search_wrapper_root\">\r\n        <div class=\"swipe search_data\">\r\n            <div class=\"search_category\">\r\n                        <span style=\"display:none\">\r\n                            <img src=\"assets/images/video.png\">\r\n                        </span>\r\n\r\n                <div>Videos</div>\r\n            </div>\r\n            <ul id=\"search_video_results\" class=\"videos-list cleafix nolist search_result\">\r\n                ");
  stack1 = helpers.each.call(depth0, "searchvideo", "in", "searchvideos", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </ul>\r\n            <div id=\"search_video_no_result\" class=\"search_no_result\">\r\n                No videos match the search criteria\r\n            </div>\r\n            <!--<div class=\"search_element search_category\" style=\"border-color: lightslategray; height: 16px ! important;\">-->\r\n            <div class=\"search_category\">\r\n                        <span style=\"display:none\">\r\n                            <img src=\"assets/images/messages.png\">\r\n                        </span>\r\n\r\n                <div>Messages</div>\r\n            </div>\r\n            <ul id=\"search_fb_msg_results\" class=\"videos-list cleafix nolist search_result\">\r\n                ");
  stack1 = helpers.each.call(depth0, "searchFBMsg", "in", "searchFBMsgs", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </ul>\r\n            <div id=\"search_fb_msg_no_result\" class=\"search_no_result\">\r\n                No messages match the search criteria\r\n            </div>\r\n            <!--<div class=\"search_element search_category\" style=\"border-color: lightslategray; height: 16px ! important;\">-->\r\n            <div class=\"search_category\">\r\n                        <span style=\"display:none\">\r\n                            <img src=\"assets/images/activity.png\">\r\n                        </span>\r\n\r\n                <div>Activities</div>\r\n            </div>\r\n            <ul id=\"search_fb_posts_results\" class=\"videos-list cleafix nolist search_result\">\r\n                ");
  stack1 = helpers.each.call(depth0, "searchFBPost", "in", "searchFBPosts", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </ul>\r\n            <div id=\"search_fb_posts_no_result\" class=\"search_no_result\">\r\n                No activities match the search criteria\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <!--<div style=\"float: left; width: 430px; position: fixed; margin-left: 275px;\" id=\"searchContent\">-->\r\n    <div id=\"searchContent\">\r\n        <!--Player-->\r\n        <!--<iframe style=\"display:none\" id=\"searchVideoPlayer\" width=\"430\" height=\"242\" src=\"\" frameborder=\"0\" allowfullscreen></iframe>-->\r\n\r\n        <span id=\"searchName\" style=\"float:left\"></span><span id=\"searchTime\" style=\"float:right\"></span>\r\n\r\n        <div id=\"searchTitle\" style=\"display:none;\"></div>\r\n\r\n        <!--<iframe class=\"searchInnerContent\" style=\"display:none\" id=\"searchVideoPlayer\" width=\"478\" height=\"269\" src=\"\" frameborder=\"0\" allowfullscreen></iframe>-->\r\n        <img class=\"searchInnerContent\" src=\"\" style=\"display:none;float:left\" width=\"478\" height=\"269\"\r\n             class=\"searchInnerContent\" id=\"searchVideoPlayerImage\"/>\r\n        <a class=\"searchInnerContent\" id=\"searchVideoLink\"\r\n           style=\"display:none;height: 40px; float: left; width: 50px; z-index: 1009; margin-left: 214px; margin-top: -150px;\">\r\n            <img src=\"youtube-play-button4.png\" width=\"50px\" height=\"40px\"/>\r\n        </a>\r\n\r\n        <div class=\"searchInnerContent\" style=\"display:none;float:left;width:100%\" id=\"searchFbMsgContent\"></div>\r\n        <div class=\"searchInnerContent\" style=\"display:none;float:left;width:100%\" id=\"searchFbPostContent\"></div>\r\n\r\n        <div id=\"searchVideoDesc\" style=\"display:none;\"></div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["searcher"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n        <div class=\"searchBtn\">\r\n            <a class=\"pointer\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onSearchClick", "query", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n                <img src=\"assets/images/search.png\">\r\n            </a>\r\n        </div>\r\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n        <div class=\"searchBtn\">\r\n            <a class=\"pointer\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onClearSearch", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n                <img src=\"assets/images/clear_search.png\" style=\"margin-top: 2px;\">\r\n            </a>\r\n        </div>\r\n    ");
  return buffer;
  }

  data.buffer.push("<div>\r\n    <div class=\"searchTxt\">\r\n        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.KeyUpTextField", {hash:{
    'valueBinding': ("query"),
    'keyUpAction': ("onSearchKeyUp"),
    'placeholder': ("Search")
  },hashTypes:{'valueBinding': "STRING",'keyUpAction': "STRING",'placeholder': "STRING"},hashContexts:{'valueBinding': depth0,'keyUpAction': depth0,'placeholder': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n    </div>\r\n    ");
  stack1 = helpers['if'].call(depth0, "showSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n<div class=\"modal fade globalSearchModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"globalSearchModalLabel\"\r\n     aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-sm search_modal\">\r\n        <div class=\"modal-content search_modal_inner\">\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.render || (depth0 && depth0.render),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "global-search", options) : helperMissing.call(depth0, "render", "global-search", options))));
  data.buffer.push("\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["shared/activity"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                ");
  stack1 = helpers['if'].call(depth0, "externalSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    <img src=\"assets/images/live_search.png\" class=\"search_type_icon\">\r\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers.unless.call(depth0, "privateSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                        <img src=\"assets/images/bookmark_search.png\" class=\"search_type_icon\">\r\n                    ");
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img class=\"fb_post_thumb_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                ");
  return buffer;
  }

  data.buffer.push("<li class=\"search_element_wrapper\" style=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "activityVisibility", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n    <!--{ {unbound view.loopId} }-->\r\n    <div class=\"poster-wrapper search_element\" style=\"height:auto !important\" onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "Activity", "view._parentView.contentIndex", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","ID","ID"],data:data})));
  data.buffer.push("><!--_view.contentIndex-->\r\n        <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                        <span class=\"inner-wrapper\">\r\n                                            <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                        </span>\r\n        </a>\r\n        <a class=\"search_video_title search_fb_name\"  href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_fb_subject\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_fb_subject fb_post_body_summary fb_post_html\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "caption", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postLink", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n\r\n        <a style=\"margin-left:70px\" class=\"search_video_title search_fb_date\" href=\"javascript:void(0)\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "searchResult", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n\r\n        <a class=\"fb_post_img\" href=\"javascript:void(0)\">\r\n            <!--<img class=\"fb_post_thumb_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postImg", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>-->\r\n            <div>\r\n                ");
  stack1 = helpers['if'].call(depth0, "isMedia", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </a>\r\n    </div>\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["shared/video"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                ");
  stack1 = helpers['if'].call(depth0, "externalSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    <img src=\"assets/images/live_search.png\" class=\"search_type_icon\">\r\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers.unless.call(depth0, "privateSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                        <img src=\"assets/images/bookmark_search.png\" class=\"search_type_icon\">\r\n                    ");
  }

  data.buffer.push("<li class=\"search_element_wrapper\" >\r\n    <div class=\"poster-wrapper search_element video_item\" onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "view._parentView.contentIndex", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push(">\r\n        <a class=\"search_video_url\"  href=\"javascript:void(0)\">\r\n                                            <span class=\"inner-wrapper\">\r\n                                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "thumb.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                            </span>\r\n        </a>\r\n        <a class=\"search_video_title\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_video_desc youtube_desc_html\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "uploadedBy", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_video_views\" href=\"javascript:void(0)\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "searchResult", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            <span class=\"views_number\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "viewNo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n        </a>\r\n        <!--<a class=\"video_link_container\">\r\n            <span class=\"video-rating-container video-rating-0\">0 Star</span>\r\n            <span class=\"icon youtube-colored\">youtube</span>\r\n        </a>-->\r\n    </div>\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["social-activity"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <img class=\"fb_post_details_img\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("photo.url")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                ");
  stack1 = helpers['if'].call(depth0, "isSecureIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <iframe class=\"sprocket_video_frame\" width=\"100%\" height=\"250px\" frameborder=\"0\" allowfullscreen\r\n                        ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("videoUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("></iframe>\r\n                ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers['if'].call(depth0, "isIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("videoUrl")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" target=\"_blank\" class=\"fb_video_player\">\r\n                            <img style=\"margin-top:50px !important;margin-bottom:50px !important;cursor:pointer;\"\r\n                                 class=\"fb_post_details_img\" src=\"assets/images/playvideo.png\" alt=\"\"/>\r\n                        </a>\r\n                    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <video class=\"sprocket_video\" width=\"100%\" height=\"250\" controls>\r\n                            <source  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("videoUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" type=\"video/mp4\">\r\n                            <source  ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("videoUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" type=\"video/ogg\">\r\n                            Your browser does not support video\r\n                        </video>\r\n                    ");
  return buffer;
  }

  data.buffer.push("<!--{ { #unless refresh } }-->\r\n<li class=\"search_element_wrapper_details xxxx\">\r\n    <div class=\"search_element\" style=\"height:auto !important\">\r\n        <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                                    <span class=\"inner-wrapper\">\r\n                                                        <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("postedBy.imageUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("alt=\"\"/>\r\n                                                    </span>\r\n        </div>\r\n        <div class=\"search_video_title search_fb_name_details search_post_details_content\" href=\"javascript:void(0)\">\r\n            ");
  stack1 = helpers._triageMustache.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"search_video_title search_fb_subject_details search_post_details_content\" href=\"javascript:void(0)\" style=\"min-height:inherit !important\">\r\n            ");
  stack1 = helpers._triageMustache.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"search_video_title search_fb_subject_details fb_post_body\" href=\"javascript:void(0)\" style=\"\">\r\n            <!--min-height:inherit !important;color:white;float:left;padding-top:5px-->\r\n            <span class=\"social_post_details_html search_post_details_content\">");
  stack1 = helpers._triageMustache.call(depth0, "caption", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            <span class=\"social_post_details_html\">");
  stack1 = helpers._triageMustache.call(depth0, "postLink", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n        </div>\r\n        <div class=\"fb_post_img_container\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "isPhoto", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n            ");
  stack1 = helpers['if'].call(depth0, "isVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"fb_post_like\">\r\n            <span>");
  data.buffer.push(escapeExpression((helper = helpers.getDateString || (depth0 && depth0.getDateString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "date", options) : helperMissing.call(depth0, "getDateString", "date", options))));
  data.buffer.push("</span>\r\n        </div>\r\n    </div>\r\n</li>\r\n<!--{ { /unless } }-->");
  return buffer;
  
});

Ember.TEMPLATES["social/activity"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"search_type_parent\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "externalSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    <img src=\"assets/images/live_search.png\" class=\"\">\r\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers.unless.call(depth0, "ownerId", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                        <img src=\"assets/images/star.png\" class=\"\">\r\n                    ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <span class=\"post_vote_parent \" style=\"margin-right: 10px; margin-left: 20px; margin-top: 0px;\">\r\n                <!--bubbles=false prevent event propagation to parent action ('displayData')-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "voteUpSelected", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <span class=\"post_vote_rating\">\r\n                    ");
  stack1 = helpers._triageMustache.call(depth0, "kRate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </span>\r\n                ");
  stack1 = helpers['if'].call(depth0, "voteDownSelected", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </span>\r\n        ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "votePost", 1, 0, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_up_selected.png\" class=\"post_vote_img\" />\r\n                ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "votePost", 1, 1, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_up.png\" class=\"post_vote_img\" />\r\n                ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "votePost", -1, 0, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_down_selected.png\" class=\"post_vote_img\" />\r\n                ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "votePost", -1, 1, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_down.png\" class=\"post_vote_img\" />\r\n                ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n            <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                <span class=\"inner-wrapper\">\r\n                    <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                </span>\r\n            </a>\r\n        ");
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <span class=\"social_post_html search_post_content\">\r\n                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "caption", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                </span>\r\n            ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n            <div class=\"social_comment_count\">\r\n                <span>\r\n                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "commentsNum", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" comments\r\n                </span>\r\n            </div>\r\n        ");
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"social_post_hash_tags\">\r\n                ");
  stack1 = helpers.each.call(depth0, "validInterests", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        ");
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <span> #");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </span>\r\n                ");
  return buffer;
  }

function program25(depth0,data) {
  
  
  data.buffer.push("\r\n                <img src=\"assets/images/live_search.png\" class=\"search_type_icon\">\r\n            ");
  }

function program27(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                ");
  stack1 = helpers.unless.call(depth0, "ownerId", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            ");
  return buffer;
  }
function program28(depth0,data) {
  
  
  data.buffer.push("\r\n                    <img src=\"assets/images/star.png\" class=\"search_type_icon\">\r\n                ");
  }

function program30(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img class=\"fb_post_thumb_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                ");
  return buffer;
  }

  data.buffer.push("<li class=\"search_element_wrapper\" style=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "activityVisibility", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n    <!--{ {unbound view.loopId} }-->\r\n    <div class=\"poster-wrapper search_element\" style=\"height:auto !important\" onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "activity", "", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","ID","ID"],data:data})));
  data.buffer.push(" element-id=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"><!--_view.contentIndex-->\r\n        ");
  stack1 = helpers['if'].call(depth0, "searchResult", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  stack1 = helpers['if'].call(depth0, "votesAllowed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(16, program16, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        <a class=\"search_video_title search_fb_name\"  href=\"javascript:void(0)\">\r\n            <span class=\"search_post_content\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n            <span class=\"post_date\">. ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n        </a>\r\n        <a class=\"search_video_title search_fb_subject\" href=\"javascript:void(0)\">\r\n            <span class=\"social_post_html search_post_content\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n        </a>\r\n        <a class=\"search_video_title search_fb_subject fb_post_body_summary\" href=\"javascript:void(0)\">\r\n            <!--unless muse be above next span because convertTextToHtml is always applied on the following span and\r\n            if ember condition was inside ember script tags will be removed which cause rendering problem .. if item click twice\r\n            -->\r\n            ");
  stack1 = helpers.unless.call(depth0, "isEmbed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            <span class=\"social_post_html\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postLink", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n        </a>\r\n        ");
  stack1 = helpers['if'].call(depth0, "commentsNum", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  stack1 = helpers['if'].call(depth0, "validInterests", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        <a style=\"margin-left:70px;display: none !important;\" class=\"search_video_title search_fb_date\" href=\"javascript:void(0)\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "externalSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n\r\n        <a class=\"fb_post_img\" href=\"javascript:void(0)\">\r\n            <div>\r\n                ");
  stack1 = helpers['if'].call(depth0, "isMedia", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </a>\r\n    </div>\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["social/activitydetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n    <li class=\"search_element_wrapper_details\">\r\n        <div class=\"search_element\" style=\"height:auto !important\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "votesAllowed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            <div class=\"search_video_title search_fb_name_details search_post_details_content\"\r\n                 href=\"javascript:void(0)\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n            </div>\r\n            <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\"\r\n                 style=\"min-height:inherit !important\">\r\n                <span class=\"social_post_details_html search_post_details_content\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n            </div>\r\n            <div class=\"search_video_title search_fb_subject_details fb_post_body\" href=\"javascript:void(0)\" style=\"\">\r\n                <!--unless muse be above next span because convertTextToHtml is always applied on the following span and\r\n                if ember condition was inside ember script tags will be removed which cause rendering problem .. if item click twice\r\n                -->\r\n                ");
  stack1 = helpers.unless.call(depth0, "isEmbed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(13, program13, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <span class=\"social_post_details_html\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postLink", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n            </div>\r\n            <div class=\"fb_post_img_container\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "isEmbed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers['if'].call(depth0, "isPhoto", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers['if'].call(depth0, "isAudio", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                ");
  stack1 = helpers['if'].call(depth0, "isVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n            ");
  stack1 = helpers['if'].call(depth0, "validInterests", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(36, program36, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            <div class=\"fb_post_like\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "commentsNum", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(39, program39, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n            </div>\r\n            ");
  stack1 = helpers['if'].call(depth0, "commentsAllowed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n    </li>\r\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <span class=\"post_vote_parent\" style=\"margin-right: 5px; margin-left: 15px; margin-top: 0px;\">\r\n                <!--bubbles=false prevent event propagation to parent action-->\r\n                    ");
  stack1 = helpers['if'].call(depth0, "voteUpSelected", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    <span class=\"post_vote_rating\">\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "kRate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </span>\r\n                    ");
  stack1 = helpers['if'].call(depth0, "voteDownSelected", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </span>\r\n            ");
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "votePost", 1, 0, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_up_selected.png\"\r\n                                                                     class=\"post_vote_img\"/>\r\n                    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "votePost", 1, 1, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_up.png\"\r\n                                                                     class=\"post_vote_img\"/>\r\n                    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "votePost", -1, 0, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_down_selected.png\"\r\n                                                                      class=\"post_vote_img\"/>\r\n                    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "votePost", -1, 1, {hash:{
    'bubbles': (false)
  },hashTypes:{'bubbles': "BOOLEAN"},hashContexts:{'bubbles': depth0},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_down.png\"\r\n                                                                      class=\"post_vote_img\"/>\r\n                    ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                <span class=\"inner-wrapper\">\r\n                    <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                </span>\r\n                </div>\r\n            ");
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <span class=\"social_post_details_html search_post_details_content\">\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "caption", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    </span>\r\n                ");
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "embedBody", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img class=\"fb_post_details_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers['if'].call(depth0, "audio.embedCode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <iframe src=\"customauth/empty.html\" name=\"embedCodeFrame\" id=\"embedCodeFrame\" class=\"embedCodeFrame sprocket_video_frame\"></iframe>\r\n                        <div id=\"embedCode\" style=\"display: none\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "audio.embedCode", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                    ");
  return buffer;
  }

function program22(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, "audio.url", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program23(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <audio controls>\r\n                            <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "audio.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"audio/mpeg\">\r\n                            Your browser does not support Audio\r\n                        </audio>\r\n                    ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers['if'].call(depth0, "isEmbedVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <iframe src=\"customauth/empty.html\" name=\"embedCodeFrame\" id=\"embedCodeFrame\" class=\"embedCodeFrame sprocket_video_frame\"></iframe>\r\n                        <div id=\"embedCode\" style=\"display: none\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoEmbedCode", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                    ");
  return buffer;
  }

function program28(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, "isSecureIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(31, program31, data),fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program29(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <iframe class=\"sprocket_video_frame\" width=\"100%\" height=\"250px\" frameborder=\"0\" allowfullscreen\r\n                                src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></iframe>\r\n                    ");
  return buffer;
  }

function program31(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, "isIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(34, program34, data),fn:self.program(32, program32, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program32(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            <a href=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" target=\"_blank\" class=\"fb_video_player\">\r\n                                <img style=\"margin-top:50px !important;margin-bottom:50px !important;cursor:pointer;\"\r\n                                     class=\"fb_post_details_img\" src=\"assets/images/playvideo.png\" alt=\"\"/>\r\n                            </a>\r\n                    ");
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            <video class=\"sprocket_video\" width=\"100%\" height=\"250\" controls>\r\n                                <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"video/mp4\">\r\n                                <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"video/ogg\">\r\n                                Your browser does not support video\r\n                            </video>\r\n                    ");
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <div class=\"social_post_details_hash_tags\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "validInterests", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(37, program37, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n            ");
  return buffer;
  }
function program37(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <span> #");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </span>\r\n                    ");
  return buffer;
  }

function program39(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <span class=\"pull-left\">\r\n                        All ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "commentsNum", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" comments\r\n                    </span>\r\n                ");
  return buffer;
  }

function program41(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                <div class=\"fb_post_comments\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "commentsExpanded", {hash:{
    'itemController': ("SocialComment")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(42, program42, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n                <div class=\"send_comment_box_parent chat_window\">\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'placeholder': ("You know what else I was thinking?"),
    'class': ("send_message_box send_message_input"),
    'value': ("text")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'class': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'class': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                    <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addComment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"send_message_button\" style='margin-left: 6px'>Send</button>\r\n                </div>\r\n            ");
  return buffer;
  }
function program42(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/comment", options) : helperMissing.call(depth0, "partial", "social/comment", options))));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, "refresh", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  
});

Ember.TEMPLATES["social/comment"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            ");
  stack1 = helpers['if'].call(depth0, "voteUpSelected", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            <span class=\"post_vote_rating\">\r\n\r\n            </span>\r\n            ");
  stack1 = helpers['if'].call(depth0, "voteDownSelected", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "voteComment", 1, 0, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_up_selected.png\" class=\"post_vote_img\" />\r\n            ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "voteComment", 1, 1, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_up.png\" class=\"post_vote_img\" />\r\n            ");
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "voteComment", -1, 0, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_down_selected.png\" class=\"post_vote_img\" />\r\n            ");
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <img ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "voteComment", -1, 1, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","INTEGER","INTEGER"],data:data})));
  data.buffer.push(" src=\"images/network/reddit/vote_down.png\" class=\"post_vote_img\" />\r\n            ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <span ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "expand", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" class=\"pointer\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "expanded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </span>\r\n        ");
  return buffer;
  }
function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                    <img src=\"images/network/reddit/reply_expand.png\">\r\n                ");
  }

function program13(depth0,data) {
  
  
  data.buffer.push("\r\n                    <img src=\"images/network/reddit/reply.png\">\r\n                ");
  }

function program15(depth0,data) {
  
  
  data.buffer.push("\r\n            <span class=\"post_comment_expand_empty\"></span>\r\n        ");
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("pointStyle")
  },hashTypes:{'style': "ID"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"post_point_parent_reply\">\r\n            <span class=\"post_point\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.KeyUpTextField", {hash:{
    'placeholder': ("You know what else I was thinking?"),
    'valueBinding': ("text"),
    'keyUpAction': ("replyKeyPress"),
    'id': ("commentId"),
    'class': ("post_reply_text")
  },hashTypes:{'placeholder': "STRING",'valueBinding': "STRING",'keyUpAction': "STRING",'id': "ID",'class': "STRING"},hashContexts:{'placeholder': depth0,'valueBinding': depth0,'keyUpAction': depth0,'id': depth0,'class': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n            </span>\r\n            ");
  stack1 = helpers.unless.call(depth0, "ownerComment", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n    ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <span ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "replyComment", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" class=\"post_comment_send\">\r\n                    Send\r\n                </span>\r\n            ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n        <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("pointStyle")
  },hashTypes:{'style': "ID"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"post_point_parent\">\r\n            <span class=\"post_point\">\r\n                ");
  stack1 = helpers._triageMustache.call(depth0, "rating.numRatings", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" Point - ");
  data.buffer.push(escapeExpression((helper = helpers.getDateString || (depth0 && depth0.getDateString),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "creationDate", options) : helperMissing.call(depth0, "getDateString", "creationDate", options))));
  data.buffer.push("\r\n            </span>\r\n            ");
  stack1 = helpers.unless.call(depth0, "ownerComment", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n    ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <span ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "replyComment", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" class=\"post_comment_reply\">\r\n                    Reply\r\n                </span>\r\n            ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n        <div class=\"post_replies_parent\" >\r\n            ");
  stack1 = helpers.each.call(depth0, "replies", {hash:{
    'itemController': ("SocialComment")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n    ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/comment", options) : helperMissing.call(depth0, "partial", "social/comment", options))));
  data.buffer.push("\r\n             ");
  return buffer;
  }

  data.buffer.push("<div class=\"post_comment_parent\" ele-id=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" par-ele-id=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "view._parentView.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n    <span class=\"post_vote_parent\">\r\n        ");
  stack1 = helpers.unless.call(depth0, "ownerComment", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </span>\r\n    <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'style': ("commentStyle")
  },hashTypes:{'style': "ID"},hashContexts:{'style': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"post_comment\">\r\n        ");
  stack1 = helpers['if'].call(depth0, "replies", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(10, program10, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        <span class=\"post_comment_owner\">");
  stack1 = helpers._triageMustache.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n\r\n        <div class=\"post_comment_body\">\r\n            ");
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "externalBody", {hash:{
    'unescaped': ("true")
  },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </div>\r\n    </div>\r\n\r\n    ");
  stack1 = helpers['if'].call(depth0, "reply", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    ");
  stack1 = helpers['if'].call(depth0, "expanded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["social/contact"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n            <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("imageUrl")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" />\r\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n            <img src=\"images/network/contact/default.png\"/>\r\n        ");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n            <img src=\"assets/images/headericons/facebook.png\">\r\n        ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n            <img src=\"images/network/logo/disabled/facebook.png\">\r\n        ");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n            <img src=\"assets/images/headericons/linkedin.png\">\r\n        ");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n            <img src=\"images/network/logo/disabled/linkedin.png\">\r\n        ");
  }

function program13(depth0,data) {
  
  
  data.buffer.push("\r\n            <img src=\"assets/images/headericons/gmail.png\">\r\n        ");
  }

function program15(depth0,data) {
  
  
  data.buffer.push("\r\n            <img src=\"images/network/logo/disabled/gmail.png\">\r\n        ");
  }

  data.buffer.push("\r\n<div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("contactClass")
  },hashTypes:{'class': "ID"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "selectContact", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\r\n    <div class=\"image\">\r\n        ");
  stack1 = helpers['if'].call(depth0, "imageUrl", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </div>\r\n    <div class=\"details\">\r\n        <div class=\"name\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("displayName")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n        <!--<div class=\"description\" { {bind-attr title=description}}>{ {description}}</div>-->\r\n        <!--{ {#unless sprocketUser}}<div class=\"invite\" { {action 'inviteContact'}}>Invite</div>{ {/unless}}-->\r\n    </div>\r\n    <div class=\"networks\">\r\n        <!--{ {#each network in contactNetworks}}{ {#if network.active}}<img src=\"assets/images/headericons/{ {unbound network.name}}.png\">{ {else}}<img src=\"images/network/logo/disabled/{ {unbound network.name}}.png\">{ {/if}}{ {/each} }-->\r\n\r\n        <!--<img { {bind-attr src=networkImage}}>-->\r\n        <!-- the following approach is better than for loop in ember performance-->\r\n        ");
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "networkImage", "facebook", options) : helperMissing.call(depth0, "ifEqual", "networkImage", "facebook", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "networkImage", "linkedin", options) : helperMissing.call(depth0, "ifEqual", "networkImage", "linkedin", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  stack1 = (helper = helpers.ifEqual || (depth0 && depth0.ifEqual),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "networkImage", "gmail", options) : helperMissing.call(depth0, "ifEqual", "networkImage", "gmail", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["social/contactadd"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"header\">\r\n    add new contact\r\n    <img src=\"images/network/contact/close.png\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelAdd", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("/>\r\n</div>\r\n\r\n<div class=\"contact\">\r\n    <span class=\"add_image\">+</span>\r\n    <div class=\"details\">\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("displayName"),
    'placeholder': ("Display Name")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("description"),
    'placeholder': ("Info")
  },hashTypes:{'value': "ID",'placeholder': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n    </div>\r\n</div>\r\n<div class=\"contactData\">\r\n    <div class=\"dataElement\">\r\n        <div>\r\n            <img src=\"images/network/contact/phone.png\"/>\r\n        </div>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("phoneNumber"),
    'placeholder': ("Phone Number")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div>\r\n    <div class=\"dataElement\">\r\n        <div>\r\n            <img src=\"images/network/contact/email.png\"/>\r\n        </div>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("email"),
    'placeholder': ("Email")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div>\r\n    <div class=\"dataElement\">\r\n        <div>\r\n            <img src=\"images/network/contact/address.png\"/>\r\n        </div>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("address"),
    'placeholder': ("Address")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div>\r\n    <div class=\"dataElement\">\r\n        <div>\r\n            <img src=\"images/network/contact/url.png\"/>\r\n        </div>\r\n        ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("url"),
    'placeholder': ("URL")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    </div>\r\n</div>\r\n<div class=\"contactActions\">\r\n    <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addContact", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Add Contact</button>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["social/contactdetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n    <a ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'href': ("profileUrl")
  },hashTypes:{'href': "ID"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" target=\"_blank\" style=\"position: absolute; top: 55px; left: 25px; width: 50px; height: 50px; text-indent: -9999px;\">Profile Url</a>\r\n");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n        <div class=\"dataElement\">\r\n            <div>\r\n                <img src=\"images/network/contact/phone.png\"/>\r\n            </div>\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("phoneNumber"),
    'disabled': ("disabled")
  },hashTypes:{'type': "STRING",'value': "ID",'disabled': "STRING"},hashContexts:{'type': depth0,'value': depth0,'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n        </div>\r\n    ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n        <div class=\"dataElement\">\r\n            <div>\r\n                <img src=\"images/network/contact/email.png\"/>\r\n            </div>\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("email"),
    'disabled': ("disabled")
  },hashTypes:{'type': "STRING",'value': "ID",'disabled': "STRING"},hashContexts:{'type': depth0,'value': depth0,'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n        </div>\r\n    ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n        <div class=\"dataElement\">\r\n            <div>\r\n                <img src=\"images/network/contact/address.png\"/>\r\n            </div>\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("address"),
    'disabled': ("disabled")
  },hashTypes:{'type': "STRING",'value': "ID",'disabled': "STRING"},hashContexts:{'type': depth0,'value': depth0,'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n        </div>\r\n    ");
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n        <div class=\"dataElement\">\r\n            <div>\r\n                <img src=\"images/network/contact/url.png\"/>\r\n            </div>\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("url"),
    'disabled': ("disabled")
  },hashTypes:{'type': "STRING",'value': "ID",'disabled': "STRING"},hashContexts:{'type': depth0,'value': depth0,'disabled': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n        </div>\r\n    ");
  return buffer;
  }

  data.buffer.push("<div class=\"header\">\r\n    info\r\n    <img src=\"images/network/contact/close.png\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "hideContactDetails", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push("/>\r\n</div>\r\n\r\n");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/contact", options) : helperMissing.call(depth0, "partial", "social/contact", options))));
  data.buffer.push("\r\n\r\n<!-- we added the link here because if we add it to image/name in contact.hbs it will not take effect because [action] will block it -->\r\n");
  stack1 = helpers['if'].call(depth0, "profileUrl", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n<div class=\"contactData\">\r\n    ");
  stack1 = helpers['if'].call(depth0, "phoneNumber", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    ");
  stack1 = helpers['if'].call(depth0, "email", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    ");
  stack1 = helpers['if'].call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    ");
  stack1 = helpers['if'].call(depth0, "url", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</div>\r\n<div class=\"contactActions\" style=\"display: none\">\r\n    <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveContact", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Save</button>\r\n    <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteContact", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Delete Contact</button>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["social/gplace"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "thumb.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                <img src=\"/assets/images/yelpDefault.jpg\" alt=\"\"/>\r\n            ");
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img src=\"/assets/images/rating/rate");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "ratingDto.rating", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(".png\" alt=\"\" class=\"pull-left\"/>\r\n                ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <span class=\"placeRatings pull-left\">\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "ratingDto.numRatings", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" reviews\r\n                 </span>\r\n                ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n                <div>\r\n                    <img src=\"assets/images/blueStar.png\" alt=\"\"/>\r\n                </div>\r\n            ");
  }

function program11(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFavoriteClick", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n                    <img src=\"assets/images/grayStar.png\" width=\"18\" height=\"18\" alt=\"\"/>\r\n                </div>\r\n            ");
  return buffer;
  }

  data.buffer.push("<li class=\"pointer placeItem\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "place", "", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","ID","ID"],data:data})));
  data.buffer.push(" element-id=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n    <div>\r\n        <div class=\"placeImg pull-left\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "thumb.url", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"placeDetails pull-left\">\r\n            <div><span class=\"placeName search_place_content\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span></div>\r\n            <div>\r\n                <span class=\"placeDesc social_place_html search_place_content\" title=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                </span>\r\n            </div>\r\n            <div>\r\n                ");
  stack1 = helpers['if'].call(depth0, "rate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  stack1 = helpers['if'].call(depth0, "ratingDto.numRatings", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </div>\r\n        <div class=\"placeFavorite pull-right\" style=\"display: none;\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "isFavorite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n    </div>\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["social/gplacedetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n        <div class=\"yelpMap\">\r\n            <div id=\"g-map-canvas\" style=\"width:100%; height:260px\"></div>\r\n        </div>\r\n    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"yelpAddress\">\r\n                <img src=\"assets/images/yelpAddressIcon.png\" alt=\"\" class=\"pull-left\"/>\r\n                <span>");
  stack1 = helpers._triageMustache.call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </div>\r\n        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"yelpPhone\">\r\n                <img src=\"assets/images/yelpPhoneIcon.png\" alt=\"\" class=\"pull-left\"/>\r\n                <span>");
  stack1 = helpers._triageMustache.call(depth0, "addressdto.displayPhone", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </div>\r\n        ");
  return buffer;
  }

  data.buffer.push("<div class=\"yelpDetails\">\r\n    ");
  stack1 = helpers['if'].call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    <div class=\"yelpInfo\">\r\n        <div class=\"yelpName placeName\">\r\n            <span>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n        </div>\r\n        ");
  stack1 = helpers['if'].call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  stack1 = helpers['if'].call(depth0, "addressdto.displayPhone", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        <div class=\"yelpDescription\">\r\n            <span>");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["social/hplacedetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n        <div class=\"yelpMap\">\r\n            <div id=\"h-map-canvas\" style=\"width:100%; height:260px\"></div>\r\n        </div>\r\n    ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"yelpAddress\">\r\n                <img src=\"assets/images/yelpAddressIcon.png\" alt=\"\" class=\"pull-left\"/>\r\n                <span>");
  stack1 = helpers._triageMustache.call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </div>\r\n        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"yelpPhone\">\r\n                <img src=\"assets/images/yelpPhoneIcon.png\" alt=\"\" class=\"pull-left\"/>\r\n                <span>");
  stack1 = helpers._triageMustache.call(depth0, "addressdto.displayPhone", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </div>\r\n        ");
  return buffer;
  }

  data.buffer.push("<div class=\"yelpDetails\">\r\n    ");
  stack1 = helpers['if'].call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    <div class=\"yelpInfo\">\r\n        <div class=\"yelpName placeName\">\r\n            <span>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n        </div>\r\n        ");
  stack1 = helpers['if'].call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  stack1 = helpers['if'].call(depth0, "addressdto.displayPhone", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        <div class=\"yelpDescription\">\r\n            <span>");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["social/message"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<li class=\"search_element_wrapper\">\r\n    <div class=\"message_item poster-wrapper search_element\" onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "message", "", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","ID","ID"],data:data})));
  data.buffer.push(" element-id=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriend.contactId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n        <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n            <span class=\"inner-wrapper\">\r\n			    <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriend.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n            </span>\r\n        </a>\r\n        <a class=\"search_video_title search_fb_name search_message_content\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriendName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_fb_subject social_message_html search_message_content  ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastMessageStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastMessageSummary", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_fb_date\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "fullDate", "lastMessage.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n    </div>\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["social/messagedetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n        <div class=\"search_video_title search_fb_date_details\" style=\"width: 100% !important;\">\r\n            <span style=\"background-color: #2A2F35\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n            <span></span>\r\n        </div>\r\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n            <div class=\"search_video_title search_fb_subject_details\" style=\"min-height:inherit !important\">\r\n                <span class=\"message_subject search_message_details_content\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "subject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n                <span class=\"message_date\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n            </div>\r\n            <div class=\"search_video_title search_fb_subject_details social_message_details_html google_mail_body\"><!--don't highlight message body in gmail as may broke html-->\r\n                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n            </div>\r\n        ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n            <div class=\"search_video_title search_fb_subject_details social_message_details_html search_message_details_content\">\r\n                ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n            </div>\r\n        ");
  return buffer;
  }

  data.buffer.push("<li class=\"search_element_wrapper_details\">\r\n    ");
  stack1 = helpers.unless.call(depth0, "subject", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    <div class=\"search_element\" style=\"height: auto !important\">\r\n        <div class=\"search_fb_url ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "contactClass", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n            <span class=\"inner-wrapper\">\r\n                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n            </span>\r\n        </div>\r\n        <div class=\"search_video_title search_fb_name_details search_message_details_content\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </div>\r\n        ");
  stack1 = helpers['if'].call(depth0, "subject", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n    </div>\r\n\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["social/place"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "thumb.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                <img src=\"/assets/images/yelpDefault.jpg\" alt=\"\"/>\r\n            ");
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <img src=\"/assets/images/rating/rate");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "ratingDto.rating", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(".png\" alt=\"\" class=\"pull-left\"/>\r\n                ");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <span class=\"placeRatings pull-left\">\r\n                        ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "ratingDto.numRatings", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" reviews\r\n                 </span>\r\n                ");
  return buffer;
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n                <div>\r\n                    <img src=\"assets/images/blueStar.png\" alt=\"\"/>\r\n                </div>\r\n            ");
  }

function program11(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <div ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onFavoriteClick", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n                    <img src=\"assets/images/grayStar.png\" width=\"18\" height=\"18\" alt=\"\"/>\r\n                </div>\r\n            ");
  return buffer;
  }

  data.buffer.push("<li class=\"pointer placeItem\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onClick", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\r\n    <div>\r\n        <div class=\"placeImg pull-left\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "thumb.url", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"placeDetails pull-left\">\r\n            <div><span class=\"placeName\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span></div>\r\n            <div>\r\n                <span class=\"placeDesc\" title=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                </span>\r\n            </div>\r\n            <div>\r\n                ");
  stack1 = helpers['if'].call(depth0, "rate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  stack1 = helpers['if'].call(depth0, "ratingDto.numRatings", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </div>\r\n        <div class=\"placeFavorite pull-right\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "isFavorite", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n    </div>\r\n</li>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["social/placedetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"yelpAddress\">\r\n                <img src=\"assets/images/yelpAddressIcon.png\" alt=\"\" class=\"pull-left\"/>\r\n                <span>");
  stack1 = helpers._triageMustache.call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </div>\r\n        ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"yelpPhone\">\r\n                <img src=\"assets/images/yelpPhoneIcon.png\" alt=\"\" class=\"pull-left\"/>\r\n                <span>");
  stack1 = helpers._triageMustache.call(depth0, "addressdto.displayPhone", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n            </div>\r\n        ");
  return buffer;
  }

  data.buffer.push("<div class=\"yelpDetails\" style=\"width: calc(50% - 20px)\">\r\n    <div class=\"yelpMap\">\r\n        <div id=\"map-canvas\" style=\"width:100%; height:260px\"></div>\r\n    </div>\r\n    <div class=\"yelpInfo\">\r\n        <div class=\"yelpName placeName\">\r\n            <span>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n        </div>\r\n        ");
  stack1 = helpers['if'].call(depth0, "address", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        ");
  stack1 = helpers['if'].call(depth0, "addressdto.displayPhone", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        <div class=\"yelpDescription\">\r\n            <span>");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["social/video"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n            <div class=\"search_type_parent\" style=\"margin-top: 30px !important;\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "externalSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        ");
  return buffer;
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\r\n                    <img src=\"assets/images/live_search.png\" class=\"\">\r\n                ");
  }

function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers.unless.call(depth0, "ownerId", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                        <img src=\"assets/images/star.png\" class=\"\">\r\n                    ");
  }

  data.buffer.push("<li class=\"search_element_wrapper\" >\r\n    <div class=\"poster-wrapper search_element video_item\" onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "video", "", "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["STRING","STRING","ID","ID"],data:data})));
  data.buffer.push(" element-id=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "_view.contentIndex", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n        ");
  stack1 = helpers['if'].call(depth0, "searchResult", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        <a class=\"search_video_url\"  href=\"javascript:void(0)\">\r\n            <span class=\"inner-wrapper\">\r\n                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "thumb.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n            </span>\r\n        </a>\r\n        <a class=\"search_video_title search_video_content\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_video_desc social_video_description_html search_video_content\" href=\"javascript:void(0)\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "uploadedBy", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </a>\r\n        <a class=\"search_video_title search_video_views\" href=\"javascript:void(0)\">\r\n            <span class=\"views_number\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "viewNo", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</span>\r\n        </a>\r\n        <!--<a class=\"video_link_container\">\r\n            <span class=\"video-rating-container video-rating-0\">0 Star</span>\r\n            <span class=\"icon youtube-colored\">youtube</span>\r\n        </a>-->\r\n    </div>\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["social/videodetails"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <iframe class=\"sprocket_video_frame\" width=\"100%\" height=\"350px\" frameborder=\"0\" allowfullscreen src=\"https://www.youtube.com/embed/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "itemKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></iframe>\r\n            ");
  return buffer;
  }

function program3(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, "isVimeo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program4(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <iframe class=\"sprocket_video_frame\" src=\"//player.vimeo.com/video/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "itemKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" width=\"100%\" height=\"350px\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n            ");
  return buffer;
  }

  data.buffer.push("<li class=\"search_element_wrapper_details\">\r\n    <div class=\"search_element\" style=\"height:auto !important\">\r\n        <div class=\"search_fb_url\">\r\n                            <span class=\"inner-wrapper\">\r\n                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            </span>\r\n        </div>\r\n        <div class=\"search_video_title search_fb_subject_details search_video_details_content\" style=\"min-height:inherit !important\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"search_video_title search_fb_name_details\" style=\"margin-top:5px\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </div>\r\n        <div class=\"search_video_title search_fb_subject_details youtube_video\" style=\"\">\r\n            ");
  stack1 = helpers['if'].call(depth0, "isYoutube", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </div>\r\n        <div class=\"search_video_title search_fb_subject_details google_video_body social_video_details_html search_video_details_content description_summary\"\r\n             style=\"margin-top:3px;");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "descriptionVisibility", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n        </div>\r\n\r\n        <div class=\"read_more_div_background\" style=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "viewMoreVisibility", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></div>\r\n        <div class=\"read_more_div\" style=\"margin-top:0px;");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "viewMoreVisibility", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n            <span class=\"read_more\">View More</span>\r\n        </div>\r\n    </div>\r\n\r\n</li>");
  return buffer;
  
});

Ember.TEMPLATES["sync"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"tooltipStep tooltipStepOne\"></div>");
  }

function program3(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"tooltipStep tooltipStepTwo\"></div>");
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"tooltipStep tooltipStepThree\"></div>");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"tooltipStep tooltipStepFour\"></div>");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div class=\"tooltipStep tooltipStepFive\"></div>");
  }

function program11(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                        <div class=\"tooltipStepsSkip\">\r\n                            ");
  stack1 = (helper = helpers['query-params'] || (depth0 && depth0['query-params']),options={hash:{
    'skip': ("true")
  },hashTypes:{'skip': "STRING"},hashContexts:{'skip': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "query-params", options));
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0,depth0],types:["ID","sexpr"],data:data},helper ? helper.call(depth0, "skipUrl", stack1, options) : helperMissing.call(depth0, "link-to", "skipUrl", stack1, options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                    ");
  return buffer;
  }
function program12(depth0,data) {
  
  
  data.buffer.push("<button class=\"ellipsis\">Skip</button>");
  }

  data.buffer.push("<div class=\"mainContainer\">\r\n    <div class=\"mainContent\">\r\n        <div class=\"tooltipContainer\">\r\n            <div ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("networkClass")
  },hashTypes:{'class': "ID"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">\r\n                <div class=\"tooltipStatus\">\r\n                    <div class=\"tooltipSpinContainer\">\r\n                        <div class=\"tooltipSpin\">\r\n                            <div class=\"progressNum\">");
  stack1 = helpers._triageMustache.call(depth0, "networkPercent", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n                        </div>\r\n                        <div class=\"tooltipNote\">\r\n                            DID YOU KNOW YOU CAN FIND ALL YOUR APPS WITH A QUICK SWIPE OF THE SPROCKET WHEEL?\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"tooltipStepsContainer\">\r\n                        <div class=\"tooltipStepsIndicator\">\r\n                            <div class=\"tooltipStepsIndicatorBG\">\r\n                                ");
  stack1 = helpers['if'].call(depth0, "stepOneCompleted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "stepTwoCompleted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "stepThreeCompleted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "stepFourCompleted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "stepFiveCompleted", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"tooltipStepsTitle ellipsis\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("syncStatus")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(">");
  stack1 = helpers._triageMustache.call(depth0, "syncStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n                    </div>\r\n                    ");
  stack1 = helpers['if'].call(depth0, "allowSkip", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n                <div class=\"tooltipVideo\">\r\n                    <video width=\"484\" height=\"485\" autoplay>\r\n                        <source src=\"/videos/ToolTip.mp4\" type=\"video/mp4\">\r\n                        Your browser does not support the video tag.\r\n                    </video>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["tumblr"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                                            <span class=\"count pull-right\">new</span>\r\n                                        ");
  }

function program3(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                    ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/message", options) : helperMissing.call(depth0, "partial", "social/message", options))));
  data.buffer.push("\r\n                                                ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                                    <div class=\"mayTakeMessage\">\r\n                                                        This may take a few minutes while we synchronize your messages\r\n                                                    </div>\r\n                                                ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                                                <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("imagePreview.name")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"file_uploader_image preview_parent single_file\">\r\n                                                                                    ");
  stack1 = helpers['if'].call(depth0, "imagePreview.loaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                                </span>\r\n                                                                                ");
  stack1 = helpers['if'].call(depth0, "imagePreview.loaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                            ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                                                                        <img class = \"delete_preview_btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeFile", "image", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("\r\n                                                                                             src=\"assets/images/delete_image.png\"/>\r\n                                                                                        <span class=\"delete_preview\" onclick=\"Em.$('#tumblr_image_upload').click()\">\r\n                                                                                            <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("imagePreview.src")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n                                                                                        </span>\r\n                                                                                    ");
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                                                                        <span>\r\n                                                                                            <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("imagePreview.src")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n                                                                                        </span>\r\n                                                                                    ");
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                                                    <div class=\"margin-top:5px\">\r\n                                                                                        ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("imageCaption"),
    'placeholder': ("Caption"),
    'class': ("spInput")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n                                                                                    </div>\r\n                                                                                ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("imageUrl"),
    'placeholder': ("Photo URL "),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("imageCaption"),
    'placeholder': ("Caption"),
    'class': ("spInput")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n                                                                                <span class=\"file_uploader_title\"> OR Choose a file </span>\r\n                                                                                <span class=\"file_uploader single_file\" onclick=\"Em.$('#tumblr_image_upload').click()\">+</span>\r\n                                                                            ");
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                                                <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("videoPreview.name")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"file_uploader_image preview_parent single_file\">\r\n                                                                                    ");
  stack1 = helpers['if'].call(depth0, "videoPreview.loaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                                </span>\r\n                                                                                ");
  stack1 = helpers['if'].call(depth0, "videoPreview.loaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                            ");
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                                                                        <img class = \"delete_preview_btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeFile", "video", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("\r\n                                                                                             src=\"assets/images/delete_image.png\"/>\r\n                                                                                <span class=\"delete_preview\" onclick=\"Em.$('#tumblr_video_upload').click()\">\r\n                                                                                    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("videoPreview.src")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n                                                                                </span>\r\n                                                                                    ");
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                                                                        <span>\r\n                                                                                    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("videoPreview.src")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n                                                                                </span>\r\n                                                                                    ");
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                                                    <div class=\"margin-top:5px\">\r\n                                                                                        ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("videoCaption"),
    'placeholder': ("Caption"),
    'class': ("spInput")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n                                                                                    </div>\r\n                                                                                ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("videoUrl"),
    'placeholder': ("Embed Code or video URL "),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("videoCaption"),
    'placeholder': ("Caption"),
    'class': ("spInput")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n                                                                                <span class=\"file_uploader_title\"> OR Choose a file </span>\r\n                                                                                <span class=\"file_uploader single_file\" onclick=\"Em.$('#tumblr_video_upload').click()\">+</span>\r\n                                                                            ");
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                                                                <span ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'title': ("audioPreview.name")
  },hashTypes:{'title': "ID"},hashContexts:{'title': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" class=\"file_uploader_image preview_parent single_file\">\r\n                                                                                    ");
  stack1 = helpers['if'].call(depth0, "audioPreview.loaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                                </span>\r\n                                                                                ");
  stack1 = helpers['if'].call(depth0, "audioPreview.loaded", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(30, program30, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                            ");
  return buffer;
  }
function program26(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                                                                        <img class = \"delete_preview_btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "removeFile", "audio", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("\r\n                                                                                             src=\"assets/images/delete_image.png\"/>\r\n                                                                                <span class=\"delete_preview\" onclick=\"Em.$('#tumblr_audio_upload').click()\">\r\n                                                                                    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("audioPreview.src")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n                                                                                </span>\r\n                                                                                    ");
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                                                                        <span>\r\n                                                                                    <img ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'src': ("audioPreview.src")
  },hashTypes:{'src': "ID"},hashContexts:{'src': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" alt=\"\"/>\r\n                                                                                </span>\r\n                                                                                    ");
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                                                    <div class=\"margin-top:5px\">\r\n                                                                                        ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("audioCaption"),
    'placeholder': ("Description"),
    'class': ("spInput")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n                                                                                    </div>\r\n                                                                                ");
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("audioUrl"),
    'placeholder': ("Audio URL "),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("audioCaption"),
    'placeholder': ("Description"),
    'class': ("spInput")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n                                                                                <span class=\"file_uploader_title\"> OR Choose a file </span>\r\n                                                                                <span class=\"file_uploader single_file\" onclick=\"Em.$('#tumblr_audio_upload').click()\">+</span>\r\n                                                                            ");
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                                    ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activity", options) : helperMissing.call(depth0, "partial", "social/activity", options))));
  data.buffer.push("\r\n                                                ");
  return buffer;
  }

function program36(depth0,data) {
  
  
  data.buffer.push("\r\n                                                    <div class=\"mayTakeMessage\">\r\n                                                        This may take a few minutes while we synchronize your Feed\r\n                                                    </div>\r\n                                                ");
  }

function program38(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            ");
  stack1 = helpers['with'].call(depth0, "selectedActivity", {hash:{
    'controller': ("SocialActivity")
  },hashTypes:{'controller': "STRING"},hashContexts:{'controller': depth0},inverse:self.noop,fn:self.program(39, program39, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  return buffer;
  }
function program39(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/activitydetails", options) : helperMissing.call(depth0, "partial", "social/activitydetails", options))));
  data.buffer.push("\r\n                            ");
  return buffer;
  }

function program41(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                            ");
  stack1 = helpers.each.call(depth0, "selectedMessage.conversation", {hash:{
    'itemController': ("SocialMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(42, program42, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  return buffer;
  }
function program42(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/messagedetails", options) : helperMissing.call(depth0, "partial", "social/messagedetails", options))));
  data.buffer.push("\r\n                            ");
  return buffer;
  }

  data.buffer.push("<div class=\"mainContainer\">\r\n    <div class=\"mainContent\">\r\n        <div class=\"twoColumnContainer\">\r\n            <div class=\"twoColumnContent\">\r\n                <div class=\"columnOne\">\r\n                    <div class=\"columnOneContent\">\r\n                        <div class=\"accordionContainer\">\r\n                            <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\r\n                                <div class=\"panel\">\r\n                                    <div class=\"panel-heading\" role=\"tab\" id=\"headingOne\"\r\n                                         data-toggle=\"collapse\" data-parent=\"#accordion\" data-target=\"#collapseOne\"\r\n                                         aria-expanded=\"true\" aria-controls=\"collapseOne\">\r\n                                        <div class=\"pull-left\">Messages</div>\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.messages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </div>\r\n                                    <div id=\"collapseOne\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\r\n                                        <div class=\"panel-body\">\r\n                                            <ul id=\"social_messages_results\" class=\"cleafix nolist placeList\">\r\n                                                ");
  stack1 = helpers.each.call(depth0, "messages", {hash:{
    'itemController': ("SocialMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </ul>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"panel\">\r\n                                    <div class=\"panel-heading collapsed\" role=\"tab\" id=\"headingTwo\" data-toggle=\"collapse\" data-parent=\"#accordion\" data-target=\"#collapseTwo\"\r\n                                         aria-expanded=\"false\" aria-controls=\"collapseTwo\">\r\n                                        <div class=\"pull-left\">NEWS FEED</div>\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    </div>\r\n                                    <div id=\"collapseTwo\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo\">\r\n                                        <div class=\"panel-body\">\r\n                                            <div class=\"postBoxContainer\">\r\n                                                <div class=\"postBoxContent\">\r\n                                                    <div class=\"postTitle\">");
  stack1 = helpers._triageMustache.call(depth0, "nameOfTheBlog", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</div>\r\n                                                    <div id=\"postBox\" class=\"tabContainer\">\r\n                                                        <div class=\"tabContent\">\r\n                                                            <!-- Nav tabs -->\r\n                                                            <ul class=\"nav nav-tabs postTabs\" role=\"tablist\">\r\n                                                                <li role=\"presentation\" class=\"active link\">\r\n                                                                    <a href=\"#link\" aria-controls=\"link\" role=\"tab\"\r\n                                                                       data-toggle=\"tab\">\r\n                                                                        &nbsp;\r\n                                                                    </a>\r\n                                                                </li>\r\n                                                                <li role=\"presentation\" class=\"text\">\r\n                                                                    <a href=\"#text\" aria-controls=\"text\" role=\"tab\"\r\n                                                                       data-toggle=\"tab\">\r\n                                                                        &nbsp;\r\n                                                                    </a>\r\n                                                                </li>\r\n                                                                <li role=\"presentation\" class=\"photo\">\r\n                                                                    <a href=\"#photo\" aria-controls=\"photo\" role=\"tab\"\r\n                                                                       data-toggle=\"tab\">\r\n                                                                        &nbsp;\r\n                                                                    </a>\r\n                                                                </li>\r\n                                                                <li role=\"presentation\" class=\"video\">\r\n                                                                    <a href=\"#video\" aria-controls=\"video\" role=\"tab\"\r\n                                                                       data-toggle=\"tab\">\r\n                                                                        &nbsp;\r\n                                                                    </a>\r\n                                                                </li>\r\n                                                                <li role=\"presentation\" class=\"audio\">\r\n                                                                    <a href=\"#audio\" aria-controls=\"audio\" role=\"tab\"\r\n                                                                       data-toggle=\"tab\">\r\n                                                                        &nbsp;\r\n                                                                    </a>\r\n                                                                </li>\r\n                                                            </ul>\r\n                                                            <!-- Tab panes -->\r\n                                                            <div class=\"tab-content postTabsContent\">\r\n                                                                <div role=\"tabpanel\" class=\"tab-pane active\" id=\"link\">\r\n                                                                    <div class=\"postTabForm\">\r\n                                                                        <div class=\"postTabContent\">\r\n                                                                            <div class=\"\">\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("linkUrl"),
    'placeholder': ("URL"),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                            </div>\r\n                                                                            <div class=\"\">\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("linkTitle"),
    'placeholder': ("Title"),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                            </div>\r\n                                                                            <div class=\"\">\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("linkComment"),
    'placeholder': ("Comment"),
    'class': ("spInput")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"postTabButtons\">\r\n                                                                            <div class=\"pull-right\">\r\n                                                                                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelPost", "link", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\" btn btn-dark\">\r\n                                                                                    CANCEL\r\n                                                                                </button>\r\n                                                                            </div>\r\n                                                                            <div>\r\n                                                                                <button  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sharePost", "link", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("  class=\" btn btn-success\">\r\n                                                                                    SHARE\r\n                                                                                </button>\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div role=\"tabpanel\" class=\"tab-pane\" id=\"text\">\r\n                                                                    <div class=\"postTabForm\">\r\n                                                                        <div class=\"postTabContent\">\r\n                                                                            <div class=\"\">\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("textTitle"),
    'placeholder': ("Title"),
    'class': ("spInput")
  },hashTypes:{'type': "STRING",'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'type': depth0,'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                                                                            </div>\r\n                                                                            <div class=\"\">\r\n                                                                                ");
  data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
    'value': ("textComment"),
    'placeholder': ("Comment"),
    'class': ("spInput")
  },hashTypes:{'value': "ID",'placeholder': "STRING",'class': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'class': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                        <div class=\"postTabButtons\">\r\n                                                                            <div class=\"pull-right\">\r\n                                                                                <button  ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelPost", "text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\" btn btn-dark\">\r\n                                                                                    CANCEL\r\n                                                                                </button>\r\n                                                                            </div>\r\n                                                                            <div>\r\n                                                                                <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sharePost", "text", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push("  class=\" btn btn-success\">\r\n                                                                                    SHARE\r\n                                                                                </button>\r\n                                                                            </div>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div role=\"tabpanel\" class=\"tab-pane\" id=\"photo\">\r\n                                                                    <div class=\"postTabContent\">\r\n                                                                        <div class=\"upload_gallery single_file\">\r\n                                                                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.FileUploader", {hash:{
    'id': ("tumblr_image_upload"),
    'class': ("file_uploader_control"),
    'accept': ("image/*"),
    'changeAction': ("addFiles"),
    'accept-type-name': ("image"),
    'reset-type-name': ("image")
  },hashTypes:{'id': "STRING",'class': "STRING",'accept': "STRING",'changeAction': "STRING",'accept-type-name': "STRING",'reset-type-name': "STRING"},hashContexts:{'id': depth0,'class': depth0,'accept': depth0,'changeAction': depth0,'accept-type-name': depth0,'reset-type-name': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                                                            ");
  stack1 = helpers.each.call(depth0, "imagePreview", "in", "imagesPreview", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"postTabButtons\">\r\n                                                                        <div class=\"pull-right\">\r\n                                                                            <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelPost", "image", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\" btn btn-dark\">\r\n                                                                                CANCEL\r\n                                                                            </button>\r\n                                                                        </div>\r\n                                                                        <div>\r\n                                                                            <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sharePost", "image", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\" btn btn-success\">\r\n                                                                                SHARE\r\n                                                                            </button>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div role=\"tabpanel\" class=\"tab-pane\" id=\"video\">\r\n                                                                    <div class=\"postTabContent\">\r\n                                                                        <div class=\"upload_gallery single_file\">\r\n                                                                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.FileUploader", {hash:{
    'id': ("tumblr_video_upload"),
    'class': ("file_uploader_control"),
    'accept': ("video/*"),
    'changeAction': ("addFiles"),
    'accept-type-name': ("video"),
    'reset-type-name': ("video")
  },hashTypes:{'id': "STRING",'class': "STRING",'accept': "STRING",'changeAction': "STRING",'accept-type-name': "STRING",'reset-type-name': "STRING"},hashContexts:{'id': depth0,'class': depth0,'accept': depth0,'changeAction': depth0,'accept-type-name': depth0,'reset-type-name': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                                                            ");
  stack1 = helpers.each.call(depth0, "videoPreview", "in", "videosPreview", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(23, program23, data),fn:self.program(16, program16, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"postTabButtons\">\r\n                                                                        <div class=\"pull-right\">\r\n                                                                            <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelPost", "video", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\" btn btn-dark\">\r\n                                                                                CANCEL\r\n                                                                            </button>\r\n                                                                        </div>\r\n                                                                        <div>\r\n                                                                            <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sharePost", "video", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\" btn btn-success\">\r\n                                                                                SHARE\r\n                                                                            </button>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                                <div role=\"tabpanel\" class=\"tab-pane\" id=\"audio\">\r\n                                                                    <div class=\"postTabContent\">\r\n                                                                        <div class=\"upload_gallery single_file\">\r\n                                                                            ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.FileUploader", {hash:{
    'id': ("tumblr_audio_upload"),
    'class': ("file_uploader_control"),
    'accept': ("audio/*"),
    'changeAction': ("addFiles"),
    'accept-type-name': ("audio"),
    'reset-type-name': ("audio")
  },hashTypes:{'id': "STRING",'class': "STRING",'accept': "STRING",'changeAction': "STRING",'accept-type-name': "STRING",'reset-type-name': "STRING"},hashContexts:{'id': depth0,'class': depth0,'accept': depth0,'changeAction': depth0,'accept-type-name': depth0,'reset-type-name': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                                                            ");
  stack1 = helpers.each.call(depth0, "audioPreview", "in", "audiosPreview", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(32, program32, data),fn:self.program(25, program25, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                    <div class=\"postTabButtons\">\r\n                                                                        <div class=\"pull-right\">\r\n                                                                            <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "cancelPost", "audio", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\" btn btn-dark\">\r\n                                                                                CANCEL\r\n                                                                            </button>\r\n                                                                        </div>\r\n                                                                        <div>\r\n                                                                            <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sharePost", "audio", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
  data.buffer.push(" class=\" btn btn-success\">\r\n                                                                                SHARE\r\n                                                                            </button>\r\n                                                                        </div>\r\n                                                                    </div>\r\n                                                                </div>\r\n                                                            </div>\r\n                                                        </div>\r\n                                                    </div>\r\n                                                </div>\r\n                                            </div>\r\n                                            <ul id=\"social_posts_results\" class=\"cleafix nolist placeList\">\r\n                                                ");
  stack1 = helpers.each.call(depth0, "activities", {hash:{
    'itemController': ("SocialActivity")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(36, program36, data),fn:self.program(34, program34, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                            </ul>\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"columnTwo\">\r\n                    <div class=\"columnTwoContent nolist\">\r\n                        ");
  stack1 = helpers['if'].call(depth0, "selectedActivity", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(38, program38, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  stack1 = helpers['if'].call(depth0, "selectedMessage", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(41, program41, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["twitter"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span>new</span>\r\n                ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    <span>\r\n                        ");
  stack1 = helpers._triageMustache.call(depth0, "twitterMessages.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    </span>\r\n                ");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <li class=\"search_element_wrapper\">\r\n                            <div class=\"message_item poster-wrapper search_element\"\r\n                                 onclick=\"\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "Message", "_view.contentIndex", "", "lastFriend.contactId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0,depth0],types:["STRING","STRING","ID","ID","ID"],data:data})));
  data.buffer.push(">\r\n                                <a class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                                                            <span class=\"inner-wrapper\">\r\n                                                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriend.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                                            </span>\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_name\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastFriend.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_subject twitter_message_html  ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "lastMessageStatus", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"\r\n                                   href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getLastElementAttr", "allMessages", "body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["ID","ID","STRING"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_fb_date\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getLastElementAttr", "allMessages", "date", "getPostDateString", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0,depth0],types:["ID","ID","STRING","STRING"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n\r\n                                <a class=\"fb_post_img\" href=\"javascript:void(0)\">\r\n                                </a>\r\n                            </div>\r\n                        </li>\r\n                    ");
  return buffer;
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display:block\">\r\n                                This may take a few minutes while we synchronize your Messages\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program9(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.ActivityView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display:block\">\r\n                                This may take a few minutes while we synchronize your Tweets\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program13(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display:block\">\r\n                                This may take a few minutes while we synchronize your feed\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program15(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <li class=\"search_element_wrapper_details\">\r\n                    <div class=\"search_video_title search_fb_date_details\" href=\"javascript:void(0)\">\r\n                        <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                        <span></span>\r\n                    </div>\r\n                    <div class=\"search_element\">\r\n                        <div class=\"search_fb_url ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "contactClass", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" href=\"javascript:void(0)\">\r\n                            <span class=\"inner-wrapper\">\r\n                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "sender.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details twitter_message_details_html\"\r\n                             href=\"javascript:void(0)\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "body", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n            ");
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                <li class=\"search_element_wrapper_details\">\r\n                    <div class=\"search_element\" style=\"height:auto !important\">\r\n                        <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                            <span class=\"inner-wrapper\">\r\n                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\"\r\n                             style=\"min-height:inherit !important\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "status", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details fb_post_body twitter_post_details_html\"\r\n                             href=\"javascript:void(0)\" style=\"\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "caption", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postLink", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"fb_post_img_container\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "isPhoto", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                            ");
  stack1 = helpers['if'].call(depth0, "isVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"fb_post_like\">\r\n                            <a style=\"display:none !important\" class=\"likepost\" href=\"javascript:void(0)\">Like</a>\r\n                            <a style=\"display:none !important;margin-top:1px\" href=\"javascript:void(0)\">Comment</a>\r\n\r\n                            <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n            ");
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                <img class=\"fb_post_details_img\" src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "photo.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            ");
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "isSecureIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                    <iframe width=\"100%\" height=\"250px\" frameborder=\"0\" allowfullscreen\r\n                                            src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></iframe>\r\n                                ");
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "isIFrameVideo", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(26, program26, data),fn:self.program(24, program24, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                        <a href=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" target=\"_blank\" class=\"fb_video_player\">\r\n                                            <img style=\"margin-top:50px !important;margin-bottom:50px !important;cursor:pointer;\"\r\n                                                 class=\"fb_post_details_img\" src=\"assets/images/playvideo.png\" alt=\"\"/>\r\n                                        </a>\r\n                                    ");
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                                        <video width=\"100%\" height=\"250\" controls>\r\n                                            <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"video/mp4\">\r\n                                            <source src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "videoUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" type=\"video/ogg\">\r\n                                            Your browser does not support video\r\n                                        </video>\r\n                                    ");
  return buffer;
  }

  data.buffer.push("<div class=\"search_wrapper\">\r\n    <div id=\"twitterData\" style=\"float: left;\" class=\"search_wrapper_root\">\r\n        <div class=\"swipe search_data\">\r\n            <div class=\"send_message_box_parent\" style=\"display:none !important\">\r\n                <input type=\"text\" class=\"send_message_box\" placeholder=\"Search\"/>\r\n            </div>\r\n\r\n            <div class=\"social_accordion_header search_category_numeric\" accordion-callback=\"setTwitterSelected\" onclick=\"\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "isModelUpdated.messages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>Messages</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n                <ul id=\"twitter_msg_results\" class=\"videos-list cleafix nolist search_result\"\r\n                    style=\"max-height: 430px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "twitterMessages", {hash:{
    'itemController': ("FacebookMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                </ul>\r\n            </div>\r\n\r\n\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"setTwitterSelected\" onclick=\"\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "isMyTweetsUpdated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>My Tweets</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n\r\n                <div class=\"send_message_box_parent social_share_box\">\r\n                    <div class=\"fb_post_error temporary\" id=\"post_error\" onclick=\"this.style.display='none'\"></div>\r\n                    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'id': ("tweet_status"),
    'class': ("send_message_box post_status_input"),
    'placeholder': ("What's on your mind?"),
    'type': ("text"),
    'value': ("tweetMessage")
  },hashTypes:{'id': "STRING",'class': "STRING",'placeholder': "STRING",'type': "STRING",'value': "ID"},hashContexts:{'id': depth0,'class': depth0,'placeholder': depth0,'type': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n                    <button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "tweet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("  style=\"margin-bottom:10px\" class=\"post_status_button\">Tweet</button>\r\n                </div>\r\n\r\n                <ul id=\"twitter_my_post_results\" class=\"videos-list cleafix nolist search_result\"\r\n                    style=\"max-height: 430px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "twitterMyPosts", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n            </div>\r\n\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"setTwitterSelected\" onclick=\"\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "isTweetsUpdated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>Tweets</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n                <ul id=\"twitter_post_results\" class=\"videos-list cleafix nolist search_result\"\r\n                    style=\"max-height: 430px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "twitterPosts", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(13, program13, data),fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"searchContent\" id=\"twitterContent\">\r\n        <ul id=\"twitter_msg_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n            ");
  stack1 = helpers.each.call(depth0, "twitterMessageDetails", {hash:{
    'itemController': ("FacebookMessage")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            <li class=\"search_element_wrapper_details send_message_li\">\r\n                <div class=\"fb_post_error temporary\" id=\"message_error\" onclick=\"this.style.display='none'\"></div>\r\n                <div class=\"send_message_box_parent chat_window\">\r\n                    <input id=\"twitter_message_data\" type=\"text\" message-id=\"\" contact-id=\"\"\r\n                           placeholder=\"You know what else I was thinking?\" class=\"send_message_box send_message_input\">\r\n                    <button class=\"send_message_button\"\r\n                            style=\"padding-left:15px !important\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "sendDirectMessage", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">Send\r\n                    </button>\r\n                </div>\r\n            </li>\r\n        </ul>\r\n        <ul id=\"twitter_post_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n            ");
  stack1 = helpers.each.call(depth0, "twitterPostsDetails", {hash:{
    'itemController': ("FacebookPost")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n    </div>\r\n</div>\r\n");
  return buffer;
  
});

Ember.TEMPLATES["usa_today"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://www.usatoday.com/big-page/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n<!--<div id=\"testtmz\"></div>-->\r\n\r\n");
  
});

Ember.TEMPLATES["vimeo/authorize"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <div id=\"vimeoResult\">Please wait, completing authorization....</div>\r\n                ");
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                    <button class=\"vimeoLoginBtn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "onVimeoLoginClick", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Login to Vimeo</button>\r\n                ");
  return buffer;
  }

  data.buffer.push("<div class=\"loginwrapper\" id=\"vimeoLoginBtn\">\r\n    <div class=\"loginContainer\">\r\n        <div class=\"loginform\" align='center'>\r\n            <div class=\"logindiv\" style=\"background-color: transparent !important;border-width:0px\">\r\n                ");
  stack1 = helpers['if'].call(depth0, "isAuthorized", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div><!---->");
  return buffer;
  
});

Ember.TEMPLATES["vimeo/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span>new</span>\r\n                ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        <li class=\"search_element_wrapper\">\r\n                            <div class=\"poster-wrapper search_element video_item\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "_view.contentIndex", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push(">\r\n                                <a class=\"search_video_url\" href=\"javascript:void(0)\">\r\n                                    <span class=\"inner-wrapper\">\r\n                                        <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "thumb.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                    </span>\r\n                                </a>\r\n                                <a class=\"search_video_title\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_video_desc youtube_desc_html\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_video_views\" href=\"javascript:void(0)\">\r\n                                    ");
  stack1 = helpers['if'].call(depth0, "searchResult", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    <span class=\"views_number\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                                </a>\r\n                            </div>\r\n                        </li>\r\n                    ");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                        ");
  stack1 = helpers['if'].call(depth0, "externalSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                    ");
  return buffer;
  }
function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                                            <img src=\"assets/images/live_search.png\" class=\"search_type_icon\">\r\n                                        ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                            ");
  stack1 = helpers.unless.call(depth0, "privateSearch", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                        ");
  return buffer;
  }
function program8(depth0,data) {
  
  
  data.buffer.push("\r\n                                                <img src=\"assets/images/bookmark_search.png\" class=\"search_type_icon\">\r\n                                            ");
  }

function program10(depth0,data) {
  
  
  data.buffer.push("\r\n                            <li style=\"width: 100%;\">\r\n                                <div  class=\"search_no_result\" style=\"display: block;\">\r\n                                    This may take a few minutes while we synchronize your Videos\r\n                                </div>\r\n                            </li>\r\n                    ");
  }

function program12(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        <li class=\"search_element_wrapper\">\r\n                            <div class=\"poster-wrapper search_element video_item\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "displayData", "_view.contentIndex", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],data:data})));
  data.buffer.push(">\r\n                                <a class=\"search_video_url\" href=\"javascript:void(0)\">\r\n                                    <span class=\"inner-wrapper\">\r\n                                        <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "thumb.url", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                                    </span>\r\n                                </a>\r\n                                <a class=\"search_video_title\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_video_desc youtube_desc_html\" href=\"javascript:void(0)\">\r\n                                    ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                                </a>\r\n                                <a class=\"search_video_title search_video_views\" href=\"javascript:void(0)\">\r\n                                    <span class=\"views_number\">");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                                </a>\r\n                            </div>\r\n                        </li>\r\n                    ");
  return buffer;
  }

function program14(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div  class=\"search_no_result\" style=\"display: block;\">\r\n                                This may take a few minutes while we synchronize your subscription videos\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program16(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <li class=\"search_element_wrapper_details\">\r\n                    <div class=\"search_element\" style=\"height:auto !important\">\r\n                        <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                            <span class=\"inner-wrapper\">\r\n                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\"\r\n                             style=\"min-height:inherit !important\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\"\r\n                             style=\"margin-top:5px\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details youtube_video\"\r\n                             href=\"javascript:void(0)\" style=\"\">\r\n                            <iframe src=\"//player.vimeo.com/video/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "itemKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" width=\"100%\" height=\"350px\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details google_video_body youtube_video_details_html description_summary\"\r\n                             style=\"margin-top:3px;");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "descStyle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n\r\n                        <div class=\"read_more_div_background\" style=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "descStyle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></div>\r\n                        <div class=\"read_more_div\" style=\"margin-top:0px;");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "descStyle", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                            <span class=\"read_more\">View More</span>\r\n                        </div>\r\n                    </div>\r\n                </li>\r\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"search_wrapper\">\r\n    <div id=\"vimeoData\" style=\"float: left;\" class=\"search_wrapper_root\">\r\n        <div class=\"swipe search_data\">\r\n\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"App.__container__.lookup('controller:vimeoIndex').setVimeoSelected\" onclick=\"\">\r\n                <!--onclick='' for safari mobile-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "isMyFeedUpdated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>My Feed</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n                <ul id=\"vimeo_video_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 500px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "myfeed", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(10, program10, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n                </ul>\r\n            </div>\r\n\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"App.__container__.lookup('controller:vimeoIndex').setVimeoSelected\" onclick=\"\">\r\n                <!--onclick='' for safari mobile-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "isSubscriptionUpdated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>Subscription</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n                <ul id=\"vimeo_subscription_video_results\" class=\"videos-list cleafix nolist search_result\" style=\"max-height: 500px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "subscription", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div style=\"\" id=\"vimeoContent\" class=\"searchContent\">\r\n        <ul id=\"vimeo_video_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n            ");
  stack1 = helpers.each.call(depth0, "vimeoVideoDetails", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n    </div>\r\n</div>");
  return buffer;
  
});

Ember.TEMPLATES["vine"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://vine.co\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["weatherbug"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://weather.weatherbug.com/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["wikimedia"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  


  data.buffer.push("<iframe class=\"mainFrame\" src=\"http://www.wikimedia.org/\" frameborder=\"0\" allowtransparency=\"true\"></iframe>\r\n");
  
});

Ember.TEMPLATES["yelp"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        ");
  stack1 = helpers.each.call(depth0, "filteredInterests", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                            <!-- don't format the following line as we don't want to add spaces before interest name due to conditions inside controller-->\r\n                            ");
  stack1 = (helper = helpers['ic-autocomplete-option'] || (depth0 && depth0['ic-autocomplete-option']),options={hash:{
    'value': ("id"),
    'label': ("name"),
    'title': ("name")
  },hashTypes:{'value': "ID",'label': "ID",'title': "ID"},hashContexts:{'value': depth0,'label': depth0,'title': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ic-autocomplete-option", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            <!-- don't format the previous line as we don't want to add spaces before interest name due to conditions inside controller-->\r\n                        ");
  return buffer;
  }
function program3(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                            <ic-autocomplete-option>No results</ic-autocomplete-option>\r\n                        ");
  }

function program7(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                        ");
  stack1 = helpers.each.call(depth0, "filteredPlaces", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                    ");
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\r\n                            ");
  stack1 = (helper = helpers['ic-autocomplete-option'] || (depth0 && depth0['ic-autocomplete-option']),options={hash:{
    'value': ("placeId"),
    'label': ("name"),
    'title': ("name")
  },hashTypes:{'value': "ID",'label': "ID",'title': "ID"},hashContexts:{'value': depth0,'label': depth0,'title': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ic-autocomplete-option", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        ");
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                ");
  stack1 = helpers.each.call(depth0, "model.placeFavourites", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                    ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/place", options) : helperMissing.call(depth0, "partial", "social/place", options))));
  data.buffer.push("\r\n                                ");
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    ");
  stack1 = helpers.unless.call(depth0, "searchFavInProgress", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program15(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <div style=\"padding: 10px\">\r\n                                            You don't have favourite places around this location\r\n                                        </div>\r\n                                    ");
  }

function program17(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "currentFavouritesIsNull", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }
function program18(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div style=\"padding: 10px\">\r\n                                        This may take a few minutes while we get favourites places around your new location\r\n                                    </div>\r\n                                ");
  }

function program20(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    ");
  stack1 = helpers.each.call(depth0, "model.currentFavourites", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n                                        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/place", options) : helperMissing.call(depth0, "partial", "social/place", options))));
  data.buffer.push("\r\n                                    ");
  return buffer;
  }

function program23(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <div style=\"padding: 10px\">\r\n                                            This may take a few minutes while we get favourite places around you\r\n                                        </div>\r\n                                    ");
  }

function program25(depth0,data) {
  
  
  data.buffer.push("\r\n                        <div class=\"yelpLoading\" >\r\n                            ( loading places... )\r\n                        </div>\r\n                        ");
  }

function program27(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                            <span ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getLocation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" id=\"loctooltip\" style=\"float: right;padding-top: 2px;height: 42px\">\r\n                                <img src=\"assets/images/position2.png\">\r\n                            </span>\r\n                        ");
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                ");
  stack1 = helpers.each.call(depth0, "model.placeMostPopularPaged", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(30, program30, data),fn:self.program(12, program12, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    ");
  stack1 = helpers.unless.call(depth0, "searchInProgress", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(31, program31, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program31(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <div style=\"padding: 10px\">\r\n                                            There is no popular places around this location\r\n                                        </div>\r\n                                    ");
  }

function program33(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                ");
  stack1 = helpers['if'].call(depth0, "currentMostPopularIsNull", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(36, program36, data),fn:self.program(34, program34, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                            ");
  return buffer;
  }
function program34(depth0,data) {
  
  
  data.buffer.push("\r\n                                    <div style=\"padding: 10px\">\r\n                                        This may take a few minutes while we get popular places around your new location\r\n                                    </div>\r\n                                ");
  }

function program36(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                                    ");
  stack1 = helpers.each.call(depth0, "model.currentMostPopular", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(37, program37, data),fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                                ");
  return buffer;
  }
function program37(depth0,data) {
  
  
  data.buffer.push("\r\n                                        <div style=\"padding: 10px\">\r\n                                            There is no popular places around you\r\n                                        </div>\r\n                                    ");
  }

function program39(depth0,data) {
  
  var buffer = '', helper, options;
  data.buffer.push("\r\n            ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "social/placedetails", options) : helperMissing.call(depth0, "partial", "social/placedetails", options))));
  data.buffer.push("\r\n        ");
  return buffer;
  }

  data.buffer.push("<div class=\"search_wrapper\">\r\n    <div class=\"search_wrapper_root pull-left\">\r\n        <div class=\"swipe search_data search_data_yelp\">\r\n            <div class=\"yelp-search-box\">\r\n                <div class=\"interest pull-left\">\r\n                    ");
  stack1 = (helper = helpers['ic-autocomplete'] || (depth0 && depth0['ic-autocomplete']),options={hash:{
    'value': ("selectedInterest"),
    'on-input': ("onFilterInterests"),
    'on-select': ("onSelectInterest"),
    'placeholder': ("Interests")
  },hashTypes:{'value': "ID",'on-input': "STRING",'on-select': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'on-input': depth0,'on-select': depth0,'placeholder': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ic-autocomplete", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n                <div class=\"city pull-left\">\r\n                    ");
  stack1 = (helper = helpers['ic-autocomplete'] || (depth0 && depth0['ic-autocomplete']),options={hash:{
    'value': ("selectedPlace"),
    'on-input': ("onFilterPlaces"),
    'on-select': ("onSelectPlace"),
    'placeholder': ("Location")
  },hashTypes:{'value': "ID",'on-input': "STRING",'on-select': "STRING",'placeholder': "STRING"},hashContexts:{'value': depth0,'on-input': depth0,'on-select': depth0,'placeholder': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ic-autocomplete", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </div>\r\n                <div class=\"find pull-left\">\r\n                    <button class=\"spButton\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "searchPlaces", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">FIND</button>\r\n                </div>\r\n            </div>\r\n            <div id=\"yelp_accordion\">\r\n                <div class=\"favorites_accordion\">\r\n                    <div class=\"accordion_header\" data-toggle=\"collapse\" data-target=\"#favorites\"\r\n                         data-parent=\"#yelp_accordion\" onclick=\"$('#listings').collapse('hide')\">\r\n                        <img src=\"/assets/images/favoritesIcon.png\" alt=\"FAVORITES\" class=\"pull-left ico\"/>\r\n\r\n                        <div class=\"pull-left\">FAVORITES</div>\r\n                        <div class=\"arrow pull-right\">&nbsp</div>\r\n                        <span class=\"count pull-right\">");
  stack1 = helpers._triageMustache.call(depth0, "favouriteCount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                    </div>\r\n                    <div id=\"favorites\" class=\"accordion_content panel-collapse\">\r\n                        <ul class=\"cleafix nolist placeList\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "searchFavMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n                <div>\r\n                    <div class=\"accordion_header collapsed\" style=\"position:relative\" data-toggle=\"collapse\" data-target=\"#listings\"\r\n                         data-parent=\"#yelp_accordion\" onclick=\"$('#favorites').collapse('hide')\">\r\n                        <div class=\"pull-left\">Most Popular</div>\r\n                        ");
  stack1 = helpers['if'].call(depth0, "paging", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        <div class=\"arrow pull-right\">&nbsp</div>\r\n                        ");
  stack1 = helpers.unless.call(depth0, "searchMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(27, program27, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        <span class=\"count pull-right\">");
  stack1 = helpers._triageMustache.call(depth0, "mostPopularCount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</span>\r\n                    </div>\r\n                    <div id=\"listings\" class=\"accordion_content panel-collapse collapse\">\r\n                        <ul class=\"cleafix nolist placeList\">\r\n                            ");
  stack1 = helpers['if'].call(depth0, "searchMode", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(33, program33, data),fn:self.program(29, program29, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"searchContent \">\r\n        ");
  stack1 = helpers.each.call(depth0, "model.placeDetails", {hash:{
    'itemController': ("SocialPlace")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(39, program39, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n    </div>\r\n</div>\r\n\r\n");
  return buffer;
  
});

Ember.TEMPLATES["youtube"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("\r\n                    <span>new</span>\r\n                ");
  }

function program3(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                        ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.VideoView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                    ");
  return buffer;
  }

function program5(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display: block\">\r\n                                This may take a few minutes while we synchronize the most popular Videos\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program7(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display:block\">\r\n                                This may take a few minutes while we synchronize your subscription videos\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program9(depth0,data) {
  
  
  data.buffer.push("\r\n                        <li style=\"width: 100%;\">\r\n                            <div class=\"search_no_result\" style=\"display:block\">\r\n                                This may take a few minutes while we synchronize the videos you have watched\r\n                            </div>\r\n                        </li>\r\n                    ");
  }

function program11(depth0,data) {
  
  
  data.buffer.push("\r\n                    <div class=\"search_no_result\" style=\"display:block\">\r\n                        This may take a few minutes while we synchronize the Recommended Videos\r\n                        <!--Recommended videos not supported-->\r\n                    </div>\r\n                ");
  }

function program13(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\r\n                    ");
  stack1 = helpers['if'].call(depth0, "recommendedEmpty", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                ");
  return buffer;
  }
function program14(depth0,data) {
  
  
  data.buffer.push("\r\n                        <div class=\"search_no_result\" style=\"display:block\">\r\n                            We can not get recommended videos for this account\r\n                            <!--   Recommended videos not supported-->\r\n                        </div>\r\n                    ");
  }

function program16(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\r\n                <li class=\"search_element_wrapper_details\">\r\n                    <div class=\"search_element\" style=\"height:auto !important\">\r\n                        <div class=\"search_fb_url\" href=\"javascript:void(0)\">\r\n                            <span class=\"inner-wrapper\">\r\n                                <img src=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.imageUrl", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\" alt=\"\"/>\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details\" href=\"javascript:void(0)\"\r\n                             style=\"min-height:inherit !important\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_name_details\" href=\"javascript:void(0)\"\r\n                             style=\"margin-top:5px\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "postedBy.displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details youtube_video\"\r\n                             href=\"javascript:void(0)\" style=\"\">\r\n                            <iframe width=\"100%\" height=\"350px\" frameborder=\"0\" allowfullscreen\r\n                                    src=\"https://www.youtube.com/embed/");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "itemKey", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></iframe>\r\n                        </div>\r\n                        <div class=\"search_video_title search_fb_subject_details google_video_body youtube_video_details_html description_summary\"\r\n                             style=\"margin-top:3px;");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "descriptionVisibility", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                            ");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\r\n                        </div>\r\n\r\n                        <div class=\"read_more_div_background\" style=\"");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "viewMoreVisibility", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\"></div>\r\n                        <div class=\"read_more_div\" style=\"margin-top:0px;");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "viewMoreVisibility", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\">\r\n                            <span class=\"read_more\">View More</span>\r\n                        </div>\r\n\r\n                        <div class=\"fb_post_like\" style=\"display:none !important\">\r\n                            <a href=\"javascript:void(0)\">Like</a>\r\n                            <span>");
  data.buffer.push(escapeExpression(helpers.unbound.call(depth0, "getDateString", "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push("</span>\r\n                        </div>\r\n                        <div class=\"send_comment_box_parent chat_window\" style=\"display:none !important\">\r\n                            <input type=\"text\" placeholder=\"Write a comment..\"\r\n                                   class=\"send_message_box send_message_input\">\r\n                            <button class=\"send_message_button\">Comment</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                </li>\r\n            ");
  return buffer;
  }

  data.buffer.push("<div class=\"search_wrapper\">\r\n    <div id=\"youtubeData\" style=\"float: left;\" class=\"search_wrapper_root\">\r\n        <div class=\"swipe search_data\">\r\n\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"setYoutubeSelected\" onclick=\"\">\r\n                <!--onclick='' for safari mobile-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "isMostPopularUpdated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>Most Popular</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n\r\n                <div class=\"send_message_box_parent social_share_box\" style=\"display:none !important\">\r\n                    <input type=\"text\" class=\"send_message_box post_status_input\"\r\n                           placeholder=\"Share What's new...\"/>\r\n                    <button class=\"post_status_button\">SHARE</button>\r\n                </div>\r\n\r\n                <ul id=\"youTube_video_results\" class=\"videos-list cleafix nolist search_result\"\r\n                    style=\"max-height: 500px\">\r\n\r\n                    ");
  stack1 = helpers.each.call(depth0, "mostPopular", {hash:{
    'itemController': ("YoutubeVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n\r\n            </div>\r\n\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"setYoutubeSelected\" onclick=\"\">\r\n                <!--onclick='' for safari mobile-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "isSubscriptionUpdated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>My Subscriptions</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n                <ul id=\"youtube_subscribe_results\" class=\"videos-list cleafix nolist search_result\"\r\n                    style=\"max-height: 500px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "subscription", {hash:{
    'itemController': ("YoutubeVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(7, program7, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n                <!--fb_local_loading_post-->\r\n\r\n            </div>\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"setYoutubeSelected\" onclick=\"\">\r\n                <!--onclick='' for safari mobile-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "isHistoryUpdated", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                <div>My History</div>\r\n            </div>\r\n            <div class=\"social_accordion\">\r\n                <ul id=\"youtube_history_results\" class=\"videos-list cleafix nolist search_result\"\r\n                    style=\"max-height: 500px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "history", {hash:{
    'itemController': ("YoutubeVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(9, program9, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n            </div>\r\n            <div class=\"social_accordion_header search_category\" accordion-callback=\"setYoutubeSelected\" onclick=\"\" style=\"visibility: hidden\">\r\n                <!--onclick='' for safari mobile-->\r\n                <span>new</span>\r\n\r\n                <div>Recommended</div>\r\n            </div>\r\n            <div class=\"social_accordion\" style=\"visibility: hidden\">\r\n                <ul id=\"youtube_recommended_results\" class=\"videos-list cleafix nolist search_result\"\r\n                    style=\"max-height: 500px\">\r\n                    ");
  stack1 = helpers.each.call(depth0, "recommended", {hash:{
    'itemController': ("YoutubeVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n                </ul>\r\n                <!--fb_recommended_loading_post-->\r\n                ");
  stack1 = helpers['if'].call(depth0, "recommendedNotSync", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div style=\"\" id=\"youTubeContent\" class=\"searchContent\">\r\n        <ul id=\"youtube_video_details\" class=\"videos-list cleafix nolist search_result searchInnerContent\">\r\n            ");
  stack1 = helpers.each.call(depth0, "youtubeVideoDetails", {hash:{
    'itemController': ("SocialVideo")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n        </ul>\r\n    </div>\r\n</div>");
  return buffer;
  
});