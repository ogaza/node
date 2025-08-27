# Hard Parts of NodeJS

[FM course page](https://frontendmasters.com/courses/servers-node-js/)

## Run the apps

### As the CLIs

To be able to run the apps as CLI commands execute the following code in a bash terminal:
``` bash
npm link
```

To run the queues/index.js script type:
``` bash
hard_parts queues
```
To run the server for the greetings app type:
``` bash
hard_parts greetings [port]
```
The ``` port ``` param is optional with 3000 as the default value.

The server can be reached then at following example address:

http://localhost:3000

### Directly from the command line

* From the <B>HardParts</B> folder

     run
    ```
    npm run greetings
    ```
    or
    ```
    npm run queues
    ```
* From either

    <B>HardParts/greetings</B>

    or

    <B>HardParts/queues</B>

    run
    ```
    npm run start
    ```

## Resources
* [Node](https://nodejs.org/)
