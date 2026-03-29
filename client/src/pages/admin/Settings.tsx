import { PageWrapper } from '../../components/layout/PageWrapper';
import { ComingSoon } from '../common/ComingSoon';

export const AdminSettingsPage = () => (
  <PageWrapper variant="admin">
    <ComingSoon title="Platform Settings" description="General, email, payment, and SEO tabs will be configured soon." />
  </PageWrapper>
);
