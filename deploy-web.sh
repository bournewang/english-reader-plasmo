#!/bin/bash

# Configuration
LOCAL_STATIC_FOLDER="build"
REMOTE_USER="root"
REMOTE_HOST="47.103.218.95"
REMOTE_STATIC_FOLDER="/var/www/html/english-reader-web"
SSH_KEY="~/.ssh/id_rsa " # Optional, if using a specific SSH key

# Check if rsync is installed
if ! command -v rsync &> /dev/null
then
    echo "rsync could not be found. Please install rsync and try again."
    exit 1
fi

# Deploy static folder using rsync
echo "Starting deployment..."
rsync -avz --delete -e "ssh -i $SSH_KEY" "$LOCAL_STATIC_FOLDER" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_STATIC_FOLDER"

# Verify deployment
if [ $? -eq 0 ]; then
    echo "Deployment successful!"
else
    echo "Deployment failed."
    exit 1
fi