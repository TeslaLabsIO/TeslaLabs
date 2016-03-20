(function () {
    'use strict';
    App.GlobalSearchView = Ember.View.extend({
        didInsertElement: function () {
            $('.global-search-public-data').mCustomScrollbar({});
            $('.global-search-private-data').mCustomScrollbar({});
            $('#searchDetailsContent').mCustomScrollbar({});

            var detailsVisible = false;
            $('#searchDetailsModal').modal({show: false});
            $('.globalSearchModal').modal({show: false});
            $('#searchDetailsModal').on('show.bs.modal', function (e) {
                detailsVisible = true;
                console.log('show details');
            });
            $('#searchDetailsModal').on('shown.bs.modal', function (e) {
                //alert($('#searchDetailsContent').css('height'))
                setTimeout(function(){
                    $('#searchDetailsContent > div:first-child').css('max-height',($('.searchDetailsContent').height()-50)+'px');
                    //$('#searchDetailsContent').mCustomScrollbar("update")
                },100)
            });
            $('#searchDetailsModal').on('hidden.bs.modal', function (e) {
                detailsVisible = false;
                console.log('hide details 2')
            });
            //since we have modal inside modal bootstrap handle event on both so we have bool to stop hide event recursion
            $('.globalSearchModal').on('hide.bs.modal', function (e) { //
                $('.globalSearchModal').attr('popup-hidden','true');
                if (detailsVisible) {
                    detailsVisible = false;
                    $('#searchDetailsModal').modal('hide');
                    console.log('hide details')
                }
                $('.sprocket_video').each(function(){
                    $(this)[0].pause();
                });
                $('.sprocket_video_frame').each(function(){
                    $(this).attr('src','');
                });
                console.log('hide parent')
            });
            $('#large_popup_close').on('click',function(){
                $('.globalSearchModal').modal('hide')
            });
            $('#small_popup_close').on('click',function(){
                $('#searchDetailsModal').modal('hide')
            });

            $('#privateMessages').collapse('show');
            $('#privateActivities').collapse('hide');
        }
    });
})();