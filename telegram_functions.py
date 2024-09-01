import json

import requests

import config


BASE_URL = f'https://api.telegram.org/bot{config.TELEGRAM_BOT_TOKEN}'


def send_message_telegram(message: str, recipient_id: int) -> None:
    payload = {
        'chat_id': recipient_id,
        'text': message
    }
    headers = {'Content-Type': 'application/json'}
    response = requests.request(
        'POST', f'{BASE_URL}/sendMessage', json=payload, headers=headers)
    status_code = response.status_code
    response = json.loads(response.text)
    if status_code == 200 and response['ok']:
        print("TELEGRAM MESSAGE SENT SUCCESSFULLY.")
    else:
        print("TELEGRAM MESSAGE SENT FAILED.")


def set_webhook_telegram(url: str, secret_token: str = '') -> bool:
    payload = {'url': url}
    if secret_token != '':
        payload['secret_token'] = secret_token
    headers = {'Content-Type': 'application/json'}
    response = requests.request(
        'POST', f'{BASE_URL}/setWebhook', json=payload, headers=headers)
    status_code = response.status_code
    response = json.loads(response.text)
    if status_code == 200 and response['ok']:
        return True
    else:
        return False
