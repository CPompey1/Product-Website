import pprint
import sys
import os

# from util import ProductDatabase
sys.path.append(".")
from util.ProductDatabase import ProductDatabase

#args: <collectionName> <id>
def main():
    if len(sys.argv) < 3 or len(sys.argv) > 3:
        print("Usage: \n\t")
        print("python3 get_item_by_id.py <collectionName> <id>")
        return

    with ProductDatabase() as pdb:
        pprint.pprint(str(pdb.get_collection(f"{sys.argv[1]}").find_record_by_id(sys.argv[2])))    
    


if __name__ == '__main__':
    main()