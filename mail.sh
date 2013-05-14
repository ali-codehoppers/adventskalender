#!/bin/sh

# File(s) to send  accept meta *etc...
from=$1;
subject=$2;
message=$3;
emailsList=$4;
attachments=$5;

for i in $emailsList
do
msa -domain=etance.com -from="$from" -sujet="$subject" -to=$i $attachments <<!
$message
!
done

exit