import config


def get_thread_id_from_recipient_id(recipient_id: str | int) -> str | None:
    try:
        thread_id = config.MAPPING_DATA.get("mapping", {}).get(recipient_id)
        return thread_id
    except:
        return None


def update_thread_id_for_recipient_id(recipient_id: str | int, thread_id: str) -> None:
    try:
        config.MAPPING_DATA.get("mapping", {}).update(
            {recipient_id: thread_id})
        return None
    except:
        return None
