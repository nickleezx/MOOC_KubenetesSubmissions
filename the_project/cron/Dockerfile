FROM alpine:3.19

# 2. Install bash and curl 
# 'apk' is the package manager for Alpine (like 'apt' for Ubuntu)
RUN apk add --no-cache bash curl

# 3. Copy your script from your computer into the image
# Copy only shell scripts
COPY *.sh /usr/local/bin/

# 4. Make the script executable
RUN chmod +x /usr/local/bin/*.sh

# 5. Tell Docker to run this script when the container starts
ENTRYPOINT ["/usr/local/bin/create-todo.sh"]