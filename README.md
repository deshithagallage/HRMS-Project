# Jupiter Apparels HR Management System
Human Resource Management System for the final project of module CS-3043 in the 3rd semester.

## Table of Contents
- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Special Notes](#special-notes)

## Introduction

Welcome to the Jupiter HR Management System repository! This project is a software solution designed to meet the specific needs of Jupiter Apparels, a multinational apparel company with branches in Sri Lanka, Bangladesh, and Pakistan. The primary goal of this project is to create an easy-to-use Human Resource Management System (HRMS) to replace Jupiter's current SAP-based system.

## Project Overview

Jupiter Apparels currently uses SAP as their ERP system to manage various aspects of their organization. However, the management has identified several challenges with the current system, including the need for specialized SAP engineers for even minor modifications and the difficulty of training non-technical employees to use the system effectively. To address these issues, our team has been tasked with developing a user-friendly HRMS as the initial phase of the project.

If the HRMS proves successful, Jupiter Apparels intends to migrate other key functions, such as payroll and inventory management, to our system.

## Features

Our HR Management System for Jupiter Apparels will offer the following features:

- **User-Friendly Interface**: Enjoy an intuitive and user-friendly interface that minimizes the need for extensive training, ensuring that all employees can easily navigate and use the system.
  
- **Personal Information Management (PIM)**: Access comprehensive tools for efficiently managing employee data. This includes overseeing personal information, tracking attendance, and conducting performance evaluations with ease.
  
- **Absence Management**: Simplify absence management processes by providing streamlined tools for requesting and managing leave.
  
- **Reporting Module**: Automate payroll calculations, tax deductions, and payslip generation with our reporting module. This feature not only saves time but also ensures accuracy in financial processes.
  
- **User Management and Authorization**: Efficiently manage user access and authorization, allowing you to control who can access various parts of the system. Customize access levels to aid decision-making and compliance efforts.

## Installation

Follow these steps to install the Jupiter HR Management System:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/deshithagallage/HRMS-Project.git
   cd HRMS-Project
   ```

2. **Install Dependencies**:
   - Ensure you have [Node.js](https://nodejs.org/) installed.
   - Install the necessary packages:
     ```bash
     npm install
     ```

3. **Set Up the Database**:
   - Ensure you have a MySQL server running.
   - Create a new database for the HRMS.
   - Run all the database scripts in database directory.

4. **Configure Environment Variables**:
   - Create a `.env` file in the root directory of the project.
   - Add the following environment variables:
     ```
     DB_HOST=your_database_host
     DB_USER=your_database_user
     DB_PASS=your_database_password
     DB_NAME=your_database_name
     ```

5. **Start the Application**:
   ```bash
   npm start
   ```

6. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

## Usage

Provide detailed instructions on how to use the HR Management System. Include information on user roles and permissions, common workflows, and any other relevant details that will help users effectively utilize the system.

## Special Notes

- As this project is developed for an assessment, it is not meant to be used in any commercial applications since it doesn't meet all the necessary requirements yet. Instead, the main focus is on the educational aspect of a DBMS project.

Thank you for your interest in the Jupiter HR Management System project. If you have any questions or need further assistance, please don't hesitate to contact our team.
