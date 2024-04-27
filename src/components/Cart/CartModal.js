import { event } from 'jquery';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProductToCart } from '../../services/CartService';

const CartModal = (props) => {

    const {show , setShow , productCart} = props
    
    const [totalPrice , setTotalPrice] = useState(1)
    const [amount , setAmount] = useState(1)

   
    const handleShow = () =>{
        setTotalPrice(amount * (+productCart.price))
    }
    
    const handleAddProductToCart = async (productId , quantity) => {
       const res = await addProductToCart(productId,quantity);
       setAmount(1)
       setShow(false)
    }
    
    useEffect(() => {
        const totalPriceToPay = amount * (+productCart.price);
        setTotalPrice(totalPriceToPay);
    }, [amount]);

    return (
        <>
      <Modal 
            show={show} 
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            onShow={() => handleShow()}>
        <Modal.Header closeButton>
          <Modal.Title>Đặt Hàng - {productCart.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <label for="inputPassword5" class="form-label">Số lượng:</label>
            <input type="number" id="inputPassword5" class="form-control" min={1} max={100} value={amount} onChange={(event) => setAmount(+event.target.value)}/>   
        </div>
        <div>
            <label for="inputPassword5" class="form-label mt-5" aria-disabled>Giá tiền:</label>
            <input type="text" id="inputPassword5" disabled class="form-control" defaultValue={+productCart.price} value={`${totalPrice} VND`}/>   
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Mua hàng
          </Button>
          <Button variant="primary" onClick={() => handleAddProductToCart(productCart.id , amount)}>
            Thêm vào giỏ hàng
          </Button>
        </Modal.Footer>
       </Modal>

        </>
    )
}

export default CartModal