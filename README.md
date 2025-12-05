# Sentilytics Project Description

**🔗 Live Project:** 

### Project Description: Sentilytics
Sentilytics is a cloud-native AI application that enables users to perform real-time sentiment analysis on text input. It streamlines emotional data processing by converting raw text into sentiment scores and confidence metrics using Amazon Comprehend (NLP). The system is built with scalability, cost-efficiency, and developer ergonomics in mind, using a fully serverless architecture on AWS.

---

### Performance and Functionality

####  What Worked Well
* **End-to-End Sentiment Processing Pipeline:**
    * API requests via **Amazon API Gateway** are fast, secure, and fully decoupled from the frontend.
    * **AWS Lambda (Python)** pipeline effectively tokenizes text and manages the logic flow between the client and the AI service.
    * **Amazon Comprehend’s** `DetectSentiment` model provides high-quality NLP classification, identifying sentiments as Positive, Negative, Neutral, or Mixed with high accuracy.

* **AI-Powered Analysis Interface:**
    * Using **Boto3** (AWS SDK) enabled seamless, low-latency integration with AWS NLP services.
    * Context-aware scoring (handling capitalization, negation, and intensifiers) provided nuanced results.

* **Serverless + Cloud Native Stack:**
    * **React + AWS Amplify** provided a fast, scalable frontend with automated CI/CD deployment.
    * **Amazon Cognito** handled user identity and session management seamlessly.
    * **AWS Lambda** executed backend logic efficiently in a stateless environment.

---

### Architecture Diagram

```mermaid
graph LR
    subgraph Client ["Frontend Layer"]
        direction TB
        UI["Frontend Application<br/>React + Amplify UI"]
        Auth["Authentication<br/>Amazon Cognito"]
    end

    subgraph Serverless ["Serverless Backend"]
        direction TB
        API["API Gateway<br/>(REST Endpoint)"]
        Lambda["AWS Lambda<br/>(Python Logic)"]
    end

    subgraph Intelligence ["AI Intelligence"]
        Comprehend["Amazon Comprehend<br/>(Sentiment Engine)"]
    end

    UI -->|1. Log In| Auth
    UI -->|2. POST Text| API
    API -->|3. Trigger| Lambda
    Lambda -->|4. Analyze| Comprehend
    Comprehend -.->|5. Result| Lambda
    Lambda -.->|6. JSON Response| UI
