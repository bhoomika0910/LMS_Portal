import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Course } from './models/Course.js';
import { Section } from './models/Section.js';
import { Lesson } from './models/Lesson.js';
import { Enrollment } from './models/Enrollment.js';
import { Order } from './models/Order.js';
import { Review } from './models/Review.js';
import { Coupon } from './models/Coupon.js';
import { Payout } from './models/Payout.js';
import { Notification } from './models/Notification.js';
import { AuditLog } from './models/AuditLog.js';
import { QnA } from './models/QnA.js';

const resetCollections = async () => {
  const models = [
    AuditLog,
    Coupon,
    Course,
    Enrollment,
    Lesson,
    Notification,
    Order,
    Payout,
    QnA,
    Review,
    Section,
    User,
  ];

  await Promise.all(models.map((model) => model.deleteMany({})));
};

const createUsers = async () => {
  const basePassword = 'Password123!';

  const [admin, instructorOne, instructorTwo, studentOne, studentTwo] = await User.create([
    {
      firstName: 'Avery',
      lastName: 'Cole',
      email: 'admin@learnsphere.dev',
      role: 'admin',
      password: basePassword,
      profile: {
        headline: 'Platform Operations Lead',
        expertise: ['Operations', 'Security'],
      },
      preferences: { locale: 'en', timezone: 'UTC' },
    },
    {
      firstName: 'Maya',
      lastName: 'Rowe',
      email: 'maya@learnsphere.dev',
      role: 'instructor',
      password: basePassword,
      profile: {
        headline: 'Product Designer',
        expertise: ['Design Systems', 'UX'],
        languages: ['English', 'Spanish'],
        socialLinks: { linkedin: 'https://linkedin.com/in/mayarowe' },
      },
      stats: { teachingCourses: 2, totalRevenue: 24800 },
      payoutSettings: { preferredMethod: 'stripe', stripeAccountId: 'acct_1NXabc123' },
    },
    {
      firstName: 'Noah',
      lastName: 'Quinn',
      email: 'noah@learnsphere.dev',
      role: 'instructor',
      password: basePassword,
      profile: {
        headline: 'Backend Architect',
        expertise: ['Node.js', 'Serverless'],
      },
      stats: { teachingCourses: 1, totalRevenue: 18300 },
      payoutSettings: { preferredMethod: 'paypal', paypalEmail: 'noah@paypal.test' },
    },
    {
      firstName: 'Harper',
      lastName: 'Lee',
      email: 'harper@student.learnsphere.dev',
      role: 'student',
      password: basePassword,
      profile: { headline: 'Aspiring Product Manager' },
      preferences: { locale: 'en', timezone: 'America/New_York' },
    },
    {
      firstName: 'Kai',
      lastName: 'Park',
      email: 'kai@student.learnsphere.dev',
      role: 'student',
      password: basePassword,
      profile: { headline: 'Full-stack Developer in training' },
      preferences: { locale: 'en', timezone: 'America/Los_Angeles' },
    },
  ]);

  return { admin, instructorOne, instructorTwo, studentOne, studentTwo };
};

const createCourseWithContent = async (coursePayload, structure) => {
  const course = await Course.create(coursePayload);
  let totalLessons = 0;
  let totalMinutes = 0;
  const lessonsByAlias = {};

  for (const [sectionIndex, section] of structure.entries()) {
    const sectionDoc = await Section.create({
      course: course._id,
      title: section.title,
      description: section.description,
      order: sectionIndex,
      isPublished: true,
      lessonCount: section.lessons.length,
      durationMinutes: section.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0),
    });

    totalLessons += section.lessons.length;
    totalMinutes += section.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0);

    const lessonsPayload = section.lessons.map((lesson, lessonIndex) => ({
      course: course._id,
      section: sectionDoc._id,
      title: lesson.title,
      type: lesson.type,
      description: lesson.description,
      content: lesson.content,
      order: lessonIndex,
      durationMinutes: lesson.durationMinutes,
      isPreview: Boolean(lesson.isPreview),
      video: lesson.video,
    }));

    const createdLessons = await Lesson.insertMany(lessonsPayload);
    createdLessons.forEach((lessonDoc, idx) => {
      const aliasKey = section.lessons[idx].alias;
      if (aliasKey) {
        lessonsByAlias[aliasKey] = lessonDoc;
      }
    });
  }

  await Course.findByIdAndUpdate(course._id, {
    $set: {
      'stats.totalSections': structure.length,
      'stats.totalLessons': totalLessons,
      'stats.totalMinutes': totalMinutes,
    },
  });

  return { course, lessonsByAlias };
};

const seed = async () => {
  await connectDB();
  await resetCollections();

  const { admin, instructorOne, instructorTwo, studentOne, studentTwo } = await createUsers();

  const productDesignCourse = await createCourseWithContent(
    {
      title: 'Product Design Mastery',
      subtitle: 'Systems thinking, research, and delivery for high-growth teams',
      description:
        'A cohort-tested framework that helps you ship elegant experiences with measurable impact. Includes live teardown recordings, templates, and critique workflows.',
      category: 'Design',
      subcategory: 'Product Design',
      tags: ['design systems', 'ux research', 'prototyping'],
      requirements: ['Comfort with Figma', 'Basic research knowledge'],
      learningOutcomes: ['Lead discovery workshops', 'Operationalize design QA', 'Measure product usability'],
      targetAudience: ['Intermediate designers', 'Product managers'],
      instructor: instructorOne._id,
      coInstructors: [admin._id],
      language: 'en',
      pricing: { currency: 'USD', basePrice: 129, salePrice: 99, saleEndsAt: new Date(Date.now() + 7 * 86400000) },
      media: {
        thumbnailUrl: 'https://cdn.learnsphere.dev/images/design-course-thumb.png',
        promoVideo: {
          url: 'https://cdn.learnsphere.dev/video/design-masterclass.mp4',
          duration: 210,
        },
      },
      settings: {
        status: 'published',
        visibility: 'public',
        isFeatured: true,
        certificateEnabled: true,
      },
      publishedAt: new Date(Date.now() - 5 * 86400000),
    },
    [
      {
        title: 'Design Foundations',
        description: 'Upgrade fundamentals with real-world case studies.',
        lessons: [
          {
            alias: 'design-principles',
            title: 'Principles that scale',
            type: 'video',
            description: 'Core heuristics behind resilient systems.',
            durationMinutes: 18,
            isPreview: true,
            content: 'Video walkthrough with interactive exercise.',
            video: { url: 'https://cdn.learnsphere.dev/video/principles.mp4', duration: 1080 },
          },
          {
            alias: 'research-sprint',
            title: 'Research sprints',
            type: 'article',
            description: 'Blueprints for five-day discovery.',
            durationMinutes: 12,
            content: 'Downloadable templates and workflows.',
          },
        ],
      },
      {
        title: 'Operational Excellence',
        description: 'Workflows, rituals, and QA tooling.',
        lessons: [
          {
            alias: 'design-qa',
            title: 'Design QA that scales',
            type: 'video',
            description: 'Shift-left QA inside Figma and CI/CD.',
            durationMinutes: 22,
            content: 'Guided QA checklist.',
            video: { url: 'https://cdn.learnsphere.dev/video/design-qa.mp4', duration: 1320 },
          },
          {
            alias: 'handoff',
            title: 'Handoff playbook',
            type: 'article',
            description: 'Frictionless partner workflows.',
            durationMinutes: 10,
            content: 'Includes Notion template.',
          },
        ],
      },
    ],
  );

  const serverlessCourse = await createCourseWithContent(
    {
      title: 'Serverless APIs with Node.js & MongoDB',
      subtitle: 'Design fault-tolerant, event-driven services with real telemetry.',
      description:
        'Hands-on curriculum that covers multi-region architecture, observability pipelines, and automated deployments using modern Node.js patterns.',
      category: 'Development',
      subcategory: 'Backend',
      tags: ['nodejs', 'serverless', 'mongodb'],
      requirements: ['Intermediate JavaScript'],
      learningOutcomes: ['Author resilient APIs', 'Ship telemetry dashboards', 'Optimize cold starts'],
      targetAudience: ['Full-stack engineers', 'Backend teams'],
      instructor: instructorTwo._id,
      language: 'en',
      pricing: { currency: 'USD', basePrice: 149 },
      media: {
        thumbnailUrl: 'https://cdn.learnsphere.dev/images/serverless-thumb.png',
      },
      settings: {
        status: 'published',
        visibility: 'public',
        isFeatured: false,
      },
      publishedAt: new Date(Date.now() - 12 * 86400000),
    },
    [
      {
        title: 'Architecture & Planning',
        description: 'From requirements to diagrams.',
        lessons: [
          {
            alias: 'event-modeling',
            title: 'Event modeling primer',
            type: 'video',
            description: 'Reconstruct flows with event storming.',
            durationMinutes: 16,
            content: 'Interactive mural board included.',
            video: { url: 'https://cdn.learnsphere.dev/video/event-modeling.mp4', duration: 960 },
          },
          {
            alias: 'data-lifecycle',
            title: 'Designing the data lifecycle',
            type: 'article',
            durationMinutes: 14,
            content: 'Reference diagrams for pipelines.',
          },
        ],
      },
      {
        title: 'Implementation',
        description: 'Ship and observe.',
        lessons: [
          {
            alias: 'observability',
            title: 'Observability in practice',
            type: 'video',
            durationMinutes: 20,
            content: 'Setup tracing for serverless workloads.',
            video: { url: 'https://cdn.learnsphere.dev/video/observability.mp4', duration: 1200 },
          },
        ],
      },
    ],
  );

  const coupon = await Coupon.create({
    code: 'LAUNCH25',
    description: '25% off launch promo',
    type: 'percent',
    value: 25,
    usageLimit: 250,
    startsAt: new Date(Date.now() - 2 * 86400000),
    expiresAt: new Date(Date.now() + 14 * 86400000),
    createdBy: admin._id,
    applicableCourses: [productDesignCourse.course._id, serverlessCourse.course._id],
  });

  await Enrollment.create([
    {
      student: studentOne._id,
      course: productDesignCourse.course._id,
      status: 'active',
      startedAt: new Date(Date.now() - 4 * 86400000),
      progress: { percent: 45 },
    },
    {
      student: studentTwo._id,
      course: productDesignCourse.course._id,
      status: 'completed',
      startedAt: new Date(Date.now() - 10 * 86400000),
      completedAt: new Date(Date.now() - 1 * 86400000),
      progress: { percent: 100 },
    },
    {
      student: studentTwo._id,
      course: serverlessCourse.course._id,
      status: 'active',
      startedAt: new Date(Date.now() - 2 * 86400000),
      progress: { percent: 20 },
    },
  ]);

  await Course.findByIdAndUpdate(productDesignCourse.course._id, {
    $inc: { 'stats.totalEnrollments': 2 },
    $set: { 'stats.averageRating': 4.8, 'stats.ratingCount': 2 },
  });
  await Course.findByIdAndUpdate(serverlessCourse.course._id, {
    $inc: { 'stats.totalEnrollments': 1 },
    $set: { 'stats.averageRating': 4.6, 'stats.ratingCount': 1 },
  });

  await Order.create([
    {
      student: studentOne._id,
      items: [
        {
          course: productDesignCourse.course._id,
          title: productDesignCourse.course.title,
          unitPrice: productDesignCourse.course.pricing.basePrice,
          currency: 'USD',
        },
      ],
      subtotal: 129,
      discountTotal: 32.25,
      total: 96.75,
      status: 'completed',
      paymentProvider: 'stripe',
      coupon: coupon._id,
      paidAt: new Date(Date.now() - 4 * 86400000),
    },
    {
      student: studentTwo._id,
      items: [
        {
          course: serverlessCourse.course._id,
          title: serverlessCourse.course.title,
          unitPrice: serverlessCourse.course.pricing.basePrice,
          currency: 'USD',
        },
      ],
      subtotal: 149,
      discountTotal: 0,
      total: 149,
      status: 'completed',
      paymentProvider: 'stripe',
      paidAt: new Date(Date.now() - 2 * 86400000),
    },
  ]);

  await Review.create([
    {
      student: studentOne._id,
      course: productDesignCourse.course._id,
      rating: 5,
      title: 'Elevated my process',
      body: 'Loved the teardown format and templates.',
      status: 'published',
      visibility: 'public',
    },
    {
      student: studentTwo._id,
      course: productDesignCourse.course._id,
      rating: 4,
      title: 'Actionable and concise',
      body: 'Clear pacing and labs.',
      status: 'published',
    },
  ]);

  await Payout.create([
    {
      instructor: instructorOne._id,
      amount: 4200,
      currency: 'USD',
      status: 'processing',
      periodStart: new Date(Date.now() - 35 * 86400000),
      periodEnd: new Date(Date.now() - 5 * 86400000),
      method: 'stripe',
      transferId: 'tr_1NXxyz456',
      totals: { gross: 4800, fees: 600, net: 4200 },
      courses: [{ course: productDesignCourse.course._id, amount: 4200, enrollments: 60 }],
    },
  ]);

  await Notification.create([
    {
      recipient: studentOne._id,
      type: 'course',
      title: 'New bonus lesson available',
      message: 'Product Design Mastery just shipped a bonus teardown.',
      link: '/courses/product-design-mastery/bonus',
      priority: 'normal',
    },
    {
      recipient: instructorOne._id,
      type: 'payment',
      title: 'Payout initiated',
      message: 'Your $4,200 payout is processing.',
      link: '/instructor/payouts',
      priority: 'high',
    },
  ]);

  await QnA.create([
    {
      course: productDesignCourse.course._id,
      lesson: productDesignCourse.lessonsByAlias['design-principles']?._id,
      student: studentOne._id,
      question: 'How do you adapt this framework for B2B enterprise? ',
      details: 'Curious about stakeholder alignment when there are multiple buyers.',
      tags: ['enterprise', 'process'],
      answers: [
        {
          author: instructorOne._id,
          content: 'I run a discovery sprint per persona and align artifacts in Notion. Template attached.',
          isInstructor: true,
        },
      ],
      status: 'answered',
      isResolved: true,
      resolvedAt: new Date(),
      resolvedBy: instructorOne._id,
    },
  ]);

  await AuditLog.create([
    {
      user: admin._id,
      actorRole: 'admin',
      action: 'COURSE_STATUS_CHANGE',
      resource: 'Course',
      resourceId: productDesignCourse.course._id.toString(),
      description: 'Moved course to Published state.',
      metadata: { status: 'published' },
    },
    {
      user: instructorTwo._id,
      actorRole: 'instructor',
      action: 'PAYOUT_REQUESTED',
      resource: 'Payout',
      resourceId: 'tr_1NXxyz456',
      metadata: { amount: 4200 },
    },
  ]);

  console.log('Seed data successfully created.');
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  mongoose.connection.close().finally(() => process.exit(1));
});
