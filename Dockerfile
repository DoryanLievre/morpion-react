FROM node:18.17.1
RUN apt-get update &&\
    apt install zsh -y &&\
    sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
WORKDIR /usr/app/
