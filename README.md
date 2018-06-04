# blockchain-events-aggregator
A tool that displays a feed of events in SF from multiple platforms (currently just Eventbrite, but will include Facebook Events and meetup.com)

# installation
- Install dependencies: npm install
- Start Webpack in Dev mode: npm run dev
- Start server: npm start
- To start, in your browser navigate to: http://localhost:3000

# overview
- Given that my friends and I are interested in the blockchain, I made a blockchain events aggregation app to help us find events distributed in multiple platforms all in one place
- I.e. instead of going to Eventbrite, FB, Meetup.com, or getting fragmented results from google searches to check for blockchain events, users can just get all this info in one place

# functionality
- The project currently just lists the events with a clickable link of the event from one source, Eventbrite. I am planning to integrate with Facebook's Graph API next, which will have a wealth of events.

# future plans
- I plan to integrate my friends project into this service. His project is a text-message reminder app, to solve the problem of ignoring email reminders (the assumption is that more people prioritize text messages of emails, which I agree with).
- To integrate this into my project, I plan to render buttons for each of the events that will enable users to remind themselves anytime before the event they will attend will start