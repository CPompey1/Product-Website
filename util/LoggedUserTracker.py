from datetime import datetime,timedelta
from util.ProductDatabase import ProductDatabase 
class LoggedUserTracker:

    
    """
    Data structure that keeps tracks of valid authtokens by users
    
    Description
    Lets store this as a hash map(dictionary) where the key is the auth_token 
    and the value is a dictionary storing the following:
    {
        time_created: datetime.datetime
        auth_token:   str
        expiration:   str

        
    }

    """
    TIME_CREATED_STRING = "time_created"
    EXPIRATION_TIME_STRING = "expiration"
    AUTH_TOKEN_STRING = "auth_token"

    DB_LOG_RECORD_STRING = "map"

    TIME_REPR_STRING = "%Y-%m-%d %H:%M:%S"
    EXPIRATION_LENGTH = timedelta(days=4)
    BACKUP_REFRESH_PERIOD = timedelta(hours=1)

    def __init__(self):
        self._logged_in_user_map: dict = {}
        self.db = ProductDatabase()
        self._time_initialized: datetime.datetime =  datetime.now()
        

        self._retrieve_backup()
        self._last_cleaned = self._time_initialized


    def user_valid(self,token: str) -> bool:
        self._try_backup_tracker()
        return self._user_clean_in_tracker(token)
    
    """
        Description
            In Order to reduce dependencies and possibilities of circular imports,
            it is assumed that the token is clean before being passed to this function.

            _user_clean_in_teacker is soley for checking if the user exists in the map and 
            if the token expired.

            param: token: cleaned token to add to the tracker
    """
    def add_user(self,token: str) -> None:
        self._try_backup_tracker()
        if self._user_clean_in_tracker(token): 
            return 
        

        #Check if user valid before 
        time_created = datetime.now()
        expiration = (datetime.now() + self.EXPIRATION_LENGTH)
        self._logged_in_user_map[token] = {
            self.AUTH_TOKEN_STRING: token,
            self.TIME_CREATED_STRING: time_created.strftime(LoggedUserTracker.TIME_REPR_STRING),
            self.EXPIRATION_TIME_STRING: expiration.strftime(LoggedUserTracker.TIME_REPR_STRING)
        }

    
    def _user_clean_in_tracker(self,token:str) -> bool:

        if token in self._logged_in_user_map.keys():

            #Check if token expired (now > token.expiration)
            if datetime.now() > datetime.strptime(self._logged_in_user_map[token][self.EXPIRATION_TIME_STRING],LoggedUserTracker.TIME_REPR_STRING):
                self.remove_user(token)
                return False
            
            return True

        return False

    def remove_user(self,token: str) -> bool:
        if self._logged_in_user_map.pop(token) == None:
            return False
        self._try_backup_tracker()
        return True
    def _try_backup_tracker(self) -> None:

        now = datetime.now()

        #If refresh period has passed
        if (now - self._last_cleaned) > self.BACKUP_REFRESH_PERIOD:

            #backup in database
            self.db.get_collection('loggedInUsers').insert_record({
                self.DB_LOG_RECORD_STRING:self._logged_in_user_map,
                self.EXPIRATION_TIME_STRING: now.strftime(self.TIME_REPR_STRING)
                })
        
    
    def _retrieve_backup(self) ->None:
        now = datetime.now()
        mostRecentMap = self.db.get_collection('loggedInUsers').get_most_recent_record()
        
        
        if mostRecentMap != None:
            # mostRecentMapTime = datetime.strptime(mostRecentMap[self.EXPIRATION_TIME_STRING],
            #                                   self.TIME_REPR_STRING)
            #forgot what I was checking here, might be important lol
            # if now - mostRecentMapTime > self._last_cleaned  

            self._logged_in_user_map = mostRecentMap[self.DB_LOG_RECORD_STRING]
        
        