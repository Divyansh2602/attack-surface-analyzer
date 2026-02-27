from recon.basic_recon import basic_recon
from crawler.endpoint_crawler import EndpointCrawler
from analyzer.js_endpoint_extractor import JSEndpointExtractor
from analyzer.surface_mapper import AttackSurfaceMapper
from analyzer.parameter_discovery import ParameterDiscovery
from analyzer.vulnerability_scanner import VulnerabilityScanner
from analyzer.parameter_fuzzer import ParameterFuzzer
from analyzer.risk_engine import RiskEngine
from analyzer.idor_scanner import IDORScanner


def run_scan(target: str):

    # Phase 1 — Recon
    basic_recon(target)

    # Phase 2 — Crawl
    crawler = EndpointCrawler(target)
    html_endpoints = crawler.crawl()

    # Phase 3 — JS Mining
    js_extractor = JSEndpointExtractor(target)
    js_endpoints = js_extractor.run(html_endpoints)

    # Phase 4 — Surface Mapping
    mapper = AttackSurfaceMapper()
    surface = mapper.correlate(html_endpoints, js_endpoints)

    # Phase 5 — Parameter Fuzzing
    fuzzer = ParameterFuzzer()
    fuzzed_urls = fuzzer.generate(surface.keys())

    # Phase 6 — Parameter Discovery
    param_finder = ParameterDiscovery()
    params = param_finder.run(fuzzed_urls)

    scanner = VulnerabilityScanner()
    idor = IDORScanner()
    risk_engine = RiskEngine()

    findings_list = []
    seen = set()

    scan_results = scanner.test(params)

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

    # IDOR detection
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

    return {
        "target": target,
        "surface_map": surface,
        "findings": findings_list
    }