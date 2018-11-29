
module.exports = {

/**
 * This function verifies the branch on which the pull request was sent,
 * and if it is one of staging or master, immediately closes it to prevevnt
 * incorrect merges. It comments the correct branch on which the PR is
 * supposed to be opened with a link to creating one as well!
 *
 * @param {Object} context Object sent in by the github webhook
 */
  verifyPullRequestBranch: (context) => {
    let invalidBranchesForPullRequest = ['master', 'staging']
    const baseBranch = context.payload.pull_request.base.ref

    if (invalidBranchesForPullRequest.includes(baseBranch)) {
      const invalidToValidBranchMapping = {
        staging: 'staging-fixes',
        master: 'hotfix'
      }

      const pullRequestCreator = context.payload.pull_request.user.login
      const validBranch = invalidToValidBranchMapping[baseBranch]

      const baseOrgName = context.payload.pull_request.base.user.login
      const baseRepoName = context.payload.pull_request.base.repo.name
      const headOrgName = context.payload.pull_request.head.user.login
      const headRepoName = context.payload.pull_request.head.ref

      const validPullRequestURL = `https://github.com/${baseOrgName}/${baseRepoName}/compare/` +
    `${validBranch}...${headOrgName}:${headRepoName}?expand=1`

      const pullRequestComent = context.issue({ body: `Hey @${pullRequestCreator} Thanks ` +
      `for opening a Pull Request! \nHowever we do not accept PRs on the ` +
      `\`${baseBranch}\` branch. Please open the PR on the \`${validBranch}\` ` +
      `branch. \n\n You may click [here](${validPullRequestURL}) to do the same! \n` +
      `cc: @frappe/release-team ` })

      context.github.issues.createComment(pullRequestComent)
      context.github.issues.update(context.issue({ state: 'closed' }))
    }
  },

  verifyAndCreateInstance: (context) => {
    const request = require('request')
    const config = require('./config').get_config()
    const main_site = config.main_site
    console.log(main_site)
    console.log(context)
    request.post({url: main_site + `/api/method/prbot.prbot.doctype.prbot_bench.prbot_bench.issue_comment_created`, form: {context: JSON.stringify(context)}})

    // // Incase we come back to JS
    // const config = require('./config').get_config()
    // const user = context.payload.issue.user.login
    // const comment = context.payload.comment.body

    // if (!config.allowed_users.includes(context.comment.user.login)) return
    // if (!comment === '@frappe-bot create instance') return

    // const bench = getFreeBench()
  }

}
