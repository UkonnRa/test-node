import { UserDAO, logger, RecordItemDAO, UserTagPO } from "@test-node/backend-core";

(async () => {
  try {
    await UserDAO.sync({ force: true });
    await RecordItemDAO.sync({ force: true });
    await UserTagPO.sync({ force: true });
    const jane = await UserDAO.create({ firstName: "Jane", lastName: "Doe" });
    await UserTagPO.bulkCreate([
      { userId: jane.id, tag: "tag1" },
      { userId: jane.id, tag: "tag2" },
      { userId: jane.id, tag: "tag3" },
    ]);
    const item = await RecordItemDAO.create({ amount: 10 });
    logger.info("User is created: ", { user: jane.toJSON() });
    logger.info("  item: ", { item: item.toJSON() });

    for (const tag of await jane.getTags()) {
      logger.info("UserId: " + tag.userId);
      logger.info("User: " + (await tag.getUser())?.firstName);
      logger.info("Tag: " + tag.tag);
      logger.info("=======");
    }
  } catch (e) {
    logger.error("Error: " + e);
  }
})();
