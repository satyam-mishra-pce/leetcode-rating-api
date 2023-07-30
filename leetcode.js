const fetch = require("cross-fetch");

//graphql query
const query = `
    query userContestRankingInfo($username: String!) {
        userContestRankingHistory(username: $username) {
            rating
            ranking
            contest {
                title
                startTime
            }
            finishTimeInSeconds

        }
    }
`


// format data 
const formatData = (data) => {
    const historyObjects = data.userContestRankingHistory;
    for (let i = 0; i < historyObjects.length; i++) {
      if (historyObjects[i].ranking != 0) {
        historyObjects.splice(0, Math.max(i - 1, 0));
        break;
      }
    }
    return historyObjects;
  
}

//fetching the data
exports.leetcode = (req, res) => {
    let user = req.params.id;
    fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        }, 
        body: JSON.stringify({query: query, variables: {username: user}, operationName: "userContestRankingInfo"}),
    
    })
    .then(result => result.json())
    .then(data => {
      if(data.errors){
        res.send(data);
      }else {
        res.send(formatData(data.data));
      }
    })
    .catch(err=>{
        console.error('Error', err);
        res.send(err);
    });
}
