#!/bin/bash

DT=$(date +%Y-%m-%d-%H-%M)
#DIR=../c3-bak
DIR=.bak
FILE="$DIR/$DT.tgz"
FILE_EXCLUDE=exclude.tag
mkdir $DIR -p
touch .bak/$FILE_EXCLUDE
touch node_modules/$FILE_EXCLUDE
touch frontend-react/node_modules/$FILE_EXCLUDE
touch backend-nestjs/node_modules/$FILE_EXCLUDE

tar -zcvf $FILE \
	--exclude-tag-all=$FILE_EXCLUDE \
	--exclude='FILE|DIR' \
	.
