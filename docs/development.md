# Development

This integration uses the
[Salesforce API](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_rest_resources.htm)
for collecting data.

## Prerequisites

Aside from what is documented in the [README](../README.md), no special tooling
is required to run and test this integration.

## Provider account setup

1. Create a free [developer account](https://developer.salesforce.com/signup)

2. Add a
   [Connected App](https://help.salesforce.com/articleView?id=sf.connected_app_create.htm&type=5)

- Ensure the following configurations are enabled:
- - Enable OAuth Settings (Checked)
- - Callback URL: 'https://login.salesforce.com/services/oauth2/success'
- - Policy : "Access and manage your data (api)" and "Perform requests on your
    behalf at any time (refresh_token, offline_access)"
- - Save consumer key and consumer secret

3. Get **Auth Code**: Using postman you can hit the API(POST) with:

   ```
   curl --location --request POST 'https://jupiterone2-dev-ed.lightning.force.com/services/oauth2/authorize?%0Aclient_id={CONSUMER_KEY}&%0Aredirect_uri=https://login.salesforce.com/services/oauth2/success&%0Aresponse_type=code' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   ```

   - Auth Code will be returned, make sure to url decode it

4. Get **Access/Refresh Token and Instance URL**: Using postman you can hit the
   API(POST) with:
   ```
   curl --location --request POST 'https://login.salesforce.com/services/oauth2/token' \
   --header 'Content-Type: application/x-www-form-urlencoded' \
   --data-urlencode 'grant_type=authorization_code' \
   --data-urlencode 'code={AUTH_CODE}' \
   --data-urlencode 'client_id={CONSUMER_KEY}' \
   --data-urlencode 'client_secret={CONSUMER_SECRET}' \
   --data-urlencode 'redirect_uri=https://login.salesforce.com/services/oauth2/success'
   ```

## Authentication

1. Copy .env.example to .env
2. Fill in the variables you got from the previous step

After following the above steps, you should be able to now invoke the
integration to start collecting data.
