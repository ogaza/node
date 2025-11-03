### Postgre server on a local docker

```docker
docker pull postgres:14
docker run -e POSTGRES_PASSWORD=lol --name=pg --rm -d -p 5432:5432 postgres:14
```
In the second command the --rm param can be removed so the container is not deleted:

```docker
docker run -e POSTGRES_PASSWORD=lol --name=pg -d -p 5432:5432 postgres:14
```
This sets up a server on the localhost(127.0.0.1) with a default user called <i>postgre</i> and the password: <i>lol</i>

The connection to the server can be established via Code extension called PostgreSQL Client:
[WebPage](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-postgresql-client2)

To run the comamnd-line-prompt postgre client on the docker container execute the following command:

```docker
docker exec -u postgres -it pg psql
```
This can be shut down with the <b>exit</b> prompt.

More info about these steps can also be found on the FrontenMasters course page and in the materials to it:
[FM](https://sql.holt.courses/lessons/databases-and-tables/databases)