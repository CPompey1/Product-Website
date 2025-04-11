import pprint
import sys
import os

# from util import ProductDatabase
sys.path.append(".")
from util.ProductDatabase import ProductDatabase

# sys.path.insert(0,"/home/linus/workspace/Product-Website/util")
def main():
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: \n\t")
        print("python3 list_collection.py <collectionName>")
        return

    with ProductDatabase() as pdb:
        pprint.pprint(str(pdb.get_collection(f"{sys.argv[1]}").get_all_records()))


if __name__ == '__main__':
    main()