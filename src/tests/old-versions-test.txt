import path from "path";
import { fork } from "child_process";

const DEBUG_MODE = process.env.DEBUG_VERSIONS_TEST;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe("Testing the test versions #meta", () => {
  let jestOut;
  // beforeAll(done => {
  //   // const res = jest.runCLI(["--json", "--config", JSON.stringify(jestConfig)]);
  //   const res = jest.runCLI(
  //     { runInBand: true, config: jestConfig, json: true, silent: true },
  //     [""],
  //     success => {
  //       console.log(success);
  //       done();
  //     }
  //   );
  // });
  beforeAll(done => {
    console.log("Running `./runJest.js`...");
    const forkSettings = DEBUG_MODE
      ? {}
      : {
          silent: true,
          env: { CI: true }
        };

    const child = fork(path.join(__dirname, "./runJest.js"), [], forkSettings);

    const stdOuts = [];

    if (DEBUG_MODE) {
      child.stderr.on("data", data => {
        console.log(data.toString());
      });
    }

    child.stdout.on("data", data => {
      stdOuts.push(data);
    });

    child.on("exit", code => {
      const jestReportStart = /(^\{\s+\"numFailedTestSuites\"\:)/;
      const jestReportEnd = /(^\s+wasInterrupted\:\s+(false|true)\s+\})/;

      const out = stdOuts.map(o => o.toString()).join();

      const [a, b, c] = out.split(jestReportStart);
      let jestChunk, _rest;
      if (b === undefined) {
        [jestChunk, _rest] = a.split(jestReportEnd);
      } else {
        [jestChunk, _rest] = b.split(jestReportEnd);
      }
      console.log(jestChunk);
      // const [jestChunk, _rest] = chunkStart.split(jestReportEnd);

      // const jestReportBegFound = false;
      // stdOuts.reverse().forEach(buf => {
      //   if (!jestReportBegFound) {
      //     const chunk = buf.toString();
      //     out = chunk + out;
      //     if (jestReportStart.test(chunk)) {
      //       jestReportBegFound = true;
      //     }
      //   }
      // });

      jestOut = JSON.parse(jestChunk);

      console.log(jestOut);

      done();
    });

    // (error, stdout, stderr) => {
    //   console.log(stdout);
    //   if (error !== null) {
    //     console.log("exec error: " + error);
    //     fail(`Error in beforeAll() cmd execution: ${error}`);
    //   }
    //   if (DEBUG_MODE) {
    //     console.log(stderr);
    //   }

    //   done();
    // }
    // );
  });

  it("should behave...", () => {
    console.log("here");
  });
});
