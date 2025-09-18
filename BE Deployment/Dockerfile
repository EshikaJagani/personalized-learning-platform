# Use official lightweight Python image
FROM python:3.11

# Set working directory
WORKDIR /app

# Copy everything to container
COPY . .

# Install dependencies
RUN pip install --upgrade pip
# RUN pip install -r requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
#pip3 freeze > requirements.txt

# Expose port (Flask default)
# EXPOSE 5000 80 8080 443
EXPOSE 8000

# Run the Flask app
CMD ["python3", "app.py"]
# CMD ["python", "app.py"]
