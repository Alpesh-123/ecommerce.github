var updateBtns = document.getElementsByClassName('update-cart')


for (i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function () {
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:', productId, 'action:', action)
        console.log('USER:', user)


        if (user === 'AnonymousUser') {
            console.log('User is not authenticated')
        } else {
            updateUserOrder(productId, action)
        }
    })
}


function addCookieItem(productId, action) {
    console.log('Not logged in...')

    if (action == 'add') {
        if (cart[productId] === undefined) {
            cart[productId] = { 'Quantity': 1 }
        } else {
            cart[productId]['Quantity'] += 1
        }
    }

    if (action == 'remove') {
        cart[productId]['Quantity'] += 1

        if (cart[productId]['Quantity'] <= 0) {
            console.log('Remove item')
            delete cart[productId]

        }

    }

    console.log('Cart:', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"

}


function addCookieItem(productId, action) {
    console.log('User is not authenticated')

    if (action == 'add') {
        if (cart[productId] == undefined) {
            cart[productId] = { 'Quantity': 1 }

        } else {
            cart[productId]['Quantity'] += 1
        }
    }

    if (action == 'remove') {
        cart[productId]['Quantity'] -= 1

        if (cart[productId]['Quantity'] <= 0) {
            console.log('Item should be deleted')
            delete cart[productId];
        }
    }

    console.log('Cart:', cart)

    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
}


function updateUserOrder(productId, action) {
    console.log('User is logged in, sending data...')

    var url = '/update_item/'
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken':csrftoken,

        },
        body: JSON.stringify({ 'productId': productId, 'action': action }),
    })

    .then((response) => {
        return response.json()
    })

    .then((data) => {
        console.log('Data:', data)
        location.reload()
    })

        
    var url = '/process_order/'
    fetch(url, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
            'x-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ 'form': userFormData, 'shipping': shippingInfo }),

    })
    .then((response) => response.json())
    .then((data) => {
            console.log('Success:', data)
            alert('Transaction completed')
            window.location.href = "{% url 'store' %}"

          })
}