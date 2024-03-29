// JavaScript source code
if (document.readyState == 'loading') {
    document.addEventListener('DOMContenetLoaded', ready);
}
else {
    ready();
}
function ready() {

    var addToCartButtons = document.getElementsByClassName('store-btn');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addtoCartClicked);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}
function homeBtn() {
    alert("Check out Store Page for Details........");
    //window.open('file:///C:/Users/source/repos/PracticeHTMLTBSStorePage.html');
}

function purchaseClicked() {
    alert('Thank you for your purchase');
    var cartItemsRemove = document.getElementsByClassName('cart-items')[0];
    while (cartItemsRemove.hasChildNodes()) {
        cartItemsRemove.removeChild(cartItemsRemove.firstChild)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + '0';
}

function addtoCartClicked(event) {
    var button = event.target;
    var shopItem=button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByTagName("strong")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    //console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartRowContents = `<div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
               <span class="cart-item-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-remove" type="button">REMOVE</button>
               </div>`;
    
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    updateCartTotal();

    var removeCartItemButtons = document.getElementsByClassName('btn-remove');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var removebutton = removeCartItemButtons[i];
        removebutton.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
    }



function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRowIn = cartRows[i];
        var priceElement = cartRowIn.getElementsByClassName('cart-item-price')[0];
        var quantityElement = cartRowIn.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}

}