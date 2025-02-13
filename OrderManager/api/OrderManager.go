package api

type OrderManager interface {
	NewCourrier(courier Courrier) error

	FindOrders(courrier Courrier) ([]Order, error)

	NewOrderWorkerThread(order Order) error
}
