from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

print("Sedang memuat model IndoBERT (ayameRushia)")

model_name = "ayameRushia/bert-base-indonesian-1.5G-sentiment-analysis-smsa"

try:
    sentiment_classifier = pipeline(
        "sentiment-analysis", 
        model=model_name, 
        tokenizer=model_name,
        token=False 
    )
    print("Model SIAP! 🚀")
except Exception as e:
    print(f"Gagal memuat model: {e}")
    sentiment_classifier = None

@app.route('/predict', methods=['POST'])
def predict():
    if not sentiment_classifier:
        return jsonify({'error': 'Model belum siap. Cek terminal.'}), 500

    try:
        data = request.json
        text = data.get('text', '')

        if not text:
            return jsonify({'error': 'No text provided'}), 400

        text = text[:512] 

        result = sentiment_classifier(text)[0]
        label = result['label']
        score = result['score']

        print(f"Input: {text}")
        print(f"Raw Label: {label} | Score: {score:.2f}")

        priority = 'Normal'
        
        if label.lower() == 'negative': 
            priority = 'High'
        
        print(f"Decision -> {priority}")
        print("-" * 30)

        return jsonify({
            'sentiment': label,
            'confidence': score,
            'priority': priority
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
