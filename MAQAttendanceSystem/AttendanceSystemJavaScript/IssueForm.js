function issueFormLoad() {
    var issueForm = document.getElementById('issue-form');

    var formHeader = dynamicallyCreateHtml('formHeader', 'div', 'formHeaderID', form);
    dynamicallyCreateHtml('headerspan', 'span', 'headerspanID', formHeader);
    document.getElementById('headerspanID').innerHTML = '<b>Report an Issue</b>';
    var cancelForm = dynamicallyCreateHtml('cancelspan', 'span', 'cancelspanID', formHeader);
    var img = document.createElement("img");
    img.src = '../SiteAssets/AttendanceSystemResources/cancelbutton.png';
    img.width = '15';
    img.height = '15';
    img.id = 'cancelform';
    img.setAttribute('onclick', 'hideForm()');
    cancelForm.appendChild(img);

    var userName = dynamicallyCreateHtml('userName', 'div', 'userNameID', form);
    dynamicallyCreateHtml('userNameText', 'span', 'userNameTextID', userName);
    document.getElementById('userNameTextID').innerHTML = 'User Name:';
    dynamicallyCreateHtml('userNameValue', 'span', 'userNameValueID', userName);
    document.getElementById('userNameValueID').innerHTML = 'userNameValue';

    var employeeNo = dynamicallyCreateHtml('employeeNo', 'div', 'employeeNoID', form);
    dynamicallyCreateHtml('employeeNoText', 'span', 'employeeNoTextID', employeeNo);
    document.getElementById('employeeNoTextID').innerHTML = 'Employee ID:';
    dynamicallyCreateHtml('employeeNoValue', 'span', 'employeeNoValueID', employeeNo);
    document.getElementById('employeeNoValueID').innerHTML = 'employeeNoValue';


    var clickedDate = dynamicallyCreateHtml('clickedDate', 'div', 'clickedDateID', form);
    dynamicallyCreateHtml('clickedDateText', 'span', 'clickedDateTextID', clickedDate);
    document.getElementById('clickedDateTextID').innerHTML = 'Issue Date:';
    dynamicallyCreateHtml('clickedDateValue', 'span', 'clickedDateValueID', clickedDate);
    //document.getElementById('clickedDateValueID').innerHTML = 'clickedDateValue';


    var inTime = dynamicallyCreateHtml('inTime', 'div', 'inTimeID', form);
    dynamicallyCreateHtml('inTimeText', 'span', 'inTimeTextID', inTime);
    document.getElementById('inTimeTextID').innerHTML = 'In Time:';
    dynamicallyCreateHtml('inTimeValue', 'span', 'inTimeValueID', inTime);
    //document.getElementById('inTimeValueID').innerHTML = 'inTimeValue';


    var outTime = dynamicallyCreateHtml('outTime', 'div', 'outTimeID', form);
    dynamicallyCreateHtml('outTimeText', 'span', 'outTimeTextID', outTime);
    document.getElementById('outTimeTextID').innerHTML = 'Out Time:';
    dynamicallyCreateHtml('outTimeValue', 'span', 'outTimeValueID', outTime);
    //document.getElementById('outTimeValueID').innerHTML = 'outTimeValue';


    var commentText = dynamicallyCreateHtml('commentText', 'div', 'commentTextID', form);
    document.getElementById('commentTextID').innerHTML = 'Comment:';

    var commentValue = dynamicallyCreateHtml('commentValue', 'div', 'commentValueID', form);
    var input = document.createElement("textarea");
    input.id = "commentValue";
    input.maxLength = "5000";
    input.cols = "58";
    input.rows = "4";
    commentValue.appendChild(input);

    var attachmentGoBackSubmit = dynamicallyCreateHtml('attachmentGoBackSubmit', 'div', 'attachmentGoBackSubmitID', form);
    var attachment = dynamicallyCreateHtml('attachment', 'span', 'attachmentID', attachmentGoBackSubmit);

    var attachmentText = document.createElement('p');
    attachmentText.id = 'attachmentText';
    attachmentText.innerHTML = 'Attachment';
    attachment.appendChild(attachmentText);

    var attachmentimg = document.createElement("img");
    attachmentimg.src = "../SiteAssets/AttendanceSystemResources/attachment.png";
    attachmentimg.width = '25';
    attachmentimg.height = '25';
    attachmentimg.id = 'attachment';
    attachmentimg.setAttribute('onclick', 'addAttachment()');
    attachment.appendChild(attachmentimg);

    var goBack = dynamicallyCreateHtml('goBack', 'span', 'goBackID', attachmentGoBackSubmit);
    var input = document.createElement("input");
    input.type = "button"
    input.id = "goBackButton";
    input.value = "Go Back";
    input.setAttribute('onclick', 'backToCalendarView()');
    goBack.appendChild(input);

    var submit = dynamicallyCreateHtml('submit', 'span', 'submitID', attachmentGoBackSubmit);
    var input = document.createElement("input");
    input.type = "button"
    input.id = "submitButton";
    input.value = "Submit";
    input.setAttribute('onclick', 'InsertIntoSPList()');
    goBack.appendChild(input);
}

function generateform(cellid) {
    //var pid = document.getElementById("cellid").parentNode.id;
    var pid = document.getElementById(cellid).parentNode.id;
    var a = document.getElementById(pid).querySelector('.intime');
    document.getElementById('inTimeValueID').innerHTML = a.innerHTML.split(':')[1] + ':' + a.innerHTML.split(':')[2];
    var a = document.getElementById(pid).querySelector('.outtime');
    document.getElementById('outTimeValueID').innerHTML = a.innerHTML.split(':')[1] + ':'+ a.innerHTML.split(':')[2];
    //document.getElementById('inTimeValueID').innerHTML = document.getElementById(pid).getElementByClassName('intime').innerHTML;
    document.getElementById('clickedDateValueID').innerHTML = pid + "-" + (new Date()).getFullYear();
    var id = document.getElementById('form').style.display = "block";
}

function dynamicallyCreateHtml(nameOfTheElement, element, id, parentname) {
    nameOfTheElement = document.createElement(element);
    nameOfTheElement.setAttribute("id", id);
    document.getElementById(parentname.id).appendChild(nameOfTheElement);
    return nameOfTheElement;
}

function hideForm() {
    document.getElementById('issue-form').style.display = "";
    document.getElementById('pop').style.display = "";
    document.getElementById('calendar-container').innerHTML = "";
   // window.location.href = "../SiteAssets/AttendanceSystemPages/MyAttendanceAndUsefulLinkTile.html";
}

function backToCalendarView() {
    document.getElementById('form').style.display = "";
}

function InsertIntoSPList() {
    var url = "/_api/Web/Lists/GetByTitle('Attendance system issues')/Items";
    var data =
     {
         __metadata:
             { 'type': 'SP.Data.Attendance_x0020_system_x0020_issuesListItem' },
         Title: $('#clickedDateValueID').html(),
         Username: $('#userNameValueID').html(),             // username
         Employee_x0020_Id: $('#employeeNoValueID').html(),               // empid
         In_x0020_Time: $('#inTimeValueID').html(),        // intime
         Out_x0020_Time: $('#outTimeValueID').html(),       // outitme
         Comment: $('#commentValue').html()
     };

    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + url,
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-Type": "application/json;odata=verbose"
        },
        data: JSON.stringify(data),
        success: function (data) {
            alert("Your issue has been submitted successfully");
            window.location.href = "https://testmaq-my.sharepoint.com/personal/rupeshm_maqsoftware_com/Blog/MAQAttendance/MAQAtten/Lists/Attendance%20system%20issues/AllItems.aspx";
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}