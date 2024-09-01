import requests


import config


def send_message_fb(message: str, recipient_id: str) -> None:
    url = f"https://graph.facebook.com/v17.0/me/messages?access_token={config.FB_TOKEN}"
    data = {
        "recipient": {"id": recipient_id},
        "message": {"text": message}
    }
    response = requests.post(url=url, json=data)
    if response.status_code == 200:
        print("FB MESSAGE SENT SUCCESSFULLY.")
    else:
        print("FB MESSAGE SENT FAILED.")
