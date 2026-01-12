# ===================================================
# Web Application Attack Surface Analyzer
# Author: Divyansh Gupta
# © 2026 Divyansh Gupta
# GitHub: https://github.com/Divyansh2602
# ===================================================

from recon.basic_recon import basic_recon
from crawler.endpoint_crawler import EndpointCrawler
from analyzer.js_endpoint_extractor import JSEndpointExtractor
from analyzer.surface_mapper import AttackSurfaceMapper
from analyzer.parameter_discovery import ParameterDiscovery
from analyzer.vulnerability_scanner import VulnerabilityScanner
from analyzer.parameter_fuzzer import ParameterFuzzer
from analyzer.risk_engine import RiskEngine
from analyzer.report_generator import ReportGenerator
from analyzer.idor_scanner import IDORScanner
from analyzer.pdf_report_generator import PDFReportGenerator

import sys

def main():
    if len(sys.argv) != 2:
        print("Usage: python main.py <target_url>")
        sys.exit(1)

    target = sys.argv[1]

    # =========================
    # Phase 1 — Recon
    # =========================
    basic_recon(target)

    # =========================
    # Phase 2 — Crawl
    # =========================
    crawler = EndpointCrawler(target)
    html_endpoints = crawler.crawl()

    # =========================
    # Phase 3 — JS Mining
    # =========================
    js_extractor = JSEndpointExtractor(target)
    js_endpoints = js_extractor.run(html_endpoints)

    # =========================
    # Phase 4 — Surface Mapping
    # =========================
    mapper = AttackSurfaceMapper()
    surface = mapper.correlate(html_endpoints, js_endpoints)

    # =========================
    # Phase 5 — Parameter Fuzzing
    # =========================
    fuzzer = ParameterFuzzer()
    fuzzed_urls = fuzzer.generate(surface.keys())

    # =========================
    # Phase 6 — Parameter Discovery
    # =========================
    param_finder = ParameterDiscovery()
    params = param_finder.run(fuzzed_urls)

    # =========================
    # Phase 7 — Exploit Scanning
    # =========================
    scanner = VulnerabilityScanner()
    idor = IDORScanner()
    risk_engine = RiskEngine()
    html_report = ReportGenerator()
    pdf_report = PDFReportGenerator()

    findings_list = []
    seen = set()  # 🔥 DEDUPLICATION SET

    scan_results = scanner.test(params)

    print("\n====== EXPLOIT REPORT ======\n")

    for url, findings in scan_results.items():
        for vuln, param, payload, evidence in findings:
            base_url = url.split("?")[0]
            ep_risk = surface.get(base_url, {"risk": "LOW"})["risk"]

            score = risk_engine.score(ep_risk, vuln)
            final_risk = risk_engine.label(score)

            key = (final_risk, vuln, url, param)
            if key in seen:
                continue
            seen.add(key)

            findings_list.append({
                "risk": final_risk,
                "vuln": vuln,
                "url": url,
                "param": param,
                "payload": payload,
                "evidence": evidence
            })

            print(f"[{final_risk}] {vuln} on '{param}'")
            print(f"URL: {url}")
            print(f"Payload: {payload}")
            print(f"Evidence: {evidence}\n")

    # =========================
    # Phase 8 — IDOR Detection
    # =========================
    print("\n====== IDOR REPORT ======\n")

    for url, p in params.items():
        idor_findings = idor.test(url, p)

        for f in idor_findings:
            key = ("CRITICAL", "IDOR", url, f["param"])
            if key in seen:
                continue
            seen.add(key)

            findings_list.append({
                "risk": "CRITICAL",
                "vuln": "IDOR",
                "url": url,
                "param": f["param"],
                "payload": f"{f['from']} -> {f['to']}",
                "evidence": f["evidence"]
            })

            print("[CRITICAL] IDOR detected")
            print(f"URL: {url}")
            print(f"Parameter: {f['param']}")
            print(f"Changed: {f['from']} -> {f['to']}")
            print(f"Evidence: {f['evidence']}\n")

    # =========================
    # Phase 9 — Reports
    # =========================
    html_report.generate(target, findings_list)
    pdf_report.generate(target, findings_list)

    print("\n====== ATTACK SURFACE MAP ======")
    for ep, meta in surface.items():
        print(f"[{meta['risk']}] {ep}")

if __name__ == "__main__":
    main()
