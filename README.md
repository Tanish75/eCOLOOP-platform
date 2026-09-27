# ♻️ EcoLoop — E-Waste Reverse Logistics for Bharat

> **Track 03 (Waste and Clean Energy) Submission for WeMakeDevs Bharat Builds Tour**  
> AI-powered reverse logistics routing e-waste from households to India’s 4 million informal recyclers with transparent scrap valuation.

---

## 🏗️ Architecture

```text
[Citizen Web App] (React 18 + Vite + Tailwind CSS)
        │
        ▼ (HTTPS REST)
[AWS API Gateway] (ap-south-1)
   ├── POST /classify ──────► [AWS Lambda] ──► [Amazon Rekognition]
   ├── POST /pickups ───────► [AWS Lambda] ──► [Amazon DynamoDB] ──► [Amazon SNS]
   └── GET  /impact ────────► [AWS Lambda] ──► [Amazon DynamoDB]
```

---

## 🛠️ Built With AWS & Open Source Stack

- **AWS SAM CLI (Open Source):** Serverless Application Model for local testing and infrastructure deployment.
- **Amazon Rekognition:** Deep learning computer vision for e-waste device detection and scrap rate matching.
- **AWS Lambda & DynamoDB:** Serverless compute and on-demand NoSQL database for pickup queues.
- **Amazon SNS:** Real-time SMS dispatch alerts to informal recyclers.
- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Lucide React.

---

## 👥 Team
**Lone Commit** — Bharat Builds 2026
