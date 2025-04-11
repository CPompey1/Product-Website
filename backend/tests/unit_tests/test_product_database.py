import sys
import unittest

from bson import ObjectId
sys.path.append(".")

from tests.GlobalTestUtility import GlobalTestUtility
from util.ProductDatabase import ProductDatabase, CollectionWr

class TestProductDatabase(unittest.TestCase):
    def setUp(self):
        self.test_product_id = None
        self.test_product = None
        self.test_products = None
        self.test_product_ids = None
        self.test_product_names = None
    
    def insert_then_delete_product_wrapper(func):
        def wrapper(self,*args, **kwargs):
            self.test_product = GlobalTestUtility.generate_random_product()
            
            with ProductDatabase() as pdb:
                self.test_product_id = pdb.get_collection('products').insert_record(self.test_product).inserted_id

            func(self,*args, **kwargs)
            
            with ProductDatabase() as pdb:
                res = pdb.get_collection('products').delete_record_by_id(self.test_product_id)
                self.assertGreater(res.deleted_count,0)
                
        return wrapper
    
    def insert_then_delete_products_wrapper(func):
        def wrapper(self,*args, **kwargs):
            self.test_products = [GlobalTestUtility.generate_random_product() for _ in range(10)]
            
            self.test_product_names = [product['Title'] for product in self.test_products]
            with ProductDatabase() as pdb:
                self.test_product_ids = pdb.get_collection('products').insert_records(self.test_products).inserted_ids

            #assert all records were inserted
            for product_id in self.test_product_ids:
                self.assertIsNotNone(product_id)
            
            
            func(self,*args, **kwargs)
            
            with ProductDatabase() as pdb:
                res = pdb.get_collection('products').delete_records_by_ids(self.test_product_ids)
                self.assertEqual(res.deleted_count,len(self.test_product_ids))
                
        return wrapper
    
    
    def test_encrypt_decrypt_id(self):
        print("test_encrypt_decrypt_id")
        with ProductDatabase() as pdb:
            testId = ObjectId('67b2625b4e7785e1c814d6a8') 
            encrypted = CollectionWr._encrypt_id(testId)
            decrypted = CollectionWr._decrypt_id(encrypted)
            self.assertEqual(testId,decrypted)
    
    @insert_then_delete_product_wrapper
    def test_find_record_by_id(self):
        print("test_find_record_by_id")
        with ProductDatabase() as pdb:
            res = pdb.get_collection('products').find_record_by_id(self.test_product_id)
            self.assertEqual(res['Title'],self.test_product['Title'])
            
            #assert id is decrppted
            self.assertEqual(res['_id'],self.test_product_id)
    
    @insert_then_delete_products_wrapper
    def test_find_records_by_field(self):
        print("test_find_records_by_field")
        with ProductDatabase() as pdb:
            res = pdb.get_collection('products').find_records_by_field({'Title':self.test_products[0]['Title']})
            self.assertEqual(len(res),1)
            self.assertEqual(res[0]['Title'],self.test_products[0]['Title'])
            
    @insert_then_delete_products_wrapper
    def test_find_records_by_id(self):
        print("test_find_records_by_id")
        with ProductDatabase() as pdb:
            for product_id in self.test_product_ids:
                res = pdb.get_collection('products').find_record_by_id(product_id)
                self.assertIsNotNone(res)
                self.assertIn(res['Title'],self.test_product_names)
                
    @insert_then_delete_product_wrapper
    def test_update_product(self):
        print("test_update_product")
        with ProductDatabase() as pdb:
            pdb.get_collection('products').update_record({'_id':self.test_product_id},{'Title':'Updated Name'})
            res = pdb.get_collection('products').find_record_by_id(self.test_product_id)
            self.assertEqual(res['Title'],'Updated Name')
        
                
    
            
        
    
            
if __name__ == '__main__':
    unittest.main()

        
        
    
    