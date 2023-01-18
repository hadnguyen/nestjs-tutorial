// eslint-disable-next-line @typescript-eslint/no-var-requires
const cluster = require('cluster');
import * as os from 'os';

export function runInCluster(bootstrap: () => Promise<void>) {
  const numberOfCores = os.cpus().length;
  if (cluster.isPrimary) {
    for (let i = 0; i < numberOfCores; i++) {
      cluster.fork();
    }
  } else {
    bootstrap();
  }
}
