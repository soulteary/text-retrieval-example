FROM python:3.8-bullseye
RUN sed -i -E "s/\w+.debian.org/mirrors.tuna.tsinghua.edu.cn/g" /etc/apt/sources.list

# 安装 miniconda
ARG CONDA_MIRROR="https://mirrors.tuna.tsinghua.edu.cn/anaconda"
ENV CONDA_MIRROR=${CONDA_MIRROR}
ENV CONDA_SRC="https://repo.anaconda.com/miniconda"
RUN CONDA_SRC="${CONDA_MIRROR}/miniconda"; \
    curl -fsSL -v -o ~/miniconda.sh -O  "$CONDA_SRC/Miniconda3-latest-Linux-x86_64.sh" && \
    chmod +x ~/miniconda.sh && \
    ~/miniconda.sh -b -p ~/miniconda && \
    rm ~/miniconda.sh && \
    echo "channels:" > $HOME/.condarc && \
    echo "  - ${CONDA_MIRROR}/pkgs/free/" >> $HOME/.condarc && \
    echo "  - ${CONDA_MIRROR}/pkgs/main/" >> $HOME/.condarc && \
    echo "  - ${CONDA_MIRROR}/cloud/pytorch/" >> $HOME/.condarc && \
    echo "  - defaults" >> $HOME/.condarc && \
    echo "show_channel_urls: true" >> $HOME/.condarc;
SHELL ["/bin/bash", "-c"]
ENV PATH="~/miniconda/bin:${PATH}"
ARG PATH="~/miniconda/bin:${PATH}"

# 安装 faiss
ARG PYTHON_VERSION=3.8
RUN conda install -y pytorch python=${PYTHON_VERSION} faiss-cpu pandas && \
    conda clean -ya && \
    conda init bash
# 安装相关软件包
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
    pip install sentence_transformers

WORKDIR /workspace