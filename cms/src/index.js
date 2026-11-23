'use strict';

// Public read-only access to the portfolio content types, so the frontend
// (and `npm run export-content`) can read them without manual role setup.
const PUBLIC_ACTIONS = [
  'api::about.about.find',
  'api::project.project.find',
  'api::project.project.findOne',
  'api::experience.experience.find',
  'api::experience.experience.findOne',
  'api::tool.tool.find',
  'api::tool.tool.findOne',
];

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    const role = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });
    if (!role) return;

    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: role.id } });
    const have = new Set(existing.map((p) => p.action));

    for (const action of PUBLIC_ACTIONS) {
      if (!have.has(action)) {
        await strapi
          .query('plugin::users-permissions.permission')
          .create({ data: { action, role: role.id } });
      }
    }
  },
};
