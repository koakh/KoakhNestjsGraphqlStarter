#!/bin/bash

# [[ $EUID -ne 0 ]] && echo "This script must be run as root." && exit 1

# declare common vars
DOMAIN_PROJECT_NAME=solidarychain

if [ -z "$1" ] || [ -z "$2" ]; then
	echo "missing require paramameters 'docker-image-name' and 'docker-image-version'"
  echo "ex '${0} ${DOMAIN_PROJECT_NAME}-server-graphdb-events 1.0.0'"
	exit 0
else
  DOCKER_IMAGE_NAME=$1
  DOCKER_IMAGE_VERSION=$2
  DOCKER_IMAGE_PATH=${DOMAIN_PROJECT_NAME}/${DOCKER_IMAGE_NAME}

  echo push : [${DOCKER_IMAGE_PATH}:latest]
  docker tag ${DOCKER_IMAGE_PATH} ${DOCKER_IMAGE_PATH}:latest
  docker push ${DOCKER_IMAGE_PATH}:latest
  # read -n 1 -s -r -p "Press any key to continue";printf "\n"
  echo push : [${DOCKER_IMAGE_PATH}:${DOCKER_IMAGE_VERSION}]
  docker tag ${DOCKER_IMAGE_PATH} ${DOCKER_IMAGE_PATH}:${DOCKER_IMAGE_VERSION}
  docker push ${DOCKER_IMAGE_PATH}:${DOCKER_IMAGE_VERSION}
fi
