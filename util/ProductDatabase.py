from pymongo import MongoClient
import pymongo
from util import globals
import json
class ProductDatabase:
    def __init__(self):
        self.client = MongoClient(globals.CLIENT)
        self.db = self.client[globals.DATABASE]
        colNames = globals.COLLECTIONS.split(',')
        self.collections = {}
        for collectionName in colNames:
            self.collections[collectionName] = Collection(self.db,collectionName=collectionName)
        
        #Pend until db is up
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
    def list_collections(self):
        return self.collections.keys()
        

class Collection:
    def __init__(self,db,collectionName):
        self.colHandle = db[collectionName] 
    def insert_record(self,record):
        try:
            # print(record)
            self.colHandle.insert_one(record)
        except:
            print("error inserting record")
            return
        return
    
    def find_one_record(self, record):
        return self.collection.find_one(record)
    
    def update_record(self, record_to_update, new_value):
        try:
            self.collection.find_one_and_update(record_to_update, {'$set': new_value})
        except:
            print("error updating record")
            return
    
    def delete_record(self, record_to_delete):
        try:
            self.collection.delete_one(record_to_delete)
        except:
            print("error deleting record")
            return
    
    def get_all_records(self):
        records = []
        cursor = self.colHandle.find({"_id":{"$ne":0}})
        for i in cursor:
            records.append(i)
        return records
    
    def jsonify_records(self,records):
        return json.dumps(records)