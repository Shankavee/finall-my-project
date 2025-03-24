import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { StudentInteractionComponent } from './student-interaction/student-interaction.component';
import { MonetizationComponent } from './monetization/monetization.component';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { FooterComponent } from './footer/footer.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { ViewContentComponent } from './view-content/view-content.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QuizAttemptComponent } from './quiz-attempt/quiz-attempt.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizComponent } from './quiz/quiz.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ClassListComponent } from './class-list/class-list.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { LessonViewerComponent } from './lesson-viewer/lesson-viewer.component';
import { CommunicationComponent } from './communication/communication.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeDetailsComponent } from './grade-details/grade-details.component';
import { PerformanceReportsComponent } from './performance-reports/performance-reports.component';
import { CourseEnrollmentComponent } from './course-enrollment/course-enrollment.component';
import { InteractiveLearningContentComponent } from './interactive-learning-content/interactive-learning-content.component';
import { AssignmentSubmissionComponent } from './assignment-submission/assignment-submission.component';
import { InstructorLiveClassesComponent } from './instructor-live-classes/instructor-live-classes.component';
import { DiscussionForumComponent } from './discussion-forum/discussion-forum.component';
import { ProgressComponent } from './progress/progress.component';
import { StudyMaterialsComponent } from './study-materials/study-materials.component';
import { LiveClassesComponent } from './live-classes/live-classes.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { Certificates1Component } from './certificates1/certificates1.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'instructor-dashboard', component: InstructorDashboardComponent },
  { path: 'course-management', component: CourseManagementComponent },
  { path: 'student-interaction', component: StudentInteractionComponent },
  { path: 'monetization', component: MonetizationComponent },
  { path: 'profile-management', component: ProfileManagementComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'assignment', component: AssignmentComponent },
  { path: 'about-page', component: AboutPageComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'upload-content', component: UploadContentComponent },
  { path: 'view-content', component: ViewContentComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'quiz-create', component: QuizCreateComponent },
  { path: 'quiz-list', component: QuizListComponent },
  { path: 'quiz-details/:id', component: QuizDetailsComponent },
  { path: 'quiz-attempt/:id', component: QuizAttemptComponent },
  { path: 'quiz-result/:id', component: QuizResultComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'class-list', component: ClassListComponent },
  { path: 'courses-list', component: CoursesListComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'lesson-viewer', component: LessonViewerComponent },
  { path: 'communication', component: CommunicationComponent },
  { path: 'certificates', component: CertificatesComponent },
  { path: "student-detail/:id", component: StudentDetailComponent },
  { path: 'grading', component: GradeListComponent },
  { path: 'grade-details/:id', component: GradeDetailsComponent },
  { path: 'performance-reports', component: PerformanceReportsComponent},
  { path: 'course-enrollment', component: CourseEnrollmentComponent},
  { path: 'assignment-submission', component: AssignmentSubmissionComponent},
  { path: 'interactive-learning-content', component: InteractiveLearningContentComponent},
  { path: 'instructor-live-classes', component: InstructorLiveClassesComponent },
  { path: 'discussion-forum', component: DiscussionForumComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'study-materials', component: StudyMaterialsComponent },
  { path: 'live', component: LiveClassesComponent },
  { path: 'certificates1', component: Certificates1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
