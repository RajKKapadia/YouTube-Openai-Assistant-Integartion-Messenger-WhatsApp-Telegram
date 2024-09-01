from twilio.rest import Client

import config

client = Client(
    config.TWILIO_SID,
    config.TWILIO_AUTH_TOKEN
)

def send_message_whatsapp(message: str, recipient_id: str) -> None:
    try:
        _ = client.messages.create(
            from_=config.TWILIO_FROM,
            body=message,
            to=recipient_id
        )
        print("WHATSAPP MESSAGE SENT SUCCESSFULLY.")
    except:
        print("WHATSAPP MESSAGE SENT FAILED.")