
FROM python:3.11


WORKDIR /app
COPY . .
RUN pip install -r requirements

EXPOSE 5000

RUN python3 scripts/clear_and_write_demo_db.py
# Start a bash session when the container launches
CMD ["python3","app.py"]