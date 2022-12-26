let Countries =[]
let list = document.getElementById("ListOfcountry")
let total = document.getElementById("TotalCountry")
let input = document.getElementById("input")
let select = document.getElementById("select")
let alpDiv = document.getElementById("alpa")

let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
fillData()
function fillData(){
    fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
        Countries = [...data]
        console.log(Countries);
        CreateCard()
        regionFill()
        alpFill()
    })
    .catch((error) => console.log(error))
}
function CreateCard(filterCountry){
    let row = ''
    list.innerHTML = ""
    if (Countries == 0){
        console.log("data i empty");
    }
    (filterCountry ? filterCountry.length == 0 ? [] : filterCountry : Countries).map((Countries) =>{
        row += `<div class="col-4 border m-2 p-5"> 
        <a href="">
          <h6> ${Countries.name.common}</h6>
        </a>
        <span class="txt">Хүн амын тоо ${Countries.population}</span><br/>
        <span class="txt">Газар нутгийн хэмжээ ${Countries.area}</span>
        </div> `;
    })

    total.innerHTML = filterCountry ? filterCountry.length : Countries.length
    list.innerHTML = row
}
function regionFill(){
    let regionArr = []
    Countries.map((c) => {
        if(!regionArr.includes(c.region)){
            regionArr.push(c.region)
        }
    })
    regionArr.map((a) => {
        select.innerHTML += `<option value = "${a}">${a}</option>`
    })
}
function alpFill(){
    let row = '';
    let conalp = []
    for (i = 0 ; i < Countries.length; i++){
        if (!conalp.includes(Countries[i].name.common[0])){
            conalp.push(Countries[i].name.common[0])
        }
    }
    console.log(conalp);
    alphabet.map((alp) =>{
        if (conalp.includes(alp)){
            row += `<a onclick = "byLetter('${alp}')" class= "d-inline m-1 text-decoration-none"> ${alp}</a>`
        } else{
            row += `<a class= "d-inline m-1 text-decoration-none " style = "color: grey"> ${alp}</a>`
        }
    })
    alpDiv.innerHTML = row
}
select.addEventListener("change", (e)=>{
    let newFiltedCountries = Countries.filter( (country) =>{
        if(input.value.length > 0){
            return (country.region == e.target.value && country.name.common.includes(input.value))
        } else {
            return country.region == e.target.value
        }
    })
    CreateCard(newFiltedCountries)

})
input.addEventListener("input", (e) => {
    let newCountries = Countries.filter(
        (co) =>{
            if (select.value != "0"){
                return(
                    co.name.common.includes(e.target.value) == true &&
                    co.region == select.value
                    )
            }else {
                return co.name.common.includes(e.target.value) == true 
            }
        }
    )
    CreateCard(newCountries)
})
function sort(para){
    if (para == 'name'){
        Countries.sort((a,b) =>
            a.name.common == b.name.common ? 0
            : a.name.common > b.name.common ? -1 
            : 1     
        )
    } else if (para == 'population'){
        Countries.sort((a,b) => b.population - a.population )
    } else {
        Countries.sort((a,b) =>b.area - a.area)
    }
    CreateCard()
}
function buleg(para){
    let row = ""
    let alphabetIndex = 0
    list.innerHTML = "" 
    Countries.sort((a,b) =>
            a.name.common == b.name.common ? 0
            : a.name.common > b.name.common ? 1 
            : -1     
        )
    if (para == 'firstLetter'){
        row +=` <h2>${alphabet[alphabetIndex]}</h2>`
        for (i = 0 ; i < Countries.length -1; i++){
            if(Countries[i].name.common[0] == Countries[i + 1].name.common[0]){
                row += 
                    `<div class="col-4 border m-2 p-5"> 
                    <a href="">
                      <h6> ${Countries[i].name.common}</h6>
                    </a>
                    <span class="txt">Хүн амын тоо ${Countries[i].population}</span><br/>
                    <span class="txt">Газар нутгийн хэмжээ ${Countries[i].area}</span>
                    </div> `;
            } else {
                alphabetIndex++
                row += 
                    `<div class="col-4 border m-2 p-5"> 
                    <a href="">
                      <h6> ${Countries[i].name.common}</h6>
                    </a>
                    <span class="txt">Хүн амын тоо ${Countries[i].population}</span><br/>
                    <span class="txt">Газар нутгийн хэмжээ ${Countries[i].area}</span>
                    </div> `;
                if (Countries[i + 1].name.common[0]== alphabet[alphabetIndex]){
                    row +=` <h2>${alphabet[alphabetIndex]}</h2>`
                } else{
                    alphabetIndex++
                }
            }
        }
        list.innerHTML = row
    }else {
    }
}
function byLetter(useg){
    console.log(useg);
    let row = ""
    list.innerHTML = ""
    Countries.sort((a,b) =>
            a.name.common == b.name.common ? 0
            : a.name.common > b.name.common ? 1
            : -1     
    )
   for (i = 0; i <Countries.length; i++){
    if(Countries[i].name.common[0] == useg){
        row += `<div class="col-4 border m-2 p-5"> 
        <a href="">
          <h6> ${Countries[i].name.common}</h6>
        </a>
        <span class="txt">Хүн амын тоо ${Countries[i].population}</span><br/>
        <span class="txt">Газар нутгийн хэмжээ ${Countries[i].area}</span>
        </div> `;
    } 
   }
   list.innerHTML = row
}