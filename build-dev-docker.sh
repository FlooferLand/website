#!/bin/bash

clear

sudo systemctl start docker.service
sudo docker build -t rust-website .