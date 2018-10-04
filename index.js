
// This is the entry point for your Probot App.
// @param {import('probot').Application} app - Probot's Application class.

module.exports = app => {

  // Logging the start
  app.log('Alright people, we\'re functional!, Let\' do this');

  // Triggered when a Pull Request is Opened or Reopened
  app.on(['pull_request.opened', 'pull_request.reopened'], async context => {
    verify_pr_branch(context);
  });

  /**
   * This function verifies the branch on which the pull request was sent,
   * and if it is one of staging or master, immediately closes it to prevevnt
   * incorrect merges. It comments the correct branch on which the PR is 
   * supposed to be opened with a link to creating one as well!
   *
   * @param {Object} context Object sent in by the github webhook
   */
  let verify_pr_branch = (context) => {
    const pr_on_branch  = context.payload.pull_request.base.ref;

    const incorrect_to_correct_branch_map = {
      staging : 'staging-fixes',
      master  : 'hotfix'
    };

    if ( pr_on_branch in incorrect_to_correct_branch_map ){

      const pr_creator        = context.payload.pull_request.user.login;
      const correct_pr_branch = incorrect_to_correct_branch_map[pr_on_branch];

      const org_name       = context.payload.pull_request.base.user.login;
      const repo_name      = context.payload.pull_request.base.repo.name;
      const pr_from_repo   = context.payload.pull_request.head.user.login;
      const pr_from_branch = context.payload.pull_request.head.ref;

      const new_pr_url        = `https://github.com/${org_name}/${repo_name}/compare/`+
      `${correct_pr_branch}...${pr_from_repo}:${pr_from_branch}?expand=1`;

      const pull_request_comment = context.issue({ body: `Hey @${pr_creator} Thanks ` + 
        `for opening a Pull Request! \nHowever we do not accept PRs on the ` + 
        `\`${pr_on_branch}\` branch. Please open the PR on the \`${correct_pr_branch}\` ` + 
        `branch. \n\n You may click [here](${new_pr_url}) to do the same! \n` +
        `cc: @frappe/release-team ` });

      context.github.issues.createComment(pull_request_comment);
      context.github.issues.edit(context.issue({state: "closed"}));

      return
    }
  }
}

