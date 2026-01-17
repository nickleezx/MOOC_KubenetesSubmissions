#!/bin/sh

# Path to where Nginx serves the files
TARGET_DIR="/usr/src/app/dist"

echo "Starting environment variable injection..."

# Loop through all environment variables
env | while IFS='=' read -r VAR_NAME VAR_VALUE; do
    # Skip empty values
    if [ -z "$VAR_VALUE" ]; then
        continue
    fi

    # Check if a placeholder exists for this variable
    if grep -rq "__${VAR_NAME}__" "$TARGET_DIR" 2>/dev/null; then
        echo "Injecting $VAR_NAME..."
        find $TARGET_DIR -type f \( -name "*.js" -o -name "*.html" \) -exec \
            sed -i "s|__${VAR_NAME}__|${VAR_VALUE}|g" {} +
    fi
done


# Hand over control to Nginx (the CMD passed from Dockerfile)
exec "$@"