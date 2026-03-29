export const calculateRevenueSplit = ({ amount, platformFeePercent = 30 }) => {
  const platformFee = Math.round((amount * platformFeePercent) / 100);
  const instructorShare = amount - platformFee;
  return { platformFee, instructorShare };
};
