import SellersProducts from "../components/page_components/SellersProducts";
import CategoryPage from "../components/Pages/CategoryPage";
import CategoryProductsPage from "../components/Pages/CategoryProductsPage";
import DeliverPage from "../components/Pages/DeliverPage";
import EditProductPage from "../components/Pages/LoggedInUserPages/EditProductPage";
import StoreProductList from "../components/Pages/LoggedInUserPages/StoreProductList";
import LoginAccountPage from "../components/Pages/LoginPage";
import MainPage from "../components/Pages/MainPage";
import ProductOrderPage from "../components/Pages/ProductOrderPage";
import ProductPage from "../components/Pages/ProductPage";
import RegisterAccountPage from "../components/Pages/RegisterAccountPage";
import StorePage from "../components/Pages/StorePage";
import StoresPage from "../components/Pages/StoresPage";
import TestWsPage from "../components/Pages/TestWsPage";
import UserStoreProducts from "../components/Pages/UserStoreProductsPage";
import LoginMobilePage from "../components/pages_mobile/LoginMobilePage";
import MainMobilePage from "../components/pages_mobile/MainMobilePage";
import ProductMobilePage from "../components/pages_mobile/ProductMobilePage";
import RegisterMobilePage from "../components/pages_mobile/RegisterMobilePage";
import UserStores from '../components/Pages/UserStoresPage';

export const routes = [

        {"path":"/","element":<MainPage/>},

        {"path" : "/m", "element" : <MainMobilePage/>},

        {"path":"/sellers_home","element":<UserStores/>},
    
        {"path":"/sellers_product","element":<SellersProducts />},
    
        {"path":"/register","element":<RegisterAccountPage />},
    
        {"path":"/login_account","element":<LoginAccountPage />},
    
        {"path":"/category_page","element":<CategoryPage />},
    
        {"path":"/stores","element":<StoresPage />},
    
        {"path":"/deliver","element":<DeliverPage />},
        
        {"path":"/test_socket","element":<TestWsPage />},
    
        {"path":"/category/:category", "element":<CategoryProductsPage/>},
    
        {"path": "/product/:productId","element":<ProductPage/> },

        {"path" : "/m/product/:productId", "element": <ProductMobilePage/> },
    
        {"path": "/stores/:storeId", "element": <StorePage/> },

        {"path" : "/user-store-products", "element": <UserStoreProducts/>},
        
        {"path":"/edit-product-list/:storeId","element":<StoreProductList/>},

        {"path":"/edit-product/:productId","element":<EditProductPage/>},

        {"path":"/orders/order/:orderId","element":<ProductOrderPage/>},

        {"path":"/m/login","element":<LoginMobilePage/>},

        {"path": "/m/register","element":<RegisterMobilePage/>},

        {"path" : "/m/stores", "element": <StorePage isWebview={true} />},

        {"path":"/m/category_page","element": <CategoryPage isWebview={true} />},

        {"path":"/m/sellers_home","element":<UserStores isWebview={true} />},

    ]