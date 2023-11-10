let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("texes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let categore = document.getElementById("categore");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

// discount.onkeyup = function () {
//     console.log(discount.value)
// }

function getTotal() {
    if (price.value != '') {
        let result = ( +price.value + +texes.value + +ads.value ) - +discount.value;
        total.innerHTML = result
        total.style.background = "#040"
    }else {
        total.innerHTML = "    "
        total.style.background = "#7a2a2a";
    }
}







if (localStorage.product != ""){
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = []
}







// let dataPro = [];
submit.onclick = function () {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        texes:texes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        categore:categore.value.toLowerCase(),
    }

    if (title.value != "" && count.value <= 100) {
        if (mood == "create") {
                if (newPro.count > 1 ) {
                    for (let i = 0 ; i < newPro.count; i++ ) {
                        dataPro.push(newPro)
                    }
                }else {
                    dataPro.push(newPro)
                }
            }else {
                dataPro[tmp] = newPro;
                mood = "create";
                submit.innerHTML = "Create";
                count.style.display = "block";
        }
    }
    localStorage.setItem("product" , JSON.stringify(dataPro))
    clearData() 
    showData()
}
function clearData() {
    title.value = "" 
    price.value = "" 
    texes.value = "" 
    ads.value = "" 
    discount.value = "" 
    total.innerHTML = "" 
    count.value = "" 
    categore.value = "" 
}
function showData() {
    getTotal()
    let tabla = "";
    for (let i = 0 ; i < dataPro.length ; i++) {
        tabla += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].texes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].categore}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button  onclick="deleteData( ${i} )"  id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = tabla;
    if(dataPro.length > 0 ){
        document.getElementById("deleteAll").innerHTML = `
        <button onclick="deleteAll()" > Delete All (${dataPro.length})</button>
        `
    }else {
        document.getElementById("deleteAll").innerHTML = "" ;
    }
}
showData()
function deleteData(i) {
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
function deleteAll() {
    localStorage.clear;
    dataPro.splice(0)
    showData()
}
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    texes.value = dataPro[i].texes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = "none"
    categore.value = dataPro[i].categore;
    submit.innerHTML = "Update"
    mood = "update";
    tmp = i ;
    scroll({
        top:0,
        behavior : "smooth"
    })
}
let searchMood = "title";
function getSearchMood(id) {
    let search = document.getElementById("search")
    if (id == "searchTitle"){
        searchMood = "title"
        search.placeholder = "Search by Title"
    }else {
        searchMood = "category"
        search.placeholder = "Search by Categore"
        // search.value.clear()
    }
search.focus();
search.value = "";
showData()
}


function searchData(value) {
    let tabla = "";
    if (searchMood == "title") {
        for (let i = 0 ; i < dataPro.length; i++) {
            if(dataPro[i].title.startsWith(value)) {
                tabla += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].texes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].categore}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button  onclick="deleteData( ${i} )"  id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }else {
        for (let i = 0 ; i < dataPro.length; i++) {
            if(dataPro[i].categore .startsWith(value)) {
                tabla += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].texes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].categore}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button  onclick="deleteData( ${i} )"  id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById("tbody").innerHTML = tabla
}


// "DSadas".startsWith()