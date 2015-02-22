
    
var _result = [];
$(document).ready(function () {
            var newData = [];
            newData[0] = [];
            newData[0][0] = "Select";
            newData[0][1] = "";
            for (var i =1; i<=localStorage.groups.split(",").length;i++){
                newData[i] = [];
                newData[i][0] = (localStorage.groups.split(",")[i-1]);
                newData[i][1] = (localStorage.groups.split(",")[i-1]);
            }
            setTimeout(test5,0);
            function test5(){
                var select = document.getElementsByClassName("mydropdown")[0];
                for(var p=0;p<newData.length;p++) {
                    select.options[p] = new Option(newData[p][0], newData[p][1]);
                }
            }
    
    
            
        
});

function filling(){
            var newData2 = [];
            newData2[0] = [];
            newData2[0][0] = "Select";
            newData2[0][1] = "";
            for (var i =1; i<=localStorage.groups.split(",").length;i++){
                newData2[i] = [];
                newData2[i][0] = (localStorage.groups.split(",")[i-1]);
                newData2[i][1] = (localStorage.groups.split(",")[i-1]); 
            }
            setTimeout(test5,0);
            function test5(){
                var y = (document.getElementsByClassName("mydropdown").length)-1;
                var select = document.getElementsByClassName("mydropdown")[y];
                for(var p=0;p<newData2.length;p++) {
                    select.options[p] = new Option(newData2[p][0], newData2[p][1]);
                }
            }
}
     

    
function employeeFiller() {                   
    $('#thetable').find('tr').click( function(){
        var y = ($(this).index()-1);
        console.log(y);
        var x = document.getElementsByClassName("mydropdown")[y].value;
        var newData = [];
            for (var i =0; i<localStorage.groups.split(",").length;i++){
                newData[i] = [];
                newData[i][0] = JSON.parse(localStorage.getItem(x))[i][0];
                newData[i][1] = JSON.parse(localStorage.getItem(x))[i][1]; 
            }
        
        var select = document.getElementsByClassName("employeeAssigned")[y];
        select.options.length=0;
        for(var p=0;p<newData.length;p++) {
            select.options[p] = new Option(newData[p][0], newData[p][1]);
        }
    })
}



function getFileBuffer(file){
    var deferred = $.Deferred();
    var reader = new FileReader();
    reader.onload = function(e){
        deferred.resolve(e.target.result);
    }
    reader.onerror = function(e){
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(file);
    return deferred.promise();
}



function InvoiceController($scope) {
    
    localStorage["invoice"] = "";
    $scope.invoice = empty_invoice;

    $scope.printMode = false;
    var rowNum = 0;

    var empty_invoice = {
        tax: 13.00,
        invoice_number: 0,
        employee_info: {
            name: "",
            dateFrom: "",
            dateTo: "",
            payCompany: "",
            payCurrency: ""
        },
            items: [
          { qty: 0, description: "", cost: 0.00, totall:0,taxx:0, attach: 0 }
        ]

    };


    if (localStorage["invoice"] == "" || localStorage["invoice"] == null) {
        $scope.invoice = empty_invoice;
    }
    else {
        $scope.invoice = JSON.parse(localStorage["invoice"]);
    }

    $scope.addItem = function () {
        $scope.invoice.items.push({  qty: 0, cost: 0, totall:0,taxx:0,description: "", attach: 0 });
        setTimeout(calling, 0);
    };

    var calling = function(){
        var temp = $scope.invoice.items.length-1;
        var element = document.getElementsByClassName('mydropdown')[$scope.invoice.items.length-1];
        element.onchange = function() {
            option(temp);
        }
        var element = document.getElementsByClassName('anotherFile')[$scope.invoice.items.length-1];
        element.onclick = function() {
            addFileInput(temp);
        }
    }

    $scope.removeItem = function (item) {
        $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
    };

    $scope.printInfo = function () {
        window.print();
    };

    $scope.clearLocalStorage = function () {
        
        var confirmClear = confirm("Are you sure you would like to clear the invoice?");
        if (confirmClear) {
            location.reload();
        }
    };
};

angular.module('jqanim', []).directive('jqAnimate', function () {
    return function (scope, instanceElement) {
        setTimeout(function () { instanceElement.show('slow'); }, 0);
    }
});
    

function requiredFields() {
    var z = document.getElementById("Assignee").value ;
    var myrow = document.getElementsByClassName("description").length;
    var b,c,e,f;
myLoop();
    var i = 0;
    function myLoop(){
        setTimeout(function(){
            b = document.getElementsByClassName('mydropdown')[i].value;
            c = document.getElementsByClassName('employeeAssigned')[i].value;
            e = document.getElementsByClassName("datee")[i].value;
            f = document.getElementsByClassName("description")[i].value;
                if (z.length==0 || e.length==0 || f.length==0 || c.length == 0 || b.length==0)  {
                    alert("All Fields Must Be Filled");
                    return false;
                } /*else if(a.length==0 || g.length == 0){
                    alert("Not a valid employee");
                    return false;
                }*/ else {
                    checkSizes(i);
                }
            i++
            if (i<myrow){
                myLoop();
            }
        },0)
    }
}

function checkSizes(chcks){
    var rows = document.getElementsByClassName('inputRow').length;
    var load = true;
    for (var row=0; row<rows; row++){
        var files = document.getElementsByClassName('fileUpload')[row].getElementsByClassName('file').length;
        
        
        for (var fileNum=0; fileNum<files; fileNum++){

            if (document.getElementsByClassName('fileUpload')[row].getElementsByClassName('file')[fileNum].files.length===0){
                console.log("Select a file!");
            } else {
                var file = document.getElementsByClassName('fileUpload')[row].getElementsByClassName('file')[fileNum].files[0];

                if (file.size > 2000000){
                    alert('File ' + file.name + 'too big.');
                    load = false;
                } else {
                    //uploadFile("FinanceDetails", listID.toString(), file);
                }
            }
            
        }

    }
     if (load == true){
         console.log(chcks);
         sendEmail(chcks);
         
         /*for (var t=0;t<document.getElementsByClassName("datee").length;t++){
        setTimeout(sendEmails.bind(undefined, t), 1000);
            }*/
            //put function for print

        }

}

/*function sendEmails() {
             for (var t=0;t<document.getElementsByClassName("datee").length;t++){
        setTimeout(sendEmails.bind(undefined, t), 1000);
            }
}*/
    
function sendEmail(row){

    var link = "mailto:" + document.getElementsByClassName("employeeAssigned")[row].value
             + "?cc=myCCaddress@example.com"
             + "&subject=" + escape(document.getElementsByClassName("mydropdown")[row].value + " Task")
             + "&body=" + escape("Due Date: "+ document.getElementsByClassName("datee")[row].value + "\n" + document.getElementsByClassName("description")[row].value)
    ;

    window.location.href = link;

}
    
function option(i){
    if (document.getElementsByClassName("mydropdown")[i].value != "0"){
        document.getElementsByClassName("description")[i].style["display"] = "block";
    } else {
        document.getElementsByClassName("description")[i].style["display"] = "none";
    } 


}


var upload_number = 2;
function addFileInput() {
    var d = document.createElement("div");
    var file = document.createElement("input");
    file.setAttribute("type", "file");
    file.setAttribute("name", "file"+upload_number);
    d.appendChild(file);
    document.getElementsByClassName("moreUploads")[0].appendChild(d);
    upload_number++;
}

window.onload = function() {  
    var app = function() {
        var baseUrl = 'http://127.0.0.1:5984/';
        var fileInput = document.forms['upload'].elements['file'];
        document.forms['upload'].onsubmit = function() {
            uploadFile('foo', fileInput.files[0]);
            return false;
        };

        var uploadFile = function(document, file) {
            var name = encodeURIComponent(file.name),
            type = file.type,
            fileReader = new FileReader(),
            getRequest = new XMLHttpRequest(),
            putRequest = new XMLHttpRequest();

            getRequest.open('GET',  baseUrl + encodeURIComponent(document),
                true);
            getRequest.send();
            getRequest.onreadystatechange = function(response) {
                if (getRequest.readyState == 4 && getRequest.status == 200) {
                    var doc = JSON.parse(getRequest.responseText);
                    putRequest.open('PUT', baseUrl +
                        encodeURIComponent(document) + '/' +
                        name + '?rev=' + doc._rev, true);
                    putRequest.setRequestHeader('Content-Type', type);
                    fileReader.readAsArrayBuffer(file);
                    fileReader.onload = function (readerEvent) {
                        putRequest.send(readerEvent.target.result);
                    };
                    putRequest.onreadystatechange = function(response) {
                        if (putRequest.readyState == 4) {
                            console.log(putRequest);
                        }
                    };
                }
            };
        };
    };
    app();
};


function addFileInput(row) {
    var d = document.createElement("div");
    var file = document.createElement("input");
    file.setAttribute("type", "file");
    file.setAttribute("name", "file");
    file.setAttribute("class", "file");
    d.appendChild(file);
    document.getElementsByClassName('fileUpload')[row].getElementsByClassName('moreUploads')[0].appendChild(d);
}

window.onload = function() {
    var element = document.getElementsByClassName('mydropdown')[0];
    element.onchange = function() {
        option(0);
    }
    
    
    var first = document.getElementsByClassName('anotherFile')[0];
    first.onclick = function() {
        addFileInput(0);
    }
    var app = function() {

        var baseUrl = 'http://127.0.0.1:5984/';

        var uploadFile = function(document, file) {
            var name = encodeURIComponent(file.name),
            type = file.type,
            fileReader = new FileReader(),
            getRequest = new XMLHttpRequest(),
            putRequest = new XMLHttpRequest();

            getRequest.open('GET',  baseUrl + encodeURIComponent(document),
                true);
            getRequest.send();
            getRequest.onreadystatechange = function(response) {
                if (getRequest.readyState == 4 && getRequest.status == 200) {
                    var doc = JSON.parse(getRequest.responseText);
                    putRequest.open('PUT', baseUrl +
                        encodeURIComponent(document) + '/' +
                        name + '?rev=' + doc._rev, true);
                    putRequest.setRequestHeader('Content-Type', type);
                    fileReader.readAsArrayBuffer(file);
                    fileReader.onload = function (readerEvent) {
                        putRequest.send(readerEvent.target.result);
                    };
                    putRequest.onreadystatechange = function(response) {
                        if (putRequest.readyState == 4) {
                            console.log(putRequest);
                        }
                    };
                }
            };
        };
    };
    app();
};


function CreateFile()
{
    // Ensure the HTML5 FileReader API is supported
    if (window.FileReader)
    {
        input = document.getElementsByClassName("moreUploads");
        if (input)
        {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = receivedBinary;
            fr.readAsDataURL(file);
        }
    }
    else
    {
        alert("The HTML5 FileSystem APIs are not fully supported in this browser.");
    }
}
 
 
// Utility function to remove base64 URL prefix and store base64-encoded string in a Uint8Array
// Courtesy: https://gist.github.com/borismus/1032746
function convertDataURIToBinary(dataURI)
{
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
 
    for (i = 0; i < rawLength; i++)
    {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

