package api

import "fmt"

// OrderDispatcherStruct is a struct that represents an order dispatcher.
type OrderDispatcherStruct struct {
}

// NewOrderDispatcher creates a new OrderDispatcher.
func NewOrderDispatcher(id string) OrderDispatcher {
	return &OrderDispatcherStruct{}
}

// DispatchOrder is a method that simulates dispatching an order.
func (od *OrderDispatcherStruct) DispatchOrder(orderID string) error {
	fmt.Printf("Order %s dispatched by dispatcher\n", orderID)
	return nil
}

// GetDispatcherID returns the ID of the dispatcher.
func (od *OrderDispatcherStruct) GetOrderStatus(orderID string) (string, error) {
	return "", nil
}

func (od *OrderDispatcherStruct) CancelOrder(orderID string) error {
	return nil
}
