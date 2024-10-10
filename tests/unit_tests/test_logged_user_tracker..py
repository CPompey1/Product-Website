import unittest
import sys

sys.path.append(".")
from util.LoggedUserTracker import LoggedUserTracker
from datetime import datetime,timedelta
"""
    
    Invariants
        - Valid users are users that have not expired
        - Users are valid for EXPIRATION_LENGTH time
        - inValid users do not remain in the tracker
        - 
    Test cases for the LoggedUserTracker class.
        - add_user actually adds a user
        - User valid returns true for a valid user
        - User has valid time created
"""
class TestLoggedUserTracker(unittest.TestCase):
    
    
    """
        tests that add_user adds user to map
        with valid expiration date (more than expiration - 1 min) and auth token present
    """
    
    def __init__(self, methodName: str = "runTest") -> None:
        super().__init__(methodName)
        self.tracker = LoggedUserTracker()
        self.test_token = "token"
        self.test_token1 = "token1"
        self.test_token2 = "token2"
    """
        tests added user is added and valid
    """
    def test_add_user_and_valid(self):
        
        
        self.tracker.add_user(self.test_token)
        
        #test token should be in hash map
        self.assertTrue(self.test_token in  self.tracker._logged_in_user_map.keys())
        
        user = self.tracker._logged_in_user_map[self.test_token]
        
                
        #user should have expiration > (now + EXPIRATION_LENGTH) - 1 minute
        self.assertGreater(datetime.strptime(user[LoggedUserTracker.EXPIRATION_TIME_STRING],LoggedUserTracker.TIME_REPR_STRING), 
                           (datetime.now() + LoggedUserTracker.EXPIRATION_LENGTH)- timedelta(minutes=1))
    
        self.assertTrue(self.tracker.user_valid(self.test_token))
    
       
    """
        Tests expired user throws false from user_valid()
    """
    def test_invalid_user(self):
        
        self.tracker.add_user(self.test_token1)
        
        #overite date time to be EXPIRATION_LENGTH +1 days in past 
        oldtime = datetime.strptime(self.tracker._logged_in_user_map[self.test_token1][LoggedUserTracker.TIME_CREATED_STRING],
                                    LoggedUserTracker.TIME_REPR_STRING)
        
        self.tracker._logged_in_user_map[self.test_token1][LoggedUserTracker.EXPIRATION_TIME_STRING] = (oldtime - (LoggedUserTracker.EXPIRATION_LENGTH + timedelta(days=1))).strftime(LoggedUserTracker.TIME_REPR_STRING)
            
            
        # user shouldve expired
        self.assertEqual(self.tracker.user_valid(self.test_token1),False)
        
        # double check
        self.assertEqual(self.tracker.user_valid(self.test_token1),False)
    
    def test_backup(self):
        self.tracker.add_user(self.test_token2)
        
        #simulate a backup
        self.tracker._last_cleaned = datetime.now() -  (LoggedUserTracker.BACKUP_REFRESH_PERIOD + timedelta(hours=1))
        
        #test that backup is called
        self.tracker._try_backup_tracker()
        
        #test that both users are still valid
        self.assertTrue(self.tracker.user_valid(self.test_token2))
        
        #Clear the tracker
        self.tracker._logged_in_user_map = {}
        
        #Restore the backup
        self.tracker._retrieve_backup()
        
        #test user still valid
        self.assertTrue(self.tracker.user_valid(self.test_token2))
if __name__ == '__main__':
    unittest.main()    
        
        
        
        
        
    
    