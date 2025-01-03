from pymongo import MongoClient
import pymongo
import pymongo.collection
from util import globals
import json
from bson.objectid import ObjectId

class CollectionWr:
    def __init__(self,db,collectionName):
        self.colHandle: pymongo.collection.Collection = db[collectionName] 
    
    def insert_record(self,record: dict):
        try:
            # print(record)
            self.colHandle.insert_one(record)
        except:
            print("error inserting record")
            return
        return
    
    def insert_records(self, records: list):
        try:
            self.colHandle.insert_many(records)
        except:
            print("error adding records")
            return
        
    def find_one_record(self, record: dict)-> dict:    
        out =  self.colHandle.find_one(record)
        return out
    
    def find_records_by_field(self,field:dict) -> list:
        return list(self.colHandle.find(field))
    
    def find_records(self,record: dict) -> list:
        return list(self.colHandle.find(record))
    
    def update_record(self, record_to_update, new_value):
        try:
            self.colHandle.find_one_and_update(record_to_update, {'$set': new_value})
        except:
            print("error updating record")
            return
        
    
        
    def delete_record_by_match(self, record_to_delete: dict):
        try:
            self.colHandle.delete_one(record_to_delete)
        except:
            print("error deleting record")
            return
    
    def get_all_records(self) -> list:
        records = []
        cursor = self.colHandle.find({"_id":{"$ne":0}})
        for i in cursor:
            records.append(i)
        return records
    
    def get_most_recent_record(self) -> dict:
        return self.colHandle.find_one(sort=[('_id', pymongo.DESCENDING)])
        
    def jsonify_records(self,records):
        return json.dumps(records)
    
    def delete_record_by_id(self,id: str) -> None:
        self.colHandle.delete_one({"_id":ObjectId(id)})
    
    def find_record_by_id(self,id: str) -> dict:
        return list([self.colHandle.find_one({"_id":ObjectId(id)})])
    
class ProductDatabase:
    def __init__(self):
        self.client = MongoClient(globals.CLIENT)
        self.db = self.client[globals.DATABASE]
        colNames = globals.COLLECTIONS.split(',')
        self.collections = {}
        for collectionName in colNames:
            self.collections[collectionName] = CollectionWr(self.db,collectionName=collectionName)
        
        #Pend until db is up
        self._pend_on_db()
    

    def list_collections(self) -> list[str]:
        return self.collections.keys()
    
    def get_collection(self,collection_name: str) -> CollectionWr:
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
    
        

