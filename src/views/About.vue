<template>
  <v-container class="mt-4">
    <v-row>
      <v-col>
          <h1 class="text-h4"> About </h1>
          <v-row class="mb-7">
        <v-col class="m-0 p-0" v-for="item in items" :key="item.label">
          <a :href="item.link" style="text-decoration:inherit;" target="_blank">
            <v-btn color="primary" text dense >
              <v-icon>
               {{item.icon}}
              </v-icon>
              {{item.label}}
            </v-btn>
          </a>
        </v-col>
      </v-row>
   
        </v-col>
    </v-row>
    <v-row class="mt-2" >
      <v-col>
    <v-row>
      <v-col>
      <h2 class="text-h4"> <v-icon color="primary" x-large> mdi-information </v-icon> Info  </h2>
      <p>
        Project created by Priyanshu Ahuja for 
        <a href="https://futurereadytalent.in/" target="_blank"> Future Ready Talent Program. </a>
        <v-icon color="primary"> mdi-open-in-new </v-icon>
      </p>
      <p>
        Join this app either as a customer or delivery partner.
        Customer uploads their shopping list, which is picked up by a partner who shops on customer's behalf and delivers their order.
        
      </p>
      <p>
        Partners get tip (specified at the time of ordering) for their service.they can view and accept orders whithin 3km of their location.
      </p>
      <p>
        Same mobile number can be used for registering as a customer and partner, but a user must login as a customer or a partner at one time.
      </p>
    </v-col>
    </v-row>
  </v-col>

    </v-row>
    <v-row class="mt-2" >
      <v-col>
    <v-row>
      <v-col>
      <h2 class="text-h4"> ⚡  Deployment  </h2>
      <p>
        Frontend deployed using - <strong> Azure static webapps </strong>
      </p>
      <p>
        Backend Deployed using - <strong>Azure App service</strong>
      </p>
      <p>
        Cache used - <strong>redis cache for azure</strong> 
      </p>
     
    </v-col>
    </v-row>
  </v-col>

    </v-row>
     <v-row>
      <v-col>
      <h2 class="text-h4"> 🖥 Tech Stack  </h2>
      <p>
        <b> Frontend </b>: Vue.js, vuex, v-router, vuetify, jwt decode

      </p>
      <p>
        <b> Backend </b>: Express,node.js
      </p>
      <p>
        <b> Database </b>: MongoDB/CosmosDB/documentDB , Redis
      </p>
    </v-col>
    </v-row>

    <v-row>
      <v-col>
      <h2 class="text-h4"> 🤖 Technologies </h2>
      <p> 
        <b> JWT </b>: The app is an implementation of JWT along with refresh token and remote sign out
      </p>
      <p> 
        <b> GeoJSON </b>: Used for collecting orders with 3km of range.
      </p>
      <p>
        <b> Redis cache for Azure </b>: Stores refresh token
      </p>
       <p>
        <b> Geolocation Web api </b>: To determine customer's address and to find delivary partner's location for searching orders.
      </p>
     
    </v-col>
    </v-row>
  </v-container>
</template>

<script type="text/javascript">
    export default{
      name:'About',
      data(){
        return {
          items:[
              {
                icon:'mdi-microsoft-azure',
                label:'Backend Code',
                link:'https://github.com/Priyanshu-001/local_list'
              },
              {
                icon:'mdi-vuejs',
                label:'Frontend Code',
                link:'https://github.com/Priyanshu-001/local_list_frontend',
              },
              {
                icon:'mdi-link',
                label:'Backend Url',
                link:'https://locallistbackend.azurewebsites.net/',
              },
              {
                icon:'mdi-linkedin',
                label:'My linkedin',
                link:'https://www.linkedin.com/in/priyanshuahuja',
              }
          ]
        }
      }
    }
</script>