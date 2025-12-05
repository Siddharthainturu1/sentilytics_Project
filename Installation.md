# Installation and Execution Guide

[cite_start]**Sentilytics** is a cloud-native AI web application built with React and AWS Amplify, allowing users to analyze sentiment in real-time using AWS Lambda and Amazon Comprehend. [cite: 63]

---

##  Prerequisites

Ensure you have the following installed before starting:
* **Node.js** (v14 or above)
* **npm**
* **Git**
* **AWS CLI** (Configured with an active account)
* [cite_start]**Amplify CLI** (`npm install -g @aws-amplify/cli`) [cite: 65-70]

---

##  Setup Instructions

### 1. Clone the Repository
[cite_start]Clone the project code to your local machine. [cite: 72]

```bash
git clone [https://github.com/Siddharthainturul/sentilytics_Project.git](https://github.com/Siddharthainturul/sentilytics_Project.git)
cd sentilytics_Project
```

### 2. Install Dependencies
Install the required node modules for React and Amplify.

```bash
npm install
```

### 3. Initialize AWS Backend
Connect the project to your AWS cloud environment to set up Auth and API resources.

```bash
amplify init
```

### 4. Deploy Backend Resources
Push the Python Lambda functions and API Gateway configurations to the cloud.

```bash
amplify push
```

5. Run the Application
Start the local development server.

```bash
npm start
```

This will open the app at http://localhost:3000.

##  Key Notes

>**AWS Region:** Ensure your CLI is configured for a region that supports Amazon Comprehend (e.g., `us-east-1` or `ap-south-1`). 
>**IAM Permissions:** The Lambda execution role created by Amplify must have `ComprehendReadOnly` permissions attached via the AWS Console.

> **Cold Starts:** The first analysis request might take 2-3 seconds as the Lambda function "wakes up." Subsequent requests will be instant. 

---

## 🛠 Configuration & Services Overview

Since Sentilytics uses **Infrastructure-as-Code (IaC)** via Amplify, you do not manually set `.env` strings. [cite_start]Instead, the `amplify push` command configures the following services for you. [cite: 95-96]

###  1. Amazon Cognito (Authentication)
* **Configured in:** `amplify/backend/auth` 
* **Purpose:** Enables secure user sign-up, sign-in, and session management. 
* **Instructions:**
    * Managed automatically via Amplify.
    * To view users, go to **AWS Console > Cognito > User Pools**. 

###  2. AWS Lambda (Backend Logic)
* **Configured in:** `amplify/backend/function/sentilyticsFunction` 
* **Purpose:** Serverless Python function that receives text from the frontend, validates it, and sends it to the AI layer.
* **Instructions:**
    * [cite_start]Code is located in `src/index.py`.
    * To deploy changes to the Python code:
      ```bash
      amplify push
      ```
      

###  3. Amazon Comprehend (AI & NLP)
* **Configured in:** AWS Cloud (Service) 
* **Purpose:** The core AI engine that performs Natural Language Processing to detect sentiment (**Positive**, **Negative**, **Neutral**, **Mixed**).
* **Instructions:**
    * No API key is needed in the code; authentication is handled via IAM Roles attached to the Lambda function. 
    * [cite_start]Ensure your AWS account has passed verification to access AI services. 

###  4. Amazon API Gateway (REST API)
* **Configured in:** `amplify/backend/api/sentilyticsAPI` 
* **Purpose:** Exposes a secure REST endpoint (`/analyze`) that the React frontend connects to. 
* **Instructions:**
    * The API URL is automatically injected into `aws-exports.js` during the build process.

###  5. Frontend Hosting (AWS Amplify)
* **Configured in:** AWS Console 
* **Purpose:** Hosts the React application globally with CI/CD support.
* **Instructions:**
    * To deploy the live site:
      ```bash
      amplify publish
      ```
     
    * This uploads your build artifacts to an S3 bucket and serves them via CloudFront CDN.
