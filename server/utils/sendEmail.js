export const sendEmail = async ({ to, subject, html }) => {
  console.info('Email queued', { to, subject });
  // TODO: integrate Nodemailer + templates
  return { to, subject, html };
};
