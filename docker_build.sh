#!/bin/bash

echo "start build new saml-client docker image"

docker build --no-cache -t saml-client .

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo "Docker image built successfully."
fi

