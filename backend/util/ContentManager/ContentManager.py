from abc import ABC, abstractmethod
from flask import Flask, Response
class ContentManager(ABC):
    @abstractmethod
    def get_file(self, path: str) -> Response:
        pass
    
    @abstractmethod
    def get_file_list(self, path: str) -> Response:
        pass
    
    @abstractmethod
    def upload_file(self, path: str, file: bytes) -> Response:
        pass
    
    