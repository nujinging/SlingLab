#FROM --platform=linux/amd64 gradle:8.1.1-jdk17-alpine as builder
#WORKDIR /build

# 그래들 파일이 변경되었을 때만 새롭게 의존패키지 다운로드 받게함.
#COPY build.gradle settings.gradle /build/
#RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true
#
#COPY . /build
#RUN gradle build -x test --parallel

#COPY gradlew .
#COPY gradle gradle
#COPY build.gradle .
#COPY settings.gradle .
#COPY src src
#RUN ./gradlew clean build -x test

# ---------------- #

FROM openjdk:17-jdk-slim

WORKDIR /app

# 환경 변수 지정
ENV PROFILE local

# 변수 지정
ARG JAR_FILE=build/libs/*.jar

# 변수로 지정된 파일을 컨테이너로 복사
COPY ${JAR_FILE} app.jar

## 컨테이너 실행 명령어
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=${PROFILE}", "-Duser.timezone=Asia/Seoul", "/app/app.jar"]