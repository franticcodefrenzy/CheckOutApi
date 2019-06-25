FROM node:11.3-slim
LABEL version="1.0"
LABEL author="Toby Mansell"
LABEL description="Gelato Technial Test for the CheckOut API"
RUN mkdir -p /checkout_api
COPY node_modules /checkout_api/node_modules/
COPY src /checkout_api/src/
COPY dist /checkout_api/dist/
COPY tests /checkout_api/tests/
COPY Dockerfile /checkout_api/
COPY package* /checkout_api/
COPY Readme.md /checkout_api/
COPY tsconfig.json /checkout_api/
COPY .git /checkout_api/.git/
COPY .gitignore /checkout_api/
COPY CheckOutApiClassDiagram.png /checkout_api/
RUN cd /checkout_api
ENTRYPOINT ["node", "/checkout_api/dist/scenarios.js"]
