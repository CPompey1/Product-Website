# Use Ubuntu 22.04 as the base image
FROM ubuntu:22.04

# Update packages and install Python
RUN apt-get update && apt-get install -y python3 python3-pip python3.10-venv


COPY . /app

# Set the default shell
SHELL ["/bin/bash", "-c"]




# Upgrade pip
RUN python3 -m pip install --upgrade pip

RUN python3 -m venv .venv


# Install all default Python packages
RUN pip install --user --upgrade pip \
  && pip install --user pymongo flask

RUN source .venv/bin/activate

#expost dev and prod port
EXPOSE 5000
# EXPOSE 8080
# Set the working directory
WORKDIR /app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

# Start a bash session when the container launches
CMD python3 -u app.py