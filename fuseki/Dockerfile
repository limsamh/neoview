# Dockerfile
FROM eclipse-temurin:11-jre-jammy
ENV FUSEKI_VERSION=4.8.0
RUN apt-get update && apt-get install -y curl \
  && curl -L -o fuseki.tar.gz https://downloads.apache.org/jena/binaries/apache-jena-fuseki-$FUSEKI_VERSION.tar.gz \
  && tar -xzf fuseki.tar.gz -C /opt \
  && mv /opt/apache-jena-fuseki-$FUSEKI_VERSION /opt/fuseki \
  && rm fuseki.tar.gz
WORKDIR /opt/fuseki
EXPOSE 3030
CMD ["./fuseki-server"]
