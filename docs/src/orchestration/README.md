# Orchestration

## Definition

Orchestration in the context of DevOps refers to the automated arrangement, coordination, and management of software elements, such as containers or services, within a computing environment. It involves managing the deployment, scaling, and operation of complex applications to ensure they function efficiently and reliably.

##  Kubernetes

Kubernetes, often abbreviated as K8s, is an open-source container orchestration platform designed to automate the deployment, scaling, and management of containerized applications. It was originally developed by Google and is now maintained by the Cloud Native Computing Foundation (CNCF). Kubernetes provides a framework for automating the deployment, scaling, and management of containerized applications, allowing developers to focus on writing code rather than managing infrastructure.

### Definition : Pod 

A pod in Kubernetes is the smallest and simplest deployable unit that represents a single instance of a running process or application in the cluster. It encapsulates one or more containers, storage resources, and unique networking options. Containers within a pod share the same network namespace, allowing them to communicate with each other using localhost. Pods serve as the basic building blocks of Kubernetes deployments, providing a logical unit for managing application components and ensuring co-location and co-scheduling of tightly coupled containers. They can be horizontally scaled by creating multiple replicas of the same pod template, distributed across the cluster, to handle increased workload demands or achieve high availability.

### Architecture

![arch1](../assets/images/kub.png)

The architecture of Kubernetes is based on a master-slave model:

- **Master Node**: The master node is responsible for managing the Kubernetes cluster. It orchestrates communication between nodes, schedules workloads, and maintains the desired state of the cluster. The master node consists of several components:
  - **API Server**: Exposes the Kubernetes API, which is used by administrators and clients to interact with the cluster.
  - **Controller Manager**: Monitors the state of the cluster and performs actions to maintain the desired state.
  - **Scheduler**: Assigns workloads to nodes based on resource requirements and other constraints.
  - **etcd**: Consistent and highly-available key-value store used as Kubernetes' backing store for all cluster data.

- **Worker Nodes**: Worker nodes, also known as minions, are responsible for running containerized applications. They receive instructions from the master node and execute tasks accordingly. Each worker node runs the following components:
  - **Kubelet**: An agent that runs on each node and is responsible for managing containers, including starting, stopping, and monitoring containers.
  - **Kube Proxy**: Manages network connectivity and routing for containers.
  - **Container Runtime**: Software responsible for running containers, such as Docker or containerd.


###  First pod 
```bash
kubectl run nginx --image=nginx
```

### Manifest

Here is an example of a Kubernetes Pod definition in YAML format:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
  labels:
    app: example
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
    ports:
    - containerPort: 80
```

Let's break down this definition:
- `apiVersion`: Specifies the Kubernetes API version being used. In this case, it's `v1`, which is the core Kubernetes API version.
- `kind`: Specifies the type of Kubernetes object being defined. Here, it's `Pod`.
- `metadata`: Contains metadata about the Pod, such as its name and labels.
  - `name`: The name of the Pod, which is `example-pod` in this case.
  - `labels`: Key-value pairs that can be used to identify and organize Pods. Here, we've applied a label with the key `app` and value `example`.
- `spec`: Defines the specification of the Pod, including its containers and other settings.
  - `containers`: A list of containers to run within the Pod.
    - `name`: The name of the container, which is `nginx-container`.
    - `image`: The Docker image to use for the container. Here, it's `nginx:latest`.
    - `ports`: Specifies the ports that the container exposes.
      - `containerPort`: The port number that the container listens on. In this example, it's `80`, which is the default port for HTTP traffic.

This Pod definition describes a single Pod named `example-pod`, running a single container based on the NGINX image (`nginx:latest`) that exposes port `80`. You can create this Pod in your Kubernetes cluster by saving the above YAML to a file (e.g., `example-pod.yaml`) and using the `kubectl apply` command:

```bash
kubectl apply -f example-pod.yaml
```

This will create the Pod in your Kubernetes cluster based on the provided definition.

### Basic commands 
#### Deployment Status

You can check the status of the deployment using the `kubectl get` command:

```bash
kubectl get deployments
```
This command will show you the status of all deployments in the cluster, including the `nginx-deployment` we just created.


#### Login
```bash
kubectl config set-context <context>
```

#### Launch an nginx pod
```bash
kubectl get pod nginx
```

#### List pods
```bash
kubectl get pods
```

#### Interact with a Pod
```bash
kubectl exec -it <pod_name>   -- /bin/bash
```

#### Access your pod from your localhost loopback
```bash
kubectl port-forward pods/nginx 8080:80
```

#### Delete everything
```bash
kubectl delete pod nginx
```

#### Scaling the Deployment

To scale the deployment, you can use the `kubectl scale` command:

```bash
kubectl scale deployment nginx-deployment --replicas=5
```

This command will scale the `nginx-deployment` to have 5 replicas.

#### Exposing the Deployment

To expose the deployment externally, you can create a Kubernetes service:

```bash
kubectl expose deployment nginx-deployment --type=LoadBalancer --port=80 --target-port=80
```

This command will create a LoadBalancer service that exposes the `nginx-deployment` on port 80.

![kubernetes](../assets/images/kubernetes.jpg)


## GUIs

Rancher and Portainer are both tools that provide graphical user interfaces (GUIs) for managing Kubernetes clusters, among other features. 

### **Rancher**
   
   Rancher is an open-source container management platform that provides a centralized control plane for managing multiple Kubernetes clusters, regardless of where they are deployed (on-premises, cloud, or hybrid environments). It offers features such as cluster provisioning, monitoring, logging, security, and multi-tenancy. Rancher simplifies the deployment and management of Kubernetes by providing an intuitive UI and CLI tools. It also supports other container orchestration platforms, such as Docker Swarm and Apache Mesos.

   Key features of Rancher in relation to Kubernetes include:

   - **Cluster Management**: Rancher allows you to easily provision, manage, and scale Kubernetes clusters through its user-friendly interface.
   - **Multi-Cluster Operations**: It provides tools for deploying and managing applications across multiple Kubernetes clusters, streamlining operations in complex environments.
   - **Monitoring and Logging**: Rancher offers built-in monitoring and logging capabilities to help you monitor the health and performance of your Kubernetes clusters and applications.
   - **Security**: It provides role-based access control (RBAC) and other security features to ensure the security of your Kubernetes clusters and workloads.
   - **CI/CD Integration**: Rancher integrates with popular CI/CD tools like Jenkins, GitLab CI, and Drone to enable continuous integration and delivery workflows for Kubernetes applications.

### **Portainer**

![portainer](../assets/images/portainer.png)

   Portainer is an open-source container management tool designed to simplify the deployment and management of containerized applications. While it initially focused on Docker, Portainer has expanded its support to Kubernetes, enabling users to manage Kubernetes clusters through its intuitive web-based interface. Portainer offers features such as cluster management, container lifecycle management, resource utilization monitoring, and role-based access control.

   Key features of Portainer in relation to Kubernetes include:

   - **Cluster Management**: Portainer allows you to manage Kubernetes clusters and deploy applications using a visual interface, eliminating the need for complex YAML configuration files.
   - **Container Lifecycle Management**: It provides tools for managing container lifecycles, including creating, starting, stopping, and deleting containers.
   - **Resource Monitoring**: Portainer offers built-in monitoring capabilities to track resource utilization (CPU, memory, and storage) across Kubernetes clusters and individual workloads.
   - **RBAC**: It supports role-based access control (RBAC) to control user permissions and restrict access to sensitive operations within Kubernetes clusters.
   - **Integration with Docker**: Portainer seamlessly integrates with Docker, allowing users to manage both Docker and Kubernetes environments from a single interface.



### 🧪 Exercise 1 - Kubernetes and Portainer GUI

* [Enable kubernetes on your docker desktop installation](https://docs.docker.com/desktop/kubernetes/)
* [Install Portainer node on your kubernetes server](https://docs.portainer.io/start/install-ce/server/kubernetes/wsl)
* portainer should be accessible at : [https://localhost:30779/#!/auth](https://localhost:30779/#!/auth)


### 🧪 Exercise 2 - Kompose

* [Install Kompose software to convert your compose.yml to a manifest kubernetes](https://kompose.io/installation/#windows)

* Adapt the configuration to deploy successfully your services.

:::tip Some usefull documentation to adapt the manifest converted

* [NodePort](https://kubernetes.io/docs/concepts/services-networking/service/#type-nodeport)
* [ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/)
* [Persistant volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reserving-a-persistentvolume)

:::

::: details solution

*site.conf*
``` bash
server {
    listen 80;
    index index.php index.html;
    server_name 127.0.0.1;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /site;    

    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass php:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }

    location / {
       add_header 'Access-Control-Allow-Origin' '*';
       add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
       add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
       add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    }
}
```
*index.php*
``` php
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>

<p>My first paragraph.</p>

<?php
phpinfo();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $mysqlClient = new PDO("mysql:host=db;dbname=db;charset=utf8", "root", "example");
    $mysqlClient->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>

</body>
</html>

```

```bash
kompose convert -f docker-compose.yml -o manifest.yaml
kubectl create configmap nginx-conf --from-file=site.conf
kubectl create configmap index-php --from-file=index.php
```

*config.yml*
```yml
apiVersion: v1
kind: Service
metadata:
  annotations:
    kompose.cmd: "kompose convert -f docker-compose.yml -o combined.yaml"  # Enclose the command in double quotes
    kompose.version: "1.32.0 (765fde254)"  # Enclose the version in double quotes
  labels:
    io.kompose.service: web
  name: web
spec:
  type: NodePort
  ports:
      - name: "80"
        port: 80
        targetPort: 80
        nodePort: 30080
  selector:
    io.kompose.service: web

---
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    kompose.cmd: kompose convert -f docker-compose.yml -o combined.yaml
    kompose.version: 1.32.0 (765fde254)
  labels:
    io.kompose.service: db
  name: db
spec:
  replicas: 1
  selector:
    matchLabels:
      io.kompose.service: db
  template:
    metadata:
      annotations:
        kompose.cmd: kompose convert -f docker-compose.yml -o combined.yaml
        kompose.version: 1.32.0 (765fde254)
      labels:
        io.kompose.network/tp1-default: "true"
        io.kompose.service: db
    spec:
      containers:
        - args:
            - --default-authentication-plugin=mysql_native_password
          env:
            - name: MYSQL_DATABASE
              value: db
            - name: MYSQL_ROOT_PASSWORD
              value: example
          image: mysql:latest
          name: db
          resources:
            limits:
              cpu: "1"
              memory: "1Gi"
            requests:
              cpu: "0.5"
              memory: "512Mi"
      restartPolicy: Always

---
apiVersion: v1
kind: Service
metadata:
  labels:
    io.kompose.service: php
  name: php
spec:
  type: NodePort
  ports:
      - name: "9000"
        port: 9000
        targetPort: 9000
        nodePort: 30085
  selector:
    io.kompose.service: php
---
apiVersion: v1
kind: Service
metadata:
  labels:
    io.kompose.service: db
  name: db
spec:
  ports:
    - name: "3306"
      port: 3306
      targetPort: 3306
  selector:
    io.kompose.service: db
---
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    kompose.cmd: kompose convert -f docker-compose.yml -o combined.yaml
    kompose.version: 1.32.0 (765fde254)
  labels:
    io.kompose.service: php
  name: php
spec:
  replicas: 1
  selector:
    matchLabels:
      io.kompose.service: php
  strategy:
    type: Recreate
  template:
    metadata:
      annotations:
        kompose.cmd: kompose convert -f docker-compose.yml -o combined.yaml
        kompose.version: 1.32.0 (765fde254)
      labels:
        io.kompose.network/tp1-default: "true"
        io.kompose.service: php
    spec:
      initContainers:
        - name: install-pdo-mysql
          image: php:fpm
          command: ["sh", "-c", "docker-php-ext-install pdo_mysql && echo 'extension=pdo_mysql.so' > /usr/local/etc/php/conf.d/pdo_mysql.ini"]
          volumeMounts:
            - name: php-extensions
              mountPath: /usr/local/lib/php/extensions

            - name: php-ini
              mountPath: /usr/local/etc/php/conf.d

      containers:
        - image: php:fpm
          name: php
          resources:
            limits:
              cpu: "1"
              memory: 1Gi
            requests:
              cpu: 100m
              memory: 100Mi
          volumeMounts:
            - name: web-claim0
              mountPath: /site/
            
            - name: index-php
              mountPath: /site/index.php
              subPath: index.php

            - name: php-extensions
              mountPath: /usr/local/lib/php/extensions 

            - name: php-ini
              mountPath: /usr/local/etc/php/conf.d
      restartPolicy: Always
      # Keep same volume as web
      volumes:
        - name: web-claim0
          persistentVolumeClaim:
            claimName: web-claim0
            
        - name: index-php
          configMap:
           name: index-php

        - name: php-extensions
          emptyDir: {}

        - name: php-ini
          emptyDir: {}

---
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    kompose.cmd: kompose convert -f docker-compose.yml -o combined.yaml
    kompose.version: 1.32.0 (765fde254)
  labels:
    io.kompose.service: web
  name: web
spec:
  replicas: 1
  selector:
    matchLabels:
      io.kompose.service: web
  strategy:
    type: Recreate
  template:
    metadata:
      annotations:
        kompose.cmd: kompose convert -f docker-compose.yml -o combined.yaml
        kompose.version: 1.32.0 (765fde254)
      labels:
        io.kompose.network/tp1-default: "true"
        io.kompose.service: web
    spec:
      containers:
        - image: nginx:latest
          name: web
          ports:
            - containerPort: 80
              hostIP: 127.0.0.1
              hostPort: 80
              protocol: TCP
          resources:
            limits:
              cpu: "1"
              memory: "512Mi"
            requests:
              cpu: "0.5"
              memory: "256Mi"
          volumeMounts:
            - name: web-claim0
              mountPath: /site/
            
            - name: index-php
              mountPath: /site/index.php
              subPath: index.php

            - name: nginx-conf
              mountPath: /etc/nginx/conf.d/default.conf
              subPath: site.conf

      restartPolicy: Always
      volumes:
        # Modified for configMapping
        - name: web-claim0
          persistentVolumeClaim:
            claimName: web-claim0

        - name: nginx-conf
          configMap:
           name: nginx-conf

        - name: index-php
          configMap:
           name: index-php

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  labels:
    io.kompose.service: web-claim0
  name: web-claim0
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 100Mi

# Removed kompose generated volume claim of site.conf
```
:::


### 🧪 Exercise 3 - Additionnal services

Select the service of your choice and try to add it to your manifest. 
Be creative !

## 📖 Further reading
- Kubernetes explained in 100sec @Fireship

<iframe width="560" height="315" src="https://www.youtube.com/embed/PziYflu8cB8" title="Kubernetes explained in 100sec" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



