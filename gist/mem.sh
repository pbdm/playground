#!/usr/bin/env sh

while true
do
adb shell dumpsys meminfo com.pingan.papd | grep TOTAL | head -1
# sleep 1
done;
