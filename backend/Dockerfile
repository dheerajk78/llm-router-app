FROM python:3.10-slim

# Create working directory
WORKDIR /app

# Copy requirements first to install separately
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port used by Flask
ENV PORT=8080
EXPOSE 8080

# Start the app
CMD ["python", "main.py"]

