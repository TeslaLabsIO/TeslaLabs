(function () {
    'use strict';
    App.WheelDirector = Ember.Object.extend({});
    App.WheelDirector.reopenClass({
        version: 7,

        initialCategories: [
            {key: 1, index: 2, name: "social", displayName: "SOCIAL"},
            {key: 2, index: 1, name: "email", displayName: "EMAIL"},
            {key: 3, index: 0, name: "video", displayName: "VIDEO"},
            {key: 4, index: 3, name: "news", displayName: "NEWS"},
            {key: 5, index: 4, name: "sport", displayName: "SPORT"}
        ],
        initialBlades: [
            {key: 1, index: 0, show: true, categoryKey: 1, displayName: "LinkedIn", name: "linkedin", url: "http://linkedin.com"},
            {key: 2, index: 1, show: true, categoryKey: 1, displayName: "Twitter", name: "twitter", url: "http://twitter.com"},
            {key: 3, index: 2, show: true, categoryKey: 1, displayName: "Facebook", name: "facebook", url: "http://facebook.com"},
            {key: 4, index: 3, show: true, categoryKey: 2, displayName: "Gmail", name: "gmail", url: "http://gmail.com"},
            {key: 5, index: 4, show: true, categoryKey: 3, displayName: "Youtube", name: "youtube", url: "http://youtube.com"},
            {key: 6, index: 5, show: true, categoryKey: 3, displayName: "Vimeo", name: "vimeo", url: "http://vimeo.com"},
            {key: 7, index: 6, show: false, categoryKey: 4, displayName: "Gizmodo", name: "gizmodo", url: "http://gizmodo.com"},
            {key: 8, index: 7, show: false, categoryKey: 4, displayName: "Gawker", name: "gawker", url: "http://gawker.com"},
            {key: 9, index: 8, show: false, categoryKey: 5, displayName: "Deadspin", name: "deadspin", url: 'http://deadspin.com'},
            {key: 10, index: 9, show: false, categoryKey: 1, displayName: "LivingSocial", name: "livingsocial", url: "http://LivingSocial.com"},
            {key: 11, index: 10, show: false, categoryKey: 4, displayName: "Expedia", name: "expedia", url: "http://expedia.com"},
            {key: 12, index: 11, show: false, categoryKey: 4, displayName: "USA TODAY", name: "usa_today", url: "http://usa_today.com"},
            {key: 13, index: 12, show: false, categoryKey: 4, displayName: "Best Buy", name: "bestbuy", url: 'http://bestbuy.com'},
            {key: 14, index: 13, show: false, categoryKey: 4, displayName: "Last.fm", name: "last_fm", url: "http://last_fm.com"},
            {key: 15, index: 14, show: true, categoryKey: 1, displayName: 'Yelp', name: "yelp", url: "http://yelp.com"},
            {key: 16, index: 15, show: false, categoryKey: 4, displayName: "Flixster", name: "flixster", url: "http://flixster.com"},
            {key: 17, index: 16, show: false, categoryKey: 4, displayName: "Jezebel", name: "jezebel", url: "http://jezebel.com"},
            {key: 18, index: 17, show: false, categoryKey: 4, displayName: "CNET", name: "cnet", url: 'http://cnet.com', category: 'News'},
            {key: 19, index: 18, show: false, categoryKey: 4, displayName: "Netflix", name: "netflix", url: "http://Netflix.com"},
            {key: 20, index: 19, show: false, categoryKey: 4, displayName: "Kotaku", name: "kotaku", url: "http://kotaku.com"},
            {key: 21, index: 20, show: false, categoryKey: 4, displayName: "WeatherBug", name: "weatherbug", url: "http://weatherbug.com"},
            {key: 22, index: 21, show: true, categoryKey: 1, displayName: "Tumblr", name: "tumblr", url: "http://tumblr.com"},
            {key: 23, index: 22, show: true, categoryKey: 1, displayName: "Reddit", name: "reddit", url: "http://reddit.com/"}//,
            //{key: 0, index: 0, show: true, categoryKey: 1, displayName: "Google", name: "google", url: "http://google.com"},
            //{key: 0,index: 0,show: false,categoryKey: 3, displayName: "Vine", name: "vine", url: "http://vine.co"},
            //{key: 0,index: 0,show: false,categoryKey: 5, displayName: "ESPN", name: "espn", url: "http://espn.go.com"},
            //{key: 0,index: 0,show: false,categoryKey: 4, displayName: 'Wikimedia', name: "wikimedia", url: "http://wikimedia.com"}
        ],

        emptyItemsCount: 0,
        wheelCategories: [],
        blades: [],
        categories: [],

        animate: function animate(obj, show, rotation, callback) {
            $(obj).each(function (index) {
                console.log($(this));
                if (show) {
                    if (Modernizr.touch) {
                        $(this).show().stop(true).animate({
                            'rotate': rotation * index + 99
                        }, 1000, function () {
                            if (callback) {
                                callback();
                            }
                        });
                    } else {
                        $(this).show().stop(true).animate({
                            'rotate': rotation * index + 99
                        }, 2000, function () {
                            if (callback) {
                                callback();
                            }
                        });
                    }
                } else {
                    if (Modernizr.touch) {
                        $(this).stop(true).animate({
                            'rotate': 0//-45
                        }, 500, function () {
                            $(this).hide();
                            if (callback) {
                                callback();
                            }
                        });
                    }
                    else {
                        $(this).stop(true).animate({
                            'rotate': 0//-45
                        }, 1000, function () {
                            $(this).hide();
                            if (callback) {
                                callback();
                            }
                        });
                    }
                }
            })
        },
        innerAnimate: function innerAnimate(obj, show, rotation, callback) {
            $(obj).each(function (index) {
                if (show) {
                    // $(this).animate({'rotate':rotation*index},1000)
                    if (Modernizr.touch) {
                        $(this).show().stop(true).animate({
                            'rotate': rotation[index] + 99
                        }, 1000, function () {
                            if (callback) {
                                callback();
                            }
                        });
                    } else {
                        $(this).show().stop(true).animate({
                            'rotate': rotation[index] + 99
                        }, 2000, function () {
                            if (callback) {
                                callback();
                            }
                        });
                    }
                } else {
                    if (Modernizr.touch) {
                        $(this).stop(true).animate({
                            'rotate': 0//-45
                        }, 500, function () {
                            $(this).hide();
                            if (callback) {
                                callback();
                            }
                        });
                    }
                    else {
                        $(this).stop(true).animate({
                            'rotate': 0//-45
                        }, 1000, function () {
                            $(this).hide();
                            if (callback) {
                                callback();
                            }
                        });
                    }
                }
            })
        },

        // blades
        path: function () {
            return './assets/images/blades/';
        },
        image: function (name, type) {
            switch (type) {
                case 'active':
                    return 'url(' + this.path() + name + '-active.png)';
                    break;
                case 'active-notif':
                    return 'url(' + this.path() + name + '-active-notif.png)';
                    break;
                case 'normal-notif':
                    return 'url(' + this.path() + name + '-inactive-notif.png)';
                    break;
                default:
                    return 'url(' + this.path() + name + '.png)';
                    break;
            }
        },
        show: function () {
            var fins = $('.fin').show();
            var fans = $('#sprocket').find('li.blades').css('display', 'block');

            var $inner = $('.inner-wheel ul');
            $inner.css('rotate', 0);
            var innerfans = $inner.find('li').css('display', 'block');
            var innerrotation = (360 / fans.length).toFixed(0) * 1;
            var rotationArr = [];
            var wheelItemsCount = (this.emptyItemsCount * .5).toFixed(0) * 1;
            for (var i = 0; i < this.wheelCategories.length; i++) {
                if (i == 0) {
                    rotationArr.push(((this.emptyItemsCount * .5).toFixed(0) * innerrotation) + ((((this.wheelCategories[i].count - 1) * .5) * innerrotation).toFixed(0) * 1))
                }
                else if (this.wheelCategories[i].count == 1) {
                    rotationArr.push((wheelItemsCount).toFixed(0) * innerrotation);
                }
                else {
                    rotationArr.push(((wheelItemsCount).toFixed(0) * innerrotation) + ((((this.wheelCategories[i].count - 1) * .5) * innerrotation).toFixed(0) * 1))
                }
                wheelItemsCount += this.wheelCategories[i].count;
            }

            App.WheelDirector.innerAnimate(innerfans, true, rotationArr);

            setTimeout(function () {
                $('#sprocket').css('rotate', 0);
                var rotation = (360 / fans.length).toFixed(0);
                App.WheelDirector.animate(fans, true, rotation);
            });
        },
        hide: function () {
            var angle = $('#sprocket').css('rotate');
            var abs = Math.abs(angle);

            if (!(abs >= 80 && abs <= 280)) {
                App.WheelDirector.animate($('#sprocket li.blades'), false, 0, function () {
                    $('#sprocket').css({
                        'rotate': 0
                    });
                });
            } else {
                var rotation;
                if (angle > 0) {
                    rotation = (angle > 180) ? 60 : 270;
                } else {
                    rotation = (angle > -180) ? -270 : 60;
                }
                $('#sprocket').animate({
                    'rotate': rotation
                }, function () {
                    App.WheelDirector.animate($('#sprocket li.blades'), false, 0, function () {
                        $('#sprocket').css({
                            'rotate': 0
                        });
                    });
                });
            }

            var innerAngle = $('.inner-wheel ul').css('rotate');
            var innerAbs = Math.abs(innerAngle);

            if (!(innerAbs >= 80 && innerAbs <= 280)) { //alert(0);
                App.WheelDirector.animate($('.inner-wheel ul li'), false, 0, function () {
                    $('.inner-wheel ul').css({
                        'rotate': 0
                    });
                });
            } else { //alert(1);
                var innerRotation;
                if (innerAngle > 0) {
                    innerRotation = (innerAngle > 180) ? 60 : 270;
                } else {
                    innerRotation = (innerAngle > -180) ? -270 : 60;
                }
                $('.inner-wheel ul').animate({
                    'rotate': innerRotation
                }, function () {
                    App.WheelDirector.animate($('.inner-wheel ul li'), false, 0, function () {
                        $('.inner-wheel ul').css({
                            'rotate': 0
                        });
                    });
                });
            }
        },
        routeToLocation: function routeToLocation(location) {
            window.location = '#/' + location;
            setTimeout(function () {
                App.WheelDirector.hide();
            }, 200)
        },

        numToChar: function (num) {
            return String.fromCharCode(97 + num);
        },
        getBladeByIndex: function (index) {
            var self = App.WheelDirector;
            var options = self.blades;
            // sort options
            options = _.sortBy(options, function (item) {
                return self.numToChar(self.getCategoryItem(item.categoryKey).index) + (item.index < 10 ? ('0' + item.index) : item.index);
            });

            for (var i = 0; i < options.length; i++) {
                if (options[i].index == index)
                    return options[i];
            }

            return null;
        },
        setBladeItemIndex: function (key, index) {
            for (var i = 0; i < this.blades.length; i++) {
                if (this.blades[i].key == key) {
                    this.blades[i].index = index;
                    return;
                }
            }
        },
        setCategoryItemIndex: function (key, index) {
            for (var i = 0; i < this.categories.length; i++) {
                if (this.categories[i].key == key) {
                    this.categories[i].index = index;
                    return;
                }
            }
        },
        addCategory: function addCategory(cat, item, categories) {
            var found = false;
            for (var i = 0; i < categories.length; i++)
                if (cat == categories[i].key) {
                    categories[i].count += 1;
                    categories[i].items.push(item);
                    found = true;
                }

            if (!found)
                categories.push({key: cat, count: 1, items: [item]});
        },
        getCategoryItem: function getCategoryItem(key) {
            var categories = _.isArray(this.categories) && this.categories.length > 0 ? this.categories : this.initialCategories;
            return _.find(categories, function (item) {
                return item.key === key;
            });
        },
        isOnlyItemInCategory: function isOnlyItemInCategory(item, cat, categories) {
            for (var i = 0; i < categories.length; i++)
                if (cat == categories[i].key && categories[i].count == 1 && item.key == categories[i].items[0].key) {
                    return true
                }
            return false
        },
        isFirstItemInCategory: function isFirstItemInCategory(item, cat, categories) {
            for (var i = 0; i < categories.length; i++)
                if (cat == categories[i].key && categories[i].count > 1) {
                    if (item.key == categories[i].items[0].key)
                        return true;
                }
            return false
        },
        isLastItemInCategory: function isLastItemInCategory(item, cat, categories) {
            for (var i = 0; i < categories.length; i++)
                if (cat == categories[i].key && categories[i].count > 1) {
                    if (item.key == categories[i].items[categories[i].items.length - 1].key)
                        return true;
                }
            return false
        },

        drag: false,
        oldX: 0,
        oldY: 0,
        currentX: 0,
        currentY: 0,
        currentRotation: 0,
        oldRotation: 0,
        delta: 0,
        rotationFromOrigin: 0,
        deltaAnimate: 0,
        rotV: 0,
        //conversion utilities
        toRAD: 1 / 180 * Math.PI,
        toDEG: 180 / Math.PI,
        intervalId: null,
        startIndex: null,

        rotateFan: function rotateFan() {
            this.rotV *= .85;
            this.delta += this.rotV;
            $("ul#sprocket").css("rotate", this.delta);
            $(".inner-wheel ul").css("rotate", this.delta);
            // alert(delta);

            if (Math.abs(this.rotV) < .05) {
                window.clearInterval(this.intervalId);
                document.getElementById('soundcontainerWheel').children[0].pause();
            }
        },
        getAngle: function getAngle(dx, dy) {
            var ang;
            if (dx != 0) {
                var rad = Math.atan(dy / dx) + (dx < 0 ? Math.PI : 0);
                ang = rad * this.toDEG;
                if (ang < 0) ang += 360;
            } else {
                ang = dy > 0 ? 90 : 270;
            }
            return ang;
        },
        getAngleBetweenPoints: function getAngleBetweenPoints(p1, p2) {
            var dx = p1.x - p2.x;
            var dy = p1.y - p2.y;
            return App.WheelDirector.getAngle(dx, dy)
        },
        events: {
            click: function (e) {
                if (this.target != '_blank') {
                    e.preventDefault();
                    $('#' + this.target)
                        .attr('src', this.href);
                } else {
                    window.open(this.href);
                }
            },
            mouseDown: function (e) {
                switch (e.type) {
                    case 'mousedown':
                        e.preventDefault();
                    case 'touchstart':
                        App.WheelDirector.drag = true;
                        App.WheelDirector.rotV = 0;
                        window.clearInterval(App.WheelDirector.intervalId);
                        break
                }
            },
            mouseUp: function (e) {
                switch (e.type) {
                    case 'mouseup':
                        e.preventDefault();
                    case 'touchend':
                        App.WheelDirector.drag = false;
                        App.WheelDirector.oldRotation = 0;
                        App.WheelDirector.currentRotation = 0;
                        App.WheelDirector.rotationFromOrigin = 0;
                        App.WheelDirector.intervalId = window.setInterval(App.WheelDirector.rotateFan, 33);
                        break;
                }
            },
            mouseMove: function (e) {
                e.preventDefault();
                var xOffset = 0; //left
                var yOffset = parseInt($(window).height()) * .5; //middle of screen
                if (App.WheelDirector.drag) {

                    if (e.type == 'touchmove') {
                        var touch = e.originalEvent.touches[0];
                        App.WheelDirector.currentX = touch.pageX;
                        App.WheelDirector.currentY = touch.pageY;
                    }
                    else {
                        App.WheelDirector.currentX = e.pageX;
                        App.WheelDirector.currentY = e.pageY;
                    }

                    if (App.WheelDirector.rotationFromOrigin == 0) {
                        App.WheelDirector.rotationFromOrigin = App.WheelDirector.getAngleBetweenPoints({
                            x: xOffset,
                            y: yOffset
                        }, {
                            x: App.WheelDirector.currentX,
                            y: App.WheelDirector.currentY
                        }) - 180;
                    } else {
                        App.WheelDirector.currentRotation = (App.WheelDirector.getAngleBetweenPoints({
                            x: xOffset,
                            y: yOffset
                        }, {
                            x: App.WheelDirector.currentX,
                            y: App.WheelDirector.currentY
                        }) - 180) - App.WheelDirector.rotationFromOrigin;

                        App.WheelDirector.delta += (App.WheelDirector.currentRotation - App.WheelDirector.oldRotation);
                        App.WheelDirector.rotV = App.WheelDirector.currentRotation - App.WheelDirector.oldRotation;
                        document.getElementById('soundcontainerWheel').children[0].play();
                        $("ul#sprocket").css("rotate", App.WheelDirector.delta);
                        $(".inner-wheel ul").css("rotate", App.WheelDirector.delta);
                        App.WheelDirector.oldRotation = App.WheelDirector.currentRotation;
                    }

                }
            },
            hover: function (e) {
                var notify;
                // alert(e.type);
                switch (e.type) {
                    case 'mouseenter':
                    case 'touchstart':
                        $(this).find('img.active').show();
                        break;
                    case 'mouseleave':
                    case 'touchend':
                        var selfActive = this;
                        if (Modernizr.touch) {
                            setTimeout(function () {
                                $(selfActive).find('img.active').hide();
                            }, 250);
                        } else {
                            $(selfActive).find('img.active').hide();
                        }
                        break;
                }
            }
        },
        toggleWheel: function () {
            if (!$('#sprocket .blades').is(':visible')) {
                App.WheelDirector.delta = 0;
                App.WheelDirector.show();
            } else {
                App.WheelDirector.hide();
            }
        },

        initializeWheel: function () {
            var self = this;
            var options = this.initialBlades;
            var wheelItems = [],
                addedItems = [],
                categories = [],
                wheel_categories = this.initialCategories,
                emptyItemsCount = 0,
                remaining = 0;

            // sort wheel categories initial array
            wheel_categories = _.sortBy(wheel_categories, 'index');

            // sort wheel initial items array
            options = _.sortBy(options, function (item) {
                return self.numToChar(self.getCategoryItem(item.categoryKey).index) + (item.index < 10 ? ('0' + item.index) : item.index);
            });

            for (var i = 0; i < options.length; i++)
                options[i].index = i;

            // clear wheel html and save reference
            var ul = $('#sprocket').html('');

            // get wheel version
            var version = APP_Cookies.getCookie(APP_Cookies.wheelVersion, null);

            var wlist = APP_Storage.getValue(APP_Storage.wheelItems(), [], true);
            var resetFlag = wlist.length > 0 && _.isUndefined(wlist[0].categoryKey);


            // get wheel categories from local-storage
            var storedCategories = APP_Storage.getValue(APP_Storage.wheelCategories(), []);
            if (storedCategories.length > 0 && version != null && version == this.version && !resetFlag)
                wheel_categories = this.categories = JSON.parse(storedCategories);
            else {
                console.log("new version saved: categories");
                APP_Storage.setValue(APP_Storage.wheelCategories(), JSON.stringify(wheel_categories), false, true);
                this.categories = wheel_categories;
            }

            // get wheel blades from local-storage
            var storedBlades = APP_Storage.getValue(APP_Storage.wheelItems(), []);
            if (storedBlades.length > 0 && version != null && version == this.version && !resetFlag) {
                options = this.blades = JSON.parse(storedBlades);
            }
            else {
                console.log("new version saved: blades");
                APP_Storage.setValue(APP_Storage.wheelItems(), JSON.stringify(options), false, true);
                saveWheelOnCookie();
            }

            if (version == null || version != this.version) {
                console.log("new version saved: cookie");
                APP_Cookies.setCookie(APP_Cookies.wheelVersion, this.version);
            }

            // sort wheel initial items array
            options = this.blades = _.sortBy(options, function (item) {
                return self.numToChar(self.getCategoryItem(item.categoryKey).index) + (item.index < 10 ? ('0' + item.index) : item.index);
            });
            // sort wheel categories initial array
            wheel_categories = _.sortBy(wheel_categories, 'index');
            _.each(wheel_categories, function (item, index) {
                item.index = index;
            });

            // get wheel should be shown in wheel
            _.each(options, function (item) {
                if (item.show === true)
                    addedItems.push(item);
            });

            // add categories
            _.each(addedItems, function (item) {
                self.addCategory(item.categoryKey, item, categories);
            });

            //sort wheel shown items categories
            categories = _.sortBy(categories, function (item) {
                return self.getCategoryItem(item.key).index;
            });

            // sort wheel shown items in each category
            _.each(categories, function (cat) {
                cat.items = _.sortBy(cat.items, 'index');
            });

            // add networks wheel items for each category
            _.each(categories, function (category) {
                _.each(category.items, function (item) {
                    wheelItems.push(item);
                });
            });

            // add empty wheel items
            remaining = 20 - wheelItems.length;
            for (var e = 0; e < remaining; e++)
                wheelItems.push({show: false, index: wheelItems.length});

            //this.emptyItemsCount = remaining;
            this.wheelCategories = categories;

            // build wheel
            _.each(wheelItems, function (item, index) {
                var li = $('<li>').addClass('blades');
                var div = $('<div>');
                var anchor;

                var indx = ((index + 1) - (Math.floor(((index + 1) / 10)) * 10));
                indx = indx < 0 ? (indx * -1) : indx;
                indx = indx == 0 ? 10 : indx;

                var innerImg = '';
                var catOdd = item.categoryKey ? self.getCategoryItem(item.categoryKey).index % 2 == 0 : false;
                if (item.show == false)
                    innerImg = 'inner_odd.png';
                else if (!catOdd)
                    innerImg = 'inner_even.png';
                else if (self.isOnlyItemInCategory(item, item.categoryKey, categories) && catOdd)
                    innerImg = 'inner_odd.png';
                else if (self.isFirstItemInCategory(item, item.categoryKey, categories))
                    innerImg = 'shadow-top.png';
                else if (self.isLastItemInCategory(item, item.categoryKey, categories))
                    innerImg = 'shadow-bottom.png';
                else
                    innerImg = 'no-shadow.png';

                if (item.show === false) {
                    anchor = new function () {
                        return $('<a>', {
                            'id': 'wheelItem' + index,
                            'href': '',
                            'clickSound': "button20"
                        });
                    };

                    div.append($('<img>', {
                        'class': 'bg',
                        'src': self.path() + (index % 2 == 0 ? 'even' : 'odd') + '.png'
                    }));
                    div.append($('<img>', {
                        'class': 'bg',
                        'src': self.path() + innerImg  //'inner_even.png' // (index % 2 == 0 ? 'even' : 'odd') + '.png'
                    }));
                    div.append($('<img>', {
                        'class': 'bg',
                        'src': self.path() + 'color_' + indx + '.png'
                    }));
                    div.append($('<img>', {
                        'class': 'active',
                        'src': self.path() + 'active_odd.png'
                    }));
                    div.append($('<img>', {
                        'class': 'bg',
                        'src': self.path() + 'empty_left.png'
                    }));

                    div.data('name', 'empty');
                    li.append(anchor.append(div));
                    ul.append(li);

                    var mc = new Hammer(anchor[0]);
                    mc.add(new Hammer.Tap());
                    mc.on("tap", App.WheelDirector.showSettingPopup);
                } else {
                    anchor = new function () {
                        var href = '';
                        if (Modernizr.touch && ( APP_Storage.getValue(APP_Storage.appTypeStorage) == "webviewAndriod")) {
                            if (item.name == 'linkedin' || item.name == 'facebook' || item.name == 'google' || item.name == 'gmail' || item.name == 'youtube' || item.name == 'Netflix')
                                href = '#/' + item.name;
                            else
                                href = item.url;
                        }
                        else {
                            href = '#/' + item.name;
                        }

                        return $('<a>', {
                            'id': 'wheelItem' + index,
                            'href': href,
                            'clickSound': "button20"
                        });
                    };
                    div.append($('<img>', {
                        'class': 'bg',
                        'src': self.path() + (index % 2 == 0 ? 'even' : 'odd') + '.png'
                    }));
                    div.append($('<img>', {
                        'class': 'bg',
                        'src': self.path() + innerImg  //'inner_even.png' // (index % 2 == 0 ? 'even' : 'odd') + '.png'
                    }));
                    div.append($('<img>', {
                        'class': 'bg',
                        'src': self.path() + 'color_' + indx + '.png'
                    }));
                    div.append($('<img>', {
                        'class': 'active',
                        'src': self.path() + 'active_odd.png'
                    }));
                    div.append($('<img>', {
                        'class': 'bg',
                        'src': self.path() + item.name.toLowerCase() + '_left.png'
                    }));

                    div.data('name', item.name.toLowerCase());
                    li.append(anchor.append(div));
                    ul.append(li);

                    var mc = new Hammer(anchor[0]);
                    mc.add(new Hammer.Press({ time: 1000 }));
                    mc.on("press", App.WheelDirector.showSettingPopup);
                    mc.add(new Hammer.Tap());
                    mc.on("tap", function () {
                        App.WheelDirector.routeToLocation(item.name)
                    });
                }
            });

            var $inner = $('.inner-wheel ul');
            $inner.html('');
            _.each(categories, function (item, index) {
                $inner.append('<li><div>' + self.getCategoryItem(item.key).displayName + '</div></li>');
            });

            this.blades = options;

        },
        attachActions: function () {

            var apCode = '<div id="audioContainer" style="position:absolute; top:-200px;">' +
                '<span id="hoverSound"></span>' +
                '<span id="clickSound"></span>' +
                '<span id="leaveSound"></span>' +
                '<span id="moveSound"></span>' +
                '<span id="focusInSound"></span>' +
                '<span id="focusOutSound"></span>' +
                '<span id="startSound"></span>' +
                '</div>';

            $('body').append(apCode);

            $(soundElem).each(function () {
                if (allElems) {
                    if (aHover || aLeave) {
                        $(this).hover(
                            function () {
                                $('#hoverSound').html(playSound(aHover));
                            },
                            function () {
                                $('#leaveSound').html(playSound(aLeave));
                            }
                        );
                    }
                    if (aClick) {
                        $(this).click(function () {
                            $('#clickSound').html(playSound(aClick));
                        });
                    }

                    if (aFocusIn || aFocusOut) {
                        $(this).focusin(function () {
                            $('#focusInSound').html(playSound(aFocusIn));
                        });
                        $(this).focusout(function () {
                            $('#focusOutSound').html(playSound(aFocusOut));
                        });
                    }
                }
                else {
                    if ($(this).attr('hoverSound') || $(this).attr('leaveSound')) {
                        var audioFile1 = $(this).attr('hoverSound');
                        var audioFile2 = $(this).attr('leaveSound');
                        $(this).hover(
                            function () {
                                $('#hoverSound').html(playSound(audioFile1));
                            },
                            function () {
                                $('#leaveSound').html(playSound(audioFile2));
                            }
                        );
                    }

                    if ($(this).attr('clickSound')) {
                        var audioFile = $(this).attr('clickSound');
                        if (Modernizr.touch) {
                            $(this).click(function () {
                                document.getElementById('soundcontainer').children[0].play();
                            });
                        } else {
                            $(this).click(function () {
                                $('#clickSound').html(playSound(audioFile));
                            });
                        }
                    }

                    if ($(this).attr('moveSound')) {
                        var audioFile = $(this).attr('moveSound');
                        $(this).mousemove(function () {
                            $('#moveSound').html(playSound(audioFile));
                        });
                    }

                    if ($(this).attr('focusInSound') || $(this).attr('focusOutSound')) {
                        var audioFile1 = $(this).attr('focusInSound');
                        var audioFile2 = $(this).attr('focusOutSound');
                        $(this).focusin(function () {
                            $('#focusInSound').html(playSound(audioFile1));
                        });
                        $(this).focusout(function () {
                            $('#focusOutSound').html(playSound(audioFile2));
                        });
                    }

                    if ($(this).attr('startSound')) {
                        var audioFile = $(this).attr('startSound');
                        var loopit = false;
                        if ($(this).attr('loopSound')) loopit = true;
                        $(this).ready(function () {
                            $('#startSound').html(playSound(audioFile, loopit));
                        });
                    }
                }
            });

            if (Modernizr.touch) {

                $("ul#sprocket").bind('touchstart', this.events.mouseDown);
                $("ul#sprocket").bind('touchend', this.events.mouseUp);
                $("ul#sprocket").bind('touchmove', this.events.mouseMove);

                $('.wheel-btn').bind('touchstart', this.toggleWheel);

                $("ul#sprocket li.blades").bind('touchstart', this.events.hover);
                $("ul#sprocket li.blades").bind('touchend', this.events.hover);

            } else {
                $('#status-bar').addClass('status-bar-shadow');

                $("ul#sprocket").bind('mousedown', this.events.mouseDown);
                $(window).bind('mouseup', this.events.mouseUp);
                $(window).bind('mousemove', this.events.mouseMove);

                $('.wheel-btn').bind('click', this.toggleWheel);

                $('ul#sprocket a').bind('click', function (e) {
                    e.preventDefault();
                });
                $('ul#sprocket a').bind('click', this.events.click);

                $("ul#sprocket li.blades").bind('mouseenter mouseleave', this.events.hover);
            }
        },
        resetWheel: function resetWheel() {
            App.WheelDirector.initializeWheel();
            if (Modernizr.touch) {
                $("ul#sprocket").bind('touchstart', App.WheelDirector.events.mouseDown)
                    .bind('touchend', App.WheelDirector.events.mouseUp)
                    .bind('touchmove', App.WheelDirector.events.mouseMove);
                $("ul#sprocket li.blades").bind('touchstart', App.WheelDirector.events.hover)
                    .bind('touchend', App.WheelDirector.events.hover);
            } else {
                $("ul#sprocket").bind('mousedown', App.WheelDirector.events.mouseDown);
                $('ul#sprocket a').bind('click', function (e) {
                    e.preventDefault();
                })
                    .bind('dblclick', App.WheelDirector.events.click);
                $("ul#sprocket li.blades").bind('mouseenter mouseleave', App.WheelDirector.events.hover);
            }
        },
        showSettingPopup: function showManageWheelPopup(args) {
            if(APP_Cookies.getCookie(APP_Cookies.userID)) {
                $('.wheelModal .nav-tabs a:first').tab('show');

                var self = App.WheelDirector;
                ///-- wheel items --///
                var options = self.blades;
                // reset html
                $("#wheelItems").replaceWith('<ul id="wheelItems" class="nolist"></ul>');
                var $wheelItems = $("#wheelItems");
                $wheelItems.html('');
                // sort options
                options = _.sortBy(options, function (item) {
                    return self.numToChar(self.getCategoryItem(item.categoryKey).index) + (item.index < 10 ? ('0' + item.index) : item.index);
                });
                // add options to popup
                _.each(options, function (item) {
                    $wheelItems.append('<li id="wheelItem' + item.key + '" data-key="' + item.key + '" class="' + (item.show === true ? 'active' : '') + ' wheelItem"><div class="wheelItemActiveToggle" onclick="App.WheelDirector.toggleWheelItem(' + item.key + ')">&nbsp;</div><div>' + item.displayName + '<img class="popupItemImg" src="../assets/images/blades/edit_blue.png"/></li>');
                });
                // scroll init
                $wheelItems.mCustomScrollbar();
                // sort init
                $('#wheelItem1').parent().sortable({
                    update: function (event, ui) {
                        var self = App.WheelDirector;

                        var $wheelItems = $("#wheelItems").find('li');
                        _.each($wheelItems, function (item, index) {
                            self.setBladeItemIndex($(item).data('key'), index);
                        });

                        APP_Storage.setValue(APP_Storage.wheelItems(), JSON.stringify(self.blades), false, true);
                        App.WheelDirector.resetWheel();
                    }
                });

                ///-- wheel categories --///
                var categories = self.categories;
                // reset html
                $("#innerCategories").replaceWith('<ul id="innerCategories" class="nolist"></ul>');
                var $innerCategories = $("#innerCategories");
                $innerCategories.html('');
                // sort options
                categories = _.sortBy(categories, function (item) {
                    return  item.index;
                });
                // add options to popup
                _.each(categories, function (item) {
                    $innerCategories.append('<li id="wheelCat' + item.key + '" data-key="' + item.key + '" class="active wheelItem"><div class="wheelItemActiveToggle">&nbsp;</div>' + item.displayName + '<img class="popupItemImg" src="../assets/images/blades/edit_blue.png"/></li>');
                });
                // sort init
                $('#wheelCat1').parent().sortable({
                    update: function (event, ui) {
                        var self = App.WheelDirector;

                        var $innerCategories = $("#innerCategories").find('li');
                        _.each($innerCategories, function (item, index) {
                            self.setCategoryItemIndex($(item).data('key'), index);
                        });

                        APP_Storage.setValue(APP_Storage.wheelCategories(), JSON.stringify(self.categories), false, true);
                        App.WheelDirector.resetWheel();
                    }
                });
                // scroll init
                //$innerCategories.mCustomScrollbar();
                // show setting modal
                $('#wheelModal').modal({});
                $('#wheelModal').on('hide.bs.modal', function (e) {
                    saveWheelOnCookie();
                });
                // hide wheel
                self.hide();
            }else{
                App.WheelDirector.hide();
            }

        },
        toggleWheelItem: function toggleWheelItem(key) {
            var options = App.WheelDirector.blades;
            var $wheelItem = $('#wheelItem' + key);

            if ($wheelItem.hasClass('active')) {
                _.each(options, function (item) {
                    if (item.key == key)
                        item.show = false;
                });
                $wheelItem.removeClass('active');
            }
            else {
                var count = 0;
                _.each(options, function (item) {
                    if (item.show == true)
                        count++;
                });

                if (count == 20) {
                    App.growl.danger('You reached the max limit of items can be shown in Wheel.');
                    return;
                }
                _.each(options, function (item) {
                    if (item.key == key)
                        item.show = true;
                });
                $wheelItem.addClass('active');
            }
            console.log(options);
            APP_Storage.setValue(APP_Storage.wheelItems(), JSON.stringify(options), false, true);
            App.WheelDirector.resetWheel();
        }

    });
})();