import './Footer.css'

const Fotter = (props) => {
    return (
        <div className="footer">
             <div className="horizontal-line"></div>
            <div className="footer-title">
            LIÊN HỆ VỚI CHÚNG TÔI
            </div>
            <div className='footer-block-container'>
             <div className="block-left">
                <p className="note">
                    *Xin vui lòng điền đầy đủ các thông tin dưới đây,
                     chúng tôi sẽ trả lời bạn trong thời gian sớm nhất.
                </p>
                <div className="form-group">
                    <input placeholder="Họ tên" required className="form-control" type="text"></input>
                </div>
                <div className="form-group">
                    <input placeholder="Số điện thoại" required className="form-control" type="text"></input>
                </div>
                <div className="form-group">
                    <textarea rows={8} cols={80} placeholder="Nội dung liên hệ" className="form-control"></textarea>
                </div>
                <div className="form-contact-submit">
                    <button type="submit" >Liên hệ</button>
                </div>
                
                <div className='ifram-facebook'>
                 <iframe 
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=event&width=300&height=200&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId=3888796641351183" 
                    width={300} 
                    height={200} 
                    style={{border: "none", overflow: "hidden"}} 
                    scrolling="no" 
                    frameborder={0} 
                    allowfullscreen="true" 
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                 </iframe>        
          </div>
               
            </div>

            <div className="block-right">
                <h2>Nem chua Hồng Chiến</h2>
                <p>Giấy chứng nhận Đăng ký Kinh doanh số 01D8020323 do Phòng tài chính - Kế hoạch Quận Hai Bà Trưng cấp ngày 21/12/2011</p>
                <p>Địa chỉ : 11 Lê Đại Hành, Hai Bà Trưng, Hà Nội</p>
                <p>Điện thoại hotline: <b>1234567890</b></p>
                <p>Email : email@gmail.com</p>
                <div className="about-us">
                    <h2>Về chúng tôi</h2>
                    <div className='policy'>
                        <a>Chính sách bán hàng</a>
                        <a>Chính sách vận chuyển</a>
                        <a>Chính sách bảo hành đổi trả</a>
                        <a>Chính sách bảo mật</a>
                    </div>
                    
                </div>
                <div className='iframe-google'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29790.539109247104!2d105.79180061817166!3d21.03999152385652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab1159bbab07%3A0x4005ba5f5e08969a!2zQuG7h25oIHZp4buHbiBZIDM1NA!5e0!3m2!1svi!2s!4v1712517245425!5m2!1svi!2s"
                    width={300}
                    height={200}
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>    
                </div>
            </div>
            </div>
            
            
        </div>
    )
}

export default Fotter