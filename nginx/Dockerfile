FROM nginx:1.25-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Templates for live upstream replacement handled via envsubst on startup.
CMD ["/bin/sh", "-c", "envsubst '$$CLIENT_UPSTREAM $$API_UPSTREAM $$SERVER_NAME' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.rendered && nginx -g 'daemon off;' -c /etc/nginx/nginx.conf.rendered"]
