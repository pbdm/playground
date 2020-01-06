#!/bin/bash
LOG_FILE='/root/tmp'
WEB_PATH='/var/www/html'
cd $WEB_PATH
echo 'pulling'
git clean -f
git pull
echo 'finished'
echo date
echo "$(date "+%Y-%m-%d %H:%M:%S") [$0:$1] $2" >> $LOG_FILE