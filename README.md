# Security Guard Mobile Robot (Roverant)

## Project Overview

The **Security Guard Mobile Robot (Roverant)** is an innovative robotic system designed to enhance the efficiency and effectiveness of security operations within large facilities. Roverant autonomously patrols indoor environments, providing real-time surveillance through advanced image processing, autonomous navigation, and comprehensive security threat detection capabilities. It integrates a web-based application for real-time monitoring, control, and alert management.



## Features

- **Autonomous Navigation**: Utilizing Simultaneous Localization and Mapping (SLAM) technology with LIDAR sensors for accurate indoor navigation and obstacle avoidance.
- **Real-time Object Detection**: Powered by YOLO (You Only Look Once) image processing algorithms, the robot quickly detects unauthorized individuals or suspicious objects.
- **Web-based Monitoring and Control**: A Next.js frontend and FastAPI backend enable real-time video streaming, robot control, and alerts monitoring.
- **Alert and Notification**: Immediate alerts on detecting suspicious activities directly via the web dashboard.
- **Patrol Logging and Monitoring**: Logs patrol routes, detected anomalies, and provides historical data analysis.



## System Components

### Hardware

- NVIDIA Jetson TX2 (central processing unit)
- LIDAR sensor for mapping and navigation
- Proximity sensors for collision avoidance
- High-resolution cameras for image capturing and processing
- DC motors with PID controllers for precise movement control
- LM2596 DC-DC converters for stable power management
- 12V battery and power supply systems

### Software

- **Frontend**: Next.js (React framework) providing a responsive user interface
- **Backend**: FastAPI-based server for real-time data handling and WebSocket communication
- **Database**: PostgreSQL for structured storage of alerts, patrol logs, and user data
- **Web Technologies**: HTML, CSS, JavaScript



## Project Workflow

1. **Initialization**: Robot receives patrol schedule and begins autonomous patrolling.
2. **Data Collection**: Continuously captures environmental data using sensors and cameras.
3. **Threat Detection**: Real-time identification of unauthorized personnel or suspicious objects.
4. **Data Transmission**: Alerts and live video feeds are transmitted to the web interface.
5. **Real-time Response**: Security personnel review alerts and make informed decisions through the web-based interface.



## User Interface

The web application dashboard offers:

- **Real-time Monitoring**: Live video streaming and location tracking
- **Alert Notifications**: Instant alerts with detailed context and timestamps
- **Remote Control**: Manual control override options



## Getting Started

### Prerequisites

- Node.js
- Python and FastAPI
- PostgreSQL

### Installation

Clone this repository and navigate to the project directory:

```bash
git clone <repository-link>
cd Roverant
```

### Frontend Setup

```bash
cd robot-monitor-web-next
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Evaluation and Testing

- Tests include autonomous navigation accuracy, real-time object detection reliability, and system integration.



## Credits

- **Woradon Samphanphaisarn**
- **Kittitat Songsakseree**
- **Phithatsanan Lertthanasiriwat**

### Advisors

- **Dr. Prapong Prechaprapranwong** (Advisor)
- **Dr. Kharittha Jangsamsi** (Co-advisor)



## License

© 2024 Roverant Development Group. All rights reserved.



## Contact

For further inquiries, please contact:

- [roverantdevelopmentgroup@gmail.com](mailto\:roverantdevelopmentgroup@gmail.com)





