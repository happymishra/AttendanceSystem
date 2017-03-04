var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function GetDates() {
    currentDate = new Date();
    currentMonth = currentDate.getMonth();
    var CurrentMonthName = month_name[currentMonth];
    document.getElementById('currentmonth').innerHTML = CurrentMonthName.substring(0, 3) + "  " + currentDate.getDate();
    previousDayDate = new Date(currentDate);
    previousDayDate.setDate(currentDate.getDate() - 1);
    document.getElementById('previousmonth').innerHTML = CurrentMonthName.substring(0, 3) + "  " + previousDayDate.getDate();

    var url = "https://happy/PastMonthAttendanceRequest/AttendanceRecords/1";
    callAjax(url)
}

function get_calendar(day_no, days, month, year) {
    var div = document.createElement('div')
    div.setAttribute("class", "completecalendar");
    div.setAttribute("id", "completecalendar");
    var daysofweekdiv = document.createElement('div')
    div.appendChild(daysofweekdiv);
    daysofweekdiv.setAttribute("id", "daysofweek");
    for (var daysofweek = 0; daysofweek <= 6; daysofweek++) {
        var span = document.createElement('span')
        span.innerHTML = day_name[daysofweek];
        div.appendChild(daysofweekdiv).appendChild(span);
    }
    var divrows, inandout;
    for (var i = 1; i <= days;) {
        divrows = document.createElement('div');
        inandout = document.createElement('div');
        inandout.setAttribute("id", "inandout");
        divrows.setAttribute("id", "divrows");
        div.appendChild(divrows);
        div.appendChild(inandout);
        var elements = 0;
        for (j = 0; j <= 6 && i <= days; j++) {
            if (i == 1 && j < day_no) {
                var span = document.createElement('span');
                div.appendChild(divrows).appendChild(span);
                var inandoutspan = document.createElement('span');
                inandoutspan.setAttribute("id", 0);
                div.appendChild(inandout).appendChild(inandoutspan);
                elements++;
            }
            else {
                elements++
                var span = document.createElement('span');
                span.innerHTML = i;
                div.appendChild(divrows).appendChild(span);
                var inandoutspan = document.createElement('span');
                var iddate = i + "-" + month;
                inandoutspan.setAttribute("id", iddate);
                inandoutspan.setAttribute("onmouseover", 'displayHelpButton(this.id)');
                inandoutspan.setAttribute("onmouseout", 'hideHelpButton(this.id)');
                div.appendChild(inandout).appendChild(inandoutspan);
                div.appendChild(inandout).appendChild(inandoutspan);
                var img = document.createElement("img");
                img.src = "../SiteAssets/AttendanceSystemResources/helpbutton.png";
                img.width = '25';
                img.height = '25';
                img.id = 'helpbutton' + i;
                img.setAttribute('class', 'helpbutton');
                img.setAttribute('onclick', 'generateform(this.id)');
                div.appendChild(inandout).appendChild(inandoutspan).appendChild(img);
                div.appendChild(inandout).appendChild(inandoutspan);
                i++;
            }
        }
        if (elements <= 3) {
            inandout.setAttribute("style", "clear:both");
        }
    }
    return div;
}
function arrowClicked(clickedarrow) {
    var d = new Date();
    document.getElementById('rightarrow').style.cursor = 'default';
    document.getElementById('rightarrow').src = '../SiteAssets/AttendanceSystemResources/disabled right arrow.png'
    document.getElementById('leftarrow').src = '../SiteAssets/AttendanceSystemResources/left arrow.png'
    if (clickedarrow == 'leftarrow') {
        document.getElementById(clickedarrow).style.cursor = 'default';
        document.getElementById('leftarrow').src = '../SiteAssets/AttendanceSystemResources/disabled left arrow.png'
        document.getElementById('rightarrow').style.cursor = 'pointer';
        document.getElementById('rightarrow').src = '../SiteAssets/AttendanceSystemResources/right arrow.png'
        d = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate());
        var pid = document.getElementById("completecalendar").parentNode.id;
        document.getElementById(pid).removeChild(document.getElementById('completecalendar'))
    }

    if (clickedarrow == 'rightarrow') {
        document.getElementById(clickedarrow).style.cursor = 'default';
        document.getElementById('rightarrow').src = '../SiteAssets/AttendanceSystemResources/disabled right arrow.png'
        document.getElementById('leftarrow').style.cursor = 'pointer';
        document.getElementById('leftarrow').src = '../SiteAssets/AttendanceSystemResources/left arrow.png'
        var pid = document.getElementById("completecalendar").parentNode.id;
        document.getElementById(pid).removeChild(document.getElementById('completecalendar'))
    }

    var month = d.getMonth();
    var year = d.getFullYear();
    var tmp = new Date(year, month, 1);
    var day_no = tmp.getDay();
    var days = new Date(year, month + 1, 0).getDate();
    if ((days + day_no) / 7 > 5 && (days + day_no) % 7 > 0) {
        document.getElementById("calendar-container").setAttribute("style", "height:620px");
    }
    else {
        document.getElementById("calendar-container").setAttribute("style", "height:540px");
    }
    var calendar = get_calendar(day_no, days, month + 1, year);
    var url = "https://happy/PastMonthAttendanceRequest/AttendanceRecords/1?currentMonth" + month_name[month];
    callAjax(url, month);
    document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
    document.getElementById("calendar-dates").appendChild(calendar);
}

function callAjax(url, month) {
    var elms = document.getElementById("InOutTime").getElementsByTagName("span");
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            data = JSON.parse(data)
            $.each(data, function (i, item) {
                if (month != null || month != undefined) {
                    var m = month + 1;
                    var id = item.Day + "-" + m;
                    var x = document.getElementById(id);
                    var intime = document.createElement("p");
                    var t = document.createTextNode("In: " + item.InTime);
                    intime.appendChild(t);
                    intime.setAttribute("class", "intime")
                    x.appendChild(intime);
                    var outtime = document.createElement("p");
                    var t = document.createTextNode("Out: " + item.OutTime);
                    outtime.appendChild(t);
                    outtime.setAttribute("class", "outtime")
                    x.appendChild(outtime);
                    if (item.isOntime != 1) {
                        x.style.backgroundColor = 'red';
                    }
                }
                else {
                    elms[i].innerHTML = item.InTime + "AM";
                    elms[i + 2].innerHTML = item.OutTime + "PM";
                }
            });
        },
        // error: function () {
            // document.getElementById("calendar-container").innerHTML = "<p id='frown-face'> :(  </p> <p id = 'text-message'> </br>  Sorry, an error has occurred while retrieving your attendance. Please try refreshing the browser or contact IT Help Desk for assistance.</p>";
        // }
    });
}