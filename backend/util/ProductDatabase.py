import jwt
from pymongo import MongoClient
import pymongo
import pymongo.collection
from util import globals
import json
from bson.objectid import ObjectId
from pymongo.results import InsertOneResult, InsertManyResult, DeleteResult
from pymongo.cursor import Cursor
import bcrypt

class InsertOneWr:
    def __init__(self,insert_result: InsertOneResult):
        self.inserted_id = CollectionWr._encrypt_id(insert_result.inserted_id)
        self.orignal_res = insert_result
        
    def jsonify(self):
        return json.dumps({"inserted_id":self.inserted_id})
    


class InsertManyWr:
    def __init__(self,insert_result: InsertManyResult):
        self.orignal_res = insert_result
        self.inserted_ids = list(map(CollectionWr._encrypt_id,insert_result.inserted_ids))
        
    def jsonify(self):
        return json.dumps({"inserted_ids":self.inserted_ids})
    

class CollectionWr:
    def __init__(self,db,collectionName):
        self.colHandle: pymongo.collection.Collection = db[collectionName] 

    
    def insert_record(self,record: dict) -> InsertOneWr:
        try:
            # print(record)
            return InsertOneWr(self.colHandle.insert_one(record))
        except:
            print("error inserting record")
            return
        return
    
    def insert_records(self, records: list) -> InsertManyWr :
        try:
            return InsertManyWr(self.colHandle.insert_many(records))
        except:
            print("error adding records")
            return
        
    def find_one_record(self, record: dict)-> dict: 
        if "_id" in record.keys():
            record["_id"] = CollectionWr._decrypt_id(record["_id"])   
        out =  self.colHandle.find_one(record)
        if out == None:
            return None
        return self._encrypt_record_id(out)
    
    def find_records_by_field(self,field:dict) -> list:
        if "_id" in field.keys():
            field["_id"] = CollectionWr._decrypt_id(field["_id"])
        return self._encrypt_record_ids(self.colHandle.find(field))
    
    def find_records(self,record: dict) -> list:
        if "_id" in record.keys():
                record["_id"] = CollectionWr._decrypt_id(record["_id"])
        return self._encrypt_record_ids(self.colHandle.find(record))
    
    def update_record(self, record_to_update, new_value):
        try:
            if "_id" in record_to_update.keys():
                record_to_update["_id"] = CollectionWr._decrypt_id(record_to_update["_id"])
                
            self.colHandle.find_one_and_update(record_to_update, {'$set': new_value})
        except:
            print("error updating record")
            return
        
    def aggregate(self, pipeline: list) -> list:
        return self._encrypt_record_ids(self.colHandle.aggregate(pipeline))
        
    def delete_record_by_match(self, record_to_delete: dict):
        try:
            if record_to_delete == {} or record_to_delete == None:
                return
            
            if "_id" in record_to_delete.keys():
                record_to_delete["_id"] = CollectionWr._decrypt_id(record_to_delete["_id"])
            
            self.colHandle.delete_one(record_to_delete)
        except:
            print("error deleting record")
            return
    
    def get_all_records(self) -> list:
        records = []
        cursor = self.colHandle.find({"_id":{"$ne":0}})
        return self._encrypt_record_ids(cursor)
        
    
    def get_most_recent_record(self) -> dict:
        CollectionWr._encrypt_id(self.colHandle.find_one(sort=[('_id', pymongo.DESCENDING)]))
        
    def jsonify_records(self,records):
        return json.dumps(records)
    
    def delete_record_by_id(self,id_encrypted: str) -> DeleteResult:
        return self.colHandle.delete_one({"_id": CollectionWr._decrypt_id(id_encrypted)})
    
    def delete_records_by_ids(self,ids_encrypted: list) -> DeleteResult:
        ids = list(map(CollectionWr._decrypt_id,ids_encrypted))
        return self.colHandle.delete_many({"_id": {"$in": ids}})
    
    def find_record_by_id(self,id_encrypted: str) -> dict:
        res: Cursor =  self.colHandle.find_one({"_id": CollectionWr._decrypt_id(id_encrypted)})
        return self._encrypt_record_id(res)

    
    def _encrypt_id(recordId: ObjectId) -> str:
        encrypted_dict = jwt.encode({"_id":str(recordId)},globals.JWT_DB_SALT,algorithm='HS256')        
        return encrypted_dict
        
    def _decrypt_id(encryptedId: str) -> ObjectId:
        decrypted_id = jwt.decode(encryptedId,globals.JWT_DB_SALT,algorithms=['HS256'])['_id']        
        return ObjectId(decrypted_id)
    

    def _encrypt_record_ids(self,records: Cursor):
        return list(map(self._encrypt_record_id,records))
    
    def _encrypt_record_id(self,record):
        record['_id'] = CollectionWr._encrypt_id(record['_id'])
        return record
    
class ProductDatabase:
    def __init__(self):
        self.client = MongoClient(globals.CLIENT)
        self.db = self.client[globals.DATABASE]
        colNames = globals.COLLECTIONS.split(',')
        self.collections = {}
        self.ID_FIELD = "_id"
        for collectionName in colNames:
            self.collections[collectionName] = CollectionWr(self.db,collectionName=collectionName)
        
        #Pend until db is up
        self._pend_on_db()
    
    def __enter__(self):
        return self
    
    def __exit__(self,exc_type,exc_val,exc_tb):
        self.close()

    def list_collections(self) -> list[str]:
        return self.collections.keys()
    
    def get_collection(self,collection_name: str) -> CollectionWr:
        print(f'clieant: {self.client}')
        return self.collections[collection_name]
    
    def _pend_on_db(self):
        serverStarted = False
        while not serverStarted:
            try:
                with pymongo.timeout(5):
                    self.client.list_database_names()
                serverStarted = True
                self.db = self.client[globals.DATABASE]
            except pymongo.errors.ServerSelectionTimeoutError:
                #start database 
                print('Server not started')
    
    def _clear_all_collections(self) -> None:
        for collection in self.collections.values():
            collection.colHandle.delete_many({})
          
    def _clear_collection(self,collection_name: str) -> None:
        self.collections[collection_name].colHandle.delete_many({})
    
    
    
    
      
    def _del_(self):
        self.close()
            
    def close(self):
        self.client.close()
        
    
    
        

