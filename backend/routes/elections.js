const express = require('express');
const { isValidDate } = require('../utils/dateUtils');
const { authenticateUserMiddleware } = require('../middlewere/supabase-user');
const { supabase } = require('../utils/supabase')
const router = express.Router();

router.get('/', authenticateUserMiddleware, async (req, res, next) => {
  let {data, error} = await supabase.from("eviagi_elections")
    .select()
    .eq("organiser_id", req.user.sub);

  if (error) {
   res.status(400);
   res.json(error); 
  }

  res.json(data);
});

router.post('/create', authenticateUserMiddleware, async (req, res, next) => {
  let error;

  if (req.user.aud !== "authenticated") {
    error = "Invalid user."
  }

  let form = req.body;
  form.opens = new Date(form.opens);
  form.closes = new Date(form.closes);

  // Needs an auth token
  console.log(req.user)


  // Verify the body contains the necessary fields
  if (form.name.length === 0) {
    error = "Invalid name.";
  }

  if (form.description.length === 0) {
    error = "Invalid description.";
  }

  if (form.usesConstituencies && form.constituencies.length > 0) {
    error = "Cannot specify constituencies when useConstituencies is disabled.";
  }

  if (!isValidDate(form.opens)) {
    error = "Invalid opening time";
  }

  if (!isValidDate(form.closes)) {
    error = "Invalid closing time";
  }

  if (form.closes < form.opens) {
    error = "Cannot have a closing time before the opening time.";
  }

  if (error) {
    res.status(400);
    res.json({ error })
  }

  let { data, error: supabaseError } = await supabase
    .from("eviagi_elections")
    .insert({
      organiser_id: req.user.sub,
      opens: form.opens,
      closes: form.closes,
      voting_method: form.votingMethod,
      secret_ballot: form.isSecretBallot,
      has_reopen_nominations: form.hasReopenNominations,
      uses_constituencies: form.usesConstituencies,
      valid_constituencies: form.constituencies,
      name: form.name,
      description: form.description
    })

  if (supabaseError) {
    res.status(400);
    res.json(supabaseError);
    return;
  }

  res.status(201);
  res.json({ success: "Created election." })
  // Put it to the db
})


router.get('/:electionId', authenticateUserMiddleware, async (req, res, next) => {
  const { electionId } = req.params;
  let {data, error} = await supabase.from("eviagi_elections")
    .select()
    .eq("organiser_id", req.user.sub)
    .eq("election_id", electionId);

  if (error) {
   res.status(400);
   res.json(error); 
  }

  res.json(data);
})

router.delete('/:electionId', authenticateUserMiddleware, async (req, res, next) => {
  const { electionId } = req.params;
  let {error} = await supabase.from("eviagi_elections")
    .delete()
    .eq("organiser_id", req.user.sub)
    .eq("election_id", electionId);

  if (error) {
   res.status(400);
   res.json(error); 
  }

  res.json({success: "Deleted election: " + electionId});
})


module.exports = router;
