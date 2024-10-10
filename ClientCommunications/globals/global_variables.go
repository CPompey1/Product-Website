package globals

import (
	"os"
)

var (
	WEBSOCKET_ORIGIN, _ = os.LookupEnv("FRONTEND_ORIGIN")

	workingEnv = "local"
)

type environment string

const (
	local        environment = "local"
	Disconnected environment = "disconnected"
	Pending      environment = "pending"
)
