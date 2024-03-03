import mimetypes, os

from werkzeug.utils import secure_filename
from middleware.models import process_document_sample, transcribe_model_selection, convert_to_json

ALLOWED_IMAGE_EXT = {"jpeg", "jpg", "png", "bmp", "pdf", "tiff", "tif", "gif"}
ALLOWED_AUDIO_EXT = {"mp3", "wav", "m4a"}

project_id = "shaped-terrain-416020"
location = "us" # Format is "us" or "eu"
processor_id = "cf55c390fb0f1cd7" # Create processor before running sample

def verify_upload(filename):
    if "." in filename:
        ext = filename.split(".", 1)[1].lower()
        if ext in ALLOWED_IMAGE_EXT:
            return secure_filename(filename), True
        elif ext in ALLOWED_AUDIO_EXT:
            return secure_filename(filename), False
        else:
            return ""
    else:
        return ""
    
def generate_set(file):
    filename, isImage = verify_upload(file.filename)
    
    if not filename:
        return {"Error": "Invalid file type.", "status": 500}
    
    mime_type = mimetypes.guess_type(filename)[0]

    if not mime_type:
        return {"Error": "Can't resolve file type.", "status": 500}
    
    file_path = os.path.join("./uploads", filename)
    file.save(file_path)

    if isImage:
        document = process_document_sample(project_id, location, processor_id, file_path, mime_type)
        return convert_to_json(document)
    else:
        document = transcribe_model_selection(file_path)
        return convert_to_json(document)
    