from flask import Flask, request, jsonify
from utils import fetch_numbers, calculate_average

app = Flask(__name__)

@app.route('/numbers', methods=['POST'])
def numbers():
    data = request.json
    categories = data.get("numberTypes", [])
    previous_numbers = data.get("numbers", [])

    all_numbers = set(previous_numbers)

    for cat in categories:
        new_nums = fetch_numbers(cat)
        all_numbers.update(new_nums)

    all_numbers = sorted(all_numbers)
    avg = calculate_average(all_numbers)

    return jsonify({
        "numbers": all_numbers,
        "avg": avg
    })

if __name__ == '__main__':
    app.run(debug=True, port=9876)
