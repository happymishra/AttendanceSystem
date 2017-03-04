
function showCalendarPopup() {
    arrowClicked();
    var id = document.getElementById('pop').style.display = "block";
}

function hideCalendarPopup() {
    var id = document.getElementById('pop').style.display = "";
    var id = document.getElementById('calendar-dates').innerHTML = "";
}

function displayHelpButton(dateid) {
    var today = new Date();
    var yesterdaydate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    var previousofyesterdaydate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
    var previoustopreviousdate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);
    var to = today.getDate() + "-" + (today.getMonth() + 1);
    var ye = yesterdaydate.getDate() + "-" + (yesterdaydate.getMonth() + 1);
    var pre = previousofyesterdaydate.getDate() + "-" + (previousofyesterdaydate.getMonth() + 1);
    var pretopre = previoustopreviousdate.getDate() + "-" + (previoustopreviousdate.getMonth() + 1);
    if (dateid == to || dateid == ye || dateid == pre || dateid == pretopre) {
        var c = document.getElementById(dateid).childNodes;
        var helpbuttonid = c[0].id;
        document.getElementById(helpbuttonid).style.visibility = "visible";
    }
}

function hideHelpButton(dateid) {
    var today = new Date();
    var yesterdaydate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    var previousofyesterdaydate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
    var previoustopreviousdate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);
    var to = today.getDate() + "-" + (today.getMonth() + 1);
    var ye = yesterdaydate.getDate() + "-" + (yesterdaydate.getMonth() + 1);
    var pre = previousofyesterdaydate.getDate() + "-" + (previousofyesterdaydate.getMonth() + 1);
    var pretopre = previoustopreviousdate.getDate() + "-" + (previoustopreviousdate.getMonth() + 1);
    if (dateid == to || dateid == ye || dateid == pre || dateid == pretopre) {
        var c = document.getElementById(dateid).childNodes;
        var helpbuttonid = c[0].id;
        document.getElementById(helpbuttonid).style.visibility = "hidden";
    }
}