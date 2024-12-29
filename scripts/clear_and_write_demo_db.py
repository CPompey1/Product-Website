import sys
import os
sys.path.append(".")
from util.ProductDatabase import ProductDatabase
import subprocess
from scripts.demo_data.variables import *


def main():
    
    db = ProductDatabase()

    #clear cb
    db._clear_all_collections()    
    
    print("Cleared Database")
    
    #add categories
    db.get_collection('categories').insert_records(demoCategories)
    
    #add stores
    db.get_collection('stores').insert_records(demoStores)
    
    #map store ids to products <- why tf did i do this
    def update_store_id(product):
        store = db.get_collection('stores').find_one_record({'Title':product['Store']})
        product['store'] = str(store['_id'])
        return product
    
    updatedProducts = map(update_store_id,demoProducts)
     
    #add updated products
    db.get_collection('products').insert_records(demoProducts)
    
    print("Demo Database Populated")
    
    


if __name__ == '__main__':
    main()