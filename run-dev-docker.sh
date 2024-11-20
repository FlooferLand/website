#!/bin/bash

clear

sudo systemctl start docker.service
sudo docker run rust-website
