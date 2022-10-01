let langar = document.querySelector(".langar");
console.log(langar);
let images = ["langar.webp", "langar1.jpg", "langar2.webp", "langar3.jpg",  "langar5.jpeg"];


function fun(i) {
    i=i%images.length;
    let image = document.createElement("img");
    image.src = images[i];
    langar.append(image);
    setTimeout(() => {
        langar.removeChild(image);
        fun(i+1);
    }, 4000);
}
fun(0);






var options = {
    "key": "rzp_test_t6ZVVaRjJ5xEWN",
    "amount": "10",
    "currency": "INR",
    "name": "Harpreet Singh",
    "handler": function (response) { 
        console.log(response);
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
});
document.getElementById('d-button').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
}