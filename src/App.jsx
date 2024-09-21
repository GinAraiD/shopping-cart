import { useState } from 'react';
import { products } from './dataproduct.js';

export default function List() {
  // ตะกร้าสินค้า
  const [cart, setCart] = useState([]);

  function addToCart(prd) {
    // ตรวจสอบว่ามีสินค้าอยู่ในตะกร้าแล้วหรือไม่
    const existingProduct = cart.find((item) => item.id === prd.id);

    if (existingProduct) {
      // ถ้ามีอยู่แล้ว ให้เพิ่มจำนวนสินค้า
      setCart(
        cart.map((item) =>
          item.id === prd.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // ถ้าไม่มีอยู่ในตะกร้า ให้เพิ่มสินค้าพร้อมจำนวนเริ่มต้นเป็น 1
      setCart([...cart, { ...prd, quantity: 1 }]);
    }
  }

   // ฟังก์ชันลบสินค้าออกจากตะกร้า
   function removeFromCart(productId) {
    setCart(cart.filter(product => product.id !== productId));
}

  function removeFromCartone(productId) {
    setCart(cart.map(product => 
        product.id === productId 
        ? { ...product, quantity: product.quantity - 1 }  // ลดจำนวนสินค้าลง 1
        : product
    ).filter(product => product.quantity > 0));  // ลบสินค้าหากจำนวนเป็น 0
  }


  // คำนวณราคารวมของสินค้าในตะกร้า
  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity; // คำนวณจากราคา * จำนวนสินค้า
  }, 0);

  return (
  <article className='backgroud'>
    <p className='backgroud-top'>
      <h1 style={{padding : '10px'}}>Shopping cart</h1>
    
    {cart.map((product) => (
      <p style={{margin : '10px'}} className="font-monospace"  key={product.id}>{product.prdName} - *{product.quantity}
      <p className="button-cancle font-monospace" onClick={() => removeFromCartone(product.id)}>delete one</p>
      </p>
    ))}
   <hr />
    {/* แสดงราคารวม */}
  <h3 style={{padding : '10px'}} className='underline'>Total price : {totalPrice} $</h3>
  <hr />
  </p>

    {/* ส่วน Mall */}
    <h1 style={{textAlign : 'center'}} >T - S H I R T . M A L L - O N L I N E</h1>
    <ul className="product-grid">
      {products.map((product) => (
        <button class="font-monospace" key={product.id}>
          <img src={product.img} alt={product.prdName} height='100px'/>
          <hr />
          <p>{product.prdName} {product.price}$</p>
          <p type="button" class="btn btn-secondary" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover" 
          onClick={() => addToCart(product)}>Add in Cart</p>
        </button>
      ))}
    </ul>
  </article>
  );
 }