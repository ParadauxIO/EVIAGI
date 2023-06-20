const express = require('express');
const { supabase } = require('../utils/supabase')
const router = express.Router();

router.get(`/election/:electionId`, async (req, res, next) => {
    const {electionId} = req.params;
    const {data, error} = await supabase
                .from("eviagi_elections")
                .select("election_id, name, description")
                .eq('election_id', electionId);

    if (error) {
        res.status(400);
        res.json(error);
    }

    res.json(data);
});

router.get('/election/:electionId/candidates', async (req, res, next) => {
    const { electionId } = req.params;
    let { data, error } = await supabase.from("eviagi_candidates")
      .select()
      .eq("election_id", electionId);
  
    if (error) {
      res.status(400);
      res.json(error);
    }
  
    res.json(data);
  })

module.exports = router;
