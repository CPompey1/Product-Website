import random
import string


class GlobalTestUtility:
    def generate_random_string(length):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k = length))
    
    def generate_random_num(max_size):
        return random.randint(0,max_size)
    
    def generate_random_product():
        return {
            "Title": GlobalTestUtility.generate_random_string(10),
            "Description": GlobalTestUtility.generate_random_string(10),
            "Cost": GlobalTestUtility.generate_random_num(1000),
            "Category": GlobalTestUtility.generate_random_string(10),
            "Store": GlobalTestUtility.generate_random_string(10)
        }