export const placeholder = (feature) => (_req, res) => {
  res.status(501).json({
    status: 'pending',
    feature,
    message: 'This endpoint will be implemented in upcoming milestones.',
  });
};
