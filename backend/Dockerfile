FROM maven:3.9.10-sapmachine-21 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk

WORKDIR /app

COPY --from=build /app/target/QuizApplication-0.0.1-SNAPSHOT.jar .

EXPOSE 9999

ENTRYPOINT ["java","-jar","/app/QuizApplication-0.0.1-SNAPSHOT.jar"]