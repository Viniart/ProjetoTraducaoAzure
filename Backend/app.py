# app.py
import os
import requests
import uuid
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS  # <--- 1. IMPORTE O CORS

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # <--- 2. HABILITE O CORS PARA TODA A APLICAÇÃO

# Pega as credenciais do ambiente
AZURE_SUBSCRIPTION_KEY = os.getenv('AZURE_SUBSCRIPTION_KEY')
AZURE_LOCATION = os.getenv('AZURE_LOCATION')
AZURE_ENDPOINT = 'https://api.cognitive.microsofttranslator.com/'

# --- Rota da nossa API ---
@app.route('/api/translate', methods=['POST'])
def translate_text():
    # 1. Verifica se as credenciais estão configuradas no servidor
    if not AZURE_SUBSCRIPTION_KEY or not AZURE_LOCATION:
        return jsonify({'error': 'As credenciais da Azure não foram configuradas no servidor.'}), 500

    # 2. Pega os dados JSON enviados pelo frontend
    try:
        data = request.get_json()
        text_to_translate = data['text']
        target_language = data['to']
        source_language = data.get('from') # .get() é seguro se a chave 'from' não existir
    except Exception as e:
        return jsonify({'error': 'Dados inválidos no corpo da requisição. "text" e "to" são obrigatórios.'}), 400

    # 3. Monta a requisição para a API da Azure
    constructed_url = f"{AZURE_ENDPOINT}/translate?api-version=3.0&to={target_language}"
    if source_language:
        constructed_url += f"&from={source_language}"

    headers = {
        'Ocp-Apim-Subscription-Key': AZURE_SUBSCRIPTION_KEY,
        'Ocp-Apim-Subscription-Region': AZURE_LOCATION,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }

    body = [{'text': text_to_translate}]

    # 4. Envia a requisição para a Azure e lida com a resposta
    try:
        azure_response = requests.post(constructed_url, headers=headers, json=body)
        azure_response.raise_for_status()  # Lança um erro para respostas 4xx/5xx
        
        response_data = azure_response.json()
        translated_text = response_data[0]['translations'][0]['text']
        
        # 5. Retorna a tradução para o frontend
        return jsonify({'translation': translated_text})

    except requests.exceptions.RequestException as e:
        # Se a chamada para a Azure falhar
        return jsonify({'error': f'Falha ao comunicar com a API da Azure: {e}'}), 502 # Bad Gateway
    except Exception as e:
        # Outros erros inesperados
        return jsonify({'error': str(e)}), 500

# --- Bloco para rodar o servidor Flask ---
if __name__ == '__main__':
    # debug=True recarrega o servidor automaticamente quando você salva o arquivo
    app.run(debug=True, port=5000)