

const clientID = "UWWIORSH0WIMJXSYCCALKZ0PCO2PHHLA0JJS2VD22LMWMWBT";
const clientSECRET = "UCWLVB1HQ2C12G5TWAHTHUGSAUWW1MPQY3FWRGTQKUZG1YHP";
const URL = "https://api.foursquare.com/v2/venues/search?limit=1&v=20180101&client_id=" + clientID + "&client_secret=" + clientSECRET + "&ll=";
export const foursquareApi = (lat, lng) =>
    fetch(URL + lat + "," + lng, {})
        .then(res => res.json())
        .then(data => data);