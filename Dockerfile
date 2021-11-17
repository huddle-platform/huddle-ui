FROM nginx:stable-alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html/ui
# Remove default nginx static assets
RUN rm -rf ./*
COPY ./dist .
RUN chmod -R 755 .
ENTRYPOINT ["nginx", "-g", "daemon off;"]