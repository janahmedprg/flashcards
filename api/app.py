from flask import Flask
from flask_cors import CORS
from flask import request

import vertexai
from vertexai.preview.generative_models import GenerativeModel, Part
import vertexai.preview.generative_models as generative_models

from google.api_core.client_options import ClientOptions
from google.cloud.speech_v2 import SpeechClient
from google.cloud.speech_v2.types import cloud_speech

app = Flask(__name__)
CORS(app)

@app.route("/test")
def test():
    return {"Test": "bruh"}

@app.route("/generate_flashcards", methods=["POST"])
def generate_flashcards():
    vertexai.init(project="shaped-terrain-416020", location="us-east4")
    model = GenerativeModel("gemini-1.0-pro-vision-001")
    responses = model.generate_content(
        [request.form["notes"]],
        generation_config={
            "max_output_tokens": 2048,
            "temperature": 0.4,
            "top_p": 1,
            "top_k": 32
        },
        safety_settings={
              generative_models.HarmCategory.HARM_CATEGORY_HATE_SPEECH: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
              generative_models.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
              generative_models.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
              generative_models.HarmCategory.HARM_CATEGORY_HARASSMENT: generative_models.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        stream=True,
    ) 
    res = ""
    for response in responses:
        res += response.text
    return {"out": res}


@app.route("/translate_audio", methods=["POST"])
def transcribe_chirp():
    """Transcribe an audio file using Chirp."""
    # Instantiates a client
    client = SpeechClient(
        client_options=ClientOptions(
            api_endpoint="us-central1-speech.googleapis.com",
        )
    )

    # Reads a file as bytes
    with open(response.files["audio_file"], "rb") as f:
        content = f.read()

    config = cloud_speech.RecognitionConfig(
        auto_decoding_config=cloud_speech.AutoDetectDecodingConfig(),
        language_codes=["en-US"],
        model="chirp",
    )

    request = cloud_speech.RecognizeRequest(
        recognizer=f"projects/shaped-terrain-416020/locations/us-central1/recognizers/_",
        config=config,
        content=content,
    )

    # Transcribes the audio into text
    response = client.recognize(request=request)

    for result in response.results:
        print(f"Transcript: {result.alternatives[0].transcript}")

    return response
