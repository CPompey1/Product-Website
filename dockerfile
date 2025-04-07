
FROM python:3.11


WORKDIR /app
COPY . .
RUN pip install flask pymongo bcrypt  pyjwt

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait
EXPOSE 5000
# Start a bash session when the container launches
CMD ["python3","app.py"]