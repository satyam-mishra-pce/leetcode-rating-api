//graphql query
const query = `
  query contestRatingHistogram {
  contestRatingHistogram {
    userCount
    ratingStart
    ratingEnd
    topPercentage
  }
}
`;


// format data 
const formatData = (data) => {
    let sendData =  {
        receivedData: data
    }
    return sendData;
}

//fetching the data
exports.leetcode = (req, res) => {
    fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com/satyam_mishra13/'
        }, 
        body: JSON.stringify({query: query}),
    
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
