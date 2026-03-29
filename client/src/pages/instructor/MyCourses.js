import { jsx as _jsx } from "react/jsx-runtime";
import { PageWrapper } from '../../components/layout/PageWrapper';
import { ComingSoon } from '../common/ComingSoon';
export const InstructorCoursesPage = () => (_jsx(PageWrapper, { variant: "instructor", children: _jsx(ComingSoon, { title: "My Courses", description: "Drag-and-drop course cards and analytics badges will be introduced soon." }) }));
