function MenuChoice()
{
var menu=document.getElementById("menu").value;

if (menu == "Create New Customer")
{
document.getElementById("section1").style.visibility = "visible";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "hidden";
}
else if (menu == "Update Order Address")
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "visible";
document.getElementById("section3").style.visibility = "hidden";
}
else if (menu == "Delete Customer")
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "visible";
}
else
{
document.getElementById("section1").style.visibility = "hidden";
document.getElementById("section2").style.visibility = "hidden";
document.getElementById("section3").style.visibility = "hidden";
}
}

function CreateCustomer()
{
var objRequest = new XMLHttpRequest();
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
//Collect Customer data from web page
var customerid = document.getElementById("custid").value;
var customername = document.getElementById("custname").value;
var customercity = document.getElementById("custcity").value;
//Create the parameter string
var newcustomer = '{"CustomerID":"' + customerid.toUpperCase() + '","CompanyName":"' + customername +'","City":"' + customercity +'"}';

//Checking for AJAx operation return
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
{
var result = JSON.parse(objRequest.responseText);
CreateCustomerResult(result);
}
}
//Start AJAX request
objRequest.open("POST", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objRequest.send(newcustomer);
}

function ShipOrderUpdate()
{
var objRequest = new XMLHttpRequest();
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
//Collect Customer data from web page
var orderid = document.getElementById("ordid").value;
var shippingname = document.getElementById("shipname").value;
var shippingaddress = document.getElementById("shipadd").value;
var shippingcity = document.getElementById("shipcity").value;
var shippingpostalcode = document.getElementById("shippostcode").value;
//Create the parameter string
var updateshiporder = '{"OrderID":"' + orderid +'","ShipName":"' + shippingname+ '","ShipAddress":"' + shippingaddress +'","ShipCity":"' + shippingcity +'","ShipPostcode":"' + shippingpostalcode +'"}';

//Checking for AJAx operation return
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
{
var result = JSON.parse(objRequest.responseText);
UpdateOrderResult(result);
}
}
//Start AJAX request
objRequest.open("POST", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objRequest.send(updateshiporder);
}

function DeleteCustomer()
{
var customerid=document.getElementById("custid2").value;
var result = confirm("Delete customer "+customerid.toUpperCase()+" ?");
if (result) {
    
var objRequest = new XMLHttpRequest();
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
url += customerid;
//Checks that the object has returned data
objRequest.onreadystatechange = function()
{
if (objRequest.readyState == 4 && objRequest.status == 200)
{
var result = JSON.parse(objRequest.responseText);
DeleteOperationResult(result);
}
}
//Initiate the server request
objRequest.open("GET", url, true);
objRequest.send();

} else return;
}

function CreateCustomerResult(output)
{
if (output.WasSuccessful == 1)
{
document.getElementById("result").innerHTML = "The operation was successful!"
}
else
{
document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
}
}

function UpdateOrderResult(output)
{
if (output == 1)
{
document.getElementById("orderupdateresult").innerHTML = "The operation was successful!"
}
else
{
document.getElementById("orderupdateresult").innerHTML = "The operation was not successful!" + "<br>error status: " + output;
}
}

function DeleteOperationResult(output)
{
if (output.DeleteCustomerResult.WasSuccessful == 1)
{
document.getElementById("deleteresult").innerHTML = "The operation was successful!"
}
else
{
document.getElementById("deleteresult").innerHTML = "The operation was not successful!" + "<br>" + output.DeleteCustomerResult.Exception;
}
}

