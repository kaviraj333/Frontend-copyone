const btncart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnclose = document.querySelector('#cart-close');

btncart.addEventListener('click',()=>{
    cart.classList.add('cart-active')
})
btnclose.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
})

document.addEventListener('DOMContentLoaded',loadproduct);
 
function loadproduct(){
   loadcontent();
}

function loadcontent(){
    let btnremove = document.querySelectorAll('.cart-remove');
    btnremove.forEach((btn)=>{
        btn.addEventListener('click',removeitem);
    });

    //product item change event
    let qtyelement = document.querySelectorAll('.cart-quantity');
    qtyelement.forEach((input)=>{
        input.addEventListener('change',changeqty);
    });
    //product cart
        let cartbtn = document.querySelectorAll('.add-cart');
         cartbtn.forEach((input)=>{
        input.addEventListener('click',addCart);
    });

    updateTotal();

}

//REMOVE ITEM
function removeitem(){
    if(confirm('Are you sure to remove')){
        let title=this.parentElement.querySelector('.cart-shirt-title').innerHTML;//nama remove panra product title intha title la store aaghum
        itemList=itemList.filter(el=>el.title!=title);  // item listkula iruka ella productaiyum check pannanum aana ithu ena condition la filter pannuthuna intha title match aagatha product ipo printed shirt remove panrom appadina antha array la printed shirt thavara matha ellathaiyum filter panni eduthu ithukula potru nu sollrom
        this.parentElement.remove();
        loadcontent();
}
}
//change quantity

function changeqty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadcontent();
}

let itemList=[];

//Add cart
function addCart(){
    let dress = this.parentElement;
    let title = dress.querySelector('.shirt-title').innerHTML;
    let price = dress.querySelector('.shirt-price').innerHTML;
    let imgSrc = dress.querySelector('.shirt-img').src;
    // console.log(title,price,imgSrc);

    let newproductobject = {
        title,price,imgSrc} //intha datava vachu tha validate panrom


     // Check if the product already exists in the cart
if (itemList.find((el) => el.title === newproductobject.title)) {
    alert("Product already added in cart");
    return;
} else {
    itemList.push(newproductobject);
}


    let newproduct = createCartProduct(title,price,imgSrc);
    let element = document.createElement('div');
    element.innerHTML=newproduct;
    let cartBasket = document.querySelector('.cart-content');

    cartBasket.append(element);
    loadcontent();
}


function createCartProduct(title,price,imgSrc){
    return `     
                             <div class="cart-box">
                             <img src="${imgSrc}" alt="" class="cart-img" height="200px">
                             <div class="detail-box">
                                <div class="cart-shirt-title">${title}</div>
                                <div class="price-box">
                                    <div class="cart-price">${price}</div>
                                    <div class="cart-amt">${price}</div>
                                </div>
                                <input type="number" value="1" class="cart-quantity">
                             </div>
                             <ion-icon name="trash" class="cart-remove"></ion-icon>
                        </div>`;
}

function updateTotal(){
    const cartItems = document.querySelectorAll('.cart-box');
     const totalValue = document.querySelector('.total-price');

let total = 0;

cartItems.forEach(product => {
    let priceElement = product.querySelector('.cart-price'); // Added dot for class
    let price = parseFloat(priceElement.innerHTML.replace('Rs.', ''));

    let qty = product.querySelector('.cart-quantity').value; 

    total += price * qty;

    product.querySelector('.cart-amt').innerText = "Rs. " + (price * qty).toFixed(2); // Formatting to 2 decimal places
});


totalValue.innerHTML='Rs.'+total;



//Add product count in cart icon

const cartCount = document.querySelector('.cart-count');
let count= itemList.length;
cartCount.innerHTML=count;

if(count==0){
    cartCount.style.display='none';
}else{
    cartCount.style.display='block';
}



}