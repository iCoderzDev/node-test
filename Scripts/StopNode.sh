#!/bin/bash
	
cd /var/www/html/api/ 
pm2 stop server.js
pm2 restart all

