import { useEffect, useState, useCallback } from 'react';
import './Cart.css';
import { deleteAllProductInCart, deleteProductInCart, getProductsInCart, getTotalPriceInCart, updateProductQuantityInCart } from '../../services/CartService';
import { getProductById } from '../../services/ProductService';
import { createPurchase } from '../../services/PurchaseService';
import { useNavigate, useOutletContext } from 'react-router-dom';
import _ from 'lodash'; // Import lodash for debounce

const Cart = (props) => {

    document.title = "Giỏ hàng"

    const navigate = useNavigate();
    const { check, setCheck } = useOutletContext();
    const [listProduct, setListProduct] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [userName, setUserName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [address, setAddress] = useState("");
    const [customerRequest, setCustomerRequest] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);

    const debouncedUpdateQuantity = useCallback(
        _.debounce(async (productId, quantity) => {
            await updateProductQuantityInCart(productId, quantity);
            setCheck(prevCheck => !prevCheck);
        },300),
        []
    );

    const handleAddProductQuantity = (productId) => {
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities, [productId]: (prevQuantities[productId] || 0) + 1 };
            debouncedUpdateQuantity(productId, newQuantities[productId]);
            return newQuantities;
        });
    };

    const handleMinusProductQuantity = (productId) => {
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities, [productId]: (prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1) };
            debouncedUpdateQuantity(productId, newQuantities[productId]);
            return newQuantities;
        });
    };

    const handleFormatCurrency = (amount) => {
        let config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9 };
        let formatted = new Intl.NumberFormat('it-IT', config).format(amount);
        return formatted;
    };

    const isVietnamesePhoneNumber = (number) => {
        return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
    };

    const handleDeleteProductInCart = async (product) => {
        let productId = product.id;
        // handleDeleteProductInCartTemporary(productId)
        const newData = await deleteProductInCart(productId);
        if(newData){
            fetchProducts()
        }
        setCheck(!check);
    };

    const handleCreateOrder = async () => {
        if (totalPrice === 0 || !totalPrice || !productQuantity) {
            alert("Bạn chưa có sản phẩm nào để mua!");
            return;
        }

        if (!userName || !phoneNum || !address || !customerRequest) {
            alert("Vui lòng điền đầy đủ thông tin người mua");
            return;
        }

        if (!isVietnamesePhoneNumber(phoneNum)) {
            alert("Vui lòng nhập đúng số điện thoại");
            return;
        }

        const purchase = await createPurchase(
            userName,
            phoneNum,
            address,
            customerRequest,
            totalPrice,
            productQuantity
        );
        alert("Đơn hàng của bạn đã được gửi");
        const res = await deleteAllProductInCart();
        if (res && res.data) {
            setCheck(!check)
            fetchProducts();
        }
        if (purchase && purchase.data) {
            setUserName("");
            setPhoneNum("");
            setAddress("");
            setCustomerRequest("");
            setTotalPrice(0);
        }
    };

    const fetchProducts = async () => {
        const products = await getProductsInCart();
        const price = await getTotalPriceInCart();

        if (price && price.data) {
            setTotalPrice(price.data.totalPrice);
        }

        if (products && products.data) {
            setProductQuantity(products.data);
        }

        const data = Object.keys(products.data);
        let quantities = {};

        const productList = await Promise.all(data.map(async (value) => {
            const res = await getProductById(+value);
            quantities[value] = products.data[value];
            if (res.data) {
                return res.data;
            }
        }));

        setQuantities(quantities);
        setListProduct(productList);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // const handleDeleteProductInCartTemporary = (productId) => {
    //     const newListProducts = listProduct.filter((item) => item.id != productId);
    //     if(newListProducts.length > 1){
    //         setListProduct(newListProducts)
    //     }
    // }

    return (
        <div className="cart-container">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} className='breadcrumb-cart' aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" onClick={() => navigate("/")}><a>Trang chủ</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Giỏ hàng</li>
                </ol>
            </nav>

            <div className='listitem-table'>
                <h3 style={{ textAlign: 'center', paddingBottom: '20px' }}>Giỏ Hàng</h3>
                <table className='table'>
                    <thead>
                        <tr className='table-head'>
                            <td style={{ width: '60px' }}>STT</td>
                            <td>Sản Phẩm</td>
                            <td style={{ width: '160px' }}>Giá</td>
                            <td style={{ width: '120px' }}>Số lượng</td>
                            <td style={{ width: '160px' }}>Tổng giá</td>
                            <td style={{ width: '160px' }}>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct && listProduct.map((item, index) => (
                            <tr key={`cartProduct${index}`}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className='product-cartitem'>
                                        <div className='product-image'>
                                            <img src={`data:image/png;base64,${item.imgData}`} className='img-thumbnail' alt={item.name}></img>
                                        </div>
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td>{handleFormatCurrency(item.price)}</td>
                                <td>
                                    <i className='ti-minus' onClick={() => handleMinusProductQuantity(item.id)}></i>
                                    <span style={{ width: '40px', display: 'inline-block', textAlign: 'center' }}>{quantities[item.id] || 1}</span>
                                    <i className='ti-plus' onClick={() => handleAddProductQuantity(item.id)}></i>
                                </td>
                                <td>{handleFormatCurrency(item.price * (quantities[item.id] || 1))}</td>
                                <td className='td-icon'>
                                    <i className='ti-trash' onClick={() => handleDeleteProductInCart(item)} style={{ paddingRight: '10px', lineHeight: "80px" }}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='information'>
                <div className='custom-infomation'>
                    <h3>THÔNG TIN KHÁCH HÀNG</h3>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Họ và tên</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            required
                            placeholder="Nguyễn Văn A"
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            id="inputAddress2"
                            placeholder="123456789"
                            value={phoneNum}
                            onChange={(event) => setPhoneNum(event.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">Địa chỉ</label>
                        <input
                            type="text"
                            className="form-control"
                            required
                            id="inputAddress2"
                            placeholder="Hà Nội"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">Ghi chú</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress2"
                            placeholder="Hãy để lại yêu cầu của bạn với cửa hàng"
                            value={customerRequest}
                            onChange={(event) => setCustomerRequest(event.target.value)}
                        />
                    </div>
                </div>
                <div className='cart-infomation'>
                    <h3>THÔNG TIN ĐƠN HÀNG</h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <td>Sản phẩm</td>
                                <td>Tổng</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listProduct && listProduct.map((item, index) => (
                                <tr key={`orderProduct${index}`}>
                                    <td>{item.name} x {quantities[item.id]}</td>
                                    <td>{handleFormatCurrency(item.price * (quantities[item.id] || 1))}</td>
                                </tr>
                            ))}
                            <tr>
                                <td>Tổng đơn hàng</td>
                                <td>{handleFormatCurrency(totalPrice)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <span style={{ fontStyle: "italic", fontSize: '14px', opacity: '0.7', padding: '8px' }}>Thanh toán khi nhận hàng</span>
                    <div className='btn-cartsubmit'>
                        <button onClick={() => handleCreateOrder()}>Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
