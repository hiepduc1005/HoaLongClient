import "./NavContact.css"
import { FaPhoneAlt } from "react-icons/fa";

const NavContact = (props) => {

    return (
        <div className="nav-contact">
            <div className="zalo-contact">
                <a>
                    <i></i>
                    Zalo
                </a>
            </div>
            <div className="messenger-contact">
                <a>
                    <i></i>
                    Messenger
                </a>
            </div>
            <div className="phone-contact">
                <a>
                    <i></i>
                   Phone
                </a>
            </div>
        </div>
    )
}

export default NavContact