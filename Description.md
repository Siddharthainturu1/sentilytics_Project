# **Sentilytics Project Description**

🔗 **Live Project:** `https://sentilytics-demo.amplifyapp.com` *(Replace with your actual Amplify link)*

### **Project Description: Sentilytics**
Sentilytics is a cloud-native AI application that enables users to perform real-time sentiment analysis on text input. It streamlines emotional data processing by converting raw text into sentiment scores and confidence metrics using Amazon Comprehend (NLP). The system is built with scalability, cost-efficiency, and developer ergonomics in mind, using a fully serverless architecture on AWS.

---

### **Performance and Functionality**

#### **✅ What Worked Well**

* **End-to-End Sentiment Processing Pipeline:**
    * API requests via **Amazon API Gateway** are fast, secure, and fully decoupled from the frontend.
    * **AWS Lambda (Python)** pipeline effectively tokenizes text and manages the logic flow between the client and the AI service.
    * **Amazon Comprehend’s** `DetectSentiment` model provides high-quality NLP classification, identifying sentiments as Positive, Negative, Neutral, or Mixed with high accuracy.

* **AI-Powered Analysis Interface:**
    * Using **Boto3** (AWS SDK) enabled seamless, low-latency integration with AWS NLP services.
    * Context-aware scoring (handling capitalization, negation, and intensifiers) provided nuanced results.
    * Implemented "Simulation Mode" fallback logic to ensure application availability during API quota limits.

* **Serverless + Cloud Native Stack:**
    * **React + AWS Amplify** provided a fast, scalable frontend with automated CI/CD deployment.
    * **Amazon Cognito** handled user identity and session management seamlessly.
    * **AWS Lambda** executed backend logic efficiently in a stateless environment.

* **Modular, Clean Codebase:**
    * The `index.py` module clearly separated request parsing, input validation, AI service calls, and response formatting.
    * Dynamic UI logic in `App.js` automatically adjusts visual feedback (color-coded cards) based on the AI's confidence score.

---

### **Frontend**

* Developed with **React**, styled using **AWS Amplify UI Components**, and hosted on **AWS Amplify**.
* **Features:**
    * **Secure Authentication:** Integrated Sign-Up/Sign-In flow using Amazon Cognito.
    * **Real-time Analysis:** Instant text submission and response rendering without page reloads.
    * **Dynamic Visuals:** Sentiment cards that change color (Green/Red/Blue/Orange) based on analysis results.

---

### **Backend**

* **Serverless and event-driven:**
    * **Text submission triggers a pipeline:** Frontend → API Gateway → AWS Lambda → Amazon Comprehend → JSON Response.
    * The architecture is stateless, processing each analysis request independently for maximum scalability.
* **Key Modules:**
    * `index.py`: The core Lambda handler that manages event parsing, CORS headers, and Boto3 client initialization.
    * `boto3`: The AWS SDK used to interface with Amazon Comprehend.
    * `auth`: Managed via Cognito User Pools to secure API endpoints.
* **Error Handling & Logging:**
    * Structured error responses (e.g., `500 Internal Server Error`) mapped to user-friendly frontend alerts.
    * **CloudWatch Logs** enabled detailed tracing of Lambda executions and API latency.

---

### **Tech Stack Overview**

| Layer | Stack/Service |
| :--- | :--- |
| **Frontend** | React, JavaScript, AWS Amplify UI |
| **Auth** | Amazon Cognito |
| **Backend Compute** | AWS Lambda (Python 3.x) |
| **AI Layer** | Amazon Comprehend |
| **API** | Amazon API Gateway (REST) |
| **Deployment** | AWS Amplify Hosting |
| **Monitoring** | Amazon CloudWatch |

---

### **Challenges Encountered**

* **AWS Regional Availability & Locks:**
    * Encountered `SubscriptionRequiredException` due to region-specific restrictions on AI services.
    * **Solution:** Implemented a robust "Mock/Simulation" fallback mode in the Python backend to allow development and testing to continue while awaiting account verification.
* **CORS & API Security:**
    * Initial cross-origin resource sharing errors caused frontend connection failures.
    * **Solution:** Configured explicit `Access-Control-Allow-Origin` headers in the Lambda response to securely allow frontend requests.
* **Cold Starts in Serverless Functions:**
    * Occasional latency on the first request due to Lambda environment initialization.
    * **Solution:** Optimized Python imports to keep the function lightweight.
* **IAM Permission Management:**
    * Lambda functions initially lacked access to the AI service.
    * **Solution:** Attached granular IAM policies (`ComprehendReadOnly`) to the Lambda Execution Role.

---

### **Conclusion**

Sentilytics demonstrates a practical, performant application of serverless AI in a real-world use case—sentiment analysis via cloud APIs. The use of Amazon Comprehend for NLP, AWS Lambda for compute, and Amplify for hosting enabled an accurate and reliable user experience. With clean abstractions, modular code, and cloud-native components, the platform is well-suited for scale and future enhancement.
