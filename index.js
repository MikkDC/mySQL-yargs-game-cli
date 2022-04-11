require("dotenv").config();
require("./connection");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const { Game, Developer } = require("./Models/gameModel");

(async () => {
  try {
    await Developer.sync({ alter: true });
    await Game.sync({ alter: true });

    // ADDing an entry --add --title "" --dev ""
    // note: --title is REQUIRED to be able to add an entry
    if (argv.add) {
      const developer = {
        developer: argv.dev,
      };
      await Developer.create(developer);

      const game = {
        title: argv.title,
      };
      await Game.create(game);

      // list lists entries in DB
    } else if (argv.list) {
      {
        const listResult = await Game.findAll({ title: argv.title });
        console.log(listResult);
      }

      // update lets the user update an entry
      // eg, --update --title "" --newtitle "" updates title
      // eg2, --update --dev "" --newdev "" updates the developer
    } else if (argv.update) {
      if (argv.title) {
        await Game.update(
          { title: argv.newtitle },
          { where: { title: argv.title } }
        );
        console.log(`Game title updated to ${argv.newtitle}`);
      } else if (argv.dev) {
        await Developer.update(
          { developer: argv.newdev },
          { where: { developer: argv.dev } }
        );
        console.log(`Developer updated to ${argv.newdev}`);
      }
      // Deletes one entry from the data base
      // Usage: --delete --title ""
    } else if (argv.delete) {
      await Game.destroy(
        { where: { title: argv.title } }
      );
      console.log(`Game ${argv.title} deleted`);
    } else {
      console.log("Command not recognised");
    }
  } catch (error) {
    console.log(error);
  }
})();
