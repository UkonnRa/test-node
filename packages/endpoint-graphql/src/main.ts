import {
  ACCOUNT_TYPES,
  AccountPO,
  JournalPO,
  JournalUserPO,
  logger,
  POS,
  UserPO,
} from "@test-node/backend-core";

(async () => {
  try {
    for (const po of POS) {
      await po.sync({ force: true });
    }

    const users = await UserPO.bulkCreate(
      [...Array(5)].map((_, i) => ({
        name: `User ${i}`,
        isAdmin: i % 3 === 0,
      })),
    );

    const journals = await JournalPO.bulkCreate(
      [...Array(3)].map((_, i) => {
        const name = `Journal ${i}`;
        return {
          name: `Journal ${i}`,
          tags: [
            { tag: `${name} - 1` },
            { tag: `${name} - 2` },
            { tag: `${name} - 3` },
            { tag: `${name} - 4` },
          ],
        };
      }),
      {
        include: ["tags"],
      },
    );

    await JournalUserPO.bulkCreate(
      journals.flatMap((journal, i) => [
        { journalId: journal.id, userId: users[i].id, isAdmin: true },
        { journalId: journal.id, userId: users[i + 1].id, isAdmin: false },
        { journalId: journal.id, userId: users[i + 2].id, isAdmin: false },
      ]),
    );

    for (const journal of await JournalPO.findAll()) {
      logger.info("Get Journal", {
        journal: journal.toJSON(),
        tags: (await journal.getTags()).map((tag) => tag.tag),
        admins: (await journal.getAdmins()).map((user) => user.name),
        members: (await journal.getMembers()).map((user) => user.name),
      });

      await AccountPO.bulkCreate(
        journals.flatMap((journal) =>
          ACCOUNT_TYPES.map((accountType) => ({
            journalId: journal.id,
            name: `${journal.name} - ${accountType}`,
            type: accountType,
            tags: [
              { tag: `${journal.name} - ${accountType} - 1` },
              { tag: `${journal.name} - ${accountType} - 2` },
              { tag: `${journal.name} - ${accountType} - 3` },
              { tag: `${journal.name} - ${accountType} - 4` },
            ],
          })),
        ),
        {
          include: ["tags"],
        },
      );
    }

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
