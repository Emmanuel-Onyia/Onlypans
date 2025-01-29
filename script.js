document.addEventListener('DOMContentLoaded', () => 
{
    var items = document.querySelectorAll('.card button');

    var order = [];

    var receiptContainer = document.getElementById('receipt');


    //adding listeners to the add to cart buttons
    items.forEach(btn => 
    {
        btn.addEventListener('click', () => 
        {
            var itemName = btn.getAttribute('itemName');

            var price = parseFloat(btn.getAttribute('price'));

            var quantity = prompt(`How many ${itemName} would you like ?`);

            //Nan check if is a number , ! checks if it is not null , <= 0 checks negative value
            if (!quantity || isNaN(quantity) || quantity <= 0)
            {
                alert('Please enter a number only !');
                return;
            }

            order.push(
            {
                name: itemName,
                price: price,
                quantity: parseInt(quantity),
                total: price * quantity,
            });
       });
    });

    //adding listener to checkout button
    document.getElementById('checkout').addEventListener('click', () => 
    {
        if (order.length === 0) 
        {
            alert('No item in Cart');
            return;
        }

        const customerName = prompt('Please enter your name:');
        if (!customerName) //if null is entered
        {
            alert('You must enter your name to place the order.');
            return;
        }

        const receiptStr = generateReceipt(order, customerName);
        displayReceipt(receiptStr);
    });

    function generateReceipt(order, customerName) 
    {
        let receiptStr = `<strong>Customer name : ${customerName}</strong><br>`;
        let totalWithoutGst = 0;

        order.forEach(item => {
            receiptStr += `${item.name} x ${item.quantity} = $${item.total.toFixed(2)}<br>`;
            totalWithoutGst += item.total;
        });

        const gst = totalWithoutGst * 0.13;
        const total = totalWithoutGst + gst;

        receiptStr += `<br>totalWithoutGst: $${totalWithoutGst.toFixed(2)}<br><br> GST (13%): $${gst.toFixed(2)}<br>  Total: $${total.toFixed(2)}<br>`;

        return receiptStr;
    }

    function displayReceipt(receiptStr) 
    {
        receiptContainer.innerHTML = receiptStr;
    }
});
