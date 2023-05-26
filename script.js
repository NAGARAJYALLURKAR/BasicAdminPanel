var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

var tempData; // for storing data which is recived from api
var row = document.getElementById("tableRow")
var details_box = document.getElementById("info-content")
$(document).ready(function(){
    $.get( url , function(data){ // api call
        console.log(data)   
        tempData = data // sotroing the data into temp veriable 
        data.map(item => createRow(item)) // sending the data to create a row in table through a function
    })
    // creating row data ------------------------------------------------
    function createRow(itemData){
        // console.log(itemData)
        row.innerHTML += 
        `
            <tr id = "image${itemData.id}" class="data-row" onclick="clickrow(${itemData.id})">
                <td class="column1">${itemData.id}</td>
                <td class="column2">${itemData.firstName}</td>
                <td class="column3">${itemData.lastName}</td>
                <td class="column4">${itemData.email}</td>
                <td class="column5">${itemData.phone}</td>
            </tr>
        `
}

})

function clickrow(id){
    $('#info-content').css("display", "block")
    // console.log(id)
    // creating details list -----------------------------------------
    tempData.map((item)=>{
        if(id === item.id){
                details_box.innerHTML =
                `
                    <div><b>User selected:</b> ${item.firstName} ${item.lastName}</div>
                        <div>
                            <b>Description: </b>
                            <textarea cols="50" rows="5" readonly>
                                ${item.description}
                            </textarea>
                        </div>
                        <div><b>Address:</b> ${item.address.streetAddress}</div>
                        <div><b>City:</b>${item.addresscity}</div>
                        <div><b>State:</b> ${item.address.state}</div>
                        <div><b>Zip:</b> ${item.address.zip}</div>
                    </div>
                `
        }
    })
    // function to remove and add background color to row data
    background(id)
    
}
// adding background color------
let bgId = '' // empty veriable to store the previous id of selected row
function background(id){

    if(bgId !== '') {document.getElementById(bgId).classList.remove("bgcolor")} // if previous id is empty then dont exe. else remove the background color from previous id

    nextId = "image"+id
    document.getElementById(nextId).classList.add("bgcolor") // adding border to the next id
    bgId = nextId
}

const searchfun = () =>{
    let filter = document.getElementById('search-box').value.toUpperCase() // geting input form user and converting it in upper case
    // console.log(filter)
    
    let myTableData = document.getElementById('tableRow') // selection table in order to select a all table row inside table


    let tr = myTableData.getElementsByTagName('tr')  // selecting all the table rows in table
    // console.log(tr)

    for( let i =0; i<tr.length; i++){       // ittreting over all tr 
        let td = tr[i].getElementsByTagName('td')[1]    // selectin table data which contain first name

        if(td){             // if td is having data then go inside 

            let textValue = td.textContent || td.innerHTML;   // getting the value or Name which is inside "td"

            if(textValue.toUpperCase().indexOf(filter) > -1){   // comparing with given "filter(name entered in input box)"  and existing name  : if the name does not exist then it will retrun as -1 else block will execute
                tr[i].style.display = '';

            }else{
                tr[i].style.display = 'none';  // if none of charecter present in table row then dont display the box
            }
        }
    }


}