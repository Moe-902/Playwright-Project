pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.61.0-noble'
            args '--ipc=host'
        }
    }

    environment {
        CI = 'true'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Verify environment') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npx --version
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**, test-results/**',
                allowEmptyArchive: true
            )
        }
    }
}