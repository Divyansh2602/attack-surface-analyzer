# 🔥 Web Application Attack Surface Analyzer & Exploit Engine

> Automated Web Application Security Scanner with Attack Surface Mapping, Exploit Detection, and Professional Pentest Reporting

![Security](https://img.shields.io/badge/Security-Offensive-red)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

---

## 🛡 What is this?

This project is a **full-stack automated web application penetration-testing engine**.

It does not just crawl pages — it:
- Discovers the application’s **attack surface**
- Finds **real exploitable vulnerabilities**
- Proves them using payload injection
- Classifies their **risk**
- And generates **professional pentest reports** (HTML & PDF)

This simulates how real **red-teamers and bug-bounty hunters** analyze targets.

---

## 🚀 What it detects

| Category | Supported |
|--------|-----------|
| SQL Injection (SQLi) | ✅ |
| Cross-Site Scripting (XSS) | ✅ |
| Broken Access Control (IDOR) | ✅ |
| Hidden JavaScript endpoints | ✅ |
| Parameter fuzzing | ✅ |
| Risk scoring (LOW → CRITICAL) | ✅ |
| Exploit proof | ✅ |
| HTML & PDF pentest reports | ✅ |

---

## 🧠 System Architecture

Target Website
        |
        v
[ Endpoint Crawler ]
        |
        v
[ JavaScript Miner ]
        |
        v
[ Attack Surface Mapper ]
        |
        v
[ Parameter Fuzzer ]
        |
        v
[ Parameter Discovery ]
        |
        v
[ Exploit Engine (SQLi, XSS, IDOR) ]
        |
        v
[ Risk Engine ]
        |
        v
[ HTML & PDF Pentest Report ]

## 🧠 How it works

The engine runs in multiple automated phases:

1. **Endpoint Crawler**  
   Crawls internal pages and builds a list of reachable endpoints.

2. **JavaScript Miner**  
   Extracts hidden API routes and endpoints from JS files.

3. **Attack Surface Mapper**  
   Tags endpoints as HIGH / MEDIUM / LOW risk.

4. **Parameter Fuzzer**  
   Injects common parameter names (`id`, `user`, `q`, etc.) into endpoints.

5. **Parameter Discovery**  
   Detects which parameters are actually accepted by the backend.

6. **Exploit Engine**  
   Actively tests:
   - SQL Injection  
   - XSS  
   - IDOR (Broken Access Control)

7. **Risk Engine**  
   Scores vulnerabilities based on:
   - Endpoint sensitivity  
   - Exploit type  

8. **Pentest Report Generator**  
   Creates:
   - `report.html`
   - `pentest_report.pdf`  
   containing vulnerabilities, payloads, evidence, and severity.


## 📄 Example Output

The tool produces **real pentest-style reports** with:

- Executive summary  
- Total issues  
- Risk distribution  
- Vulnerable endpoints  
- Parameters  
- Payloads  
- Server response evidence  

This matches the format used by:
- Burp Suite  
- Nessus  
- Acunetix  
- Pentest consulting firms  

---

