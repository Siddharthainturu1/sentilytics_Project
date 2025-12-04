import json
import boto3

# The 'boto3' library is the tool Python uses to talk to AWS services
comprehend = boto3.client('comprehend')

def handler(event, context):
    try:
        # 1. Get the text the user typed from the "body" of the request
        # We expect the frontend to send data like: {"text": "I am happy"}
        body = json.loads(event['body'])
        user_text = body.get('text', '')

        if not user_text:
            return {
                'statusCode': 400,
                'body': json.dumps('No text provided!')
            }

        # 2. Ask Amazon Comprehend to analyze sentiment
        response = comprehend.detect_sentiment(
            Text=user_text,
            LanguageCode='en' # We assume English for now
        )

        # 3. Extract the result (e.g., "POSITIVE")
        sentiment = response['Sentiment']
        scores = response['SentimentScore']

        # 4. Send the answer back to the frontend
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*", # Allow anyone to call (simplified for dev)
                "Access-Control-Allow-Headers": "*"
            },
            'body': json.dumps({
                'sentiment': sentiment,
                'scores': scores
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Error: {str(e)}")
        }