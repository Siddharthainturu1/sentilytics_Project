import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { post } from 'aws-amplify/api';
import { withAuthenticator, Button, Heading, TextAreaField, View, Card, Text, Loader, Badge } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!textInput) return;
    setLoading(true);

    try {
      const restOperation = post({
        apiName: 'sentilyticsAPI',
        path: '/analyze',
        options: {
          body: { text: textInput }
        }
      });

      const response = await restOperation.response;
      const data = await response.body.json();

      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert("Error analyzing text. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to pick color based on sentiment
  const getBadgeColor = (sentiment) => {
    switch (sentiment) {
      case 'POSITIVE': return 'success'; // Green
      case 'NEGATIVE': return 'error';   // Red
      case 'NEUTRAL': return 'info';     // Blue
      case 'MIXED': return 'warning';    // Orange
      default: return 'info';
    }
  };

  return (
    <View style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <Heading level={1} style={{ marginBottom: '1rem' }}>🧠 Sentilytics</Heading>
      <Text>Welcome, <b>{user.username}</b></Text>
      <Button onClick={signOut} size="small" variation="link">Sign Out</Button>
      
      <Card variation="elevated" style={{ marginTop: '20px', textAlign: 'left' }}>
        <TextAreaField
          label="What's on your mind?"
          placeholder="Type something here (e.g., 'I am so happy' or 'This is terrible')"
          rows={5}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <Button 
          variation="primary" 
          isFullWidth={true}
          style={{ marginTop: '15px' }}
          onClick={analyzeSentiment}
          isDisabled={loading}
        >
          {loading ? <Loader /> : "Analyze Sentiment"}
        </Button>
      </Card>

      {result && (
        <Card 
          variation="outlined" 
          style={{ 
            marginTop: '20px', 
            // Dynamic Background Color (Light Red for negative, Light Green for positive)
            backgroundColor: result.sentiment === 'NEGATIVE' ? '#fff5f5' : (result.sentiment === 'POSITIVE' ? '#f4fbf4' : '#f0faff'),
            // Dynamic Border Color
            borderColor: result.sentiment === 'NEGATIVE' ? 'red' : (result.sentiment === 'POSITIVE' ? 'green' : 'blue')
          }}
        >
          <Heading level={3} style={{ 
            color: result.sentiment === 'NEGATIVE' ? 'red' : (result.sentiment === 'POSITIVE' ? 'green' : 'blue'),
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {/* Show an icon based on result */}
            {result.sentiment === 'POSITIVE' ? '😊 ' : (result.sentiment === 'NEGATIVE' ? '😡 ' : '😐 ')}
            {result.sentiment}
          </Heading>
          
          <div style={{ marginTop: '10px' }}>
            <Badge variation={getBadgeColor(result.sentiment)}>
              Confidence: {Math.max(result.scores.Positive, result.scores.Negative, result.scores.Neutral, result.scores.Mixed).toFixed(2) * 100}%
            </Badge>
          </div>

          <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#555' }}>
             {/* Show detected entities if they exist (Bonus Feature) */}
             {result.entities && result.entities.length > 0 && (
                <Text><b>Entities Found:</b> {result.entities.join(", ")}</Text>
             )}
          </div>
        </Card>
      )}
    </View>
  );
}

export default withAuthenticator(App);