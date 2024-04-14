from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
# Apply CORS to this app with default options, allowing all origins
CORS(app)

@app.route('/scan', methods=['POST', 'OPTIONS'])
@cross_origin()  # This decorator allows cross-origin requests specifically for this route
def handle_scan():
    if request.method == 'OPTIONS':  # Preflight request for CORS
        # If it's an OPTIONS request, we respond with 200 OK immediately.
        return '', 200

    # Actual POST request handling code
    data = request.json
    barcode = data.get('barcode')
    print(f"Received barcode: {barcode}")
    # Process the barcode as needed...
    return jsonify({"message": "Barcode processed", "barcode": barcode})

if __name__ == '__main__':
    app.run(debug=True)
