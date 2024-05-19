import { useState } from 'react'
import './Footer.css'
import { createContact } from '../../services/ContactService'

const Fotter = (props) => {

    const [name , setName ] = useState()
    const [phoneNum , setPhoneNum] = useState()
    const [contactContent , setContactContent] = useState()

    const isVietnamesePhoneNumber = (number) => {
        return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(number);
    }

    const handleSubmitContact = async () =>{

        if (!name || !phoneNum || !contactContent) {
            alert("Vui lòng điền đầy đủ thông tin!")
            return; 
        }

        if(!isVietnamesePhoneNumber(phoneNum)){
            alert("Vui lòng điền đúng số điện thoại")
            return;
        }

        const res = await createContact(name , phoneNum , contactContent);
        console.log(res)
        if(res && res.data){
            alert("Contact success!")
            setName("")
            setPhoneNum("")
            setContactContent("")
        }
        else{
            alert("Contact failed!")
            setName("")
            setPhoneNum("")
            setContactContent("")
        }
    }

    return (
        <div className="footer"  id='contact'>
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
                    <input 
                        placeholder="Họ tên"
                        required className="form-control" 
                        type="text" 
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        ></input>
                </div>
                <div className="form-group">
                    <input
                        placeholder="Số điện thoại" 
                        required className="form-control" 
                        type="text"
                        value={phoneNum}
                        onChange={(event) => setPhoneNum(event.target.value)}
                        ></input>
                </div>
                <div className="form-group">
                    <textarea 
                        rows={8} 
                        cols={80} 
                        placeholder="Nội dung liên hệ" 
                        className="form-control"
                        value={contactContent}
                        onChange={(event) => setContactContent(event.target.value)}
                        ></textarea>
                </div>
                <div className="form-contact-submit">
                    <button type="submit" onClick={() => handleSubmitContact()} >Liên hệ</button>
                </div>
                
                <div className='ifram-facebook'>
                 <iframe 
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=event&width=300&height=200&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId=3888796641351183" 
                    width={300} 
                    height={200} 
                    style={{border: "none", overflow: "hidden"}} 
                    scrolling="no" 
                    frameBorder={0} 
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                 </iframe>        
          </div>
               
            </div>

            <div className="block-right">
                <h2>Nem chua Hoa Long</h2>
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
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>    
                </div>
            </div>
            </div>
            
            
        </div>
    )
}

export default Fotter