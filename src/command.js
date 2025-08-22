import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// this app creates new cli api called ntt
// this new ntt api will have a new command
// called curl which will have one argumeny
// called url
// this would enable to use it in the cli as
// ntt curl url_param
// for example ntt curl "google.com"
// https://scottmoss.notion.site/Using-yargs-0727dfad1fa647848984e317d40d4cbd
yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "creates new note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "the content of the note to create",
      });
    },
    (argv) => {
      console.log("hello:", argv.note);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add to the note",
  })
  .demandCommand(1) // this means you need to use ntt with a command name - ntt curl for example
  .parse(); // this just means go and execute
