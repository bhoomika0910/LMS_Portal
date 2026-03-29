import { jsx as _jsx } from "react/jsx-runtime";
import { PageWrapper } from '../../components/layout/PageWrapper';
import { ComingSoon } from '../common/ComingSoon';
export const AdminStudentsPage = () => (_jsx(PageWrapper, { variant: "admin", children: _jsx(ComingSoon, { title: "Student Management", description: "Advanced tables with filters, bulk actions, and exports will land alongside the admin portal build." }) }));
