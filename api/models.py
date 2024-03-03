import vertexai
from vertexai.preview.generative_models import GenerativeModel
import vertexai.preview.generative_models as generative_models

PROMPT = '''
            make flashcards based on the the following lecture notes as a comma separated list of {"term": "value", "description": "value"} items in json format, but don't include sqaure [] brackets around the list
         '''

def generate_flashcards(notes):
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
    