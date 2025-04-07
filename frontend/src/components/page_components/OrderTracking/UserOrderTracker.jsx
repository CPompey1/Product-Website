import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import ORDER_TRACKING_STATUS from './OrderTrackingUtility'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import UserToCourrierCommunication from './UserToCourrierCommunication';



export default function UserOrderTracker({orderId}) {
  const [orderStatusResponse, setOrderStatusResponse] = useState(null)
  const [orderStatus, setOrderStatus] = useState(ORDER_TRACKING_STATUS.AWAITING_PICKUP)

  useEffect(() => {
    // fetch order status
    const fetchData = async () => {
      const fetchResult = await fetch(`/api/orders/order_status/${orderId}`, {
        method: 'GET',
      })
    
      if (fetchResult.ok){
        const jsonResult = await fetchResult.json()
        setOrderStatusResponse(jsonResult)
        // setOrderStatus(jsonResult.status)
        console.log(jsonResult)
      } 
    }
    fetchData()
    console.log(ORDER_TRACKING_STATUS)
    console.log(ORDER_TRACKING_STATUS.COURRIER_NOT_ASSIGNED)


  },[])


  return (
    <>
      
      {orderStatus == ORDER_TRACKING_STATUS.ORDER_NOT_FOUND ? 
      <OrderNotFound/> :  
      <OrderStatus status={orderStatus}/>} 

      {orderStatus != ORDER_TRACKING_STATUS.COURRIER_NOT_ASSIGNED &&  orderStatus !=ORDER_TRACKING_STATUS.ORDER_NOT_FOUND ?
      
        <>
          <UserToCourrierCommunication status={orderStatus}/>
        </>
        : 
        <></>
      }

      

    </>

  )
}

function OrderStatus({status}) {
  let message = ''
  switch(status) {
    case ORDER_TRACKING_STATUS.AWAITING_PICKUP:
      message = 'Order Awaiting pickup'
      break;
    case ORDER_TRACKING_STATUS.PICKED_UP:
      message = 'Order Picked up'
      break;
    case ORDER_TRACKING_STATUS.IN_TRANSIT:
      message = 'Order In transit'
      break;
    case ORDER_TRACKING_STATUS.DELIVERED:
      message = 'Order Delivered'
      break;
    case ORDER_TRACKING_STATUS.COURRIER_NOT_ASSIGNED:
      message = 'Courrier not assigned'
      break;
  }
  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

function OrderNotFound() {
  return (
    <div>
      <h1>Order not found</h1>
    </div>
  )
}
