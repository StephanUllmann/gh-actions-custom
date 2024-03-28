const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
  // Get input values
  const bucket = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: true });

  // Upload files to S3 with an aws cli command
  const s3Uri = `s3://${bucket}`;

  // AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
  // will be looked up in the env - set it in workflow.yml;

  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);
  //
  // core.notice('Hello from my JS Action!');
  const websiteURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

  core.setOutput('website-url', websiteURL);
}

run();
