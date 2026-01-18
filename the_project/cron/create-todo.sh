#!/bin/bash

# 1. Define the Wikipedia random URL
INITIAL_URL="https://en.wikipedia.org/wiki/Special:Random"

# 2. Get the redirected (final) URL
# -L: Tells curl to follow redirects
# -s: Silent mode (don't show progress bars)
# -o /dev/null: Throw away the actual page content (we only want the URL)
# -w "%{url_effective}": Write out only the final URL we landed on
REDIRECTED_URL=$(curl -Ls -o /dev/null -w "%{url_effective}" "$INITIAL_URL")

echo "The random Wikipedia article is: $REDIRECTED_URL"


# 4. Make the POST request
# -X POST: Specifies the request type
# -d: The "data" or body of the message
# We are sending the URL inside a JSON-like string
curl -X POST "$BACKEND_URL" \
     -H "Content-Type: application/json" \
     -d "{\"title\": \"$REDIRECTED_URL\"}"