const homeRouter = require('express').Router();
const express = require('express');

//// ** load home page ** ////
homeRouter.get('/', (req, res) => {
  res.render('home');
}
);

module.exports = homeRouter;

