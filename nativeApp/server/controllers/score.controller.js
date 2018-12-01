const Score = require('../models/score.model');

exports.get = (req, res, next)=>{
    let q = Score.find();
    q.exec((err, scores)=>{
      if(err){
        return res.status(500).send(err);
      }
      console.log("here"+ scores);
      res.send(scores);
    });
}

exports.add = (req, res, next)=>{
    let newscore = new Score({name:req.body.name, score:req.body.score});

    newscore.save(err=>{
        if(err) return res.status(500).send(err);
        res.send('nice job kiddo');
    })
}