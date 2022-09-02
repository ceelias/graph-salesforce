FROM node:14-bullseye-slim

ARG j1_dev_enabled=false

ENV JUPITERONE_INTEGRATION_DIR=/opt/jupiterone/integration

RUN apt-get update
RUN apt-get -y install g++ make python

COPY package.json yarn.lock LICENSE ${JUPITERONE_INTEGRATION_DIR}/
COPY src/ ${JUPITERONE_INTEGRATION_DIR}/src
COPY scripts/ ${JUPITERONE_INTEGRATION_DIR}/scripts

WORKDIR  ${JUPITERONE_INTEGRATION_DIR}
RUN yarn install
RUN chmod +x ./scripts/run.sh

CMD ["yarn", "execute"]
