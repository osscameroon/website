FROM python:3.14-slim-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    gcc \
    curl \
    procps \
    lsof \
    make \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ADD ./requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
