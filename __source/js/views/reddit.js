(function () {
    'use strict';
    App.RedditView = Ember.View.extend({
        didInsertElement: function () {
            $('.columnOne').mCustomScrollbar();
            $('.columnTwo').mCustomScrollbar();

            var subredditScroll = 0;
            $('.subreddits ic-autocomplete-list').mCustomScrollbar({
                callbacks: {
                    onScroll: function () {
                        subredditScroll  = this.mcs.top;
                    }
                }
            });
            $('.subreddits ic-autocomplete-toggle').on('click', function () {
                $('.subreddits ic-autocomplete-list').mCustomScrollbar("scrollTo", subredditScroll , {scrollInertia: 0});
            });
        }
    });
})();