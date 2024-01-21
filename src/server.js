const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');
const cors = require('cors');

const typeDefs = gql`
type Query {
    findPlaceByName(input: String!, apiKey: String!): PlaceResult
  }
  
  type PlaceResult {
    candidates: [Place]
    status: String
  }
  
  type Place {
    formatted_address: String
    geometry: Geometry
    name: String
    opening_hours: Hours
    rating: Float
  }
  
  type Geometry {
    location: Location
    viewport: Viewport
  }
  
  type Location {
    lat: Float
    lng: Float
  }
  
  type Viewport {
    northeast: Location
    southwest: Location
  }
  
  type Hours {
    open_now: Boolean
  }

`;



const resolvers = {
    Query: {

      findPlaceByName: async (_, { input, apiKey }) => {

        //const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&key=AIzaSyBzxmHTkERSiiHFwiRkrfjEuUYU_GtX2fk`;
        
        // const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,name,rating,\
        // opening_hours,geometry&input=${encodeURIComponent(input)}&inputtype=textquery&key=${apiKey}`;

        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address,name,rating,opening_hours,geometry&input=${encodeURIComponent(input)}&inputtype=textquery&locationbias=circle:56327@40.7128,-74.0060&key=AIzaSyBzxmHTkERSiiHFwiRkrfjEuUYU_GtX2fk`

        try {
          const response = await fetch(url);
            
          console.log(response);

          const data = await response.json();
            
          return { candidates: data.candidates || [] };

        } catch (error) {
          console.error("Error fetching data: ", error);
          throw new Error("Error fetching data");
        }
      },
    },
  };
  

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use(cors());

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    // Start the Express server
    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}/graphql`);
    });
}
  
startServer();
