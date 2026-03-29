import { jsx as _jsx } from "react/jsx-runtime";
import { PageWrapper } from '../../components/layout/PageWrapper';
import { ComingSoon } from '../common/ComingSoon';
export const AdminSettingsPage = () => (_jsx(PageWrapper, { variant: "admin", children: _jsx(ComingSoon, { title: "Platform Settings", description: "General, email, payment, and SEO tabs will be configured soon." }) }));
