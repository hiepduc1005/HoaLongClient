import imgHeader from "../../assets/img/rIEIMS4jPRFa3hkfYoyS8OL5j3kYrXVR6d9fHx93.jpeg"
import './HomePage.css'
import nemChua from "../../assets/img/nemchua.jpeg"

const HomePage = (props)=>{
    return(
        <div className="homepage-container">
           <div className="image-header">
            <img src={imgHeader}></img>
           </div>

           <div className="box-product">
                <div className="text-introduce">
                    <p>
                        Thương hiệu Ước Lễ gia truyền Hồng Chiến với bề dày truyền thống lâu đời từ năm 1989 từ lâu đã là địa chỉ uy tín trên bản đồ ẩm thực đất Hà Thành. Với các sản phẩm chính gốc Ước Lễ gia truyền như Nem Chua, Nem Chua Rán, Nem Chua Nướng, Giò Lụa, Giò Tai, Giò Bò ... Xem thêm
                    </p>
                </div>

                <div className="title">
                    SẢN PHẨM NỔI BẬT
                </div>

            <div className="list-item">
                <div className="item">
                    <div className="image-product">
                        <img src={nemChua}></img>
                    </div>
                    <a className="product-name">Nem Chua Nướng</a>
                    <span className="price">37,000 VNĐ/10 cái</span>
                    <p className="product-description">Khi đến với Hà Nội thì bạn có thể thưởng thức vô vàn những món nướng ngon. Nào là khoai, ngô, sắn… tới cánh gà nướng, vịt nướng, thịt xiên nướng, nhưng có một món rất được ưa chuộng nhất là đối với các bạn trẻ. Chắc rằng nhiều bạn đã biết chúng tôi đang muốn nói đến</p>
                    <div className="action">
                        <a className="product-detail">Thông tin sản phẩm</a>
                        <button className="order">Đặt hàng</button>
                    </div>
                </div>
                <div className="item">
                    <div className="image-product">
                        <img src={nemChua}></img>
                    </div>
                    <a className="product-name">Nem Chua Nướng</a>
                    <span className="price">37,000 VNĐ/10 cái</span>
                    <p className="product-description">Khi đến với Hà Nội thì bạn có thể thưởng thức vô vàn những món nướng ngon. Nào là khoai, ngô, sắn… tới cánh gà nướng, vịt nướng, thịt xiên nướng, nhưng có một món rất được ưa chuộng nhất là đối với các bạn trẻ. Chắc rằng nhiều bạn đã biết chúng tôi đang muốn nói đến</p>
                    <div className="action">
                        <a className="product-detail">Thông tin sản phẩm</a>
                        <button className="order">Đặt hàng</button>
                    </div>
                </div>
                <div className="item">
                    <div className="image-product">
                        <img src={nemChua}></img>
                    </div>
                    <a className="product-name">Nem Chua Nướng</a>
                    <span className="price">37,000 VNĐ/10 cái</span>
                    <p className="product-description">Khi đến với Hà Nội thì bạn có thể thưởng thức vô vàn những món nướng ngon. Nào là khoai, ngô, sắn… tới cánh gà nướng, vịt nướng, thịt xiên nướng, nhưng có một món rất được ưa chuộng nhất là đối với các bạn trẻ. Chắc rằng nhiều bạn đã biết chúng tôi đang muốn nói đến</p>
                    <div className="action">
                        <a className="product-detail">Thông tin sản phẩm</a>
                        <button className="order">Đặt hàng</button>
                    </div>
                </div>
                <div className="item">
                    <div className="image-product">
                        <img src={nemChua}></img>
                    </div>
                    <a className="product-name">Nem Chua Nướng</a>
                    <span className="price">37,000 VNĐ/10 cái</span>
                    <p className="product-description">Khi đến với Hà Nội thì bạn có thể thưởng thức vô vàn những món nướng ngon. Nào là khoai, ngô, sắn… tới cánh gà nướng, vịt nướng, thịt xiên nướng, nhưng có một món rất được ưa chuộng nhất là đối với các bạn trẻ. Chắc rằng nhiều bạn đã biết chúng tôi đang muốn nói đến</p>
                    <div className="action">
                        <a className="product-detail">Thông tin sản phẩm</a>
                        <button className="order">Đặt hàng</button>
                    </div>
                </div>
                
            </div>
           </div>

           <div></div>
        </div>
    )
}

export default HomePage