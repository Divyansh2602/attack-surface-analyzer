class ParameterFuzzer:
    def __init__(self):
        # Common parameter names used in real-world web apps
        self.common_params = [
            "id", "cat", "item", "product",
            "uid", "user", "page",
            "search", "q", "type"
        ]

    def generate(self, endpoints):
        fuzzed_urls = set()

        for ep in endpoints:
            # Only fuzz dynamic pages
            if "php" in ep or "api" in ep:
                for param in self.common_params:
                    fuzzed_urls.add(f"{ep}?{param}=1")

        return fuzzed_urls
