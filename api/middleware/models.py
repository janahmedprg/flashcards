import json
import vertexai
from vertexai.preview.generative_models import GenerativeModel
import vertexai.preview.generative_models as generative_models

project_id = "shaped-terrain-416020"
location = "us" 
processor_id = "cf55c390fb0f1cd7" 

from typing import Optional

from google.api_core.client_options import ClientOptions
from google.cloud import documentai

from google.cloud import speech

PROMPT = '''
            make flashcards based on the the following lecture notes as a comma separated list of {"term": "value", "description": "value"} items in json format, but don't include sqaure [] brackets around the list
         '''

# 
def generate_flashcards(notes):
    """Generates a list of flash cards from provided notes as a string via Gemini generative model."""
    vertexai.init(project="shaped-terrain-416020", location="us-east4")
    model = GenerativeModel("gemini-1.0-pro-vision-001")
    response = model.generate_content(
        [PROMPT, notes],
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
        stream=False,
    ) 
    
    res = '[' + response.text + ']'
    return res

# Model retrieved from https://cloud.google.com/document-ai/docs/samples/documentai-process-document?hl=en
def process_document_sample(
    project_id: str,
    location: str,
    processor_id: str,
    file_path: str,
    mime_type: str,
    field_mask: Optional[str] = None,
    processor_version_id: Optional[str] = None,
):
    """Converts given file to a string literal using the document-ai model."""
    # You must set the `api_endpoint` if you use a location other than "us".
    opts = ClientOptions(api_endpoint=f"{location}-documentai.googleapis.com")

    client = documentai.DocumentProcessorServiceClient(client_options=opts)

    if processor_version_id:
        # The full resource name of the processor version, e.g.:
        # `projects/{project_id}/locations/{location}/processors/{processor_id}/processorVersions/{processor_version_id}`
        name = client.processor_version_path(
            project_id, location, processor_id, processor_version_id
        )
    else:
        # The full resource name of the processor, e.g.:
        # `projects/{project_id}/locations/{location}/processors/{processor_id}`
        name = client.processor_path(project_id, location, processor_id)

    # Read the file into memory
    with open(file_path, "rb") as image:
        image_content = image.read()

    # Load binary data
    raw_document = documentai.RawDocument(content=image_content, mime_type=mime_type)

    # For more information: https://cloud.google.com/document-ai/docs/reference/rest/v1/ProcessOptions
    # Optional: Additional configurations for processing.
    process_options = documentai.ProcessOptions(
        # Process only specific pages
        individual_page_selector=documentai.ProcessOptions.IndividualPageSelector(
            pages=[1]
        )
    )

    # Configure the process request
    request = documentai.ProcessRequest(
        name=name,
        raw_document=raw_document,
        field_mask=field_mask,
        process_options=process_options,
    )

    result = client.process_document(request=request)

    # For a full list of `Document` object attributes, reference this page:
    # https://cloud.google.com/document-ai/docs/reference/rest/v1/Document
    document = result.document

    return document.text

# model retrieved from https://cloud.google.com/speech-to-text/docs/samples/speech-transcribe-model-selection?hl=en
def transcribe_model_selection(
    speech_file: str,
) -> speech.RecognizeResponse:
    """Transcribe the given audio file synchronously with
    the selected model."""
    client = speech.SpeechClient()

    with open(speech_file, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED,
        language_code="en-US",
    )

    response = client.recognize(config=config, audio=audio)

    return response.results[0].alternatives[0].transcript

def convert_to_json(document):
    """Converts provided string to JSON format."""
    try: 
        cards = json.loads(generate_flashcards(document))
    except:
        return ""
    return cards