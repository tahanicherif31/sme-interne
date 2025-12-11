#!/usr/bin/env groovy
import java.time.LocalDateTime

pipeline {
    agent any

    environment {
        IMAGE_TAG = "uat"
        DESIRED_COUNT = '1'
        ECS_REGION = 'eu-west-1'
        ECS_CLUSTER = 'afreximbank-portal-services'
        REPOSITORY_URI = "378457291432.dkr.ecr.eu-west-1.amazonaws.com"
        TIMESTAMP = LocalDateTime.now()
        APP_NAME = 'afxm-sme-portal-frontend'
        SERVICE_NAME = 'sme-portal-frontend-uat'
        TASK_DEFINITION = 'arn:aws:ecs:eu-west-1:841722235062:task-definition/TD-afxm-sme-portal-frontend'
        TASK_DEFINITION_VERSION = '2'

    }

    options {
        disableConcurrentBuilds() // No more than one job at a time is allowed to run.
        buildDiscarder(logRotator(numToKeepStr: '5')) // Only keep latest 14 jobs.
    }

    stages {
        stage('Debug info') {
            steps {
                script {
                    sh 'docker --version'
                    sh 'aws --version'
                }
            }
        }
        stage('Build Service') {
            steps {
                script {
                    sh "aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin ${env.REPOSITORY_URI}"
                    sh "docker build -t ${env.REPOSITORY_URI}/${env.APP_NAME}:${env.IMAGE_TAG} ."
                    sh "docker push ${env.REPOSITORY_URI}/${env.APP_NAME}:${env.IMAGE_TAG}"
                }
            }
        }

        stage('Deploy Service') {
            steps {
                script {
                    def serviceName = "${env.SERVICE_NAME}"
                    def taskDefinition = "${env.TASK_DEFINITION}:${env.TASK_DEFINITION_VERSION}"
                    updateService(serviceName, taskDefinition)
                }
            }
        }
    }
}

def stepCondition(String service) {
    def selectedServices = String.valueOf(params.SELECTED_SERVICES).split(',')
    return selectedServices.contains(service)
}

def updateService(String service, String taskDefinition) {
    sh(script: """
        aws ecs update-service \
        --force-new-deployment \
        --cluster ${env.ECS_CLUSTER} \
        --service ${service} \
        --region ${env.ECS_REGION} \
        --task-definition ${taskDefinition} \
        --desired-count ${env.DESIRED_COUNT}
        """,
        returnStdout: true
    )
}
