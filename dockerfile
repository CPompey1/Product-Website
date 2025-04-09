
FROM python:3.11


WORKDIR /app
COPY . .
RUN pip install -r reqirements

# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait
EXPOSE 5000

RUN python3 scripts/clear_and_write_demo_db.py
# Start a bash session when the container launches
CMD ["python3","app.py"]