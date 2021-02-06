const searchBar = document.getElementById("search-ber");
searchBar.addEventListener("input",function(e){
    let inputObject = e.target.value;
    console.log(inputObject);
})
var x = document.getElementById("search-result");
x.innerHTML = "";