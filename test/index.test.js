
const { Application } = require('probot')
// Requiring our app implementation
const myProbotApp = require('..')

const pullRequestToDevelopPayLoad = require('./fixtures/pull_request_to_develop.json')
const pullRequestToMasterPayLoad = require('./fixtures/pull_request_to_master.json')
const pullRequestToStagingPayLoad = require('./fixtures/pull_request_to_staging.json')

const issueCommentCreatedPayLoad = require('./fixtures/issue_comment_created.json')

test('that we can run tests', () => {
  // your real tests go here
  expect(1 + 2 + 3).toBe(6)
})

describe('My Probot app', () => {
  let app, github

  beforeEach(() => {
    app = new Application()
    // Initialize the app based on the code from index.js
    app.load(myProbotApp)
    // This is an easy way to mock out the GitHub API
    github = {
      issues: {
        createComment: jest.fn().mockReturnValue(Promise.resolve({})),
        update: jest.fn().mockReturnValue(Promise.resolve({}))
      }
    }
    // Passes the mocked out GitHub API into out app instance
    app.auth = () => Promise.resolve(github)
  })

  test('does nothing when PR opened on develop', async () => {
    // Simulates delivery of an pull_request.opened webhook
    await app.receive({
      name: 'pull_request.opened',
      payload: pullRequestToDevelopPayLoad
    })
  })

  test('creates a comment and closes PR when its opened on master', async () => {
    // Simulates delivery of an pull_request.opened webhook
    await app.receive({
      name: 'pull_request.opened',
      payload: pullRequestToMasterPayLoad
    })

    // This test passes if the code in your index.js file calls `context.github.issues.createComment`
    expect(github.issues.createComment).toHaveBeenCalled()
    expect(github.issues.update).toHaveBeenCalled()
  })

  test('creates a comment and closes PR when its opened on staging', async () => {
    // Simulates delivery of an pull_request.opened webhook
    await app.receive({
      name: 'pull_request.opened',
      payload: pullRequestToStagingPayLoad
    })

    // This test passes if the code in your index.js file calls `context.github.issues.createComment`
    expect(github.issues.createComment).toHaveBeenCalled()
    expect(github.issues.update).toHaveBeenCalled()
  })

  test('checkout to a PR', async () => {
    await app.receive({
      name: 'issue_comment.created',
      payload: issueCommentCreatedPayLoad
    })

    // This test passes if the code in your index.js file calls `context.github.issues.createComment`
    expect(github.issues.update).toHaveBeenCalled()
  })
})

// For more information about testing with Jest see:
// https://facebook.github.io/jest/
