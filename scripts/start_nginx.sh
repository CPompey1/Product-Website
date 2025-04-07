#!/bin/bash

# Reload Nginx to apply the new configuration
sudo nginx -c $(pwd)/nginx/nginx_configuration.conf -s reload