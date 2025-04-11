const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if(bar){
    bar.addEventListener('click', () =>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click', () =>{
        nav.classList.remove('active');
    })
}

async function addToCart(img, title, price) {
    try {
      const res = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          img,
          title,
          price,
          userId: "1234" // Dummy userId
        })
      });
  
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("Error adding to cart");
    }
  }

  function addToCart(productId) {
    const userId = "user-001"; // Normally from login system

    fetch('http://localhost:5000/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, productId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add to cart");
      }
    })
    .catch(err => console.error(err));
  }
  