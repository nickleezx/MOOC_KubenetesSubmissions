### Exercise 1.1

**Instructions**: Create an application that generates a random string on startup, stores this string into memory, and outputs it every 5 seconds with a timestamp. Deploy it into your Kubernetes cluster and confirm that it's running.

**Solution**:

1. Create kubernetes deployment object
    ```bash
    kubectl create deployment hashgenerator-dep --image=nickleezx/log_output
    ```

2. Check status of deployment
    ```bash
    kubectl get pods
    ```

3. Check logs
    ```bash
    kubectl logs -f hashgenerator-dep-5fcd7cf4d7-xjzp4
    ```
    _Note: replace hashgenerator-dep-5fcd7cf4d7-xjzp4 with pod name_
  

    ![Ex1.1](./Ex1.1.png)