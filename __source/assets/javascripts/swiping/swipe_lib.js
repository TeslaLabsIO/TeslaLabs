/**
 * Some helper methods shared by 'swiping logic related code' in Dashboard and Search results views.
 */

//set the page_index for the given container in the 'hash'
function setPageIndexForContent(container, value) {
    page_index[container.attr('id')] = value;
}

//retrieve the page_index for the given container from the 'hash'
function getPageIndexForContent(container) {
    return page_index[container.attr('id')];
}

function getXY(event) {
    return event.changedTouches && event.changedTouches.length
        ? { x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY
    }
        : event.touches && event.touches.length
        ? { x: event.touches[0].clientX,
        y: event.touches[0].clientY
    }
        : { x: event.clientX,
        y: event.clientY
    };
}

function getOrientation() {
    var orientation, o = window.orientation;

    if (o != undefined) {
        orientation = abs(o) == 90 ? 'landscape' : 'portrait';
    } else {
        orientation = document.width > document.height ? 'landscape' : 'portrait'
    }

    return orientation
}