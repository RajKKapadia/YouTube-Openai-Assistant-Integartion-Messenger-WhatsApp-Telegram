import threading

from flask import Flask, request

from facebook_functions import send_message_fb
import config
from openai_fuctions import ask_openai_assistant
from telegram_functions import send_message_telegram, set_webhook_telegram
from whatsapp_functions import send_message_whatsapp

app = Flask(__name__)


@app.route("/")
def handle_home():
    return "OK", 200


@app.route("/facebook", methods=["GET"])
def handle_facebook_get():
    mode = request.args.get("hub.mode")
    verify_token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")
    if mode == "subscribe" and verify_token == config.FB_VERIFY_TOKEN:
        print("WEBHOOK VERIFIED.")
        return challenge, 200
    else:
        return "BAD_REQUEST", 403


def call_ask_openai_assistant_send_message_to_fb_messenger(query: str, recipient_id: str) -> None:
    reply = ask_openai_assistant(query=query, recipient_id=recipient_id)
    send_message_fb(message=reply, recipient_id=recipient_id)


@app.route("/facebook", methods=["POST"])
def handle_facebook_post():
    try:
        body = request.get_json()
        recipient_id = body["entry"][0]["messaging"][0]["sender"]["id"]
        query = body["entry"][0]["messaging"][0]["message"]["text"]
        # In production we should use a messaging queue
        threading.Thread(
            target=call_ask_openai_assistant_send_message_to_fb_messenger,
            args=(query, recipient_id)
        ).start()
    except:
        pass
    return "OK", 200


def call_ask_openai_assistant_send_message_to_whatsapp(query: str, recipient_id: str) -> None:
    reply = ask_openai_assistant(query=query, recipient_id=recipient_id)
    send_message_whatsapp(message=reply, recipient_id=recipient_id)


@app.route("/whatsapp", methods=["POST"])
def handle_whatsapp_post():
    try:
        query = request.form.get("Body")
        recipient_id = request.form.get("From")
        # In production we should use a messaging queue
        threading.Thread(
            target=call_ask_openai_assistant_send_message_to_whatsapp,
            args=(query, recipient_id)
        ).start()
    except:
        pass
    return "OK", 200


def call_ask_openai_assistant_send_message_to_telegram(query: str, recipient_id: str) -> None:
    reply = ask_openai_assistant(query=query, recipient_id=recipient_id)
    send_message_telegram(message=reply, recipient_id=recipient_id)


@app.route("/telegram", methods=["POST"])
def handle_telegram_post():
    try:
        body = request.get_json()
        query = body["message"]["text"]
        recipient_id = body["message"]["from"]["id"]
        threading.Thread(
            target=call_ask_openai_assistant_send_message_to_telegram,
            args=(query, recipient_id)
        ).start()
    except:
        pass
    return "OK", 200


@app.route("/telegram", methods=["GET"])
def handle_telegram_get():
    base_url = request.base_url
    flag = set_webhook_telegram(url=base_url)
    if flag:
        return "OK", 200
    else:
        return "BAD_REQUEST", 403
