## E-Bazzar

**E-Bazzar** is a work-in-progress, full-stack e-commerce platform designed for buyers, sellers, and couriers to interact and manage real-time orders—similar to Grubhub, but extensible to all types of businesses, with a special focus on supporting small businesses.

### Key Features

- **Multi-Role Platform:** Buyers can browse and purchase products, sellers can list and manage inventory, and couriers can accept and deliver orders.
- **Real-Time Order Management:** Orders are processed and updated in real time, enabling seamless coordination between buyers, sellers, and couriers.
- **Responsive Frontend:** Built with React and Material-UI, the frontend offers a modern, mobile-friendly experience. Dedicated components and pages ensure smooth navigation and usability on any device.
- **Checkout & Delivery:** Users can easily complete purchases through a dynamic checkout form, with instant feedback and order tracking.
- **Store & Product Management:** Sellers can create stores, add products, and manage their offerings through intuitive interfaces.
- **Secure Media & Data Handling:** The backend, powered by Flask (Python), securely serves media, validates requests, and manages authentication and authorization.
- **Extensible for All Businesses:** Unlike niche food delivery apps, this platform is designed to be easily adapted for any business type, making it especially valuable for small and local businesses.

### Architecture

- **Frontend:** React with functional components, hooks, and Material-UI for a clean, modular, and responsive user interface.
- **Backend (Python):** Flask REST API handles product, store, and order management, user authentication, and secure media serving.
- **Backend (Go):** A dedicated Go service manages real-time buyer and courier communications, including orders and chat, using Kafka topics for scalable, event-driven messaging.
- **Database:** MongoDB (implied by use of ObjectId and document-based operations).
- **Security:** Includes XSS validation, authentication checks, and safe media/file serving.

### Communication & Extensibility

A unique aspect of this project is its real-time communication layer: a Go backend service routes order and chat messages between buyers and couriers via Kafka, ensuring fast, reliable, and scalable interactions. This architecture supports future expansion to more business types and communication features.

### Who Is This For?

This platform is built for end users—buyers seeking convenience, sellers wanting to reach more customers, and couriers looking for delivery opportunities. Its extensible design makes it ideal for small businesses aiming to compete in the digital marketplace.
