# Use an official Node.js runtime as a parent image
FROM node:20


# Set the timezone
ENV TZ=Asia/Singapore

# Set the working directory in the container
WORKDIR /usr/src/app

# Create a new user named "appuser"
RUN useradd -m appuser
RUN chown -R appuser:appuser /usr/src/app

# Switch to "appuser"
USER appuser

# Copy package.json and package-lock.json to the working directory
COPY --chown=appuser:appuser package*.json ./
COPY --chown=appuser:appuser tsconfig.json ./
COPY --chown=appuser:appuser src ./src


# enable for local testing with docker-compose
# COPY --chown=appuser:appuser src .env ./  

# Install app dependencies
RUN ls -la
RUN npm install
RUN npm run build
RUN ls -la 
RUN ls -la dist

# Copy the certs directory to the dist directory
COPY --chown=appuser:appuser ./certs/sp-private-key.pem.txt ./dist/certs/sp-private-key.pem
COPY --chown=appuser:appuser ./certs/sp-certificate.pem.txt ./dist/certs/sp-certificate.pem
COPY --chown=appuser:appuser ./certs/idp.pem.txt ./dist/certs/idp.pem
COPY --chown=appuser:appuser ./certs/idp-certificate.pem.txt ./dist/certs/idp-certificate.pem

# Expose the application port (replace 3000 with your application port)
EXPOSE 3005

# Start the Node.js application with SSL enabled
CMD ["node", "dist/server.js"]
