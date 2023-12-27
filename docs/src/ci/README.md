# CI/CD

## Definition

![cicd](../assets/images/cicd.png)

CI/CD, or Continuous Integration/Continuous Deployment, is a software development practice that involves automating the integration of code changes, testing, and deployment processes. It aims to streamline and automate the delivery pipeline, ensuring rapid and reliable software delivery.

**"Continuous integration is a software development practice where members of a team integrate their work frequently... verified by an automated build (including tests) to detect integration errors"**, *Martin fowler*


Integration in the context of CI/CD involves aligning and merging development efforts from various stages (such as development, staging, and production) to ensure that code changes seamlessly transition through these environments, maintaining consistency and reliability.


* **Development Environment**: Developers work on their individual branches, integrating code changes regularly into a shared development branch.
Continuous integration ensures that code changes from multiple developers align and work together in this environment.
* **Staging Environment**: Merged code changes from the development branch are further integrated into a staging branch or environment.
Integration here involves validating code against a staging environment that mirrors the production environment closely.
* **Production Environment**: Once validated in the staging environment, integrated code changes are deployed to the production environment.
Integration in the production environment ensures a smooth transition of tested and validated code to the live system.

## Market overview

| Service             | SCM/SVC (Version Control) | CI                   | CD                   | Issue Tracking       | Issue Boards         |
|---------------------|---------------------------|----------------------|----------------------|----------------------|----------------------|
| **Git**             | ✓                         |                      |                      |                      |                      |
| **Mercurial (Hg)**  | ✓                         |                      |                      |                      |                      |
| **Bitbucket**       | ✓                         | ✓                    | ✓                    | ✓                    | ✓                    |
| **GitHub**          | ✓                         | ✓                    | ✓                    | ✓                    | ✓                    |
| **GitLab**          | ✓                         | ✓                    | ✓                    | ✓                    | ✓                    |
| **Gitea**           | ✓                         |                      |                      |                      |                      |
| **Travis CI**       |                           | ✓                    |                      |                      |                      |
| **Jenkins**         |                           | ✓                    | ✓                    |                      |                      |
| **CircleCI**        |                           | ✓                    |                      |                      |                      |
| **Azure DevOps**    | ✓                         | ✓                    | ✓                    | ✓                    |                      |
| **GitHub Actions**  | ✓                         | ✓                    |                      | ✓                    |                      |
| **Azure DevOps Pipelines** |                   | ✓                    | ✓                    |                      |                      |
| **GitLab CI/CD**    | ✓                         | ✓                    | ✓                    | ✓                    |                      |
| **AWS CodePipeline**|                           | ✓                    | ✓                    |                      |                      |
| **Google Cloud Build** |                        | ✓                    | ✓                    |                      |                      |


## CI/CD Platform (GitLab)

GitLab is a comprehensive DevOps platform that provides integrated CI/CD pipelines alongside version control, issue tracking, and more. It offers robust capabilities for automating software development processes, including building, testing, and deploying applications in a collaborative environment.

Its functionalities include:

- **Version Control:** Robust Git repository management with merge requests, code review, and branching capabilities.
- **CI/CD Pipelines:** Automated build, test, and deployment pipelines for efficient software delivery.
- **Issue Tracking:** Integrated issue tracking system for project management and collaboration.
- **Collaboration Tools:** Wikis, snippets, code analytics, and merge request approvals for streamlined teamwork.
- **Project Management:** Extensive project planning, milestones, boards, and time tracking features.
- **Security Scanning:** Built-in security scanning tools for vulnerability management.
- **Container Registry:** Integrated container registry for storing Docker images.
- **Kubernetes Integration:** Seamless integration with Kubernetes for container orchestration.

### CI/CD features

#### Jobs and stages 

![pipeline](../assets/images/pipeline.png)

**Jobs:** Individual tasks defined in the `gitlab-ci.yml` file. They represent actions such as build, test, deploy, etc.
**Stages:** Divisions in the pipeline where jobs are grouped. Typical stages include build, test, deploy, allowing sequential execution.

#### `gitlab-ci.yml` Configuration

The `gitlab-ci.yml` is a configuration file at the root of your repository that defines the CI/CD pipeline, specifying jobs, stages, scripts, and configurations for the CI/CD process.

```yaml
# This is an example GitLab CI/CD configuration file

# Define the stages in the pipeline
stages:
  - build
  - test
  - deploy

# Define variables for reuse across jobs
variables:
  ENVIRONMENT: "production"
  APP_NAME: "my-app"

# Jobs definition
build_job:
  stage: build
  script:
    - echo "Building the application..."

test_job:
  stage: test
  script:
    - echo "Running tests..."
  only:
    - master  # Run this job only on the master branch

deploy_job:
  stage: deploy
  script:
    - echo "Deploying to $ENVIRONMENT..."
  environment:
    name: $ENVIRONMENT
    url: https://example.com/my-app
  only:
    - master  # Run this job only on the master branch
```

- `stages`: Defines the stages in the pipeline: build, test, deploy.
- `variables`: Declares variables for reuse across jobs (`ENVIRONMENT`, `APP_NAME`).
- `build_job`, `test_job`, `deploy_job`: Jobs with their respective stages and scripts to execute.
- `only`: Specifies that certain jobs (`test_job`, `deploy_job`) should run only on the `master` branch.
- `environment`: Defines deployment-related information like the environment name and URL for the `deploy_job`.

#### Runner Architecture

![cicd](../assets/images/runners.png)

- **GitLab Runner:** independant processing power that executes CI/CD jobs defined in the `gitlab-ci.yml`. It can be installed on various platforms and supports different executor types like Shell, Docker, Kubernetes, etc.
  
- **Executor Types:** Determines how jobs are executed. For instance, Docker executor runs jobs inside Docker containers for isolated and reproducible environments.


### 🧪 Build your server

Create your gitlab onPremise service. Because gitlab is fully dockerized you are able to create a docker-compose.yml that create your platform locally.

1. Create the docker-compose.yml and start your server
    - [https://docs.gitlab.com/ee/install/docker.html#install-gitlab-using-docker-compose](https://docs.gitlab.com/ee/install/docker.html#install-gitlab-using-docker-compose)
2. Create a project on the platform
3. Add a runner that can be the same computer 
    - [https://docs.gitlab.com/runner/install/](https://docs.gitlab.com/runner/install/)
    - [https://docs.gitlab.com/ee/tutorials/create_register_first_runner/index.html](https://docs.gitlab.com/ee/tutorials/create_register_first_runner/index.html)
4. Configure your pipepline


### CI/CD for Developers

CI/CD for developers encompasses several key stages:

#### Build

The build stage involves compiling code, running automated builds, and generating artifacts or executable files from the source code.

#### Measure

Metrics and analytics are collected during the CI/CD pipeline to measure the performance and quality of the software being developed.

#### Document

Generate automatically the code documentation as your developper kit for newcomers , as SDK documentation for your client...

#### Test & Secure

Automated testing ensures that changes made to the codebase don't introduce bugs or issues. Security testing helps identify and address vulnerabilities in the code.

#### Deploy

The deployment phase involves automating the process of releasing applications into production or staging environments.

#### Monitor

Continuous monitoring post-deployment ensures that the application functions as expected and helps identify any performance or functional issues.

#### Test & Secure

Unit test your app, make fuctionnal testing, scan for vulnerabilities on your third party libraries ...


### 🧪 Exercise
Please select a project of your choice (JEE, node, python, android...), push the code to gitlab.com and enable  CI/CD by searching for the right tooling , associated docker images and fill up your gitlab-ci.yml to have the 6 CI/CD steps automated ( Build, measure, document...)

:::details a solution for a simple JAVA project
[https://gitlab.com/gharbi.tech-courses/devops-sample-java](https://gitlab.com/gharbi.tech-courses/devops-sample-java)
:::

## 📖 Further reading