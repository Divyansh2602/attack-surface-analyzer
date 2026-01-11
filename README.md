# 🔥 Web Application Attack Surface Analyzer & Exploit Engine
> Automated Web Application Security Scanner with Attack Surface Mapping, Exploit Detection, and Professional Pentest Reporting

<p align="center">
  <img src="https://img.shields.io/badge/Security-Offensive-red" />
  <img src="https://img.shields.io/badge/Python-3.x-blue" />
  <img src="https://img.shields.io/badge/Status-Production%20Ready-green" />
</p>

---

## 🛡 What is this?

**Web Application Attack Surface Analyzer & Exploit Engine** is a **full-stack automated penetration-testing framework** designed to behave like a real **red-team operator**.

It doesn’t just crawl websites — it **thinks like an attacker**.

It automatically:
- Maps everything an attacker can reach  
- Discovers user-controlled inputs  
- Actively exploits vulnerabilities  
- Scores risk based on impact  
- Generates professional security reports  

This is the same workflow used by **pentesters, red-teams, and bug bounty hunters**.

---

## 💣 What this tool actually does

| Capability | Status |
|----------|--------|
| Endpoint discovery | ✅ |
| JavaScript API mining | ✅ |
| Parameter fuzzing | ✅ |
| SQL Injection | ✅ |
| Cross-Site Scripting (XSS) | ✅ |
| Broken Access Control (IDOR) | ✅ |
| Exploit proof | ✅ |
| Risk scoring | ✅ |
| HTML & PDF pentest reports | ✅ |
| Multithreaded scanning | ✅ |

This is not a crawler.  
This is a **vulnerability exploitation engine**.

---

## 🧠 Attack Pipeline


Target Web App
│
▼
[ Endpoint Crawler ]
│
▼
[ JavaScript Miner ]
│
▼
[ Attack Surface Mapper ]
│
▼
[ Parameter Fuzzer ]
│
▼
[ Parameter Discovery ]
│
▼
[ Exploit Engine (SQLi, XSS, IDOR) ]
│
▼
[ Risk Engine ]
│
▼
[ HTML & PDF Pentest Reports ]

Every vulnerability is backed by **real payloads and server responses**, not guesses.

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

## 📸 Sample Assessments (bWAPP – HackHub Vulnerable Lab)

**bWAPP (Buggy Web Application) on HackHub**  
bWAPP is a deliberately vulnerable web application hosted on HackHub, designed for ethical hacking, security training, and vulnerability research.  
It exposes realistic authentication flows, user-controlled inputs, and business-logic flaws for safe exploitation.

All scans, payloads, and exploits shown below were performed against **bwapp.hackhub.net** in a controlled and authorized testing environment.

<div style="margin-bottom:40px">
<img width="2516" height="1173" alt="Screenshot 2026-01-11 191359" src="https://github.com/user-attachments/assets/6d3495a2-7887-46c1-8733-8f41223bc587" />
</div><br><br>

**Automated Vulnerability Discovery & Risk Scoring**  
The engine identified multiple SQL Injection, XSS, and IDOR vulnerabilities and automatically classified them into CRITICAL, HIGH, MEDIUM, and LOW risk categories based on exploitability and impact.

<div style="margin-bottom:40px">
<img width="920" height="1081" alt="Screenshot 2026-01-11 191525" src="https://github.com/user-attachments/assets/88a56d00-b753-4727-8075-90eeefd30624" />
</div><br><br>

**Exploit Proof with Payloads & Server Evidence**  
Every finding is backed by the exact payload used and the server response confirming the vulnerability, eliminating false positives and providing reproducible proof of exploitation.

<div style="margin-bottom:40px">
<img width="1276" height="808" alt="Screenshot 2026-01-11 191803" src="https://github.com/user-attachments/assets/d658d9cb-258c-4ab5-a33e-1cfde239193d" />
</div><br><br>

**Live Exploit Engine in Action**  
The scanner actively fuzzes parameters, injects payloads, detects vulnerabilities, and validates access-control flaws in real time using a multithreaded attack pipeline.

<div style="margin-bottom:40px">
<img width="829" height="362" alt="Screenshot 2026-01-11 191850" src="https://github.com/user-attachments/assets/daa87261-175a-4763-ab20-b04caa19a2b0" />
</div><br><br>


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

## 🛠 How to Run

### 1️⃣ Install dependencies
```bash
pip install requests beautifulsoup4 reportlab
```
2️⃣ Run the scanner
python main.py <target_url>
Example:
python main.py https://hakhub.net

3️⃣ View results
report.html
pentest_report.pdf


Open them in your browser or PDF viewer to see:

Vulnerabilities

Payloads

Evidence

Risk levels

```

## 🧭 Roadmap

Planned enhancements for this engine include:

- 🔐 Authenticated scanning (login & session handling)  
- 🧠 CSRF & CORS misconfiguration detection  
- 📡 API & JWT vulnerability testing  
- 📊 Graphs and severity charts in reports  
- ⚡ Distributed & cloud-based scanning  
- 🛑 Rate-limit & WAF detection  
- 📂 JSON & SIEM export  

The goal is to evolve this into a **full-scale offensive web security platform**.






