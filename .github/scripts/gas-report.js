const fs = require("fs")
const path = require("path")

module.exports = async ({ github, context, header }) => {
    const gasReportPath = path.resolve("gasReport.md")
    const body = fs.existsSync(gasReportPath) ? fs.readFileSync(gasReportPath, "utf8") : "Gas report not found"

    const comment = [header, body].join("\n")

    const { data: comments } = await github.rest.issues.listComments({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.payload.pull_request.number,
    })

    const botComment = comments.find(
        (comment) =>
            // github-actions bot user
            comment.user.type === "Bot" &&
            comment.user.login === "github-actions[bot]" &&
            comment.body.startsWith(header)
    )

    const commentFn = botComment ? "updateComment" : "createComment"

    await github.rest.issues[commentFn]({
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: comment,
        ...(botComment ? { comment_id: botComment.id } : { issue_number: context.payload.pull_request.number }),
    })
}
