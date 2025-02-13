import random
import string


class GlobalTestUtility:
    def generate_random_string(length):
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k = length))