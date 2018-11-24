const utils = require('./utils/utils')

const { verifyAndCreateInstance, verifyPullRequestBranch } = utils

// This is the entry point for your Probot App.
// @param {import('probot').Application} app - Probot's Application class.

module.exports = app => {
  // Logging the start
  app.log('Alright people, we\'re functional!, Let\' do this')

  // Triggered when a Pull Request is Opened or Reopened
  app.on(['pull_request.opened', 'pull_request.reopened'], async context => {
    verifyPullRequestBranch(context)
  })

  app.on(['issue_comment.created'], async context => {
    verifyAndCreateInstance(context)
  })
}
