FROM amazoncorretto:21-alpine

WORKDIR /app

COPY target/quickfix-helpdesk-1.0.0.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
