FROM debian:jessie

WORKDIR /openlmis-report-ui

COPY package.json .
COPY bower.json .
COPY config.json .
COPY src/ ./src/
