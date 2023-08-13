import {
  ACCOUNT_TYPES,
  AccountBO,
  AccountPO,
  JournalBO,
  JournalPO,
  logger,
  POS,
  UserBO,
} from "@test-node/backend-core";

(async () => {
  try {
    for (const po of POS) {
      await po.sync({ force: true });
    }

    const users = [...Array(5)].map(
      (_, i) =>
        new UserBO({
          name: `User ${i}`,
          isAdmin: i % 3 === 0,
        }),
    );

    await Promise.all(users.map((user) => user.toPO().save()));

    const journals = [...Array(3)].map((_, i) => {
      const name = `Journal ${i}`;
      const tags = [`${name} - 1`, `${name} - 2`, `${name} - 3`, `${name} - 4`];
      return new JournalBO({
        name,
        tags,
        description: "",
        unit: `Unit ${i}`,
        adminIds: [users[i].id],
        memberIds: [users[i + 1].id, users[i + 2].id],
      });
    });

    const journalPOs = [];
    const journalTagPOs = [];
    const journalUserPOs = [];
    for (const journal of journals) {
      const [journalPO, tagPOs, userPOs] = journal.toPO();
      journalPOs.push(journalPO);
      journalTagPOs.push(...tagPOs);
      journalUserPOs.push(...userPOs);
    }

    await Promise.all(journalPOs.map((po) => po.save()));
    await Promise.all(journalTagPOs.map((po) => po.save()));
    await Promise.all(journalUserPOs.map((po) => po.save()));

    const accounts = [];
    for (const journal of await JournalPO.findAll()) {
      logger.info("Get Journal", {
        journal: journal.toJSON(),
        tags: (await journal.getTags()).map((tag) => tag.tag),
        admins: (await journal.getAdmins()).map((user) => user.name),
        members: (await journal.getMembers()).map((user) => user.name),
      });

      accounts.push(
        ...ACCOUNT_TYPES.map(
          (type, i) =>
            new AccountBO({
              name: `${journal.name} - ${type}`,
              description: "",
              unit: `Unit ${i}`,
              journalId: journal.id,
              tags: ["tag 1", "tag 2", "tag 3"],
              type: type,
            }),
        ),
      );
    }

    const accountPOs = [];
    const accountTagPOs = [];
    for (const account of accounts) {
      const [po, tags] = account.toPO();
      accountPOs.push(po);
      accountTagPOs.push(...tags);
    }

    await Promise.all(accountPOs.map((po) => po.save()));
    await Promise.all(accountTagPOs.map((po) => po.save()));

    for (const account of await AccountPO.findAll({ where: { journalId: journals[0].id } })) {
      logger.info("Get Account", {
        name: account.name,
        tags: (await account.getTags()).map((tag) => tag.tag),
        type: account.type,
      });
    }
  } catch (e) {
    logger.error("Error: " + e);
  }
})();
