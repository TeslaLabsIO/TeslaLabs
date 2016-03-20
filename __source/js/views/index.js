(function () {
    'use strict';
    App.IndexView = Ember.View.extend({
        didInsertElement: function () {
            $(".homePage").mCustomScrollbar();
            //$(".secondRow").mCustomScrollbar();
            $('#homeDetailsContent').mCustomScrollbar({});

            var detailsVisible = false;
            $('#homeDetailsModal').modal({show: false});
            $('#homeDetailsModal').on('show.bs.modal', function (e) {
                detailsVisible = true;
                console.log('show details')
            });
            $('#homeDetailsModal').on('shown.bs.modal', function (e) {
                //alert($('#searchDetailsContent').css('height'))
                setTimeout(function(){
                    $('#homeDetailsContent > div:first-child').css('max-height',($('.homeDetailsContent').height() - 50)+'px');
                    //$('#searchDetailsContent').mCustomScrollbar("update")
                },100)
            });
            $('#homeDetailsModal').on('hidden.bs.modal', function (e) {
                detailsVisible = false;
                console.log('hide details 2')
                $('.sprocket_video').each(function(){
                    $(this)[0].pause();
                });
                $('.sprocket_video_frame').each(function(){
                    $(this).attr('src','');
                });
            });
            $('#home_small_popup_close').on('click',function(){
                $('#homeDetailsModal').modal('hide')
            });
            $('#gmailHome').mCustomScrollbar();
            $('#global_feed').mCustomScrollbar();

            $('#searchAccordion').on('show.bs.collapse', function () {
                $('#searchAccordion .in').collapse('hide');
            });
        }
    });
})();
