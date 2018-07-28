/* global gapi:false */

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

let lazyPromise = null;

export function gapiAsync() {
    return lazyPromise = lazyPromise || new Promise((resolve) => {
        const gapiScript = document.createElement('script');
        gapiScript.src = 'https://apis.google.com/js/api.js';
        gapiScript.onload = () => {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES
                }).then(function () {
                    resolve(gapi);
                });
            });
        };
        document.body.appendChild(gapiScript)
    })
}
