import { useState } from 'react'
import { useOrderById } from '../hooks/useOrders'
import { Card, Button, Collapse } from 'react-bootstrap'
import { capitalize } from '../utils/utils'
import '../css/orderCard.css'
import OrderProduct from './OrderProduct'

export default function OrderCard({ order, userId }) {
  const [isOpen, setIsOpen] = useState(false)
  const orderId = order.orderId

  const { data } = useOrderById(orderId, userId)
  const orderData = data?.order || {}

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  const cardColor = orderData.status
    ? {
      pending: 'pending-color',
      arrived: 'arrived-color',
      lost: 'lost-color',
    }[orderData.status] || ''
    : ''

  return (
    <Card className={'mb-3'}>
      <Card.Header onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="order-primary-data d-flex flex-grow-1 justify-content-between gap-3">
            <div className={'flex-fill'}>
              <strong>Order date:</strong> {orderData.createdAt ? formatDate(orderData.createdAt) : 'Loading...'}
            </div>
            <div className={`flex-fill ${cardColor}`}>
              <strong>Status:</strong> {capitalize(orderData.status) || 'Loading...'}
            </div>
            <div className="flex-fill">
              <strong>Total Amount:</strong> {'$' + orderData.totalAmount || 'Loading...'}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Button
            variant="outline-primary"
            size="sm"
            className="order-colapse-button"
            onClick={(e) => {
              e.stopPropagation()
              setTimeout(() => setIsOpen((prev) => !prev), 100)
            }}
            aria-controls={`collapse-${orderId}`}
            aria-expanded={isOpen}
          >
            {isOpen ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
      </Card.Header>
      <Collapse in={isOpen}>
        <Card.Body id={`collapse-${orderId}`}>
          <OrderProduct orderData={orderData} visible={ isOpen } />
        </Card.Body>
      </Collapse>
    </Card>
  )
}
