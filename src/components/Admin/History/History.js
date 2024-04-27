import { useEffect, useState } from "react"
import { getAllPurchase } from "../../../services/PurchaseService"

const History = (props) => {
  
  const [listPurchase , setListPurchase ] = useState([])

  const getAllPurchases = async () => {
    const res = await getAllPurchase();
    if(res && res.data){
      setListPurchase(res.data)
    }
  }

  useEffect(() => {
    getAllPurchases()
  }, [])

    return (
        <div className="product-manage">
           <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listPurchase && listPurchase.map((item , index) => {

                            return (
                                <tr>
                                    <th className="col-3 text-break">{item.productQuantity}</th>
                                    <td className="col-2">{item.date}</td>
                                    <td className="col-2">{item.totalPrice} VND</td>
                                    <td className="col-2">{item.userName}</td>
                                    <td className="col-2">{item.phoneNum}</td>
                                    <td className="col-2">{item.purchaseStatus}</td>
                        </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
        </div>
    )
}

export default History