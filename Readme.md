# Leetcode Rating API
### Forked from: https://github.com/faisal-shohag/leetcode_api

This API is used to get the User Rating since the first contest attended to the latest contest organized by LeetCode. The API is built over another API, which can get other user data.


## How it works
LeetCode provides graphql query API. This is public AOI. But querying graphql little bit messy. This is a part of the query as intercepted when Leetcode requests for data when loading a user profile page:
```
    query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
                name
            }
        }
        userContestRankingHistory(username: $username) {
            attended
            trendDirection
            problemsSolved
            totalProblems
            finishTimeInSeconds
            rating
            ranking
            contest {
                title
                startTime
            }
        }
    }
```

But, I have trimmed down the query to return only the rating data. Once the data is fetched by the API, it further trims the data, to get only the contests from the first contest attended by the user, to the latest contest organized.
Check the [leetcode.js](https://github.com/satyam-mishra-pce/leetcode-rating-api/blob/master/leetcode.js) file to see how the data was fetched by fetch api.

## Using the API:
### Localhost

#### Setting Up
1. Clone the Repository on your local system.
2. Make sure that node.js is installed.
3. Install the required dependencies by running `npm install` while you are in the root directory.
4. Once installed, run the server by running `node app.js`.
5. You will get a message in the console, about the successfull deployment of the localhost server.

#### Calling the API
You can make a fetch request using javascript to the localhost:
```
const response = await fetch("http://localhost:3000/<user-name>");
console.log(response);
```

### Deployed API

#### Calling the API
You can make a fetch request using javascript to the server (leetcode-rating-api.glitch.me).:
```
const response = await fetch("http://leetcode-rating-api.glitch.me/<user-name>");
console.log(response);
```
⚠️⚠️⚠️ **Note:** ⚠️⚠️⚠️

The server takes a few seconds to wake up. Once the wake is completed, the server remains active for next 5 minutes. The response time when the server is awake is 1.8 seconds on average.


## Response:

The response is in the format:
```
[
  {
    "rating": 1500,
    "ranking": 0,
    "contest": {
      "title": "Weekly Contest 315",
      "startTime": 1665887400
    },
    "finishTimeInSeconds": 0
  },
  {
    "rating": 1478.774,
    "ranking": 11556,
    "contest": {
      "title": "Weekly Contest 316",
      "startTime": 1666492200
    },
    "finishTimeInSeconds": 1534
  }
  //...
]
```
