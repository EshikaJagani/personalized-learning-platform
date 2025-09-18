# Docker Container Documentation

## Failed Attempt!

In this attempt we 2 folders, one for Flask backend and one for Ollama backend. The reason was that the docker has different images for Flask and Ollama. So in 1 container we created 2 microservices respectively with their own Dockerfiles. And made a `docker-compose.yml` file outside the microservices but inside the container. This way we combined both the backends. Then we diployed this to Azure Container App Service. When tested, the output for Flask backend were visible but those for Ollama were giving dozens of errors which upon spending plenty of time, were not getting solved. So we decided to containerizing Flask backend only and deployed the Ollama to cloud using Azure Virtual Machine. Although, this implementation still remains in our future to-do list.
