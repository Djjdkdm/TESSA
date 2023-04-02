FROM quay.io/toxic_kichux/whatskrizai:latest
RUN git clone https://github.com/Djjdkdm/TESSA /root/Kriz/
WORKDIR /root/Kriz/
RUN yarn install --network-concurrency 1
CMD ["node", "src/krypton.js", "--max_old_space_size=2560"]
