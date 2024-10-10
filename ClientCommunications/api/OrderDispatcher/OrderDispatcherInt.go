package api

// OrderDispatcher defines the methods that any
// implementation of an order dispatcher should have.
type OrderDispatcher interface {
	// DispatchOrder takes an order ID and processes the order.
	DispatchOrder(orderID string) error

	// CancelOrder takes an order ID and cancels the order.
	CancelOrder(orderID string) error

	// GetOrderStatus takes an order ID and returns the status of the order.
	GetOrderStatus(orderID string) (string, error)
}
