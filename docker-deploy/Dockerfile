ARG NGINX_RELEASE
ARG NODE_RELEASE

FROM node:${NODE_RELEASE:-18} as build
ARG DEBIAN_FRONTEND=noninteractive
USER root

# copy project to workdir
COPY .. /home/node/front
WORKDIR /home/node/front

# install envsubst
RUN apt-get update -y && apt-get install --no-install-recommends -y \
    gettext-base

# build project - create static dist files
ARG BUILD_FRONTEND_PATH
WORKDIR ${BUILD_FRONTEND_PATH}
RUN yarn
RUN yarn dist

# substitute env variables into nginx.conf
# you can add any your variables that you need to substitute into nginx.conf
ARG DOMAIN_URL
ARG API_HOST
ARG API_PORT
ARG ENABLE_HTTPS
RUN export DOMAIN_URL=${DOMAIN_URL} && \
    export API_HOST=${API_HOST} && \
    export API_PORT=${API_PORT} && \
    export DOLLAR="$" && \
    cd /home/node/front/docker-deploy/nginx && \
    if [[ ${ENABLE_HTTPS} = "true" ]] || [[ ${ENABLE_HTTPS} = "True" ]]; then \
      envsubst < nginx.conf > _nginx-substituted.conf; \
    else \
      envsubst < nginx_only_http.conf > _nginx-substituted.conf; \
    fi && \
    cd ./docker-deploy/nginx/locations/http && \
    mkdir ../_http-substituted && \
    for file in *; do envsubst < $file > ../_http-substituted/$file; done && \
    cd ../https && \
    mkdir ../_https-substituted && \
    for file in *; do envsubst < $file > ../_https-substituted/$file; done


# Finally - get only needed files from previous build stage. Static files + config
FROM nginx:${NGINX_RELEASE:-1.23}

#install nginx modules
#RUN apt-get update -y && apt-get install  --no-install-recommends -y \
#    nginx-plus-module-brotli

ARG BUILD_FRONTEND_PATH
COPY --from=build ./${BUILD_FRONTEND_PATH}/dist /frontend-dist
COPY --from=build ./docker-deploy/nginx/_nginx-substituted.conf /etc/nginx/nginx.conf
COPY --from=build ./docker-deploy/nginx/locations/_http-substituted /etc/nginx/include_locations/http
COPY --from=build ./docker-deploy/nginx/locations/_https-substituted /etc/nginx/include_locations/https
