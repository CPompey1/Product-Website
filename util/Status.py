#need to figure out error code descriptions
class Status: 

    REGISTER_SUCCESS = '0'
    REGISTER_FAIL_USER_EXISTS = '-1'
    REGISER_FAIL_EMAIL_EXISTS = '-2'

    LOGIN_SUCCESS = '0'
    LOGIN_FAIL_EMAIL_DNE = "-1"
    LOGIN_FAIL_PW_WRONG = '-2'
    LOGIN_FAIL_USER_LOCKED = '-3'

    def __init__(self):
        self.status: int = 0
    def set_status(self,status: int):
        self.status = status
    def get_status(self) -> int:
        return self.status

