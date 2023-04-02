FROM quay.io/cyber/amarok-bot
RUN git clone https://github.com/Djjdkdm/TESSA /root/Diegoson/
WORKDIR /root/Diegoson/
RUN yarn install --network-concurrency 1
CMD ["yarn", "start"]
