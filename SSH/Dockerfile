# Use ubuntu as base image
FROM ubuntu:24.04

# Update repo and install SSH server
RUN apt-get update && apt-get install openssh-server -y

# Menambahkan directory /run/sshd
# -p : means "no error if it already exists" and creates parent directories as needed
RUN mkdir -p /run/sshd

# Membuat user non-root
# -m : tells useradd to create directory if it doesn't exist
# -d : explicitly set the user home directory to -->
# -s : set the user login shell to -->
RUN useradd -m -d /home/anggi -s /usr/bin/bash anggi

# Copy public key dari client ke server
COPY anggi_key.pub /home/anggi/.ssh/authorized_keys

# Security Hardening
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config
RUN sed -i 's/#PubkeyAuthentication no/PubkeyAuthentication yes/' /etc/ssh/sshd_config

CMD ["/usr/sbin/sshd", "-D", "-e"]