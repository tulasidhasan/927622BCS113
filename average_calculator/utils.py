import requests

EXTERNAL_APIS = {
    "primes": "http://20.244.56.144/evaluation-service/primes",
    "fibo": "http://20.244.56.144/evaluation-service/fibo",
    "even": "http://20.244.56.144/evaluation-service/even",
    "rand": "http://20.244.56.144/evaluation-service/rand"
}

def fetch_numbers(category):
    try:
        response = requests.get(EXTERNAL_APIS[category], timeout=0.5)
        if response.status_code == 200:
            return response.json().get("numbers", [])
    except:
        return []
    return []

def calculate_average(numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)
