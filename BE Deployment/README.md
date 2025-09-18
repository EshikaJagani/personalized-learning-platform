# Deployment Documentation

All the parts are initially developed independently. Then comes the step to bring all the parts together and integrate them to make them function as one whole system. As described the functioning of the system in the System Overview section, all the blocks must first be deployed in order to get a public IP address for each of them to include them in the integration.

## Flask Backend Deployment

Thus, the Flask backend was first containerized using Docker Desktop and it was then pushed to Docker Hub. Since the goal was to deploy everything to the cloud, we used the Azure Container App Service to deploy the Flask backend’s image from Docker Hub. Next thing was to deploy the Ollama backend.

## Ollama Backend Deployment

We deployed the Ollama backend to a Virtual Machine on Azure. We then generated a link using “ngrok” since the public IP address provided by the Azure VM is HTTP and not HTTPS and causes errors while integration (internal service communication). Flask backend is deployed separately from Ollama backend for security purposes. The performance of the students are sent to the Flask backend instead of the Ollama backend in the VM. ngrok keeps changing the url every time it is run on the VM terminal. Thus, to keep it persistent, we used tmux.

## Frontend Deployment

Finally the links from these services were integrated on the frontend in the form of calls. When the Dashboard tab is clicked, the frontend sends each skill’s metadata to the Flask backend (which is in the Container App) and it responds with predictions about the skills being either weak, average or strong. Once this response is fetched by the frontend, it is displayed in the Skill Strength column. For the Average and Strong skills, “Well Done!” message is displayed. But for the Weak skills Ollama backend is called. Weak skills are sent to the Ollama backend which responds by providing links to the learning resources for the respective weak skills. All these calls are made skill-by-skill as the backend accepts performance on one skill and generates prediction/resources and responds with that. The frontend was deployed to the Azure Web App Service. Although only one skill is being processed at a time from the frontend, the system works well with parallel requests coming from different machines (users).
