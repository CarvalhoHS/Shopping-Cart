let shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem("data")) || []

let gerarshop = () => {
    return (shop.innerHTML= shopItemsData.map((v) => {
        let { id, name, price, desc, img, estoque} = v;
        let search = basket.find((x) => x.id === id) || [];
        if(estoque != 0){
        return `
        <div id=product-id-${id} class="item">
        <img width="220" src="Images/${img}" class="Card">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc} </p>
            <p>Estoque: ${estoque}</p>
            <div class="price-quantity">
            <h2> R$ ${price}</h2>
            <div class="buttons">
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            </div>
            </div>
        </div>
    </div>
        `
    } else{
        return `
        <div id=product-id-${id} class="item">
        <img src="Images/fora-de-estoque.png" class="Fest" alt"">
        <img width="220" src="Images/${img}" class="Card">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc} </p>
            <div class="price-quantity">
            </div>
            <p class=fora-de-estoque>FORA DE ESTOQUE</p>
            </div>
        </div>
    </div>
        `    
    }
    }).join(""))
}

gerarshop();

let increment = (id) =>{
    let selectedItem = id
    let search = basket.find((x)=> x.id === selectedItem.id)


    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        })

    }
    else{
        search.item += 1;
    }
  //  console.log(basket)
    update(selectedItem.id)

    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) =>{
    let selectedItem = id
    let search = basket.find((x)=> x.id === selectedItem.id)

    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    update(selectedItem.id);
   basket = basket.filter((x) =>x.item !== 0)
    

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) =>{
    let search = basket.find((x) =>x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
}

let calculation =()=>{
  let cartIcon = document.getElementById("cartAmount")
  cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x+y,0)

}

calculation()