let ShoppingList = [{
		name : 'Bread',
		price : 2.29},
		{
		name : 'Milk',
		price : 3.19},
		{
		name : 'Eggs',
		price : 2.00},
		{
		name : 'Cereals',
		price : 4.3},
		{
		name : 'Apples',
		price : 1.35}
		
	];
var item ;
let finalItems= '';
	function displayListOfItems()
	{
	let items='';
		for (var i = 0; i < ShoppingList.length; i++) {
			 item = ShoppingList[i].name;
			console.log(item);			
			items+= '<input id="'+ShoppingList[i].name+'_textbox" type="text" readOnly = true value="'+ShoppingList[i].name+'">' + '&nbsp &nbsp &nbsp &nbsp &nbsp' +'<button id="'+ShoppingList[i].name+'_btn" onClick=addTotal("'+ ShoppingList[i].name +'",'+ShoppingList[i].price+')>Add</button>' 
			+'&nbsp &nbsp &nbsp &nbsp &nbsp'+'<button id="'+ShoppingList[i].name+'_rmbtn" onClick=removeItem("'+ ShoppingList[i].name +'",'+ShoppingList[i].price+')>Remove</button>';
			items+= '&nbsp &nbsp &nbsp &nbsp &nbsp'+ '<input id="'+ShoppingList[i].name+'_tb" type="text" name="inputbox" value="0">' + '<br />';
			console.log(items);
		}
items += '<br />'+'<br />'+'<br />';
document.getElementById('outputdiv').innerHTML = items;
 var but = document.createElement('input');
    but.setAttribute('ID', 'Pay');
 but.setAttribute('value', 'Done Shopping');
but.setAttribute('onclick', "displayTotal();");
var t = document.createTextNode("Done Shopping");
but.appendChild(t);
if(!document.getElementById('Pay')){
var body = document.getElementsByTagName("body")[0];
body.appendChild(but);
document.getElementById("Shop").disabled=true;
}
	}

var total =0;
var bread_qty=0;
var milk_qty=0;
var egg_qty=0;
var cereal_qty=0;
var apple_qty=0;
let listOfSelectedItems =[];
var listOfNames=[];

function addTotal(item,price)
{
	var index;
	
	let qty =0 ;
	console.log(item);
	console.log(price);
if(item=="Bread")
{
 bread_qty = bread_qty+1;
qty=bread_qty;
}
else if(item=="Milk")
{
	 milk_qty =milk_qty+1;
qty=milk_qty;
}
else if(item=="Eggs")
{
	 egg_qty =egg_qty+1;
qty=egg_qty;
}
else if(item=="Cereals")
{
	 cereal_qty =cereal_qty+1;
qty=cereal_qty;
}
else if(item=="Apples")
{
	 apple_qty =apple_qty+1;
qty=apple_qty;
}
console.log(listOfNames);
console.log(qty);
if(listOfNames.includes(item))
{
	console.log("Inside" + qty);
	index = listOfNames.indexOf(item);
	console.log(index);
	console.log(listOfSelectedItems[index].quantity);
	listOfSelectedItems[index].quantity =qty;
	listOfSelectedItems[index].price += price;
	
}
else
{
	console.log("First" + qty);
	console.log("bread_qty" + bread_qty);
	
    listOfSelectedItems.push({name:item,quantity:qty,price:price});
}
	total +=price;
	var currentElement = document.getElementById(item+'_tb');
	console.log(currentElement);
	currentElement.value = qty;
	//alert(total);
	if(listOfNames.includes(item));
	else
	{
	listOfNames.push(item);
	}
	sessionStorage.setItem("total",total);
	for(let val=0;val<listOfSelectedItems.length;val++)
	{
	console.log("listOfSelectedItems_"+val+":" +listOfSelectedItems[val].name+ ' | ' + listOfSelectedItems[val].quantity + ' | ' + listOfSelectedItems[val].price );
	}
}


function displayTotal()
{
	finalItems += "Product Name" + ' | ' + "Quantity" +' | '+ "Price  " + '<br />';
	for(let i=0;i<listOfSelectedItems.length;i++)
{
	
	finalItems += listOfSelectedItems[i].name+ ' | ' + listOfSelectedItems[i].quantity + ' | ' + listOfSelectedItems[i].price + '<br />';
 
}
sessionStorage.setItem("finalItems",finalItems);
 let pay = document.createElement('a');
    pay.setAttribute('ID', 'nextpage');
pay.setAttribute('href', "file:///C:/Users/supri/java_workspace/capstone2/Reciept.html");
  pay.innerHTML = '<button id ="Confirm">Pay</button>';
if(!document.getElementById('nextpage')){
let paybody = document.getElementsByTagName("body")[0];
paybody.appendChild(pay);
document.getElementById("Pay").disabled=true;
DisableAll();
}
	
}

function DisableAll()
{
	document.getElementById("Bread_btn").disabled=true;
	document.getElementById("Bread_rmbtn").disabled=true;
	document.getElementById("Milk_btn").disabled=true;
	document.getElementById("Milk_rmbtn").disabled=true;
	document.getElementById("Eggs_btn").disabled=true;
	document.getElementById("Eggs_rmbtn").disabled=true;
	document.getElementById("Cereals_btn").disabled=true;
	document.getElementById("Cereals_rmbtn").disabled=true;
	document.getElementById("Apples_btn").disabled=true;
	document.getElementById("Apples_rmbtn").disabled=true;
}
function DisplayReciept()
{
	let selectedItems =sessionStorage.getItem('finalItems');
	let selectedTotal = 0;
	selectedTotal = sessionStorage.getItem('total');
	let totalwithTax = 0;
	let tax = 0;
	tax = (+(selectedTotal/100)*6).toFixed(2);
	totalwithTax= (+selectedTotal) + (+tax) ;
	totalwithTax = (+totalwithTax).toFixed(2);
	if(selectedItems === "")
	{
	tax=0;
	totalwithTax =0;	
	}
	//document.getElementById('displaySelected').innerHTML = sessionStorage.getItem('finalItems');
	let itemarray= selectedItems.split('<br />');
	let itemtable = document.createElement('table');
	itemtable.setAttribute("ID","ShoppingCart");
	let tablebody = document.getElementsByTagName("body")[0];
	let headerrowvalue = itemarray[0].split('|');
	let headerrow = document.createElement('tr');
	let headercol1 = document.createElement('td');
	headercol1.innerHTML=headerrowvalue[0];
	let headercol2 = document.createElement('td');
	headercol2.innerHTML=headerrowvalue[1];
	let headercol3 = document.createElement('td');
	headercol3.innerHTML=headerrowvalue[2];
	headerrow.append(headercol1);headerrow.append(headercol2);headerrow.append(headercol3);
	itemtable.append(headerrow);
	
	
	for(let inc=1;inc<itemarray.length-1;inc++)
	{
	let colValue = itemarray[inc].split('|');
	let itemrows = document.createElement('tr');
	let itemcolumn1 = document.createElement('td');
	itemcolumn1.innerHTML=colValue[0];
	let itemcolumn2 = document.createElement('td');
	itemcolumn2.innerHTML=colValue[1];
	let itemcolumn3 = document.createElement('td');
	itemcolumn3.innerHTML=colValue[2];
	itemrows.append(itemcolumn1);itemrows.append(itemcolumn2);itemrows.append(itemcolumn3);
	itemtable.append(itemrows);
	
	}
		 headerrow = document.createElement('tr');
	 headercol1 = document.createElement('td');
	headercol1.innerHTML="Tax(6% State Tax)";
	 headercol2 = document.createElement('td');
	headercol2.innerHTML="";
	 headercol3 = document.createElement('td');
	headercol3.innerHTML= tax;
	headerrow.append(headercol1);headerrow.append(headercol2);headerrow.append(headercol3);
	itemtable.append(headerrow);
		
	 headerrow = document.createElement('tr');
	 headercol1 = document.createElement('td');
	headercol1.innerHTML="Total";
	 headercol2 = document.createElement('td');
	headercol2.innerHTML="";
	 headercol3 = document.createElement('td');
	headercol3.innerHTML= (totalwithTax);
	headerrow.append(headercol1);headerrow.append(headercol2);headerrow.append(headercol3);
	itemtable.append(headerrow);
	if(selectedTotal > 0)
 tablebody.appendChild(itemtable);
}


function removeItem(item,price)
{
		var index;
	
	let qty =0 ;
	console.log(item);
	console.log(price);
if(item=="Bread")
{
	if(bread_qty > 0)
 bread_qty = bread_qty-1;
qty=bread_qty;
}
else if(item=="Milk")
{
	if(bread_qty > 0)
	 milk_qty =milk_qty-1;
qty=milk_qty;
}
else if(item=="Eggs")
{
	if(bread_qty > 0)
	 egg_qty =egg_qty-1;
qty=egg_qty;
}
else if(item=="Cereals")
{
	if(bread_qty > 0)
	 cereal_qty =cereal_qty-1;
qty=cereal_qty;
}
else if(item=="Apples")
{
	if(bread_qty > 0)
	 apple_qty =apple_qty-1;
qty=apple_qty;
}
console.log(listOfNames);
console.log(qty);
if(listOfNames.includes(item))
{
	console.log("Inside" + qty);
	index = listOfNames.indexOf(item);
	console.log(index);
	if(qty>0)
	{
	console.log(listOfSelectedItems[index].quantity);
	listOfSelectedItems[index].quantity =qty;
	listOfSelectedItems[index].price -= price;
	}
	else if(qty===0)
	{
	listOfSelectedItems[index].quantity =0;
	listOfSelectedItems[index].price =0;
	qty=0;
	listOfSelectedItems.splice(index, 1);
	listOfNames.splice(index, 1);
	total -=price;
	price =0;
	}
	else
	{
		price=0;
	}
	total -=price;
	var currentElement = document.getElementById(item+'_tb');
	console.log(currentElement);
	currentElement.value = qty;
	//alert(total);
	sessionStorage.setItem("total",total);
	for(let val=0;val<listOfSelectedItems.length;val++)
	{
	console.log("listOfSelectedItems_"+val+":" +listOfSelectedItems[val].name+ ' | ' + listOfSelectedItems[val].quantity + ' | ' + listOfSelectedItems[val].price );
	}
	}
	
}

function resetSessionVariables()
{
	sessionStorage.setItem("total",0);
	sessionStorage.setItem("finalItems","");
}



