import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, parse_qs

class ParameterDiscovery:
    def __init__(self):
        self.parameters = {}

    def extract_get_params(self, url):
        parsed = urlparse(url)
        qs = parse_qs(parsed.query)

        if qs:
            self.parameters[url] = list(qs.keys())

    def extract_post_params(self, html, url):
        soup = BeautifulSoup(html, "html.parser")

        for form in soup.find_all("form"):
            inputs = form.find_all("input")
            names = []

            for i in inputs:
                if i.get("name"):
                    names.append(i.get("name"))

            if names:
                self.parameters[url] = names

    def run(self, endpoints):
        print("\n[+] Discovering parameters")

        for url in endpoints:
            try:
                r = requests.get(url, timeout=5)
                self.extract_get_params(url)
                self.extract_post_params(r.text, url)
            except:
                pass

        return self.parameters
