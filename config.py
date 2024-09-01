import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

FB_TOKEN = os.getenv("FB_TOKEN")
FB_VERIFY_TOKEN = os.getenv("FB_VERIFY_TOKEN")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
ASSISTANT_ID = os.getenv("ASSISTANT_ID")

TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
TWILIO_FROM = os.getenv("TWILIO_FROM")

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

# For production it needs a better solution
MAPPING_DATA = {"mapping": {}}

ERROR_MESSAGE = "We are facing an issue at this moment."
