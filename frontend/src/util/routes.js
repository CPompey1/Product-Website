
export const routes = [
    {"path":"/","element":<MainPage/>},

    {"path":"/sellers_home","element":<AddProduct />},

    {"path":"/sellers_product","element":<SellersProducts />},

    {"path":"/register","element":<RegisterAccountPage />},

    {"path":"/login_account","element":<LoginAccountPage />},

    {"path":"/category_page","element":<CategoryPage />},

    {"path":"/stores","element":<StoresPage />},

    {"path":"/deliver","element":<DeliverPage />},
    
    {"path":"/test_socket","element":<TestWsPage />},

    {"path":"/category/:category", "element":<CategoryProductsPage/>},

    {"path": "/product/:productId","element":<ProductPage/> },

    {"path": "/stores/:storeId", "element": <StorePage/> },
]