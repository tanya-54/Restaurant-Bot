const baseUrl = 'http://localhost:5000'; // Update to your backend host when deployed

async function searchRestaurants() {
  const query = document.getElementById('searchInput').value;
  const res = await fetch(`${baseUrl}/api/restaurants/search?keyword=${query}`);
  const data = await res.json();
  document.getElementById('restaurantResults').innerHTML = data.map(r => `
    <div><b>${r.name}</b> – ${r.location} – ${r.priceRange}</div>
  `).join('');
}

async function placeOrder() {
  const userEmail = document.getElementById('userEmail').value;
  const restaurantId = document.getElementById('restaurantId').value;
  const items = JSON.parse(document.getElementById('orderItems').value);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const res = await fetch(`${baseUrl}/api/orders/place`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userEmail, restaurantId, items, totalAmount })
  });
  const data = await res.json();
  alert('Order placed! Order ID: ' + data._id);
}

async function payWithRazorpay() {
  const orderId = document.getElementById('dbOrderId').value;
  const amount = document.getElementById('amount').value;
  const receipt = document.getElementById('receipt').value;

  const res = await fetch(`${baseUrl}/api/payments/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, receipt })
  });
  const data = await res.json();

  const options = {
    key: 'YOUR_RAZORPAY_KEY_ID', // 🔁 Replace with your public Razorpay key
    amount: data.amount,
    currency: data.currency,
    name: "Restaurant Bot",
    description: "Order Payment",
    order_id: data.id,
    handler: async function (response) {
      await fetch(`${baseUrl}/api/payments/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId
        })
      });
      alert('✅ Payment Success!');
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}

async function trackOrder() {
  const id = document.getElementById('trackOrderId').value;
  const res = await fetch(`${baseUrl}/api/tracking/${id}`);
  const data = await res.json();
  document.getElementById('trackResult').textContent = JSON.stringify(data, null, 2);
}
