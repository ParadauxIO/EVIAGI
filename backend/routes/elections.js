var express = require('express');
var router = express.Router();

// TODO add the middlewere

// /election
router.get('/', (req, res, next) => {
  res.status(404);
  res.json({
    error: 1,
    message: "invalid-path"
  })
});

router.post('/create', (req, res, next) => {
    // Needs an auth token
    
    // Verify the body contains the necessary fields

    // Put it to the db
})


router.get('/:electionId', (req, res, next) => {
    const {electionId} = req.params;
    console.log(`getting election: ${electionId}`)

    // is valid UUID
})

router.delete('/:electionId', (req, res, next) => {
    const {electionId} = req.params;
    console.log(`deleting election: ${electionId}`)
    // is valid UUID
})


module.exports = router;
