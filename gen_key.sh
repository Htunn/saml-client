#!/bin/bash

# Step 1: Generate the Private Key
openssl genrsa -out sp-private-key.pem 2048

# Step 2: Generate the Certificate Signing Request (CSR)
openssl req -new -key sp-private-key.pem -out sp-csr.pem

# Step 3: Generate the Self-Signed Certificate
openssl x509 -req -days 365 -in sp-csr.pem -signkey sp-private-key.pem -out sp-certificate.pem

# move the files to the correct location

mv sp-private-key.pem certs/
mv sp-certificate.pem certs/