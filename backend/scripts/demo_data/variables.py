import bcrypt

from util.appdata import PWD_SALT

demoUser = {
            "user": 'testUser',
            "email": 'testUser@gmail.com',
            "password_hash": bcrypt.hashpw('testPassword'.encode() ,PWD_SALT)
        }


demoCategories = [
    {
        "title": "Consumables",
        "imgLink": "/dynamic_assets/images/categoryimages/consumables.jpeg",
        "redirect": "/category/Consumables" 
    },
    {
        "title": "Electronics",
        "imgLink": "/dynamic_assets/images/categoryimages/electronics.png",
        "redirect": "/category/Electronics" 
    },
    {
        "title": "Apparels",
        "imgLink": "/dynamic_assets/images/categoryimages/apparel.jpeg",
        "redirect": "/category/Apparels" 
    },
    {
        "title": "Books",
        "imgLink": "/dynamic_assets/images/categoryimages/books.png",
        "redirect": "/category/Books" 
    },
    {
        "title": "Stationary",
        "imgLink": "/dynamic_assets/images/categoryimages/stationary.jpeg",
        "redirect": "/category/Stationary" 
    }
]

demoProducts = [
    {
        "title": "Calculator",
        "category": "Electronics",
        "store": "Cris's Store",    #shoulld be a object id in db but we dont have that rn
        "cost": "15",
        "description": "This sleek and efficient calculator is a must-have for students and professionals alike. With its intuitive layout, clear display, and advanced functions, it makes complex calculations a breeze. Compact enough to carry anywhere, it's the perfect tool for quick math checks or detailed problem-solving.",
        "image": "calculator.jpeg",
    },
    {
        "title": "Backpack",
        "category": "Apparels",
        "store": "Cris's Store",
        "cost": "30",
        "description": "This backpack is perfect for everyday use. With its spacious main compartment, front zippered pocket, and padded shoulder straps, it's ideal for carrying books, laptops, and other essentials. The durable fabric and stylish design make it a versatile and reliable choice for work, school, or travel.",
        "image": "backpack.jpeg",
    },
    {
        "title": "Honey",
        "category": "Consumables",
        "store": "Cris's Store",
        "cost": "5",
        "description": "Golden, rich, and pure, this honey is nature’s liquid gold. Harvested from the finest blossoms, it offers a delicate balance of sweetness and depth, perfect for drizzling over toast, adding to tea, or using in your favorite recipes. A true pantry staple.",
        "image": "honey.png",
    }
]

demoStores = [
    {
        "title": "Cris's Store",
        "logo": "/dynamic_assets/images/storelogos/Cris's_store.jpeg",
        "location": "123 Main Street, Anytown, USA",
        "userOwnerId" : "filledByScript"
        
    }
]

