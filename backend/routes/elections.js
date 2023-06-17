var express = require('express');
var router = express.Router();
// /election
router.get('/', (req, res, next) => {
  res.status(404);
  res.json({
    error: 1,
    message: "invalid-path"
  })
});

router.post('/', (req, res, next) => {

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
