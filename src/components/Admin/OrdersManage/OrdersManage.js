import React, { useEffect, useState } from 'react';
import { getNotCompletePurchase, getTodayPurchase, updatePurchaseToComplete } from '../../../services/PurchaseService';
import { useOutletContext } from "react-router-dom";
import './OrderManage.css'

const OrderManage = (props) => {

    const [todayPurchase , setTodayPurchase] = useState([])
    const [notCompleteOrder , setNotCompleteOrder] = useState([])
    const [flag , setFlag] = useState(false)
    const accessToken = useOutletContext();

    const handleClickComplete = async (purchaseId) => {
        if(!purchaseId || !accessToken){
            alert("Cant not update to complete !");
            return
        }

        const res = await updatePurchaseToComplete(purchaseId , accessToken);
        if(res && res.data){
            alert("Update success!")
            setFlag(!flag)
        }
    }

    const getTodayOrder = async () => {
        const res = await getTodayPurchase();
        if(res && res.data ){
            setTodayPurchase(res.data)
        }
    }

    const getNotCompleteOrder = async () => {
        const res = await getNotCompletePurchase(accessToken);
         if(res && res.data ){
            setNotCompleteOrder(res.data)
        }
    }

    useEffect(() => {
        getTodayOrder();
        getNotCompleteOrder()
    }, [flag])

    return (
        <div className="order-manage">
            <div className="today-order">
                <h4>Today</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todayPurchase && todayPurchase.map((item , index) => {

                            return (
                                <tr>
                                    <th className="col-3 text-break">{item.productQuantity}</th>
                                    <td className="col-2">{item.date}</td>
                                    <td className="col-2">{item.totalPrice} VND</td>
                                    <td className="col-2">{item.userName}</td>
                                    <td className="col-2">{item.phoneNum}</td>
                                    <td className="col-2">
                                        { 
                                           item.purchaseStatus === 'NOT_COMPLETE'
                                           ? 
                                           <button className='btn btn-primary' onClick={() => handleClickComplete(item.id)}>Click to complete</button>
                                           :
                                           <button className='btn btn-success'>Completed</button>
                                        }
                                       
                                    </td>
                        </tr>
                            )
                        })}
                        
                        {/* Add more rows here */}
                    </tbody>
                </table>
            </div>
            <div className="today-order">
                <h4>Not Complete Order</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notCompleteOrder && notCompleteOrder.map((item , index) => {

                            return (
                                <tr>
                                    <th className="col-3 text-break">{item.productQuantity}</th>
                                    <td className="col-2">{item.date}</td>
                                    <td className="col-2">{item.totalPrice} VND</td>
                                    <td className="col-2">{item.userName}</td>
                                    <td className="col-2">{item.phoneNum}</td>
                                    <td className="col-2">
                                       <button className='btn btn-primary'>Click to complete</button>
                                    </td>
                        </tr>
                            )
                        })}
                        
                        {/* Add more rows here */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderManage;
