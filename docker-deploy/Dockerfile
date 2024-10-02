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

# setup env variables
# and substitute env variables into nginx.conf
ARG VITE_DOMAIN_URL
ARG VITE_CHILD_APP_1_NAME
ARG VITE_CHILD_APP_1_PORT
ARG VITE_CHILD_APP_1_HTTPS
ARG VITE_CHILD_APP_2_NAME
ARG VITE_CHILD_APP_2_PORT
ARG VITE_CHILD_APP_2_HTTPS
ARG API_HOST
ARG API_PORT
ARG PORT_HTTP
ARG ENABLE_HTTPS
ARG IS_HOST_APP
RUN if [ "${PORT_HTTP}" != "80" ]; then \
      export DOMAIN_URL=${VITE_DOMAIN_URL}:${PORT_HTTP}; \
    else \
      export DOMAIN_URL=${VITE_DOMAIN_URL}; \
    fi && \
    export VITE_DOMAIN_URL=${VITE_DOMAIN_URL} && \
    export VITE_CHILD_APP_1_NAME=${VITE_CHILD_APP_1_NAME} && \
    export VITE_CHILD_APP_1_PORT=${VITE_CHILD_APP_1_PORT} && \
    export VITE_CHILD_APP_2_NAME=${VITE_CHILD_APP_2_NAME} && \
    export VITE_CHILD_APP_2_PORT=${VITE_CHILD_APP_2_PORT} && \
    export API_HOST=${API_HOST} && \
    export API_PORT=${API_PORT} && \
    export IS_HOST_APP=${IS_HOST_APP} && \
    if [ ${VITE_CHILD_APP_1_HTTPS} = "true" ] || [ ${VITE_CHILD_APP_1_HTTPS} = "True" ]; then \
      export CHILD_APP_1_SCHEME=https; \
    else \
      export CHILD_APP_1_SCHEME=http; \
    fi && \
    if [ ${VITE_CHILD_APP_2_HTTPS} = "true" ] || [ ${VITE_CHILD_APP_2_HTTPS} = "True" ]; then \
      export CHILD_APP_2_SCHEME=https; \
    else \
      export CHILD_APP_2_SCHEME=http; \
    fi && \
    export DOLLAR="$" && \
    \
    cd /home/node/front/docker-deploy/nginx && \
    if [ "${ENABLE_HTTPS}" = "true" ] || [ "${ENABLE_HTTPS}" = "True" ]; then \
      envsubst < nginx.conf > _nginx-substituted.conf && \
      export ; \
    else \
      envsubst < nginx_only_http.conf > _nginx-substituted.conf; \
    fi && \
    cd ./locations/http && \
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
COPY --from=build /home/node/front/${BUILD_FRONTEND_PATH}/dist /frontend-dist
COPY --from=build /home/node/front/docker-deploy/nginx/_nginx-substituted.conf /etc/nginx/nginx.conf
COPY --from=build /home/node/front/docker-deploy/nginx/locations/_http-substituted /etc/nginx/include_locations/http
COPY --from=build /home/node/front/docker-deploy/nginx/locations/_https-substituted /etc/nginx/include_locations/https

RUN nginx -t
